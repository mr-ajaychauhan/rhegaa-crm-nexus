
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
  Phone, 
  PhoneCall, 
  PhoneIncoming, 
  PhoneOutgoing, 
  Play, 
  Search, 
  Plus,
  Clock,
  Mic
} from 'lucide-react';
import { Call } from '@/types/crm';

const mockCalls: Call[] = [
  {
    id: '1',
    contactId: '1',
    contactName: 'John Smith',
    phone: '+1 555-0123',
    direction: 'outbound',
    duration: 1247, // seconds
    status: 'completed',
    recorded: true,
    transcription: 'Customer discussed pricing for enterprise package...',
    summary: 'Interested in enterprise solution, requested proposal',
    createdAt: '2024-01-16T10:30:00Z',
  },
  {
    id: '2',
    contactId: '2',
    contactName: 'Sarah Johnson',
    phone: '+1 555-0124',
    direction: 'inbound',
    duration: 892,
    status: 'completed',
    recorded: true,
    summary: 'Support inquiry about implementation timeline',
    createdAt: '2024-01-16T14:20:00Z',
  },
  {
    id: '3',
    contactId: '3',
    contactName: 'Mike Wilson',
    phone: '+1 555-0125',
    direction: 'outbound',
    duration: 0,
    status: 'missed',
    recorded: false,
    createdAt: '2024-01-16T16:45:00Z',
  },
];

export const CallCenter: React.FC = () => {
  const [calls, setCalls] = useState<Call[]>(mockCalls);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dialerNumber, setDialerNumber] = useState('');

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (status: Call['status']) => {
    const colors = {
      completed: 'bg-green-100 text-green-800',
      missed: 'bg-red-100 text-red-800',
      voicemail: 'bg-yellow-100 text-yellow-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const filteredCalls = calls.filter(call => {
    const matchesSearch = call.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         call.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || call.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const totalCalls = calls.length;
  const completedCalls = calls.filter(c => c.status === 'completed').length;
  const totalDuration = calls.reduce((sum, call) => sum + call.duration, 0);
  const avgDuration = completedCalls > 0 ? Math.round(totalDuration / completedCalls) : 0;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Call Center</h1>
          <p className="text-gray-600">Manage calls and communications</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Add Call Log
          </Button>
        </div>
      </div>

      {/* Dialer */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Phone className="w-5 h-5" />
            <span>Quick Dialer</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Input
              placeholder="Enter phone number..."
              value={dialerNumber}
              onChange={(e) => setDialerNumber(e.target.value)}
              className="flex-1"
            />
            <Button>
              <PhoneCall className="w-4 h-4 mr-2" />
              Call
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
            <Phone className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCalls}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Calls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedCalls}</div>
            <p className="text-xs text-muted-foreground">
              {totalCalls > 0 ? Math.round((completedCalls / totalCalls) * 100) : 0}% success rate
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Duration</CardTitle>
            <Clock className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatDuration(totalDuration)}</div>
            <p className="text-xs text-muted-foreground">Hours:Minutes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatDuration(avgDuration)}</div>
            <p className="text-xs text-muted-foreground">Per call</p>
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
                  placeholder="Search calls..."
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
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="missed">Missed</SelectItem>
                <SelectItem value="voicemail">Voicemail</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Calls Table */}
      <Card>
        <CardHeader>
          <CardTitle>Call History ({filteredCalls.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contact</TableHead>
                <TableHead>Direction</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Recording</TableHead>
                <TableHead>Summary</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCalls.map((call) => (
                <TableRow key={call.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{call.contactName}</div>
                      <div className="text-sm text-gray-500">{call.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      {call.direction === 'inbound' ? (
                        <PhoneIncoming className="w-4 h-4 text-green-500" />
                      ) : (
                        <PhoneOutgoing className="w-4 h-4 text-blue-500" />
                      )}
                      <span className="capitalize">{call.direction}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(call.status)}>
                      {call.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {call.duration > 0 ? formatDuration(call.duration) : '-'}
                  </TableCell>
                  <TableCell>
                    {call.recorded ? (
                      <div className="flex items-center space-x-2">
                        <Mic className="w-4 h-4 text-green-500" />
                        <Button variant="ghost" size="sm">
                          <Play className="w-3 h-3" />
                        </Button>
                      </div>
                    ) : (
                      <span className="text-gray-400">No recording</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[200px] truncate text-sm">
                      {call.summary || call.transcription || '-'}
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(call.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <PhoneCall className="w-4 h-4" />
                    </Button>
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
