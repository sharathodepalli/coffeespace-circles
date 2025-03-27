export type OnboardingQuestion = {
  id: string;
  question: string;
  options: string[];
};

export type CircleMember = {
  id: string;
  name: string;
  avatar: string;
  status: 'completed' | 'pending' | 'not_started';
  isActive?: boolean;
  role?: 'Admin' | 'Moderator' | 'Member';
};

export type CircleMessage = {
  id: string;
  memberId: string;
  content: string;
  timestamp: string;
};

export type CircleRequest = {
  id: string;
  circleId: string;
  circleName: string;
  status: 'pending' | 'accepted' | 'rejected';
  timestamp: string;
};

export type Circle = {
  id: string;
  name: string;
  description?: string;
  members: CircleMember[];
  todayPrompt?: string;
  messages?: CircleMessage[];
  tags?: string[];
  privacy?: 'public' | 'private';
  activityLevel?: 'Very Active' | 'Active' | 'Moderate' | 'Quiet';
  meetingFrequency?: string;
  lastActive?: string;
  nextMeeting?: string;
};