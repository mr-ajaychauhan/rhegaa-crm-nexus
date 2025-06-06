
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { User } from '@/types/auth';
import { Users, Building2, Shield, Calendar, ChevronRight, ArrowLeft } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export const CustomerManagement: React.FC = () => {
  const { getAllCustomers, getUsersByTenant, hasPermission } = useAuth();
  const [selectedCustomer, setSelectedCustomer] = useState<User | null>(null);
  const [showCustomerUsers, setShowCustomerUsers] = useState(false);

  const customers = getAllCustomers();
  const canViewCustomers = hasPermission('customers', 'read');

  const handleViewCustomerUsers = (customer: User) => {
    setSelectedCustomer(customer);
    setShowCustomerUsers(true);
  };

  const getCustomerUsers = (tenantId: string) => {
    return getUsersByTenant(tenantId);
  };

  if (!canViewCustomers) {
    return (
      <div className="p-6">
        <div className="text-center">
          <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-600">Access Denied</h2>
          <p className="text-gray-500">You don't have permission to view customer management.</p>
        </div>
      </div>
    );
  }

  if (showCustomerUsers && selectedCustomer) {
    const customerUsers = getCustomerUsers(selectedCustomer.tenantId);
    
    return (
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => setShowCustomerUsers(false)}
            className="p-2"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {selectedCustomer.name} - Internal Users
            </h1>
            <p className="text-gray-600">
              Tenant ID: {selectedCustomer.tenantId} • {customerUsers.length} users
            </p>
          </div>
        </div>

        {/* Customer Info Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-blue-600" />
              <span>Customer Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Admin Name</label>
                <p className="text-sm">{selectedCustomer.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Email</label>
                <p className="text-sm">{selectedCustomer.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Department</label>
                <p className="text-sm">{selectedCustomer.department || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Status</label>
                <Badge variant={selectedCustomer.isActive ? "default" : "destructive"}>
                  {selectedCustomer.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Created</label>
                <p className="text-sm">{new Date(selectedCustomer.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Total Users</label>
                <p className="text-sm font-semibold">{customerUsers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {customerUsers.map(user => (
            <Card key={user.id}>
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold">{user.name}</h3>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Role:</span>
                    <Badge variant="secondary">{user.role.name}</Badge>
                  </div>
                  {user.department && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Department:</span>
                      <span className="text-sm">{user.department}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Status:</span>
                    <Badge variant={user.isActive ? "default" : "destructive"}>
                      {user.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-500">
                    Created: {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {customerUsers.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600">No Users Found</h3>
              <p className="text-gray-500">This customer hasn't created any internal users yet.</p>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customer Management</h1>
          <p className="text-gray-600">Manage all customer accounts and their internal users</p>
        </div>
        <Badge variant="outline" className="flex items-center space-x-1">
          <Building2 className="w-4 h-4" />
          <span>{customers.length} Customers</span>
        </Badge>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.map(customer => {
          const customerUsers = getCustomerUsers(customer.tenantId);
          
          return (
            <Card key={customer.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{customer.name}</h3>
                      <p className="text-sm text-gray-600">{customer.email}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleViewCustomerUsers(customer)}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Tenant ID</label>
                    <p className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                      {customer.tenantId.slice(0, 12)}...
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Users</label>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-semibold">{customerUsers.length}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Status:</span>
                    <Badge variant={customer.isActive ? "default" : "destructive"}>
                      {customer.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Department:</span>
                    <span className="text-sm">{customer.department || 'N/A'}</span>
                  </div>
                </div>

                <div className="text-xs text-gray-500 flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>Created: {new Date(customer.createdAt).toLocaleDateString()}</span>
                </div>

                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => handleViewCustomerUsers(customer)}
                >
                  View Internal Users
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {customers.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-600">No Customers Found</h3>
            <p className="text-gray-500">No customer accounts have been created yet.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
