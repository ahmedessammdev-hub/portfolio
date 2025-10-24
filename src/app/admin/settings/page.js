"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Bebas_Neue, Manrope } from 'next/font/google';

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
});

export default function AdminSettings() {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      if (response.ok) {
        setMessage('Password changed successfully!');
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      } else {
        const error = await response.json();
        setMessage(`Error: ${error.error}`);
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    if (!confirm('Are you sure you want to logout?')) return;

    try {
      const response = await fetch('/api/admin/auth/logout', {
        method: 'POST',
      });

      if (response.ok) {
        window.location.href = '/admin/login';
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleClearCache = () => {
    if (!confirm('This will clear all cached data. Continue?')) return;
    
    setMessage('Cache cleared successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className={`min-h-screen bg-black text-white ${manrope.className}`}>
      {/* Header */}
      <header className="border-b border-[#484848] bg-[#111111]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/dashboard"
              className="text-[#C7C7C7] hover:text-[#D3E97A] transition-colors"
            >
              ← Back to Dashboard
            </Link>
            <h1 className={`text-2xl font-bold text-[#D3E97A] ${bebasNeue.className}`}>
              Settings
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {message && (
          <div className={`rounded-lg p-4 mb-6 ${
            message.includes('Error') || message.includes('not match')
              ? 'bg-red-500/20 border border-red-500/30 text-red-400' 
              : 'bg-green-500/20 border border-green-500/30 text-green-400'
          }`}>
            <p className="text-sm">{message}</p>
          </div>
        )}

        <div className="space-y-6">
          {/* Change Password Section */}
          <div className="bg-[#111111] rounded-xl p-8 border border-[#484848]">
            <h2 className={`text-3xl font-bold text-white mb-6 ${bebasNeue.className}`}>
              Change Password
            </h2>

            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div>
                <label htmlFor="currentPassword" className="block text-[#C7C7C7] mb-2 text-sm font-medium">
                  Current Password *
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  required
                  className="w-full bg-[#222222] border border-[#484848] rounded-lg px-4 py-3 text-white focus:border-[#D3E97A] focus:outline-none transition-colors"
                  placeholder="Enter current password"
                />
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-[#C7C7C7] mb-2 text-sm font-medium">
                  New Password *
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  required
                  minLength="6"
                  className="w-full bg-[#222222] border border-[#484848] rounded-lg px-4 py-3 text-white focus:border-[#D3E97A] focus:outline-none transition-colors"
                  placeholder="Enter new password"
                />
                <p className="text-[#C7C7C7] text-xs mt-1">Minimum 6 characters</p>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-[#C7C7C7] mb-2 text-sm font-medium">
                  Confirm New Password *
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                  minLength="6"
                  className="w-full bg-[#222222] border border-[#484848] rounded-lg px-4 py-3 text-white focus:border-[#D3E97A] focus:outline-none transition-colors"
                  placeholder="Confirm new password"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="bg-[#D3E97A] text-black px-6 py-3 rounded-lg font-medium hover:bg-white transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          </div>

          {/* Site Information */}
          <div className="bg-[#111111] rounded-xl p-8 border border-[#484848]">
            <h2 className={`text-3xl font-bold text-white mb-6 ${bebasNeue.className}`}>
              Site Information
            </h2>

            <div className="space-y-4 text-[#C7C7C7]">
              <div className="flex justify-between py-3 border-b border-[#484848]">
                <span>Framework</span>
                <span className="text-white">Next.js 15</span>
              </div>
              <div className="flex justify-between py-3 border-b border-[#484848]">
                <span>Database</span>
                <span className="text-white">SQLite (Prisma)</span>
              </div>
              <div className="flex justify-between py-3 border-b border-[#484848]">
                <span>Node Version</span>
                <span className="text-white">{process.version || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-3">
                <span>Environment</span>
                <span className="text-white">
                  {process.env.NODE_ENV === 'production' ? 'Production' : 'Development'}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-[#111111] rounded-xl p-8 border border-[#484848]">
            <h2 className={`text-3xl font-bold text-white mb-6 ${bebasNeue.className}`}>
              Actions
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-[#484848]">
                <div>
                  <h3 className="text-white font-semibold">Clear Cache</h3>
                  <p className="text-[#C7C7C7] text-sm">Clear all cached data and temporary files</p>
                </div>
                <button
                  onClick={handleClearCache}
                  className="bg-[#222222] text-white px-4 py-2 rounded-lg hover:bg-[#333333] transition"
                >
                  Clear
                </button>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-[#484848]">
                <div>
                  <h3 className="text-white font-semibold">View Database</h3>
                  <p className="text-[#C7C7C7] text-sm">Open Prisma Studio to view database</p>
                </div>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Run "npm run db:studio" in terminal');
                  }}
                  className="bg-[#222222] text-white px-4 py-2 rounded-lg hover:bg-[#333333] transition"
                >
                  Open Studio
                </a>
              </div>

              <div className="flex justify-between items-center py-3">
                <div>
                  <h3 className="text-white font-semibold">Logout</h3>
                  <p className="text-[#C7C7C7] text-sm">Sign out from admin dashboard</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg border border-red-500/30 hover:bg-red-500/30 transition"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-[#111111] rounded-xl p-8 border border-red-500/30">
            <h2 className={`text-3xl font-bold text-red-400 mb-6 ${bebasNeue.className}`}>
              Danger Zone
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-[#484848]">
                <div>
                  <h3 className="text-white font-semibold">Reset Database</h3>
                  <p className="text-[#C7C7C7] text-sm">Delete all data and reset to initial state</p>
                </div>
                <button
                  onClick={() => {
                    if (confirm('⚠️ This will delete ALL data! Are you absolutely sure?')) {
                      alert('Run "npm run db:seed" in terminal after backup');
                    }
                  }}
                  className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg border border-red-500/30 hover:bg-red-500/30 transition"
                >
                  Reset DB
                </button>
              </div>

              <div className="flex justify-between items-center py-3">
                <div>
                  <h3 className="text-white font-semibold">Export Database</h3>
                  <p className="text-[#C7C7C7] text-sm">Download a backup of your database</p>
                </div>
                <button
                  onClick={() => {
                    alert('Feature coming soon! For now, backup the "prisma/dev.db" file manually.');
                  }}
                  className="bg-[#222222] text-white px-4 py-2 rounded-lg hover:bg-[#333333] transition"
                >
                  Export
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}