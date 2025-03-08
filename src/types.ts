export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  accessLevel: number;
  profileImage?: string;
  bio?: string;
}

export interface Notification {
  id: string;
  title: string;
  content: string;
  date: string;
  read: boolean;
  type: 'standard' | 'urgent' | 'hidden';
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'system';
  timestamp: string;
}

export interface Task {
  id: number;
  name: string;
  status: 'pending' | 'in-progress' | 'completed';
  deadline: string;
  description?: string;
  assignedTo?: string;
  priority?: 'low' | 'medium' | 'high';
}

export interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
  priority: 'low' | 'medium' | 'high';
}

export interface PerformanceMetric {
  id: number;
  name: string;
  value: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
}
