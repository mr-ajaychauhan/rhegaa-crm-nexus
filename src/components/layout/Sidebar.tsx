
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import {
  Home,
  Users,
  Building2,
  Target,
  Calendar,
  Mail,
  Phone,
  BarChart3,
  Settings,
  LogOut,
  UserPlus,
  Briefcase,
  FileText,
  ChevronRight,
  CheckSquare,
  Megaphone,
  Shield,
  UserCog,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  collapsed: boolean;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, permissions: { resource: 'dashboard', action: 'read' } },
  { id: 'leads', label: 'Leads', icon: UserPlus, permissions: { resource: 'leads', action: 'read' } },
  { id: 'contacts', label: 'Contacts', icon: Users, permissions: { resource: 'contacts', action: 'read' } },
  { id: 'accounts', label: 'Accounts', icon: Building2, permissions: { resource: 'accounts', action: 'read' } },
  { id: 'opportunities', label: 'Opportunities', icon: Target, permissions: { resource: 'opportunities', action: 'read' } },
  { id: 'calendar', label: 'Calendar', icon: Calendar, permissions: { resource: 'calendar', action: 'read' } },
  { id: 'emails', label: 'Email Center', icon: Mail, permissions: { resource: 'emails', action: 'read' } },
  { id: 'calls', label: 'Call Center', icon: Phone, permissions: { resource: 'calls', action: 'read' } },
  { id: 'tasks', label: 'Tasks', icon: CheckSquare, permissions: { resource: 'tasks', action: 'read' } },
  { id: 'products', label: 'Products & Services', icon: Briefcase, permissions: { resource: 'products', action: 'read' } },
  { id: 'campaigns', label: 'Campaigns', icon: Megaphone, permissions: { resource: 'campaigns', action: 'read' } },
  { id: 'quotes', label: 'Quotes', icon: FileText, permissions: { resource: 'quotes', action: 'read' } },
  { id: 'users', label: 'User Management', icon: UserCog, permissions: { resource: 'users', action: 'read' } },
  { id: 'roles', label: 'Role Management', icon: Shield, permissions: { resource: 'roles', action: 'read' } },
  { id: 'customers', label: 'Customer Management', icon: Building2, permissions: { resource: 'customers', action: 'read' } },
  { id: 'reports', label: 'Reports', icon: BarChart3, permissions: { resource: 'reports', action: 'read' } },
  { id: 'settings', label: 'Settings', icon: Settings, permissions: { resource: 'settings', action: 'read' } },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, collapsed }) => {
  const { user, logout, hasPermission } = useAuth();

  const filteredMenuItems = menuItems.filter(item => {
    // Super Admin can see everything
    if (user?.role?.isSuperAdmin || user?.role?.name === 'Super Admin') {
      return true;
    }
    // Regular permission check
    return hasPermission(item.permissions.resource, item.permissions.action);
  });

  return (
    <div className={cn(
      "bg-gray-900 text-white h-full flex flex-col transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Building2 className="w-5 h-5" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-xl font-bold">CRM Pro</h1>
              <p className="text-xs text-gray-400">Multi-tenant CRM</p>
            </div>
          )}
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback className="bg-blue-600 text-white">
              {user?.name?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name}</p>
              <p className="text-xs text-gray-400">{user?.role?.name}</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {filteredMenuItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start text-left h-10",
                isActive ? "bg-blue-600 text-white hover:bg-blue-700" : "text-gray-300 hover:text-white hover:bg-gray-800",
                collapsed ? "px-2" : "px-3"
              )}
              onClick={() => onTabChange(item.id)}
            >
              <Icon className={cn("w-5 h-5", collapsed ? "mx-auto" : "mr-3")} />
              {!collapsed && (
                <>
                  <span className="flex-1">{item.label}</span>
                  {isActive && <ChevronRight className="w-4 h-4" />}
                </>
              )}
            </Button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-700">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800",
            collapsed ? "px-2" : "px-3"
          )}
          onClick={logout}
        >
          <LogOut className={cn("w-5 h-5", collapsed ? "mx-auto" : "mr-3")} />
          {!collapsed && "Logout"}
        </Button>
      </div>
    </div>
  );
};
