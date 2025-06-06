
import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Dashboard } from '../dashboard/Dashboard';
import { LeadsList } from '../leads/LeadsList';
import { ContactsList } from '../contacts/ContactsList';
import { AccountsList } from '../accounts/AccountsList';
import { OpportunitiesList } from '../opportunities/OpportunitiesList';
import { CalendarView } from '../calendar/CalendarView';
import { EmailCenter } from '../email/EmailCenter';
import { CallCenter } from '../calls/CallCenter';
import { ProductsList } from '../products/ProductsList';
import { TaskManagement } from '../tasks/TaskManagement';
import { CampaignManagement } from '../campaigns/CampaignManagement';
import { QuoteManagement } from '../quotes/QuoteManagement';
import { UserManagement } from '../users/UserManagement';
import { RoleManagement } from '../roles/RoleManagement';
import { cn } from '@/lib/utils';

export const Layout: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'leads':
        return <LeadsList />;
      case 'contacts':
        return <ContactsList />;
      case 'accounts':
        return <AccountsList />;
      case 'opportunities':
        return <OpportunitiesList />;
      case 'calendar':
        return <CalendarView />;
      case 'emails':
        return <EmailCenter />;
      case 'calls':
        return <CallCenter />;
      case 'products':
        return <ProductsList />;
      case 'tasks':
        return <TaskManagement />;
      case 'campaigns':
        return <CampaignManagement />;
      case 'quotes':
        return <QuoteManagement />;
      case 'users':
        return <UserManagement />;
      case 'roles':
        return <RoleManagement />;
      case 'reports':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold">Reports & Analytics</h1>
            <p className="text-gray-600 mt-2">Advanced reporting coming soon...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-gray-600 mt-2">System configuration coming soon...</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  const getPageTitle = () => {
    const titles: { [key: string]: string } = {
      dashboard: 'Dashboard',
      leads: 'Leads',
      contacts: 'Contacts',
      accounts: 'Accounts',
      opportunities: 'Opportunities',
      calendar: 'Calendar',
      emails: 'Email Center',
      calls: 'Call Center',
      products: 'Products & Services',
      tasks: 'Tasks',
      campaigns: 'Campaigns',
      quotes: 'Quotes',
      users: 'User Management',
      roles: 'Role Management',
      reports: 'Reports',
      settings: 'Settings',
    };
    return titles[activeTab] || 'Dashboard';
  };

  return (
    <div className="h-screen flex bg-gray-50">
      <div className={cn(
        "transition-all duration-300",
        sidebarCollapsed ? "w-16" : "w-64"
      )}>
        <Sidebar 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
          collapsed={sidebarCollapsed}
        />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          pageTitle={getPageTitle()}
        />
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};
