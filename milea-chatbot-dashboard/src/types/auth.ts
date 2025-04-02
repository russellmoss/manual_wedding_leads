export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface Activity {
  type: string;
  description: string;
  timestamp: string;
}

export interface DashboardStats {
  totalUsers: number;
  activeConversations: number;
  totalMessages: number;
  recentActivity: Activity[];
}

export interface Feedback {
  id: string;
  userId: string;
  rating: number;
  comment: string;
  timestamp: string;
  status: 'pending' | 'reviewed' | 'resolved';
} 