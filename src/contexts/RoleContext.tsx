
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

// Mock permissions data with CRUD operations
const mockPermissions: Permission[] = [
  // Dashboard permissions
  { id: '1', name: 'View Dashboard', resource: 'dashboard', action: 'read', description: 'View dashboard widgets and analytics' },
  { id: '2', name: 'Manage Dashboard', resource: 'dashboard', action: 'write', description: 'Customize dashboard layout and widgets' },
  
  // Leads permissions
  { id: '3', name: 'View Leads', resource: 'leads', action: 'read', description: 'View leads list and details' },
  { id: '4', name: 'Create Leads', resource: 'leads', action: 'create', description: 'Create new leads' },
  { id: '5', name: 'Update Leads', resource: 'leads', action: 'update', description: 'Edit existing leads' },
  { id: '6', name: 'Delete Leads', resource: 'leads', action: 'delete', description: 'Delete leads' },
  
  // Contacts permissions
  { id: '7', name: 'View Contacts', resource: 'contacts', action: 'read', description: 'View contacts list and details' },
  { id: '8', name: 'Create Contacts', resource: 'contacts', action: 'create', description: 'Create new contacts' },
  { id: '9', name: 'Update Contacts', resource: 'contacts', action: 'update', description: 'Edit existing contacts' },
  { id: '10', name: 'Delete Contacts', resource: 'contacts', action: 'delete', description: 'Delete contacts' },
  
  // Accounts permissions
  { id: '11', name: 'View Accounts', resource: 'accounts', action: 'read', description: 'View accounts list and details' },
  { id: '12', name: 'Create Accounts', resource: 'accounts', action: 'create', description: 'Create new accounts' },
  { id: '13', name: 'Update Accounts', resource: 'accounts', action: 'update', description: 'Edit existing accounts' },
  { id: '14', name: 'Delete Accounts', resource: 'accounts', action: 'delete', description: 'Delete accounts' },
  
  // Opportunities permissions
  { id: '15', name: 'View Opportunities', resource: 'opportunities', action: 'read', description: 'View opportunities list and details' },
  { id: '16', name: 'Create Opportunities', resource: 'opportunities', action: 'create', description: 'Create new opportunities' },
  { id: '17', name: 'Update Opportunities', resource: 'opportunities', action: 'update', description: 'Edit existing opportunities' },
  { id: '18', name: 'Delete Opportunities', resource: 'opportunities', action: 'delete', description: 'Delete opportunities' },
  
  // Users permissions
  { id: '19', name: 'View Users', resource: 'users', action: 'read', description: 'View users list and details' },
  { id: '20', name: 'Create Users', resource: 'users', action: 'create', description: 'Create new users' },
  { id: '21', name: 'Update Users', resource: 'users', action: 'update', description: 'Edit existing users' },
  { id: '22', name: 'Delete Users', resource: 'users', action: 'delete', description: 'Delete users' },
  
  // Roles permissions
  { id: '23', name: 'View Roles', resource: 'roles', action: 'read', description: 'View roles and permissions' },
  { id: '24', name: 'Create Roles', resource: 'roles', action: 'create', description: 'Create new roles' },
  { id: '25', name: 'Update Roles', resource: 'roles', action: 'update', description: 'Edit existing roles' },
  { id: '26', name: 'Delete Roles', resource: 'roles', action: 'delete', description: 'Delete roles' },
  
  // Customer Management (Super Admin only)
  { id: '27', name: 'View Customers', resource: 'customers', action: 'read', description: 'View customer accounts and their users' },
  { id: '28', name: 'Manage Customers', resource: 'customers', action: 'write', description: 'Manage customer accounts' },
  
  // Reports permissions
  { id: '29', name: 'View Reports', resource: 'reports', action: 'read', description: 'View reports and analytics' },
  { id: '30', name: 'Create Reports', resource: 'reports', action: 'create', description: 'Create new reports' },
  
  // Tasks permissions
  { id: '31', name: 'View Tasks', resource: 'tasks', action: 'read', description: 'View tasks and assignments' },
  { id: '32', name: 'Create Tasks', resource: 'tasks', action: 'create', description: 'Create new tasks' },
  { id: '33', name: 'Update Tasks', resource: 'tasks', action: 'update', description: 'Edit existing tasks' },
  { id: '34', name: 'Delete Tasks', resource: 'tasks', action: 'delete', description: 'Delete tasks' },
  
  // Calendar permissions
  { id: '35', name: 'View Calendar', resource: 'calendar', action: 'read', description: 'View calendar and meetings' },
  { id: '36', name: 'Manage Calendar', resource: 'calendar', action: 'write', description: 'Schedule and manage meetings' },

  // Email permissions
  { id: '37', name: 'View Emails', resource: 'emails', action: 'read', description: 'View emails and communications' },
  { id: '38', name: 'Send Emails', resource: 'emails', action: 'write', description: 'Send and manage emails' },

  // Calls permissions
  { id: '39', name: 'View Calls', resource: 'calls', action: 'read', description: 'View call logs and recordings' },
  { id: '40', name: 'Make Calls', resource: 'calls', action: 'write', description: 'Make and record calls' },

  // Products permissions
  { id: '41', name: 'View Products', resource: 'products', action: 'read', description: 'View products and services' },
  { id: '42', name: 'Manage Products', resource: 'products', action: 'write', description: 'Manage products and services' },

  // Campaigns permissions
  { id: '43', name: 'View Campaigns', resource: 'campaigns', action: 'read', description: 'View marketing campaigns' },
  { id: '44', name: 'Manage Campaigns', resource: 'campaigns', action: 'write', description: 'Create and manage campaigns' },

  // Quotes permissions
  { id: '45', name: 'View Quotes', resource: 'quotes', action: 'read', description: 'View quotes and proposals' },
  { id: '46', name: 'Manage Quotes', resource: 'quotes', action: 'write', description: 'Create and manage quotes' },

  // Settings permissions
  { id: '47', name: 'View Settings', resource: 'settings', action: 'read', description: 'View system settings' },
  { id: '48', name: 'Manage Settings', resource: 'settings', action: 'write', description: 'Manage system settings' },
];

// Mock roles data with super admin
const mockRoles: Role[] = [
  {
    id: 'superadmin',
    name: 'Super Administrator',
    description: 'System-wide super admin with full access including customer management',
    permissions: mockPermissions,
    isDefault: false,
    isSuperAdmin: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'admin',
    name: 'Administrator',
    description: 'Full system access with all permissions except customer management',
    permissions: mockPermissions.filter(p => p.resource !== 'customers'),
    isDefault: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'manager',
    name: 'Sales Manager',
    description: 'Manager level access with team oversight',
    permissions: mockPermissions.filter(p => !['users', 'roles', 'customers', 'settings'].includes(p.resource)),
    isDefault: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user',
    name: 'Sales Representative',
    description: 'Standard user access for daily operations',
    permissions: mockPermissions.filter(p => 
      ['dashboard', 'leads', 'contacts', 'opportunities', 'tasks', 'calendar', 'emails', 'calls'].includes(p.resource) && 
      ['read', 'create', 'update'].includes(p.action)
    ),
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
