
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Plus, 
  Search, 
  Download, 
  Eye, 
  Edit, 
  Trash2,
  FileText,
  Send,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign
} from 'lucide-react';
import { Quote } from '@/types/crm';

const mockQuotes: Quote[] = [
  {
    id: '1',
    accountId: '1',
    accountName: 'ABC Corporation',
    contactId: '1',
    contactName: 'John Smith',
    items: [
      {
        id: '1',
        productId: '1',
        productName: 'Enterprise CRM Software',
        quantity: 1,
        unitPrice: 299,
        total: 299,
      },
      {
        id: '2',
        productId: '2',
        productName: 'Professional Services',
        quantity: 40,
        unitPrice: 150,
        total: 6000,
      },
    ],
    subtotal: 6299,
    tax: 629.90,
    total: 6928.90,
    status: 'sent',
    validUntil: '2024-02-15',
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2024-01-15T09:00:00Z',
  },
  {
    id: '2',
    accountId: '2',
    accountName: 'XYZ Technology',
    contactId: '2',
    contactName: 'Sarah Johnson',
    items: [
      {
        id: '3',
        productId: '1',
        productName: 'Enterprise CRM Software',
        quantity: 2,
        unitPrice: 299,
        total: 598,
      },
    ],
    subtotal: 598,
    tax: 59.80,
    total: 657.80,
    status: 'approved',
    validUntil: '2024-02-20',
    createdAt: '2024-01-12T10:00:00Z',
    updatedAt: '2024-01-16T14:00:00Z',
  },
  {
    id: '3',
    accountId: '1',
    accountName: 'ABC Corporation',
    contactId: '1',
    contactName: 'John Smith',
    items: [
      {
        id: '4',
        productId: '3',
        productName: 'Cloud Migration Services',
        quantity: 1,
        unitPrice: 15000,
        total: 15000,
      },
    ],
    subtotal: 15000,
    tax: 1500,
    total: 16500,
    status: 'draft',
    validUntil: '2024-03-01',
    createdAt: '2024-01-18T11:00:00Z',
    updatedAt: '2024-01-18T11:00:00Z',
  },
];

export const QuoteManagement: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>(mockQuotes);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const getStatusColor = (status: Quote['status']) => {
    const colors = {
      draft: 'bg-gray-100 text-gray-800',
      sent: 'bg-blue-100 text-blue-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      expired: 'bg-orange-100 text-orange-800',
    };
    return colors[status];
  };

  const getStatusIcon = (status: Quote['status']) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'rejected': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'expired': return <Clock className="w-4 h-4 text-orange-500" />;
      case 'sent': return <Send className="w-4 h-4 text-blue-500" />;
      default: return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const filteredQuotes = quotes.filter(quote => {
    const matchesSearch = quote.accountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || quote.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const totalQuotes = quotes.length;
  const draftQuotes = quotes.filter(q => q.status === 'draft').length;
  const sentQuotes = quotes.filter(q => q.status === 'sent').length;
  const approvedQuotes = quotes.filter(q => q.status === 'approved').length;
  const totalValue = quotes.reduce((sum, quote) => sum + quote.total, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quote Management</h1>
          <p className="text-gray-600">Create and manage customer quotes</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Quote
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Quote</DialogTitle>
                <DialogDescription>
                  Generate a new quote for a customer
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Account</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select account" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">ABC Corporation</SelectItem>
                        <SelectItem value="2">XYZ Technology</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Contact</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select contact" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">John Smith</SelectItem>
                        <SelectItem value="2">Sarah Johnson</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Valid Until</label>
                  <Input type="date" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Quote Items</label>
                  <div className="border rounded-lg p-4 space-y-3">
                    <div className="grid grid-cols-4 gap-2 text-sm font-medium text-gray-700">
                      <div>Product/Service</div>
                      <div>Quantity</div>
                      <div>Unit Price</div>
                      <div>Total</div>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select product" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Enterprise CRM Software</SelectItem>
                          <SelectItem value="2">Professional Services</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input type="number" placeholder="1" />
                      <Input type="number" placeholder="0.00" />
                      <Input disabled placeholder="0.00" />
                    </div>
                    <Button variant="outline" size="sm">
                      <Plus className="w-4 h-4 mr-1" />
                      Add Item
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                  <div>
                    <label className="block text-sm font-medium mb-1">Subtotal</label>
                    <Input disabled placeholder="$0.00" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Tax</label>
                    <Input placeholder="$0.00" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Total</label>
                    <Input disabled placeholder="$0.00" />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsCreateDialogOpen(false)}>
                    Create Quote
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Quotes</CardTitle>
            <FileText className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalQuotes}</div>
            <p className="text-xs text-muted-foreground">All quotes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Draft</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">{draftQuotes}</div>
            <p className="text-xs text-muted-foreground">In progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{sentQuotes}</div>
            <p className="text-xs text-muted-foreground">Awaiting response</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{approvedQuotes}</div>
            <p className="text-xs text-muted-foreground">Ready to convert</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">All quotes combined</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search quotes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Quotes Table */}
      <Card>
        <CardHeader>
          <CardTitle>Quotes ({filteredQuotes.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Quote ID</TableHead>
                <TableHead>Account</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Valid Until</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredQuotes.map((quote) => (
                <TableRow key={quote.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(quote.status)}
                      <span className="font-medium">#{quote.id}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{quote.accountName}</Badge>
                  </TableCell>
                  <TableCell>{quote.contactName}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(quote.status)}>
                      {quote.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">${quote.total.toLocaleString()}</span>
                  </TableCell>
                  <TableCell>
                    {new Date(quote.validUntil).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(quote.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Send className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
