
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Role, Permission } from '@/types/auth';

interface RoleContextType {
  roles: Role[];
  permissions: Permission[];
  createRole: (roleData: Omit<Role, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateRole: (id: string, roleData: Partial<Role>) => Promise<void>;
  deleteRole: (id: string) => Promise<void>;
  hasPermission: (resource: string, action: string) => boolean;
  isLoading: boolean;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const useRoles = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRoles must be used within a RoleProvider');
  }
  return context;
};

// Mock permissions data
const mockPermissions: Permission[] = [
  { id: '1', name: 'View Dashboard', resource: 'dashboard', action: 'read', description: 'View dashboard widgets and analytics' },
  { id: '2', name: 'Manage Dashboard', resource: 'dashboard', action: 'write', description: 'Customize dashboard layout and widgets' },
  { id: '3', name: 'View Leads', resource: 'leads', action: 'read', description: 'View leads list and details' },
  { id: '4', name: 'Manage Leads', resource: 'leads', action: 'write', description: 'Create, edit, and delete leads' },
  { id: '5', name: 'View Contacts', resource: 'contacts', action: 'read', description: 'View contacts list and details' },
  { id: '6', name: 'Manage Contacts', resource: 'contacts', action: 'write', description: 'Create, edit, and delete contacts' },
  { id: '7', name: 'View Accounts', resource: 'accounts', action: 'read', description: 'View accounts list and details' },
  { id: '8', name: 'Manage Accounts', resource: 'accounts', action: 'write', description: 'Create, edit, and delete accounts' },
  { id: '9', name: 'View Opportunities', resource: 'opportunities', action: 'read', description: 'View opportunities list and details' },
  { id: '10', name: 'Manage Opportunities', resource: 'opportunities', action: 'write', description: 'Create, edit, and delete opportunities' },
  { id: '11', name: 'View Users', resource: 'users', action: 'read', description: 'View users list and details' },
  { id: '12', name: 'Manage Users', resource: 'users', action: 'write', description: 'Create, edit, and delete users' },
  { id: '13', name: 'View Roles', resource: 'roles', action: 'read', description: 'View roles and permissions' },
  { id: '14', name: 'Manage Roles', resource: 'roles', action: 'write', description: 'Create, edit, and delete roles' },
  { id: '15', name: 'View Reports', resource: 'reports', action: 'read', description: 'View reports and analytics' },
  { id: '16', name: 'Manage Reports', resource: 'reports', action: 'write', description: 'Create and manage reports' },
  { id: '17', name: 'View Tasks', resource: 'tasks', action: 'read', description: 'View tasks and assignments' },
  { id: '18', name: 'Manage Tasks', resource: 'tasks', action: 'write', description: 'Create, edit, and assign tasks' },
  { id: '19', name: 'View Calendar', resource: 'calendar', action: 'read', description: 'View calendar and meetings' },
  { id: '20', name: 'Manage Calendar', resource: 'calendar', action: 'write', description: 'Schedule and manage meetings' },
];

// Mock roles data
const mockRoles: Role[] = [
  {
    id: 'admin',
    name: 'Administrator',
    description: 'Full system access with all permissions',
    permissions: mockPermissions,
    isDefault: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'manager',
    name: 'Sales Manager',
    description: 'Manager level access with team oversight',
    permissions: mockPermissions.filter(p => !['users', 'roles'].includes(p.resource)),
    isDefault: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user',
    name: 'Sales Representative',
    description: 'Standard user access for daily operations',
    permissions: mockPermissions.filter(p => ['dashboard', 'leads', 'contacts', 'opportunities', 'tasks', 'calendar'].includes(p.resource) && p.action === 'read'),
    isDefault: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions] = useState<Permission[]>(mockPermissions);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load roles from localStorage or use mock data
    const storedRoles = localStorage.getItem('crm_roles');
    if (storedRoles) {
      setRoles(JSON.parse(storedRoles));
    } else {
      setRoles(mockRoles);
      localStorage.setItem('crm_roles', JSON.stringify(mockRoles));
    }
    setIsLoading(false);
  }, []);

  const createRole = async (roleData: Omit<Role, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newRole: Role = {
      ...roleData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedRoles = [...roles, newRole];
    setRoles(updatedRoles);
    localStorage.setItem('crm_roles', JSON.stringify(updatedRoles));
  };

  const updateRole = async (id: string, roleData: Partial<Role>) => {
    const updatedRoles = roles.map(role =>
      role.id === id ? { ...role, ...roleData, updatedAt: new Date().toISOString() } : role
    );
    setRoles(updatedRoles);
    localStorage.setItem('crm_roles', JSON.stringify(updatedRoles));
  };

  const deleteRole = async (id: string) => {
    const updatedRoles = roles.filter(role => role.id !== id);
    setRoles(updatedRoles);
    localStorage.setItem('crm_roles', JSON.stringify(updatedRoles));
  };

  const hasPermission = (resource: string, action: string) => {
    // This will be implemented when we have the current user context
    return true; // For now, allow all actions
  };

  return (
    <RoleContext.Provider value={{
      roles,
      permissions,
      createRole,
      updateRole,
      deleteRole,
      hasPermission,
      isLoading,
    }}>
      {children}
    </RoleContext.Provider>
  );
};
