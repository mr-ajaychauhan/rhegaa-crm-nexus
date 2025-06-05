
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { 
  Plus, 
  Search, 
  Download, 
  Eye, 
  Edit, 
  Trash2,
  UserPlus,
  Upload,
  Globe,
  Share2,
  Mail,
  Star,
  TrendingUp,
  Users,
  Target,
  DollarSign
} from 'lucide-react';
import { Lead } from '@/types/crm';

const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@abccorp.com',
    phone: '+1 555-0123',
    company: 'ABC Corporation',
    source: 'website',
    stage: 'qualified',
    score: 85,
    assignedTo: 'Sales Rep 1',
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2024-01-16T10:00:00Z',
    value: 50000,
    notes: 'Interested in enterprise solution, has budget approval',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@xyztechnology.com',
    phone: '+1 555-0124',
    company: 'XYZ Technology',
    source: 'referral',
    stage: 'negotiation',
    score: 92,
    assignedTo: 'Sales Rep 2',
    createdAt: '2024-01-12T14:00:00Z',
    updatedAt: '2024-01-16T11:00:00Z',
    value: 75000,
    notes: 'Referred by existing customer, high probability',
  },
  {
    id: '3',
    name: 'Mike Wilson',
    email: 'mike@startup.co',
    phone: '+1 555-0125',
    company: 'StartupCo',
    source: 'social',
    stage: 'contacted',
    score: 65,
    assignedTo: 'Sales Rep 1',
    createdAt: '2024-01-10T11:00:00Z',
    updatedAt: '2024-01-15T15:00:00Z',
    value: 25000,
    notes: 'LinkedIn connection, small company but growing',
  },
];

