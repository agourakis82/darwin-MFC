'use client';

/**
 * AUTHENTICATION TEST PAGE
 * =========================
 * Test page for Supabase authentication
 */

import React, { useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { PageContainer } from '@/app/components/Layout/Containers';
import SupabaseSignIn from '@/app/components/Auth/SupabaseSignIn';
import { LogIn, LogOut, User, Loader2 } from 'lucide-react';

export default function AuthTestPage() {
  const { user, profile, loading, isAuthenticated, signOut } = useAuth();
  const [showModal, setShowModal] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <PageContainer className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          🔐 Authentication Test
        </h1>

        {/* Status Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Status
          </h2>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${isAuthenticated ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-gray-700 dark:text-gray-300">
                {isAuthenticated ? '✅ Authenticated' : '❌ Not authenticated'}
              </span>
            </div>

            {user && (
              <>
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                  <p className="text-gray-900 dark:text-white font-medium">{user.email}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">User ID</p>
                  <p className="text-gray-900 dark:text-white font-mono text-sm">{user.id}</p>
                </div>

                {profile && (
                  <>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                      <p className="text-gray-900 dark:text-white">{profile.full_name || 'Not set'}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">XP</p>
                      <p className="text-gray-900 dark:text-white">{profile.xp || 0}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Level</p>
                      <p className="text-gray-900 dark:text-white">{profile.level || 1}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Streak</p>
                      <p className="text-gray-900 dark:text-white">{profile.streak_days || 0} days</p>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Actions
          </h2>

          {isAuthenticated ? (
            <button
              onClick={() => signOut()}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          ) : (
            <button
              onClick={() => setShowModal(true)}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              <LogIn className="w-5 h-5" />
              Sign In / Sign Up
            </button>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
            📋 Test Instructions
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-800 dark:text-blue-200">
            <li>Click "Sign In / Sign Up" button</li>
            <li>Try creating a new account with email/password</li>
            <li>Check if profile is created automatically</li>
            <li>Sign out and sign in again</li>
            <li>Try OAuth with Google or GitHub (optional)</li>
          </ol>
        </div>

        {/* Debug Info */}
        <details className="mt-6 bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
          <summary className="cursor-pointer font-semibold text-gray-900 dark:text-white">
            🐛 Debug Info
          </summary>
          <pre className="mt-4 text-xs overflow-auto bg-gray-900 text-green-400 p-4 rounded">
            {JSON.stringify({ user, profile, loading, isAuthenticated }, null, 2)}
          </pre>
        </details>
      </div>

      {/* Sign In Modal */}
      <SupabaseSignIn isOpen={showModal} onClose={() => setShowModal(false)} />
    </PageContainer>
  );
}

