import React from 'react';
import { CheckCircle, Clock, X, ThumbsUp, Smile, Siren as Fire } from 'lucide-react';
import type { CircleMember } from '../types';

const members: CircleMember[] = [
  {
    id: '1',
    name: 'Uday',
    avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop',
    status: 'completed'
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
];

export function ProgressTracker() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Weekly Progress</h1>
          
          <div className="space-y-4">
            {members.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="font-medium text-gray-900">{member.name}</span>
                </div>
                
                <div className="flex items-center space-x-4">
                  {member.status === 'completed' && (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  )}
                  {member.status === 'pending' && (
                    <Clock className="w-6 h-6 text-yellow-500" />
                  )}
                  {member.status === 'not_started' && (
                    <X className="w-6 h-6 text-gray-400" />
                  )}
                  
                  <div className="flex space-x-1">
                    <button className="p-1 hover:bg-gray-200 rounded">
                      <ThumbsUp className="w-5 h-5 text-gray-500" />
                    </button>
                    <button className="p-1 hover:bg-gray-200 rounded">
                      <Smile className="w-5 h-5 text-gray-500" />
                    </button>
                    <button className="p-1 hover:bg-gray-200 rounded">
                      <Fire className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}