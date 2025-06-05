
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Mail, 
  Send, 
  Search, 
  Plus, 
  Reply, 
  Forward, 
  Archive,
  Star,
  Paperclip,
  MoreHorizontal 
} from 'lucide-react';
import { Email } from '@/types/crm';

const mockEmails: Email[] = [
  {
    id: '1',
    from: 'john@abccorp.com',
    to: ['sales@company.com'],
    subject: 'Re: Product Inquiry',
    body: 'Thank you for your quick response. We would like to schedule a demo...',
    isRead: false,
    sentAt: '2024-01-16T10:30:00Z',
    threadId: 'thread-1',
  },
  {
    id: '2',
    from: 'sarah@xyztechnology.com',
    to: ['sales@company.com'],
    cc: ['manager@company.com'],
    subject: 'Contract Terms Discussion',
    body: 'I have reviewed the contract terms and have a few questions...',
    isRead: true,
    sentAt: '2024-01-15T14:20:00Z',
    threadId: 'thread-2',
  },
];

export const EmailCenter: React.FC = () => {
  const [emails, setEmails] = useState<Email[]>(mockEmails);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [isComposing, setIsComposing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEmails = emails.filter(email =>
    email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    email.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
    email.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const unreadCount = emails.filter(email => !email.isRead).length;

  const markAsRead = (emailId: string) => {
    setEmails(emails.map(email => 
      email.id === emailId ? { ...email, isRead: true } : email
    ));
  };

  return (
    <div className="p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Email Center</h1>
          <p className="text-gray-600">Manage your email communications</p>
        </div>
        <Button onClick={() => setIsComposing(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Compose
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Email List */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="w-5 h-5" />
                  <span>Inbox</span>
                  {unreadCount > 0 && (
                    <Badge variant="destructive">{unreadCount}</Badge>
                  )}
                </CardTitle>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search emails..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1 max-h-[500px] overflow-y-auto">
                {filteredEmails.map((email) => (
                  <div
                    key={email.id}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                      selectedEmail?.id === email.id ? 'bg-blue-50 border-blue-200' : ''
                    } ${!email.isRead ? 'font-semibold' : ''}`}
                    onClick={() => {
                      setSelectedEmail(email);
                      markAsRead(email.id);
                    }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">{email.from}</span>
                      <span className="text-xs text-gray-400">
                        {new Date(email.sentAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-sm font-medium mb-1 truncate">
                      {email.subject}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {email.body}
                    </div>
                    {!email.isRead && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Email Content */}
        <div className="lg:col-span-2">
          {isComposing ? (
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Compose Email</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">To:</label>
                  <Input placeholder="recipient@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">CC:</label>
                  <Input placeholder="cc@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Subject:</label>
                  <Input placeholder="Email subject" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Message:</label>
                  <Textarea 
                    placeholder="Type your message here..."
                    className="min-h-[300px]"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Button variant="outline">
                    <Paperclip className="w-4 h-4 mr-2" />
                    Attach File
                  </Button>
                  <div className="space-x-2">
                    <Button variant="outline" onClick={() => setIsComposing(false)}>
                      Cancel
                    </Button>
                    <Button>
                      <Send className="w-4 h-4 mr-2" />
                      Send
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : selectedEmail ? (
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{selectedEmail.subject}</CardTitle>
                    <div className="text-sm text-gray-600 mt-1">
                      From: {selectedEmail.from} • To: {selectedEmail.to.join(', ')}
                      {selectedEmail.cc && selectedEmail.cc.length > 0 && (
                        <span> • CC: {selectedEmail.cc.join(', ')}</span>
                      )}
                    </div>
                    <div className="text-xs text-gray-400">
                      {new Date(selectedEmail.sentAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Star className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Archive className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="whitespace-pre-wrap text-sm leading-relaxed mb-6">
                  {selectedEmail.body}
                </div>
                <div className="flex items-center space-x-2 pt-4 border-t">
                  <Button variant="outline" size="sm">
                    <Reply className="w-4 h-4 mr-2" />
                    Reply
                  </Button>
                  <Button variant="outline" size="sm">
                    <Forward className="w-4 h-4 mr-2" />
                    Forward
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center">
              <CardContent>
                <div className="text-center text-gray-500">
                  <Mail className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Select an email to view its content</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
