
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  source: 'website' | 'social' | 'referral' | 'manual' | 'third-party';
  stage: 'new' | 'contacted' | 'enquiry' | 'unqualified' | 'qualified' | 'negotiation' | 'won' | 'loss';
  score: number;
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
  value?: number;
  notes?: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  title: string;
  accountId: string;
  accountName: string;
  department?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Account {
  id: string;
  name: string;
  industry: string;
  website?: string;
  phone?: string;
  email?: string;
  address?: string;
  contactCount: number;
  leadCount: number;
  opportunityCount: number;
  totalValue: number;
  createdAt: string;
  updatedAt: string;
}

export interface Opportunity {
  id: string;
  name: string;
  accountId: string;
  accountName: string;
  stage: 'prospecting' | 'qualification' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  value: number;
  probability: number;
  closeDate: string;
  assignedTo: string;
  leadSource: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardWidget {
  id: string;
  type: 'calendar' | 'activities' | 'calls' | 'cases' | 'inbox' | 'leads' | 'meetings' | 'opportunities' | 'tasks' | 'reports';
  title: string;
  position: { x: number; y: number; w: number; h: number };
  data?: any;
  userRole: 'user' | 'manager' | 'admin';
}
