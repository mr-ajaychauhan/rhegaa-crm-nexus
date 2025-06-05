
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bell, Search, Menu, Settings, HelpCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  onToggleSidebar: () => void;
  pageTitle: string;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar, pageTitle }) => {
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleSidebar}
          className="lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-semibold text-gray-900 capitalize">{pageTitle}</h1>
      </div>

      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="hidden md:block relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search CRM..."
            className="pl-10 w-64"
          />
        </div>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="p-4 border-b">
              <h3 className="font-semibold">Notifications</h3>
            </div>
            <DropdownMenuItem className="flex-col items-start p-4">
              <div className="font-medium">New lead assigned</div>
              <div className="text-sm text-gray-500">John Smith from ABC Corp</div>
              <div className="text-xs text-gray-400 mt-1">2 minutes ago</div>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex-col items-start p-4">
              <div className="font-medium">Meeting reminder</div>
              <div className="text-sm text-gray-500">Client presentation at 3 PM</div>
              <div className="text-xs text-gray-400 mt-1">15 minutes ago</div>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex-col items-start p-4">
              <div className="font-medium">Quote approved</div>
              <div className="text-sm text-gray-500">Quote #QT-001 has been approved</div>
              <div className="text-xs text-gray-400 mt-1">1 hour ago</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Help */}
        <Button variant="ghost" size="sm">
          <HelpCircle className="w-5 h-5" />
        </Button>

        {/* Settings */}
        <Button variant="ghost" size="sm">
          <Settings className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
};
