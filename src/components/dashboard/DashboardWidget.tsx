
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Calendar, Phone, Mail, Users, Target, CheckSquare, BarChart3 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface WidgetProps {
  id: string;
  type: string;
  title: string;
  onRemove: (id: string) => void;
}

export const DashboardWidget: React.FC<WidgetProps> = ({ id, type, title, onRemove }) => {
  const getWidgetIcon = () => {
    switch (type) {
      case 'calendar': return <Calendar className="w-5 h-5" />;
      case 'calls': return <Phone className="w-5 h-5" />;
      case 'inbox': return <Mail className="w-5 h-5" />;
      case 'leads': return <Users className="w-5 h-5" />;
      case 'opportunities': return <Target className="w-5 h-5" />;
      case 'tasks': return <CheckSquare className="w-5 h-5" />;
      case 'reports': return <BarChart3 className="w-5 h-5" />;
      default: return <BarChart3 className="w-5 h-5" />;
    }
  };

  const getWidgetContent = () => {
    switch (type) {
      case 'calendar':
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Today's Events</span>
              <Badge variant="secondary">3</Badge>
            </div>
            <div className="space-y-2">
              <div className="text-sm">
                <div className="font-medium">Client Meeting</div>
                <div className="text-gray-500">10:00 AM - ABC Corp</div>
              </div>
              <div className="text-sm">
                <div className="font-medium">Sales Call</div>
                <div className="text-gray-500">2:00 PM - XYZ Ltd</div>
              </div>
            </div>
          </div>
        );
      
      case 'leads':
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">24</div>
                <div className="text-sm text-gray-500">New Leads</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">12</div>
                <div className="text-sm text-gray-500">Qualified</div>
              </div>
            </div>
            <div className="text-xs text-gray-500">
              +15% from last week
            </div>
          </div>
        );
      
      case 'opportunities':
        return (
          <div className="space-y-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">$125,000</div>
              <div className="text-sm text-gray-500">Pipeline Value</div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>Qualified: 8</div>
              <div>Proposal: 5</div>
              <div>Negotiation: 3</div>
              <div>Closed Won: 2</div>
            </div>
          </div>
        );
      
      case 'tasks':
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">My Tasks</span>
              <Badge variant="destructive">5</Badge>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span>Follow up with John Doe</span>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span>Prepare proposal for ABC Corp</span>
              </div>
            </div>
          </div>
        );
      
      case 'calls':
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">18</div>
                <div className="text-sm text-gray-500">Today</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">156</div>
                <div className="text-sm text-gray-500">This Week</div>
              </div>
            </div>
            <div className="text-xs text-gray-500">
              Average call duration: 8m 32s
            </div>
          </div>
        );
      
      case 'reports':
        return (
          <div className="space-y-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">85%</div>
              <div className="text-sm text-gray-500">Target Achievement</div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
        );
      
      default:
        return <div className="text-gray-500">Widget content</div>;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center space-x-2">
          {getWidgetIcon()}
          <span>{title}</span>
        </CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Refresh</DropdownMenuItem>
            <DropdownMenuItem>Configure</DropdownMenuItem>
            <DropdownMenuItem 
              className="text-red-600"
              onClick={() => onRemove(id)}
            >
              Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        {getWidgetContent()}
      </CardContent>
    </Card>
  );
};
