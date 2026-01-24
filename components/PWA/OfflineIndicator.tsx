'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, Wifi } from 'lucide-react';

/**
 * Offline Indicator Component
 * Shows when user loses internet connection
 */
export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Set initial state
    setIsOnline(navigator.onLine);

    // Listen for online/offline events
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="fixed top-0 left-0 right-0 bg-amber-500 text-white z-40"
      >
        <div className="flex items-center justify-center gap-2 px-4 py-3">
          <WifiOff className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm font-medium">
            You're offline - some features may be limited
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default OfflineIndicator;
