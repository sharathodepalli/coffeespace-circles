import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Target, Coffee } from 'lucide-react';
import type { OnboardingQuestion } from '../types';

const questions: OnboardingQuestion[] = [
  {
    id: 'stage',
    question: 'What stage are you at?',
    options: ['Idea', 'MVP', 'Growth'],
  },
  {
    id: 'need',
    question: 'What do you need right now?',
    options: ['Motivation', 'Feedback', 'Focus'],
  },
  {
    id: 'vibe',
    question: 'What vibe do you prefer?',
    options: ['Chatty', 'Focused', 'Async'],
  },
];

export function OnboardingScreen() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: answer });
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="max-w-md mx-auto pt-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Users className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find your tribe</h1>
          <p className="text-gray-600">Join a Circle of like-minded founders</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="mb-8">
            <div className="flex justify-between mb-4">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-full mx-1 rounded-full ${
                    index <= currentQuestion ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {questions[currentQuestion].question}
            </h2>

            <div className="space-y-3">
              {questions[currentQuestion].options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  className="w-full p-4 text-left rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          {currentQuestion + 1} of {questions.length}
        </div>
      </div>
    </div>
  );
}