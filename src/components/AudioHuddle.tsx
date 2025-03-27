import React from 'react';
import { Mic, Clock, Users } from 'lucide-react';

export function AudioHuddle() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mic className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Your Circle Huddle</h1>
            <p className="text-gray-600 mt-2">Today at 6:00 PM</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-center space-x-3 text-lg font-semibold text-gray-900">
              <Clock className="w-6 h-6 text-blue-600" />
              <span>Starts in 2h 30m</span>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex justify-center space-x-2 mb-4">
              <Users className="w-6 h-6 text-gray-600" />
              <span className="text-gray-600">3 members joining</span>
            </div>
            <div className="flex justify-center -space-x-2">
              <img
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop"
                alt="Uday"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                alt="Priya"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <img
                src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop"
                alt="Alex"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
            </div>
          </div>

          <button className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
            Join Huddle
          </button>
        </div>
      </div>
    </div>
  );
}