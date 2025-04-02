import { useState, useEffect } from 'react';

interface FeedbackData {
  id: string;
  rating: number;
  comment: string;
  status: 'resolved' | 'unresolved';
  createdAt: string;
}

interface UseDashboardDataReturn {
  feedback: FeedbackData[];
  isLoading: boolean;
  error: string | null;
  fetchFeedback: () => Promise<void>;
  updateFeedbackStatus: (id: string, status: 'resolved' | 'unresolved') => Promise<void>;
}

export const useDashboardData = (): UseDashboardDataReturn => {
  const [feedback, setFeedback] = useState<FeedbackData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeedback = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // TODO: Replace with actual API call
      // For now, we'll use mock data
      const mockFeedback: FeedbackData[] = [
        {
          id: '1',
          rating: 5,
          comment: 'Great service!',
          status: 'resolved',
          createdAt: '2024-03-20T10:00:00Z',
        },
        {
          id: '2',
          rating: 3,
          comment: 'Could be better',
          status: 'unresolved',
          createdAt: '2024-03-20T11:00:00Z',
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

  useEffect(() => {
    fetchFeedback();
  }, []);

  return {
    feedback,
    isLoading,
    error,
    fetchFeedback,
    updateFeedbackStatus,
  };
}; 