export const LeadsList: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);

  const getStageColor = (stage: Lead['stage']) => {
    const colors = {
      new: 'bg-blue-100 text-blue-800',
      contacted: 'bg-yellow-100 text-yellow-800',
      enquiry: 'bg-purple-100 text-purple-800',
      unqualified: 'bg-gray-100 text-gray-800',
      qualified: 'bg-green-100 text-green-800',
      negotiation: 'bg-orange-100 text-orange-800',
      won: 'bg-emerald-100 text-emerald-800',
      loss: 'bg-red-100 text-red-800',
    };
    return colors[stage];
  };

  const getSourceIcon = (source: Lead['source']) => {
    switch (source) {
      case 'website': return <Globe className="w-4 h-4" />;
      case 'social': return <Share2 className="w-4 h-4" />;
      case 'referral': return <Users className="w-4 h-4" />;
      case 'manual': return <UserPlus className="w-4 h-4" />;
      case 'third-party': return <Target className="w-4 h-4" />;
      default: return <UserPlus className="w-4 h-4" />;
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = stageFilter === 'all' || lead.stage === stageFilter;
    const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter;
    
    return matchesSearch && matchesStage && matchesSource;
  });

  const totalLeads = leads.length;
  const qualifiedLeads = leads.filter(l => l.stage === 'qualified').length;
  const avgScore = Math.round(leads.reduce((sum, lead) => sum + lead.score, 0) / leads.length);
  const totalValue = leads.reduce((sum, lead) => sum + (lead.value || 0), 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lead Management</h1>
          <p className="text-gray-600">Capture, qualify, and convert leads</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Dialog open={isBulkUploadOpen} onOpenChange={setIsBulkUploadOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Bulk Upload
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Bulk Upload Leads</DialogTitle>
                <DialogDescription>
                  Upload multiple leads from a CSV file
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">CSV File</label>
                  <Input type="file" accept=".csv" />
                  <p className="text-xs text-gray-500 mt-1">
                    File should include: Name, Email, Phone, Company, Source
                  </p>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsBulkUploadOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsBulkUploadOpen(false)}>
                    Upload Leads
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Lead
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Lead</DialogTitle>
                <DialogDescription>
                  Create a new lead manually or setup capture methods
                </DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="manual" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="manual">Manual Entry</TabsTrigger>
                  <TabsTrigger value="website">Website Form</TabsTrigger>
                  <TabsTrigger value="social">Social Media</TabsTrigger>
                  <TabsTrigger value="integration">Integrations</TabsTrigger>
                </TabsList>
                
                <TabsContent value="manual" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Name</label>
                      <Input placeholder="Lead name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <Input type="email" placeholder="email@example.com" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Phone</label>
                      <Input placeholder="+1 555-0123" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Company</label>
                      <Input placeholder="Company name" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Source</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select source" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="manual">Manual Entry</SelectItem>
                          <SelectItem value="website">Website</SelectItem>
                          <SelectItem value="social">Social Media</SelectItem>
                          <SelectItem value="referral">Referral</SelectItem>
                          <SelectItem value="third-party">Third Party</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Estimated Value</label>
                      <Input type="number" placeholder="0" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Notes</label>
                    <Textarea placeholder="Additional information about the lead..." />
                  </div>
                </TabsContent>
                
                <TabsContent value="website" className="space-y-4">
                  <div className="text-center py-8">
                    <Globe className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-medium mb-2">Website Form Integration</h3>
                    <p className="text-gray-600 mb-4">Embed lead capture forms on your website</p>
                    <Button>Generate Embed Code</Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="social" className="space-y-4">
                  <div className="text-center py-8">
                    <Share2 className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-medium mb-2">Social Media Integration</h3>
                    <p className="text-gray-600 mb-4">Connect with Facebook, LinkedIn, and Twitter</p>
                    <div className="space-y-2">
                      <Button className="w-full">Connect Facebook</Button>
                      <Button className="w-full" variant="outline">Connect LinkedIn</Button>
                      <Button className="w-full" variant="outline">Connect Twitter</Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="integration" className="space-y-4">
                  <div className="text-center py-8">
                    <Target className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-medium mb-2">Third-Party Integrations</h3>
                    <p className="text-gray-600 mb-4">Connect with lead generation platforms</p>
                    <div className="space-y-2">
                      <Button className="w-full">Setup IndiaMART</Button>
                      <Button className="w-full" variant="outline">Setup Trade India</Button>
                      <Button className="w-full" variant="outline">Setup Justdial</Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsCreateDialogOpen(false)}>
                  Save Lead
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <UserPlus className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLeads}</div>
            <p className="text-xs text-muted-foreground">All leads</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Qualified</CardTitle>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{qualifiedLeads}</div>
            <p className="text-xs text-muted-foreground">Ready for sales</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Score</CardTitle>
            <Star className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{avgScore}</div>
            <p className="text-xs text-muted-foreground">Lead quality score</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pipeline Value</CardTitle>
            <DollarSign className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Potential revenue</p>
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
                  placeholder="Search leads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={stageFilter} onValueChange={setStageFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="enquiry">Enquiry</SelectItem>
                <SelectItem value="unqualified">Unqualified</SelectItem>
                <SelectItem value="qualified">Qualified</SelectItem>
                <SelectItem value="negotiation">Negotiation</SelectItem>
                <SelectItem value="won">Won</SelectItem>
                <SelectItem value="loss">Loss</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="website">Website</SelectItem>
                <SelectItem value="social">Social Media</SelectItem>
                <SelectItem value="referral">Referral</SelectItem>
                <SelectItem value="manual">Manual</SelectItem>
                <SelectItem value="third-party">Third Party</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle>Leads ({filteredLeads.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lead</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{lead.name}</div>
                      <div className="text-sm text-gray-500">{lead.email}</div>
                      <div className="text-sm text-gray-500">{lead.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{lead.company}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      {getSourceIcon(lead.source)}
                      <span className="capitalize">{lead.source}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStageColor(lead.stage)}>
                      {lead.stage}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="w-12 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-yellow-500 h-2 rounded-full" 
                          style={{ width: `${lead.score}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{lead.score}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {lead.value ? `$${lead.value.toLocaleString()}` : '-'}
                  </TableCell>
                  <TableCell>{lead.assignedTo}</TableCell>
                  <TableCell>
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
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
