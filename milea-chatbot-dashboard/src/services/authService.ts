import axios, { AxiosError } from 'axios';
import { AuthResponse, LoginCredentials, RegisterData, DashboardStats, Feedback, User } from '../types/auth';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

interface ApiError {
  message: string;
  code?: string;
  details?: unknown;
}

interface ApiResponse<T> {
  message?: string;
  code?: string;
  details?: unknown;
  data: T;
}

const authService = {
  // Authentication methods
  register: async (data: RegisterData): Promise<AuthResponse> => {
    try {
      const response = await api.post<ApiResponse<AuthResponse>>('/auth/register', data);
      const responseData = response.data;
      if (!responseData?.data?.token) {
        throw new Error('Invalid response format');
      }
      localStorage.setItem('token', responseData.data.token);
      localStorage.setItem('user', JSON.stringify(responseData.data.user));
      return responseData.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const response = await api.post<ApiResponse<AuthResponse>>('/auth/login', credentials);
      const responseData = response.data;
      if (!responseData?.data?.token) {
        throw new Error('Invalid response format');
      }
      localStorage.setItem('token', responseData.data.token);
      localStorage.setItem('user', JSON.stringify(responseData.data.user));
      return responseData.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
  },

  getToken: (): string | null => {
    return localStorage.getItem('token');
  },

  verifyToken: async (token: string): Promise<User> => {
    try {
      const response = await api.get<ApiResponse<User>>('/auth/verify', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const responseData = response.data;
      if (!responseData?.data) {
        throw new Error('Invalid response format');
      }
      return responseData.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  updateProfile: async (data: Partial<User>): Promise<User> => {
    try {
      const response = await api.put<ApiResponse<User>>('/auth/profile', data);
      const responseData = response.data;
      if (!responseData?.data) {
        throw new Error('Invalid response format');
      }
      localStorage.setItem('user', JSON.stringify(responseData.data));
      return responseData.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  changePassword: async (currentPassword: string, newPassword: string): Promise<void> => {
    try {
      await api.put<ApiResponse<void>>('/auth/change-password', { currentPassword, newPassword });
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Dashboard specific methods
  getDashboardStats: async (): Promise<DashboardStats> => {
    try {
      const response = await api.get<ApiResponse<DashboardStats>>('/dashboard/stats');
      const responseData = response.data;
      if (!responseData?.data) {
        throw new Error('Invalid response format');
      }
      return responseData.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  getFeedback: async (): Promise<Feedback[]> => {
    try {
      const response = await api.get<ApiResponse<Feedback[]>>('/dashboard/feedback');
      const responseData = response.data;
      if (!responseData?.data) {
        throw new Error('Invalid response format');
      }
      return responseData.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  updateFeedback: async (feedbackId: string, data: Partial<Feedback>): Promise<Feedback> => {
    try {
      const response = await api.put<ApiResponse<Feedback>>(`/dashboard/feedback/${feedbackId}`, data);
      const responseData = response.data;
      if (!responseData?.data) {
        throw new Error('Invalid response format');
      }
      return responseData.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  deleteFeedback: async (feedbackId: string): Promise<void> => {
    try {
      await api.delete<ApiResponse<void>>(`/dashboard/feedback/${feedbackId}`);
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Error handling
  handleError: (error: unknown): ApiError => {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiResponse<unknown>>;
      if (axiosError.response?.data) {
        // Server responded with error
        return {
          message: axiosError.response.data.message || 'An error occurred',
          code: axiosError.response.data.code,
          details: axiosError.response.data.details
        };
      } else if (axiosError.request) {
        // Request made but no response
        return {
          message: 'No response from server',
          code: 'NETWORK_ERROR'
        };
      } else {
        // Something else went wrong
        return {
          message: axiosError.message || 'An error occurred',
          code: 'UNKNOWN_ERROR'
        };
      }
    } else {
      // Handle non-axios errors
      return {
        message: error instanceof Error ? error.message : 'An unknown error occurred',
        code: 'UNKNOWN_ERROR'
      };
    }
  },
};

export default authService; 