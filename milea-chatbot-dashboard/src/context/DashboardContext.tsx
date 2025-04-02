import React, { createContext, useContext, useState, useEffect } from 'react';

interface DashboardStats {
  totalFeedback: number;
  averageRating: number;
  unresolvedIssues: number;
}

interface DashboardContextType {
  stats: DashboardStats;
  isLoading: boolean;
  error: string | null;
  refreshStats: () => Promise<void>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stats, setStats] = useState<DashboardStats>({
    totalFeedback: 0,
    averageRating: 0,
    unresolvedIssues: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardStats = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // TODO: Replace with actual API call
      // For now, we'll use mock data
      const mockStats = {
        totalFeedback: 150,
        averageRating: 4.5,
        unresolvedIssues: 12,
      };
      
      setStats(mockStats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch dashboard stats');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const value = {
    stats,
    isLoading,
    error,
    refreshStats: fetchDashboardStats,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}; 