
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

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  inventory: number;
  sku: string;
  createdAt: string;
  updatedAt: string;
  documents?: Document[];
}

export interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  sla: string;
  createdAt: string;
  updatedAt: string;
  documents?: Document[];
}

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  size: number;
  uploadedAt: string;
}

export interface Email {
  id: string;
  from: string;
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  body: string;
  isRead: boolean;
  sentAt: string;
  threadId?: string;
}

export interface Call {
  id: string;
  contactId: string;
  contactName: string;
  phone: string;
  direction: 'inbound' | 'outbound';
  duration: number;
  status: 'completed' | 'missed' | 'voicemail';
  recorded: boolean;
  transcription?: string;
  summary?: string;
  createdAt: string;
}

export interface Meeting {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  location?: string;
  attendees: string[];
  organizer: string;
  meetingMinutes?: string;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  assignedTo: string;
  dueDate: string;
  projectId?: string;
  dependencies?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Campaign {
  id: string;
  name: string;
  type: 'email' | 'social' | 'multi-channel';
  status: 'draft' | 'active' | 'paused' | 'completed';
  startDate: string;
  endDate?: string;
  targetAudience: string;
  budget?: number;
  metrics: {
    sent: number;
    opened: number;
    clicked: number;
    converted: number;
  };
  createdAt: string;
}

export interface Quote {
  id: string;
  accountId: string;
  accountName: string;
  contactId: string;
  contactName: string;
  items: QuoteItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'draft' | 'sent' | 'approved' | 'rejected' | 'expired';
  validUntil: string;
  createdAt: string;
  updatedAt: string;
}

export interface QuoteItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface DashboardWidget {
  id: string;
  type: 'calendar' | 'activities' | 'calls' | 'cases' | 'inbox' | 'leads' | 'meetings' | 'opportunities' | 'tasks' | 'reports';
  title: string;
  position: { x: number; y: number; w: number; h: number };
  data?: any;
  userRole: 'user' | 'manager' | 'admin';
}
