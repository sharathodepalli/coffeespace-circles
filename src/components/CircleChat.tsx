import React, { useState, useRef, useEffect } from 'react';
import { Send, Smile, Image as ImageIcon, PlusCircle, MessageSquare, Users, Calendar, Settings, X, ChevronDown, Camera, Video, FileText, Link as LinkIcon, Phone, ArrowLeft } from 'lucide-react';
import type { Circle, CircleMessage } from '../types';
import { useParams, Link, useNavigate } from 'react-router-dom';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { format } from 'date-fns';

const mockCircle: Circle = {
  id: '1',
  name: 'Indie Hackers Club',
  description: 'A supportive community for indie hackers building in public.',
  tags: ['Building in Public', 'SaaS', 'Indie Hacking'],
  privacy: 'public',
  activityLevel: 'Very Active',
  meetingFrequency: 'Daily',
  lastActive: '5 mins ago',
  todayPrompt: "What's your biggest win this week?",
  members: [
    {
      id: '1',
      name: 'Sarah',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      status: 'completed',
      role: 'Admin'
    },
    {
      id: '2',
      name: 'Alex',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
      status: 'pending'
    }
  ],
  messages: [
    {
      id: '1',
      memberId: '1',
      content: 'Just launched our beta version! 🚀 Would love some early feedback from the group.',
      timestamp: '2024-03-15T10:00:00Z'
    },
    {
      id: '2',
      memberId: '2',
      content: "That's awesome Sarah! I'd love to check it out. Can you share the link?",
      timestamp: '2024-03-15T10:05:00Z'
    }
  ]
};

interface Meeting {
  date: Date;
  duration: string;
  type: 'video' | 'voice';
}

