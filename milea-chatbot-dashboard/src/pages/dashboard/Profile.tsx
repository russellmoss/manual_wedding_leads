import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  UserIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  StarIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

interface UserActivity {
  id: string;
  type: 'feedback' | 'rating' | 'comment';
  title: string;
  timestamp: string;
  details: string;
}

const mockActivities: UserActivity[] = [
  {
    id: '1',
    type: 'feedback',
    title: 'Submitted Feedback',
    timestamp: '2024-03-20T10:00:00Z',
    details: 'Provided feedback about the chatbot response time',
  },
  {
    id: '2',
    type: 'rating',
    title: 'Rated Service',
    timestamp: '2024-03-19T15:30:00Z',
    details: 'Gave a 5-star rating for wine tasting information',
  },
  {
    id: '3',
    type: 'comment',
    title: 'Added Comment',
    timestamp: '2024-03-18T09:15:00Z',
    details: 'Commented on vineyard tour scheduling',
  },
];

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || '',
    joinDate: '2024-01-15', // This should come from the user data
    lastActive: new Date().toISOString(),
  });

  const handleSave = () => {
    setIsEditing(false);
    // TODO: Implement save functionality
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getActivityIcon = (type: UserActivity['type']) => {
    switch (type) {
      case 'feedback':
        return <ChatBubbleLeftRightIcon className="h-5 w-5 text-milea" />;
      case 'rating':
        return <StarIcon className="h-5 w-5 text-milea" />;
      case 'comment':
        return <ChatBubbleLeftRightIcon className="h-5 w-5 text-milea" />;
      default:
        return <UserIcon className="h-5 w-5 text-milea" />;
    }
  };

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-gilda text-milea dark:text-white">User Profile</h1>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-milea hover:bg-milea-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-milea"
            >
              Edit Profile
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-milea hover:bg-milea-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-milea"
            >
              Save Changes
            </button>
          )}
        </div>
      </div>

      {/* Profile Information */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-full bg-milea/10">
              <UserIcon className="h-6 w-6 text-milea dark:text-white" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Profile Information</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Manage your personal information</p>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Name
              </label>
              <div className="mt-1">
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={userInfo.name}
                    onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                    className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-milea focus:ring-milea sm:text-sm"
                  />
                ) : (
                  <p className="text-sm text-gray-900 dark:text-white">{userInfo.name}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <div className="mt-1">
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={userInfo.email}
                    onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                    className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-milea focus:ring-milea sm:text-sm"
                  />
                ) : (
                  <p className="text-sm text-gray-900 dark:text-white">{userInfo.email}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Role
              </label>
              <div className="mt-1">
                <p className="text-sm text-gray-900 dark:text-white">{userInfo.role}</p>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="joinDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Join Date
              </label>
              <div className="mt-1">
                <p className="text-sm text-gray-900 dark:text-white">{formatDate(userInfo.joinDate)}</p>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="lastActive" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Last Active
              </label>
              <div className="mt-1">
                <p className="text-sm text-gray-900 dark:text-white">{formatDate(userInfo.lastActive)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity History */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-full bg-milea/10">
              <CalendarIcon className="h-6 w-6 text-milea dark:text-white" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Activity History</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">View your recent activities</p>
            </div>
          </div>
          <div className="mt-6 flow-root">
            <ul className="-mb-8">
              {mockActivities.map((activity, activityIdx) => (
                <li key={activity.id}>
                  <div className="relative pb-8">
                    {activityIdx !== mockActivities.length - 1 ? (
                      <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700" aria-hidden="true" />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-milea/10 flex items-center justify-center ring-8 ring-white dark:ring-gray-800">
                          {getActivityIcon(activity.type)}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {activity.title}{' '}
                            <span className="font-medium text-gray-900 dark:text-white">{activity.details}</span>
                          </p>
                          <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(activity.timestamp)}
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

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-full bg-milea/10">
              <Cog6ToothIcon className="h-6 w-6 text-milea dark:text-white" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Quick Actions</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Common profile actions</p>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-milea hover:bg-milea-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-milea"
            >
              Change Password
            </button>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-milea hover:bg-milea-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-milea"
            >
              Two-Factor Authentication
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 