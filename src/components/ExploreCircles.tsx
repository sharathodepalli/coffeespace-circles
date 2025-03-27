import React, { useState } from 'react';
import { Users, Search, Clock, Globe2, Lock, MessageSquare, Calendar, Activity, Target, Coffee, Sparkles, Video, PhoneCall, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Circle, CircleRequest } from '../types';
import { format } from 'date-fns';

// Mock data for requests
const mockRequests: CircleRequest[] = [
  {
    id: '1',
    circleId: '2',
    circleName: 'Indie Hackers Club',
    status: 'pending',
    timestamp: '2024-03-15T10:00:00Z'
  },
  {
    id: '2',
    circleId: '3',
    circleName: 'AI Founders Circle',
    status: 'pending',
    timestamp: '2024-03-15T11:00:00Z'
  }
];

const mockJoinedCircles: Circle[] = [
  {
    id: '1',
    name: 'AI Builders Club',
    description: 'A community of builders creating AI-powered products.',
    tags: ['AI', 'Building', 'Tech'],
    privacy: 'public',
    activityLevel: 'Very Active',
    meetingFrequency: 'Weekly',
    lastActive: 'Just now',
    members: [
      {
        id: '1',
        name: 'Sarah',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
        status: 'completed',
        role: 'Admin'
      }
    ],
    nextMeeting: '2024-03-20T15:00:00Z'
  }
];

const mockCircles: Circle[] = [
  {
    id: '2',
    name: 'Indie Hackers Club',
    description: 'A supportive community for indie hackers building in public. Share progress, get feedback, and stay accountable.',
    tags: ['Building in Public', 'SaaS', 'Indie Hacking'],
    privacy: 'public',
    activityLevel: 'Very Active',
    meetingFrequency: 'Daily',
    lastActive: '5 mins ago',
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
    ]
  },
  {
    id: '3',
    name: 'AI Founders Circle',
    description: 'Connect with founders building AI-powered products. Weekly mastermind sessions and technical discussions.',
    tags: ['AI', 'Machine Learning', 'Tech'],
    privacy: 'public',
    activityLevel: 'Very Active',
    meetingFrequency: 'Weekly',
    lastActive: '1 hour ago',
    members: [
      {
        id: '3',
        name: 'Mike',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
        status: 'completed',
        role: 'Admin'
      }
    ]
  }
];

const allTags = Array.from(new Set([...mockCircles.flatMap(circle => circle.tags || []), ...mockJoinedCircles.flatMap(circle => circle.tags || [])]));

interface CreateCircleForm {
  name: string;
  description: string;
  privacy: 'public' | 'private';
  meetingFrequency: string;
  tags: string[];
}

