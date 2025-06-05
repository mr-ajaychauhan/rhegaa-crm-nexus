
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Clock,
  Users,
  MapPin
} from 'lucide-react';
import { Meeting } from '@/types/crm';

const mockMeetings: Meeting[] = [
  {
    id: '1',
    title: 'Client Presentation - ABC Corp',
    description: 'Product demo and proposal presentation',
    startTime: '2024-01-16T10:00:00Z',
    endTime: '2024-01-16T11:00:00Z',
    location: 'Conference Room A',
    attendees: ['john@abccorp.com', 'sales@company.com'],
    organizer: 'sales@company.com',
    meetingMinutes: 'Discussed enterprise features and pricing...',
    createdAt: '2024-01-15T09:00:00Z',
  },
  {
    id: '2',
    title: 'Team Stand-up',
    startTime: '2024-01-16T09:00:00Z',
    endTime: '2024-01-16T09:30:00Z',
    location: 'Virtual',
    attendees: ['team@company.com'],
    organizer: 'manager@company.com',
    createdAt: '2024-01-15T08:00:00Z',
  },
];

export const CalendarView: React.FC = () => {
  const [meetings, setMeetings] = useState<Meeting[]>(mockMeetings);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState<'day' | 'week' | 'month'>('week');

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric' 
    });
  };

  const todaysMeetings = meetings.filter(meeting => {
    const meetingDate = new Date(meeting.startTime).toDateString();
    const today = new Date().toDateString();
    return meetingDate === today;
  });

  const upcomingMeetings = meetings.filter(meeting => {
    const meetingDate = new Date(meeting.startTime);
    const now = new Date();
    return meetingDate > now;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
          <p className="text-gray-600">Manage meetings and schedule</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1">
            <Button variant="outline" size="sm">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              Today
            </Button>
            <Button variant="outline" size="sm">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center space-x-1">
            <Button 
              variant={view === 'day' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setView('day')}
            >
              Day
            </Button>
            <Button 
              variant={view === 'week' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setView('week')}
            >
              Week
            </Button>
            <Button 
              variant={view === 'month' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setView('month')}
            >
              Month
            </Button>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Meeting
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Meetings</CardTitle>
            <Calendar className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todaysMeetings.length}</div>
            <p className="text-xs text-muted-foreground">Scheduled for today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingMeetings.length}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
            <Clock className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendees</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Total participants</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Grid */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center font-medium text-gray-500 py-2">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 35 }, (_, i) => {
                  const day = i - 2; // Adjust for month start
                  const isCurrentMonth = day > 0 && day <= 31;
                  const isToday = day === new Date().getDate();
                  const hasMeeting = isCurrentMonth && day <= 16; // Mock data
                  
                  return (
                    <div
                      key={i}
                      className={`
                        h-10 flex items-center justify-center text-sm cursor-pointer rounded
                        ${isCurrentMonth ? 'hover:bg-gray-100' : 'text-gray-300'}
                        ${isToday ? 'bg-blue-500 text-white' : ''}
                        ${hasMeeting && !isToday ? 'bg-blue-50 text-blue-700 font-medium' : ''}
                      `}
                    >
                      {isCurrentMonth ? day : ''}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Meetings */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Meetings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingMeetings.slice(0, 5).map((meeting) => (
                <div key={meeting.id} className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="font-medium text-sm">{meeting.title}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>
                        {formatDate(meeting.startTime)} • {formatTime(meeting.startTime)}
                      </span>
                    </div>
                    {meeting.location && (
                      <div className="flex items-center space-x-1 mt-1">
                        <MapPin className="w-3 h-3" />
                        <span>{meeting.location}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-1 mt-1">
                      <Users className="w-3 h-3" />
                      <span>{meeting.attendees.length} attendees</span>
                    </div>
                  </div>
                  {meeting.description && (
                    <div className="text-xs text-gray-600 mt-2 truncate">
                      {meeting.description}
                    </div>
                  )}
                </div>
              ))}
              {upcomingMeetings.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  <Calendar className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p>No upcoming meetings</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
