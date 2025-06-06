
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { useRoles } from '@/contexts/RoleContext';
import { useAuth } from '@/contexts/AuthContext';
import { Role, Permission } from '@/types/auth';
import { Plus, Edit, Trash2, Shield, Users } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

export const RoleManagement: React.FC = () => {
  const { roles, permissions, createRole, updateRole, deleteRole } = useRoles();
  const { hasPermission } = useAuth();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: [] as string[],
  });

  const canManageRoles = hasPermission('roles', 'write');
  const canViewRoles = hasPermission('roles', 'read');

  const handleCreateRole = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const selectedPermissions = permissions.filter(p => formData.permissions.includes(p.id));
      await createRole({
        name: formData.name,
        description: formData.description,
        permissions: selectedPermissions,
      });
      setIsCreateDialogOpen(false);
      setFormData({ name: '', description: '', permissions: [] });
      toast({
        title: "Role created successfully",
        description: `${formData.name} role has been added.`,
      });
    } catch (error) {
      toast({
        title: "Error creating role",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateRole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRole) return;
    
    try {
      const selectedPermissions = permissions.filter(p => formData.permissions.includes(p.id));
      await updateRole(editingRole.id, {
        name: formData.name,
        description: formData.description,
        permissions: selectedPermissions,
      });
      setEditingRole(null);
      setFormData({ name: '', description: '', permissions: [] });
      toast({
        title: "Role updated successfully",
        description: `${formData.name} role has been updated.`,
      });
    } catch (error) {
      toast({
        title: "Error updating role",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteRole = async (roleId: string) => {
    try {
      await deleteRole(roleId);
      toast({
        title: "Role deleted",
        description: "Role has been removed from the system.",
      });
    } catch (error) {
      toast({
        title: "Error deleting role",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const startEdit = (role: Role) => {
    setEditingRole(role);
    setFormData({
      name: role.name,
      description: role.description,
      permissions: role.permissions.map(p => p.id),
    });
  };

  const togglePermission = (permissionId: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(id => id !== permissionId)
        : [...prev.permissions, permissionId]
    }));
  };

  // Group permissions by resource
  const groupedPermissions = permissions.reduce((acc, permission) => {
    if (!acc[permission.resource]) {
      acc[permission.resource] = [];
    }
    acc[permission.resource].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);

  if (!canViewRoles) {
    return (
      <div className="p-6">
        <div className="text-center">
          <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-600">Access Denied</h2>
          <p className="text-gray-500">You don't have permission to view role management.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Role Management</h1>
          <p className="text-gray-600">Manage system roles and permissions</p>
        </div>
        {canManageRoles && (
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Role
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Role</DialogTitle>
                <DialogDescription>
                  Define a new role with specific permissions.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateRole} className="space-y-4">
                <div>
                  <Label htmlFor="name">Role Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label>Permissions</Label>
                  <div className="space-y-4 mt-2 max-h-60 overflow-y-auto border rounded-md p-4">
                    {Object.entries(groupedPermissions).map(([resource, resourcePermissions]) => (
                      <div key={resource} className="space-y-2">
                        <h4 className="font-medium capitalize text-sm text-gray-700">{resource}</h4>
                        <div className="grid grid-cols-1 gap-2 ml-4">
                          {resourcePermissions.map(permission => (
                            <div key={permission.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={permission.id}
                                checked={formData.permissions.includes(permission.id)}
                                onCheckedChange={() => togglePermission(permission.id)}
                              />
                              <Label htmlFor={permission.id} className="text-sm">
                                {permission.name}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <Button type="submit" className="w-full">Create Role</Button>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map(role => (
          <Card key={role.id}>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <div>
                    <h3 className="font-semibold">{role.name}</h3>
                    {role.isDefault && (
                      <Badge variant="outline" className="text-xs">Default</Badge>
                    )}
                  </div>
                </div>
                {canManageRoles && !role.isDefault && (
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => startEdit(role)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteRole(role.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">{role.description}</p>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Permissions</span>
                  <Badge variant="secondary">{role.permissions.length}</Badge>
                </div>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {role.permissions.slice(0, 5).map(permission => (
                    <div key={permission.id} className="text-xs text-gray-600">
                      • {permission.name}
                    </div>
                  ))}
                  {role.permissions.length > 5 && (
                    <div className="text-xs text-gray-500">
                      +{role.permissions.length - 5} more permissions
                    </div>
                  )}
                </div>
              </div>

              <div className="text-xs text-gray-500">
                Created: {new Date(role.createdAt).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Role Dialog */}
      {editingRole && (
        <Dialog open={!!editingRole} onOpenChange={() => setEditingRole(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Role</DialogTitle>
              <DialogDescription>
                Update role information and permissions.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleUpdateRole} className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Role Name</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label>Permissions</Label>
                <div className="space-y-4 mt-2 max-h-60 overflow-y-auto border rounded-md p-4">
                  {Object.entries(groupedPermissions).map(([resource, resourcePermissions]) => (
                    <div key={resource} className="space-y-2">
                      <h4 className="font-medium capitalize text-sm text-gray-700">{resource}</h4>
                      <div className="grid grid-cols-1 gap-2 ml-4">
                        {resourcePermissions.map(permission => (
                          <div key={permission.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`edit-${permission.id}`}
                              checked={formData.permissions.includes(permission.id)}
                              onCheckedChange={() => togglePermission(permission.id)}
                            />
                            <Label htmlFor={`edit-${permission.id}`} className="text-sm">
                              {permission.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Button type="submit" className="w-full">Update Role</Button>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