export function ExploreCircles() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [pendingRequests, setPendingRequests] = useState<string[]>(mockRequests.map(r => r.circleId));
  const [isCreating, setIsCreating] = useState(false);
  const [showScheduleCall, setShowScheduleCall] = useState(false);
  const [selectedCircle, setSelectedCircle] = useState<Circle | null>(null);
  const [isRequestsExpanded, setIsRequestsExpanded] = useState(false);
  const [requests, setRequests] = useState<CircleRequest[]>(mockRequests);
  const [circles, setCircles] = useState<Circle[]>(mockCircles);
  const [createForm, setCreateForm] = useState<CreateCircleForm>({
    name: '',
    description: '',
    privacy: 'public',
    meetingFrequency: 'Weekly',
    tags: []
  });
  const [newTag, setNewTag] = useState('');

  const handleTagClick = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleJoinRequest = (circleId: string) => {
    const newRequest: CircleRequest = {
      id: Date.now().toString(),
      circleId,
      circleName: circles.find(c => c.id === circleId)?.name || '',
      status: 'pending',
      timestamp: new Date().toISOString()
    };
    setRequests(prev => [...prev, newRequest]);
    setPendingRequests(prev => [...prev, circleId]);
  };

  const handleCancelRequest = (circleId: string) => {
    setRequests(prev => prev.filter(r => r.circleId !== circleId));
    setPendingRequests(prev => prev.filter(id => id !== circleId));
  };

  const handleScheduleCall = (circle: Circle) => {
    setSelectedCircle(circle);
    setShowScheduleCall(true);
  };

  const handleCreateFormChange = (field: keyof CreateCircleForm, value: string) => {
    setCreateForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTag.trim()) {
      e.preventDefault();
      if (!createForm.tags.includes(newTag.trim())) {
        setCreateForm(prev => ({
          ...prev,
          tags: [...prev.tags, newTag.trim()]
        }));
      }
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setCreateForm(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleCreateCircle = () => {
    const newCircle: Circle = {
      id: (circles.length + 1).toString(),
      name: createForm.name,
      description: createForm.description,
      privacy: createForm.privacy,
      meetingFrequency: createForm.meetingFrequency,
      tags: createForm.tags,
      activityLevel: 'Very Active',
      lastActive: 'Just now',
      members: [{
        id: 'current-user',
        name: 'You',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
        status: 'completed',
        role: 'Admin'
      }]
    };

    setCircles(prev => [...prev, newCircle]);
    setCreateForm({
      name: '',
      description: '',
      privacy: 'public',
      meetingFrequency: 'Weekly',
      tags: []
    });
    setIsCreating(false);
  };

  const filteredCircles = circles.filter(circle => {
    const matchesSearch = circle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         circle.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => circle.tags?.includes(tag));
    return matchesSearch && matchesTags;
  });

  return (
    <div className="min-h-screen bg-[#FFFBF7] pb-20">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-[#E5E7EB] fixed top-0 left-0 right-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Coffee className="w-8 h-8 text-[#4F46E5]" />
              <span className="ml-2 text-xl font-semibold text-gray-900">CoffeeSpace</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Explore Circles</h1>
            <p className="mt-2 text-gray-600">Find your tribe and grow together</p>
          </div>
          <button 
            onClick={() => setIsCreating(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 bg-[#4F46E5] text-white rounded-lg hover:bg-[#4338CA] transition-colors active:bg-[#3730A3] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:ring-offset-2"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Create Circle
          </button>
        </div>

        {/* Joined Circles */}
        {mockJoinedCircles.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Circles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {mockJoinedCircles.map(circle => (
                <div key={circle.id} className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-4 sm:p-6">
                    <div className="flex justify-between items-start mb-4">
                      <Link to={`/circle/${circle.id}`} className="flex-1">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 hover:text-[#4F46E5]">{circle.name}</h3>
                      </Link>
                      <div className="flex -space-x-2">
                        {circle.members.map(member => (
                          <img
                            key={member.id}
                            src={member.avatar}
                            alt={member.name}
                            className="w-8 h-8 rounded-full border-2 border-white"
                          />
                        ))}
                      </div>
                    </div>

                    {circle.nextMeeting && (
                      <div className="bg-[#F5F3FF] p-3 sm:p-4 rounded-lg mb-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Calendar className="w-5 h-5 text-[#4F46E5] mr-2" />
                            <span className="text-sm font-medium">Next Meeting</span>
                          </div>
                          <span className="text-sm text-gray-600">
                            {format(new Date(circle.nextMeeting), 'MMM d, h:mm a')}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-2">
                      <Link
                        to={`/circle/${circle.id}`}
                        className="flex-1 flex items-center justify-center px-4 py-2 bg-[#4F46E5] text-white rounded-lg hover:bg-[#4338CA] transition-colors active:bg-[#3730A3] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:ring-offset-2"
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Chat
                      </Link>
                      <button
                        onClick={() => handleScheduleCall(circle)}
                        className="flex-1 flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors active:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                      >
                        <Video className="w-4 h-4 mr-2" />
                        Call
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-4 sm:p-6 mb-8 sticky top-20 z-10">
          <div className="relative mb-4">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search circles by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-[#4F46E5] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Circles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredCircles.map(circle => (
            <div key={circle.id} className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-4 sm:p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900">{circle.name}</h3>
                      {circle.privacy === 'public' ? (
                        <Globe2 className="w-4 h-4 text-gray-400" />
                      ) : (
                        <Lock className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{circle.lastActive}</p>
                  </div>
                  <div className="flex -space-x-2">
                    {circle.members.map(member => (
                      <div key={member.id} className="relative group">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-8 h-8 rounded-full border-2 border-white"
                        />
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {member.name} {member.role ? `(${member.role})` : ''}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-2">{circle.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {circle.tags?.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-[#F5F3FF] text-[#4F46E5] rounded-full text-sm font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Activity className="w-4 h-4 text-[#4F46E5]" />
                    <span className="text-gray-600">{circle.activityLevel}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-[#4F46E5]" />
                    <span className="text-gray-600">{circle.meetingFrequency}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-[#4F46E5]" />
                    <span className="text-sm text-gray-500">95% Match</span>
                  </div>
                  {pendingRequests.includes(circle.id) ? (
                    <button
                      onClick={() => handleCancelRequest(circle.id)}
                      className="px-4 py-2 rounded-lg font-medium text-sm flex items-center space-x-2 bg-red-100 text-red-600 hover:bg-red-200 active:bg-red-300 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel Request</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleJoinRequest(circle.id)}
                      className="px-4 py-2 rounded-lg font-medium text-sm bg-[#4F46E5] text-white hover:bg-[#4338CA] active:bg-[#3730A3] transition-colors focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:ring-offset-2"
                    >
                      Request to Join
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pending Requests - Ribbon style */}
        {pendingRequests.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 z-20">
            <div className="bg-white border-t shadow-lg">
              {/* Requests Header - Always visible */}
              <div className="max-w-6xl mx-auto p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Your Requests</h4>
                    <p className="text-sm text-gray-600">
                      {pendingRequests.length} pending request{pendingRequests.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <button 
                    onClick={() => setIsRequestsExpanded(!isRequestsExpanded)}
                    className="flex items-center space-x-2 text-[#4F46E5] hover:text-[#4338CA] font-medium focus:outline-none focus:ring-2 focus:ring-[#4F46E5] rounded-lg px-3 py-1"
                  >
                    <span>{isRequestsExpanded ? 'Hide' : 'View All'}</span>
                    {isRequestsExpanded ? (
                      <ChevronDown className="w-5 h-5" />
                    ) : (
                      <ChevronUp className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Expandable Requests List */}
              <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isRequestsExpanded ? 'max-h-96' : 'max-h-0'
              }`}>
                <div className="max-w-6xl mx-auto px-4 pb-4">
                  <div className="bg-gray-50 rounded-lg divide-y divide-gray-200">
                    {requests.map(request => (
                      <div key={request.id} className="flex items-center justify-between p-4">
                        <div>
                          <h3 className="font-medium text-gray-900">{request.circleName}</h3>
                          <p className="text-sm text-gray-500">
                            Requested {format(new Date(request.timestamp), 'MMM d, yyyy')}
                          </p>
                        </div>
                        <button
                          onClick={() => handleCancelRequest(request.circleId)}
                          className="px-3 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                        >
                          Cancel Request
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Schedule Call Modal */}
        {showScheduleCall && selectedCircle && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-4 sm:p-6 m-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Schedule Call</h2>
                <button 
                  onClick={() => setShowScheduleCall(false)}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-lg p-1"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Circle</label>
                  <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-700">
                    {selectedCircle.name}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date & Time</label>
                  <input
                    type="datetime-local"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                  <select className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent">
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="90">1.5 hours</option>
                    <option value="120">2 hours</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    placeholder="What's this call about?"
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
                  />
                </div>
                <button 
                  onClick={() => {
                    setShowScheduleCall(false);
                    // Here you would typically save the call details
                  }}
                  className="w-full bg-[#4F46E5] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#4338CA] active:bg-[#3730A3] transition-colors focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:ring-offset-2"
                >
                  Schedule Call
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Create Circle Modal */}
        {isCreating && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-4 sm:p-6 m-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Create Circle</h2>
                <button 
                  onClick={() => setIsCreating(false)}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-lg p-1"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Circle Name</label>
                  <input
                    type="text"
                    placeholder="e.g., AI Builders Community"
                    value={createForm.name}
                    onChange={(e) => handleCreateFormChange('name', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    placeholder="What's your circle about?"
                    value={createForm.description}
                    onChange={(e) => handleCreateFormChange('description', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Frequency</label>
                  <select
                    value={createForm.meetingFrequency}
                    onChange={(e) => handleCreateFormChange('meetingFrequency', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
                  >
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Bi-weekly">Bi-weekly</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {createForm.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-[#F5F3FF] text-[#4F46E5] rounded-full text-sm font-medium flex items-center"
                      >
                        #{tag}
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-2 text-[#4F46E5] hover:text-[#4338CA] focus:outline-none"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Add tags (press Enter)"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={handleAddTag}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Privacy</label>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => handleCreateFormChange('privacy', 'public')}
                      className={`flex-1 px-4 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        createForm.privacy === 'public'
                          ? 'bg-[#4F46E5] text-white focus:ring-[#4F46E5]'
                          : 'border border-gray-200 text-gray-700 hover:bg-gray-50 focus:ring-gray-500'
                      }`}
                    >
                      <Globe2 className="w-5 h-5 inline mr-2" />
                      Public
                    </button>
                    <button
                      onClick={() => handleCreateFormChange('privacy', 'private')}
                      className={`flex-1 px-4 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        createForm.privacy === 'private'
                          ? 'bg-[#4F46E5] text-white focus:ring-[#4F46E5]'
                          : 'border border-gray-200 text-gray-700 hover:bg-gray-50 focus:ring-gray-500'
                      }`}
                    >
                      <Lock className="w-5 h-5 inline mr-2" />
                      Private
                    </button>
                  </div>
                </div>
                <button
                  onClick={handleCreateCircle}
                  disabled={!createForm.name || !createForm.description}
                  className="w-full bg-[#4F46E5] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#4338CA] active:bg-[#3730A3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:ring-offset-2"
                >
                  Create Circle
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}