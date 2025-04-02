import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { useFeedback } from '../../context/FeedbackContext';
import {
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  StarIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

const Dashboard: React.FC = () => {
  const { dashboard } = useDashboard();
  const { feedback } = useFeedback();

  if (!dashboard || !feedback) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-milea">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-gilda text-milea dark:text-white">Dashboard Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-milea/10">
              <ChartBarIcon className="h-6 w-6 text-milea dark:text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Users</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{dashboard.totalUsers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-milea/10">
              <ChatBubbleLeftRightIcon className="h-6 w-6 text-milea dark:text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Feedback</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{feedback.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-milea/10">
              <StarIcon className="h-6 w-6 text-milea dark:text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Average Rating</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {(feedback.reduce((acc, item) => acc + item.rating, 0) / feedback.length).toFixed(1)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-milea/10">
              <ClockIcon className="h-6 w-6 text-milea dark:text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Users</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{dashboard.activeUsers}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Recent Activity</h2>
          <div className="mt-6 flow-root">
            <ul className="-mb-8">
              {feedback.slice(0, 5).map((item, index) => (
                <li key={item.id}>
                  <div className="relative pb-8">
                    {index !== 4 && (
                      <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700" aria-hidden="true" />
                    )}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-milea/10 flex items-center justify-center ring-8 ring-white dark:ring-gray-800">
                          <ChatBubbleLeftRightIcon className="h-5 w-5 text-milea dark:text-white" />
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            New feedback received{' '}
                            <span className="font-medium text-gray-900 dark:text-white">{item.message}</span>
                          </p>
                          <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                            {new Date(item.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 