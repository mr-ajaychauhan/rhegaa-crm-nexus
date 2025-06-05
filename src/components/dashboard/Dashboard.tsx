
import React, { useState } from 'react';
import { DashboardWidget } from './DashboardWidget';
import { Button } from '@/components/ui/button';
import { Plus, Layout } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface DashboardProps {}

export const Dashboard: React.FC<DashboardProps> = () => {
  const { user } = useAuth();
  const [widgets, setWidgets] = useState([
    { id: '1', type: 'calendar', title: 'My Calendar' },
    { id: '2', type: 'leads', title: 'My Leads' },
    { id: '3', type: 'opportunities', title: 'My Opportunities' },
    { id: '4', type: 'tasks', title: 'My Tasks' },
    { id: '5', type: 'calls', title: 'My Calls' },
    { id: '6', type: 'reports', title: 'Sales Performance' },
  ]);

  const handleRemoveWidget = (widgetId: string) => {
    setWidgets(widgets.filter(w => w.id !== widgetId));
  };

  const availableWidgets = [
    { type: 'calendar', title: 'Calendar', description: 'View your schedule and upcoming events' },
    { type: 'activities', title: 'Activities', description: 'Track your daily activities' },
    { type: 'calls', title: 'Calls', description: 'Monitor call logs and statistics' },
    { type: 'inbox', title: 'Inbox', description: 'Manage your emails and messages' },
    { type: 'leads', title: 'Leads', description: 'Track leads and conversion rates' },
    { type: 'opportunities', title: 'Opportunities', description: 'Monitor sales opportunities' },
    { type: 'tasks', title: 'Tasks', description: 'Manage your task list' },
    { type: 'reports', title: 'Reports', description: 'View sales and performance reports' },
  ];

  const handleAddWidget = (type: string, title: string) => {
    const newWidget = {
      id: Date.now().toString(),
      type,
      title,
    };
    setWidgets([...widgets, newWidget]);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your sales today.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Widget
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Add Dashboard Widget</DialogTitle>
                <DialogDescription>
                  Choose from available widgets to customize your dashboard
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {availableWidgets.map((widget) => (
                  <Card 
                    key={widget.type} 
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleAddWidget(widget.type, widget.title)}
                  >
                    <CardHeader>
                      <CardTitle className="text-sm">{widget.title}</CardTitle>
                      <CardDescription className="text-xs">
                        {widget.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button size="sm" className="w-full">
                        <Plus className="w-3 h-3 mr-1" />
                        Add
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <Layout className="w-4 h-4 mr-2" />
            Save Layout
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Opportunities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">$245,000 pipeline value</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Closed Deals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$89,400</div>
            <p className="text-xs text-muted-foreground">+28% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Widgets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {widgets.map((widget) => (
          <DashboardWidget
            key={widget.id}
            id={widget.id}
            type={widget.type}
            title={widget.title}
            onRemove={handleRemoveWidget}
          />
        ))}
      </div>
    </div>
  );
};
