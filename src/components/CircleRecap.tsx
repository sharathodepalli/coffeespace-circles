import React from 'react';
import { Trophy, Clock, Star, Send } from 'lucide-react';

export function CircleRecap() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-yellow-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Weekly Circle Recap</h1>
            <p className="text-gray-600 mt-2">Your Circle shared 18 wins this week 🎉</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-700">Avg Reply Time</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">1h</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Star className="w-5 h-5 text-yellow-600" />
                <span className="font-medium text-gray-700">Most Active</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">Uday</p>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <h2 className="font-semibold text-gray-900 mb-4">Weekly Highlights</h2>
            {[
              "Launched beta version",
              "Completed AI feature implementation",
              "Reached 100 early users"
            ].map((highlight, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-4">
                <p className="text-gray-800">{highlight}</p>
              </div>
            ))}
          </div>

          <button className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
            <Send className="w-5 h-5" />
            <span>Send Shoutout</span>
          </button>
        </div>
      </div>
    </div>
  );
}