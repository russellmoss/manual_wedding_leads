import React, { useState } from 'react';
import {
  BellIcon,
  SunIcon,
  MoonIcon,
  UserIcon,
  ShieldCheckIcon,
  LanguageIcon,
} from '@heroicons/react/24/outline';
import { useTheme } from '../../context/ThemeContext';

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  feedbackAlerts: boolean;
  weeklyReports: boolean;
}

const Settings: React.FC = () => {
  const { mode, accentColor, setMode, setAccentColor } = useTheme();
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: true,
    feedbackAlerts: true,
    weeklyReports: false,
  });

  const handleNotificationChange = (setting: keyof NotificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  return (
    <div className="space-y-6">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-gilda text-milea dark:text-white">Settings</h1>
        </div>
      </div>

      {/* Profile Settings */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-full bg-milea/10">
              <UserIcon className="h-6 w-6 text-milea dark:text-white" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Profile Settings</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Manage your account information</p>
            </div>
          </div>
          <div className="mt-6 space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                defaultValue="John Doe"
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-milea focus:ring-milea sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                defaultValue="john@example.com"
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-milea focus:ring-milea sm:text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-full bg-milea/10">
              <BellIcon className="h-6 w-6 text-milea dark:text-white" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Notification Settings</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Configure how you receive notifications</p>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            {Object.entries(notificationSettings).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {key === 'emailNotifications' && 'Receive notifications via email'}
                    {key === 'pushNotifications' && 'Receive push notifications in browser'}
                    {key === 'feedbackAlerts' && 'Get alerts for new feedback'}
                    {key === 'weeklyReports' && 'Receive weekly analytics reports'}
                  </p>
                </div>
                <button
                  type="button"
                  className={`${
                    value ? 'bg-milea' : 'bg-gray-200 dark:bg-gray-700'
                  } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-milea focus:ring-offset-2`}
                  onClick={() => handleNotificationChange(key as keyof NotificationSettings)}
                >
                  <span
                    className={`${
                      value ? 'translate-x-5' : 'translate-x-0'
                    } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Theme Settings */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-full bg-milea/10">
              <SunIcon className="h-6 w-6 text-milea dark:text-white" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Theme Settings</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Customize your dashboard appearance</p>
            </div>
          </div>
          <div className="mt-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Theme Mode</label>
              <div className="mt-2 flex space-x-4">
                <button
                  type="button"
                  className={`inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium ${
                    mode === 'light'
                      ? 'bg-milea text-white border-milea'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                  }`}
                  onClick={() => setMode('light')}
                >
                  <SunIcon className="h-5 w-5 mr-2" />
                  Light
                </button>
                <button
                  type="button"
                  className={`inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium ${
                    mode === 'dark'
                      ? 'bg-milea text-white border-milea'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                  }`}
                  onClick={() => setMode('dark')}
                >
                  <MoonIcon className="h-5 w-5 mr-2" />
                  Dark
                </button>
                <button
                  type="button"
                  className={`inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium ${
                    mode === 'system'
                      ? 'bg-milea text-white border-milea'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                  }`}
                  onClick={() => setMode('system')}
                >
                  System
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Accent Color</label>
              <div className="mt-2 flex space-x-2">
                {['#4F46E5', '#10B981', '#EF4444', '#F59E0B'].map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`w-8 h-8 rounded-full border-2 ${
                      accentColor === color ? 'border-gray-900 dark:border-white' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setAccentColor(color)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-full bg-milea/10">
              <ShieldCheckIcon className="h-6 w-6 text-milea dark:text-white" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Security Settings</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Manage your account security</p>
            </div>
          </div>
          <div className="mt-6">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-milea hover:bg-milea-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-milea"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* Language Settings */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-full bg-milea/10">
              <LanguageIcon className="h-6 w-6 text-milea dark:text-white" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Language Settings</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Choose your preferred language</p>
            </div>
          </div>
          <div className="mt-6">
            <select
              id="language"
              name="language"
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-milea focus:ring-milea sm:text-sm"
              defaultValue="en"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="it">Italian</option>
            </select>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-milea hover:bg-milea-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-milea"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Settings; 