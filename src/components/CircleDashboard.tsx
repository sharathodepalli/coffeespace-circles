import React from 'react';
import { MessageSquare, Activity, Mic } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Circle } from '../types';

const mockCircle: Circle = {
  id: '18',
  name: 'AI Builders - Circle #18',
  todayPrompt: 'What are you working on this week?',
  members: [
    {
      id: '1',
      name: 'Uday',
      avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop',
      status: 'completed',
      isActive: true
    },
    {
      id: '2',
      name: 'Priya',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      status: 'pending'
    },
    {
      id: '3',
      name: 'Alex',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
      status: 'completed'
    }
  ],
  messages: [
    {
      id: '1',
      memberId: '1',
      content: 'Working on the new AI feature for our app. Making good progress!',
      timestamp: '2024-03-15T10:00:00Z'
    },
    {
      id: '2',
      memberId: '2',
      content: 'Just launched our beta version. Looking for early feedback.',
      timestamp: '2024-03-15T11:30:00Z'
    }
  ]
};

export function CircleDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{mockCircle.name}</h1>
          
          <div className="flex space-x-2 mb-6 overflow-x-auto py-2">
            {mockCircle.members.map((member) => (
              <div key={member.id} className="flex flex-col items-center">
                <div className={`relative ${member.isActive ? 'ring-2 ring-blue-500 ring-offset-2' : ''} rounded-full`}>
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-12 h-12 rounded-full"
                  />
                </div>
                <span className="text-sm text-gray-600 mt-1">{member.name}</span>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <h2 className="font-medium text-gray-700 mb-2">Today's Prompt</h2>
            <p className="text-gray-900">{mockCircle.todayPrompt}</p>
          </div>

          <div className="space-y-4">
            {mockCircle.messages.map((message) => {
              const member = mockCircle.members.find(m => m.id === message.memberId);
              return (
                <div key={message.id} className="flex items-start space-x-3">
                  <img
                    src={member?.avatar}
                    alt={member?.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="bg-gray-100 rounded-2xl p-4">
                      <p className="font-medium text-gray-900 mb-1">{member?.name}</p>
                      <p className="text-gray-700">{message.content}</p>
                    </div>
                    <span className="text-xs text-gray-500 mt-1 block">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
          <div className="max-w-lg mx-auto flex justify-around">
            <Link
              to="/progress"
              className="flex flex-col items-center text-gray-600 hover:text-blue-600"
            >
              <Activity className="w-6 h-6" />
              <span className="text-xs mt-1">Progress</span>
            </Link>
            <button className="flex flex-col items-center text-gray-600 hover:text-blue-600">
              <MessageSquare className="w-6 h-6" />
              <span className="text-xs mt-1">Reply</span>
            </button>
            <Link
              to="/huddle"
              className="flex flex-col items-center text-gray-600 hover:text-blue-600"
            >
              <Mic className="w-6 h-6" />
              <span className="text-xs mt-1">Huddle</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}