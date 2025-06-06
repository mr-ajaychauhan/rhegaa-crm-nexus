import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState, CreateUserData } from '@/types/auth';
import { useRoles } from './RoleContext';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: any) => Promise<void>;
  createUser: (userData: CreateUserData) => Promise<void>;
  updateUser: (id: string, userData: Partial<User>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  getAllUsers: () => User[];
  getAllCustomers: () => User[];
  getUsersByTenant: (tenantId: string) => User[];
  hasPermission: (resource: string, action: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const { roles } = useRoles();

  useEffect(() => {
    // Check for stored auth data
    const storedUser = localStorage.getItem('crm_user');
    const storedUsers = localStorage.getItem('crm_all_users');
    
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }

    if (storedUsers) {
      setAllUsers(JSON.parse(storedUsers));
    } else {
      // Create default super admin user if no users exist
      createDefaultSuperAdmin();
    }
  }, [roles]);

  const createDefaultSuperAdmin = () => {
    if (roles.length === 0) return;
    
    const superAdminRole = roles.find(r => r.name === 'Super Admin');
    if (!superAdminRole) return;

    const defaultSuperAdmin: User = {
      id: 'superadmin_001',
      name: 'Super Administrator',
      email: 'superadmin@crm.com',
      roleId: superAdminRole.id,
      role: superAdminRole,
      tenantId: 'super_tenant',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
      department: 'System Administration',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const defaultUsers = [defaultSuperAdmin];
    setAllUsers(defaultUsers);
    localStorage.setItem('crm_all_users', JSON.stringify(defaultUsers));
  };

  const login = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user in stored users or create mock user
    const storedUsers = localStorage.getItem('crm_all_users');
    let users: User[] = storedUsers ? JSON.parse(storedUsers) : [];
    
    let existingUser = users.find(u => u.email === email);
    
    if (!existingUser) {
      // Create mock user for demo
      const superAdminRole = roles.find(r => r.name === 'Super Admin');
      const adminRole = roles.find(r => r.name === 'Administrator');
      const managerRole = roles.find(r => r.name === 'Sales Manager');
      const userRole = roles.find(r => r.name === 'Sales Representative');
      
      let role = userRole;
      if (email === 'superadmin@crm.com' || email.includes('superadmin')) role = superAdminRole;
      else if (email.includes('admin')) role = adminRole;
      else if (email.includes('manager')) role = managerRole;

      existingUser = {
        id: Date.now().toString(),
        name: email === 'superadmin@crm.com' ? 'Super Administrator' : email.includes('superadmin') ? 'Super Admin' : email.includes('admin') ? 'Admin User' : email.includes('manager') ? 'Manager User' : 'Sales User',
        email,
        roleId: role?.id || 'user',
        role: role || userRole!,
        tenantId: email === 'superadmin@crm.com' || email.includes('superadmin') ? 'super_tenant' : 'tenant_123',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
        department: email === 'superadmin@crm.com' || email.includes('superadmin') ? 'System Administration' : 'Sales',
        directReports: email.includes('manager') ? ['user1', 'user2'] : undefined,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Add new user to the list
      const updatedUsers = [...users, existingUser];
      setAllUsers(updatedUsers);
      localStorage.setItem('crm_all_users', JSON.stringify(updatedUsers));
    }

    localStorage.setItem('crm_user', JSON.stringify(existingUser));
    setAuthState({
      user: existingUser,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const logout = () => {
    localStorage.removeItem('crm_user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const register = async (userData: any) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // New signups are always admins
    const adminRole = roles.find(r => r.name === 'Administrator');
    
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      roleId: adminRole?.id || 'admin',
      role: adminRole!,
      tenantId: `tenant_${Date.now()}`,
      department: 'Administration',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Add to all users list
    const updatedUsers = [...allUsers, newUser];
    setAllUsers(updatedUsers);
    localStorage.setItem('crm_all_users', JSON.stringify(updatedUsers));

    localStorage.setItem('crm_user', JSON.stringify(newUser));
    setAuthState({
      user: newUser,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const createUser = async (userData: CreateUserData) => {
    const role = roles.find(r => r.id === userData.roleId);
    
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      roleId: userData.roleId,
      role: role!,
      tenantId: authState.user?.tenantId || 'tenant_123',
      department: userData.department || 'Sales',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: authState.user?.id,
    };

    const updatedUsers = [...allUsers, newUser];
    setAllUsers(updatedUsers);
    localStorage.setItem('crm_all_users', JSON.stringify(updatedUsers));
  };

  const updateUser = async (id: string, userData: Partial<User>) => {
    const updatedUsers = allUsers.map(user => {
      if (user.id === id) {
        const updatedUser = { ...user, ...userData, updatedAt: new Date().toISOString() };
        if (userData.roleId) {
          const role = roles.find(r => r.id === userData.roleId);
          if (role) updatedUser.role = role;
        }
        return updatedUser;
      }
      return user;
    });
    
    setAllUsers(updatedUsers);
    localStorage.setItem('crm_all_users', JSON.stringify(updatedUsers));

    // Update current user if it's the same user
    if (authState.user?.id === id) {
      const updatedCurrentUser = updatedUsers.find(u => u.id === id);
      if (updatedCurrentUser) {
        setAuthState(prev => ({ ...prev, user: updatedCurrentUser }));
        localStorage.setItem('crm_user', JSON.stringify(updatedCurrentUser));
      }
    }
  };

  const deleteUser = async (id: string) => {
    const updatedUsers = allUsers.filter(user => user.id !== id);
    setAllUsers(updatedUsers);
    localStorage.setItem('crm_all_users', JSON.stringify(updatedUsers));
  };

  const getAllUsers = () => allUsers;

  const getAllCustomers = () => {
    // Return users who are admins of their own tenants (customer accounts)
    return allUsers.filter(user => 
      user.role.name === 'Administrator' && 
      user.tenantId !== 'super_tenant'
    );
  };

  const getUsersByTenant = (tenantId: string) => {
    return allUsers.filter(user => user.tenantId === tenantId);
  };

  const hasPermission = (resource: string, action: string) => {
    // Super Admin always has all permissions
    if (authState.user?.role?.isSuperAdmin || authState.user?.role?.name === 'Super Admin') {
      return true;
    }
    
    // Add null checks to prevent the error
    if (!authState.user?.role?.permissions) return false;
    return authState.user.role.permissions.some(
      permission => permission.resource === resource && permission.action === action
    );
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      logout,
      register,
      createUser,
      updateUser,
      deleteUser,
      getAllUsers,
      getAllCustomers,
      getUsersByTenant,
      hasPermission,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