export function CircleChat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<CircleMessage[]>(mockCircle.messages || []);
  const [message, setMessage] = useState('');
  const [showMembers, setShowMembers] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [meetingType, setMeetingType] = useState<'video' | 'voice'>('video');
  const [meetingDuration, setMeetingDuration] = useState('30 minutes');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { id } = useParams();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const emojiButtonRef = useRef<HTMLButtonElement>(null);
  const attachButtonRef = useRef<HTMLButtonElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    const newMessage: CircleMessage = {
      id: Date.now().toString(),
      memberId: '1', // Current user's ID
      content: message,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setMessage('');
  };

  const handleEmojiSelect = (emoji: any) => {
    setMessage(prev => prev + emoji.native);
    setShowEmojiPicker(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, this would upload to a storage service
      console.log('Uploading file:', file);
    }
  };

  const handleScheduleMeeting = () => {
    if (!selectedDate) return;

    const meeting: Meeting = {
      date: selectedDate,
      duration: meetingDuration,
      type: meetingType
    };

    // Create a system message about the scheduled meeting
    const systemMessage: CircleMessage = {
      id: Date.now().toString(),
      memberId: 'system',
      content: `📅 New ${meetingType === 'video' ? '📹' : '📞'} meeting scheduled for ${format(meeting.date, 'MMM d, h:mm a')} (${meetingDuration})`,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, systemMessage]);
    setShowCalendar(false);
    setSelectedDate(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showEmojiPicker && emojiButtonRef.current && !emojiButtonRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false);
      }
      if (showAttachMenu && attachButtonRef.current && !attachButtonRef.current.contains(event.target as Node)) {
        setShowAttachMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showEmojiPicker, showAttachMenu]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="min-h-screen bg-[#FFFBF7] flex flex-col md:flex-row">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Navigation */}
        <nav className="bg-white border-b border-[#E5E7EB] h-16 flex items-center px-4 md:px-6 sticky top-0 z-30">
          <div className="flex-1 flex items-center">
            <button
              onClick={() => navigate(-1)}
              className="mr-4 p-2 text-gray-600 hover:text-[#4F46E5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5] transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg md:text-xl font-semibold text-gray-900 truncate">{mockCircle.name}</h1>
            <div className="ml-4 flex -space-x-2">
              {mockCircle.members.slice(0, 3).map(member => (
                <img
                  key={member.id}
                  src={member.avatar}
                  alt={member.name}
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <button 
              onClick={() => setShowMembers(!showMembers)}
              className="p-2 text-gray-600 hover:text-[#4F46E5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
              aria-label="Show Members"
            >
              <Users className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setShowCalendar(!showCalendar)}
              className="p-2 text-gray-600 hover:text-[#4F46E5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
              aria-label="Show Calendar"
            >
              <Calendar className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 text-gray-600 hover:text-[#4F46E5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
              aria-label="Show Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </nav>

        {/* Today's Prompt */}
        <div className="bg-[#F5F3FF] p-4 border-b border-[#E5E7EB] sticky top-16 z-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-sm font-medium text-[#4F46E5]">Today's Prompt</h2>
            <p className="text-gray-900 mt-1">{mockCircle.todayPrompt}</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-3xl mx-auto space-y-4 md:space-y-6">
            {messages.map((message) => {
              const member = message.memberId === 'system' 
                ? null 
                : mockCircle.members.find(m => m.id === message.memberId);
              
              if (message.memberId === 'system') {
                return (
                  <div key={message.id} className="flex justify-center">
                    <div className="bg-[#F5F3FF] text-[#4F46E5] px-4 py-2 rounded-full text-sm">
                      {message.content}
                    </div>
                  </div>
                );
              }

              return (
                <div key={message.id} className="flex items-start space-x-3">
                  <img
                    src={member?.avatar}
                    alt={member?.name}
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline space-x-2">
                      <span className="font-medium text-gray-900">{member?.name}</span>
                      <span className="text-xs md:text-sm text-gray-500">
                        {format(new Date(message.timestamp), 'h:mm a')}
                      </span>
                    </div>
                    <div className="mt-1 text-gray-800 break-words">{message.content}</div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-[#E5E7EB] p-4 sticky bottom-0 z-30">
          <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto">
            <div className="flex items-end space-x-4">
              <div className="flex-1 bg-gray-50 rounded-lg p-2 md:p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <button
                    type="button"
                    ref={attachButtonRef}
                    onClick={() => setShowAttachMenu(!showAttachMenu)}
                    className="text-gray-500 hover:text-[#4F46E5] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] rounded p-1"
                  >
                    <PlusCircle className="w-5 h-5" />
                  </button>
                  {showAttachMenu && (
                    <div className="absolute bottom-24 left-4 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-40">
                      <div className="space-y-1">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 rounded w-full text-left"
                        >
                          <Camera className="w-4 h-4" />
                          <span>Photo</span>
                        </button>
                        <button
                          type="button"
                          className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 rounded w-full text-left"
                        >
                          <Video className="w-4 h-4" />
                          <span>Video</span>
                        </button>
                        <button
                          type="button"
                          className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 rounded w-full text-left"
                        >
                          <FileText className="w-4 h-4" />
                          <span>Document</span>
                        </button>
                        <button
                          type="button"
                          className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 rounded w-full text-left"
                        >
                          <LinkIcon className="w-4 h-4" />
                          <span>Link</span>
                        </button>
                      </div>
                    </div>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                    accept="image/*,video/*,application/*"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-gray-500 hover:text-[#4F46E5] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] rounded p-1"
                  >
                    <ImageIcon className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    ref={emojiButtonRef}
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="text-gray-500 hover:text-[#4F46E5] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] rounded p-1"
                  >
                    <Smile className="w-5 h-5" />
                  </button>
                  {showEmojiPicker && (
                    <div className="absolute bottom-24 right-4 z-40">
                      <Picker
                        data={data}
                        onEmojiSelect={handleEmojiSelect}
                        theme="light"
                      />
                    </div>
                  )}
                </div>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full bg-transparent resize-none focus:outline-none min-h-[20px] max-h-32"
                  rows={1}
                />
              </div>
              <button
                type="submit"
                disabled={!message.trim()}
                className="bg-[#4F46E5] text-white p-3 rounded-lg hover:bg-[#4338CA] disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:ring-offset-2"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Sidebars */}
      <div className={`fixed inset-y-0 right-0 transform ${showMembers || showSettings || showCalendar ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out w-full md:w-80 bg-white shadow-lg z-40 md:relative md:shadow-none md:translate-x-0 ${showMembers || showSettings || showCalendar ? '' : 'md:hidden'}`}>
        {/* Members List */}
        {showMembers && (
          <div className="h-full overflow-y-auto p-4 md:p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Members</h2>
              <button
                onClick={() => setShowMembers(false)}
                className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-lg p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              {mockCircle.members.map(member => (
                <div key={member.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{member.name}</div>
                      <div className="text-sm text-gray-500">{member.role || 'Member'}</div>
                    </div>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${
                    member.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Calendar */}
        {showCalendar && (
          <div className="h-full overflow-y-auto p-4 md:p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Schedule Meeting</h2>
              <button
                onClick={() => setShowCalendar(false)}
                className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-lg p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date & Time</label>
                <input
                  type="datetime-local"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
                  onChange={(e) => setSelectedDate(new Date(e.target.value))}
                  min={new Date().toISOString().slice(0, 16)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                <select 
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
                  value={meetingDuration}
                  onChange={(e) => setMeetingDuration(e.target.value)}
                >
                  <option>30 minutes</option>
                  <option>1 hour</option>
                  <option>1.5 hours</option>
                  <option>2 hours</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Type</label>
                <div className="space-y-2">
                  <button 
                    onClick={() => setMeetingType('video')}
                    className={`w-full flex items-center justify-between px-4 py-2 border rounded-lg transition-colors ${
                      meetingType === 'video'
                        ? 'border-[#4F46E5] text-[#4F46E5] bg-[#F5F3FF]'
                        : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                    } focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:ring-offset-2`}
                  >
                    <span className="flex items-center">
                      <Video className="w-5 h-5 mr-2" />
                      Video Call
                    </span>
                  </button>
                  <button 
                    onClick={() => setMeetingType('voice')}
                    className={`w-full flex items-center justify-between px-4 py-2 border rounded-lg transition-colors ${
                      meetingType === 'voice'
                        ? 'border-[#4F46E5] text-[#4F46E5] bg-[#F5F3FF]'
                        : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                    } focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:ring-offset-2`}
                  >
                    <span className="flex items-center">
                      <Phone className="w-5 h-5 mr-2" />
                      Voice Call
                    </span>
                  </button>
                </div>
              </div>
              <button 
                onClick={handleScheduleMeeting}
                disabled={!selectedDate}
                className="w-full bg-[#4F46E5] text-white py-2 rounded-lg hover:bg-[#4338CA] transition-colors focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Schedule Meeting
              </button>
            </div>
          </div>
        )}

        {/* Settings */}
        {showSettings && (
          <div className="h-full overflow-y-auto p-4 md:p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Circle Settings</h2>
              <button
                onClick={() => setShowSettings(false)}
                className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-lg p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Notifications</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-[#4F46E5] focus:ring-[#4F46E5]" defaultChecked />
                    <span className="ml-2 text-sm text-gray-600">All messages</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-[#4F46E5] focus:ring-[#4F46E5]" defaultChecked />
                    <span className="ml-2 text-sm text-gray-600">Mentions only</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-[#4F46E5] focus:ring-[#4F46E5]" defaultChecked />
                    <span className="ml-2 text-sm text-gray-600">Meeting reminders</span>
                  </label>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Privacy</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-[#4F46E5] focus:ring-[#4F46E5]" />
                    <span className="ml-2 text-sm text-gray-600">Share my activity status</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-[#4F46E5] focus:ring-[#4F46E5]" defaultChecked />
                    <span className="ml-2 text-sm text-gray-600">Allow direct messages</span>
                  </label>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Theme</h3>
                <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent">
                  <option>Light</option>
                  <option>Dark</option>
                  <option>System</option>
                </select>
              </div>
              <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                Leave Circle
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}