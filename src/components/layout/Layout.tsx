
import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Dashboard } from '../dashboard/Dashboard';
import { LeadsList } from '../leads/LeadsList';
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
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold">Contacts</h1>
            <p className="text-gray-600 mt-2">Contact management coming soon...</p>
          </div>
        );
      case 'accounts':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold">Accounts</h1>
            <p className="text-gray-600 mt-2">Account management coming soon...</p>
          </div>
        );
      case 'opportunities':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold">Opportunities</h1>
            <p className="text-gray-600 mt-2">Opportunity management coming soon...</p>
          </div>
        );
      case 'calendar':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold">Calendar</h1>
            <p className="text-gray-600 mt-2">Calendar integration coming soon...</p>
          </div>
        );
      case 'emails':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold">Email Center</h1>
            <p className="text-gray-600 mt-2">Email management coming soon...</p>
          </div>
        );
      case 'calls':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold">Call Center</h1>
            <p className="text-gray-600 mt-2">Call management coming soon...</p>
          </div>
        );
      case 'products':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold">Products & Services</h1>
            <p className="text-gray-600 mt-2">Product catalog coming soon...</p>
          </div>
        );
      case 'reports':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold">Reports & Analytics</h1>
            <p className="text-gray-600 mt-2">Advanced reporting coming soon...</p>
          </div>
        );
      case 'quotes':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold">Quote Management</h1>
            <p className="text-gray-600 mt-2">Quote generation coming soon...</p>
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
      emails: 'Emails',
      calls: 'Calls',
      products: 'Products',
      reports: 'Reports',
      quotes: 'Quotes',
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
