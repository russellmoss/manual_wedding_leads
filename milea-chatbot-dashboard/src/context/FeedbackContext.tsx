import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Feedback {
  id: string;
  rating: number;
  comment: string;
  status: 'resolved' | 'unresolved';
  createdAt: string;
  tags?: string[];
  notes?: string[];
}

interface FeedbackFilters {
  status?: 'resolved' | 'unresolved';
  rating?: number;
  dateRange?: {
    start: string;
    end: string;
  };
  tags?: string[];
}

interface FeedbackContextType {
  feedback: Feedback[];
  filters: FeedbackFilters;
  isLoading: boolean;
  error: string | null;
  totalCount: number;
  filteredCount: number;
  fetchFeedback: () => Promise<void>;
  updateFeedbackStatus: (id: string, status: 'resolved' | 'unresolved') => Promise<void>;
  addNote: (id: string, note: string) => Promise<void>;
  updateFilters: (newFilters: Partial<FeedbackFilters>) => void;
  clearFilters: () => void;
  refreshFeedback: () => Promise<void>;
}

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

export const FeedbackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [filters, setFilters] = useState<FeedbackFilters>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeedback = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // TODO: Replace with actual API call
      // For now, we'll use mock data
      const mockFeedback: Feedback[] = [
        {
          id: '1',
          rating: 5,
          comment: 'Great service! The chatbot was very helpful in answering my questions about wine tasting.',
          status: 'resolved',
          createdAt: '2024-03-20T10:00:00Z',
          tags: ['wine-tasting', 'positive'],
          notes: ['Customer was satisfied with the response time'],
        },
        {
          id: '2',
          rating: 3,
          comment: 'Could be better. The chatbot didn\'t understand my question about vineyard tours.',
          status: 'unresolved',
          createdAt: '2024-03-20T11:00:00Z',
          tags: ['tours', 'needs-improvement'],
          notes: ['Follow-up required for tour scheduling'],
        },
        {
          id: '3',
          rating: 4,
          comment: 'Good experience overall, but had to wait a bit for responses.',
          status: 'resolved',
          createdAt: '2024-03-20T12:00:00Z',
          tags: ['response-time', 'positive'],
          notes: ['Response time improvement needed'],
        },
      ];

      setFeedback(mockFeedback);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch feedback');
    } finally {
      setIsLoading(false);
    }
  };

  const updateFeedbackStatus = async (id: string, status: 'resolved' | 'unresolved') => {
    try {
      // TODO: Replace with actual API call
      setFeedback(prevFeedback =>
        prevFeedback.map(item =>
          item.id === id ? { ...item, status } : item
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update feedback status');
    }
  };

  const addNote = async (id: string, note: string) => {
    try {
      // TODO: Replace with actual API call
      setFeedback(prevFeedback =>
        prevFeedback.map(item =>
          item.id === id
            ? {
                ...item,
                notes: [...(item.notes || []), note],
              }
            : item
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add note');
    }
  };

  const updateFilters = (newFilters: Partial<FeedbackFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  const filteredFeedback = feedback.filter(item => {
    if (filters.status && item.status !== filters.status) return false;
    if (filters.rating && item.rating !== filters.rating) return false;
    if (filters.dateRange) {
      const itemDate = new Date(item.createdAt);
      const startDate = new Date(filters.dateRange.start);
      const endDate = new Date(filters.dateRange.end);
      if (itemDate < startDate || itemDate > endDate) return false;
    }
    if (filters.tags && filters.tags.length > 0) {
      if (!item.tags || !filters.tags.some(tag => item.tags?.includes(tag))) return false;
    }
    return true;
  });

  useEffect(() => {
    fetchFeedback();
  }, []);

  const value = {
    feedback: filteredFeedback,
    filters,
    isLoading,
    error,
    totalCount: feedback.length,
    filteredCount: filteredFeedback.length,
    fetchFeedback,
    updateFeedbackStatus,
    addNote,
    updateFilters,
    clearFilters,
    refreshFeedback: fetchFeedback,
  };

  return (
    <FeedbackContext.Provider value={value}>
      {children}
    </FeedbackContext.Provider>
  );
};

export const useFeedback = () => {
  const context = useContext(FeedbackContext);
  if (context === undefined) {
    throw new Error('useFeedback must be used within a FeedbackProvider');
  }
  return context;
}; 