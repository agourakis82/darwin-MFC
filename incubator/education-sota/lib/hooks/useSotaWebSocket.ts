/**
 * DARWIN-MFC SOTA WEBSOCKET HOOK
 * ==============================
 *
 * React hook for managing SOTA WebSocket connection.
 * Provides reactive connection status and real-time event handling.
 */

'use client';

import { useEffect, useCallback, useRef } from 'react';
import { sotaWebSocket } from '../api/sota-websocket';
import { useSotaStore } from '../store/sotaStore';
import type { SOTAAdaptiveFeedback, SOTAProgressUpdate } from '../types/sota';

// =============================================================================
// TYPES
// =============================================================================

interface UseSotaWebSocketOptions {
  autoConnect?: boolean;
  onAdaptiveFeedback?: (feedback: SOTAAdaptiveFeedback) => void;
  onDifficultyAdjustment?: (data: { newDifficulty: number; reason: string }) => void;
  onProgressUpdate?: (progress: SOTAProgressUpdate) => void;
  onBreakSuggestion?: (data: { duration: number; reason: string }) => void;
  onAchievementUnlocked?: (data: { achievementId: string; title: string }) => void;
  onConnect?: () => void;
  onDisconnect?: (data: { reason: string }) => void;
  onError?: (data: { message: string; code?: string }) => void;
}

interface UseSotaWebSocketReturn {
  isConnected: boolean;
  isConnecting: boolean;
  reconnectAttempts: number;
  connect: () => void;
  disconnect: () => void;
  sendProgress: (progress: SOTAProgressUpdate) => void;
  sendResponse: (response: {
    questionId: string;
    selectedOption: number;
    timeSpent: number;
    confidence?: number;
  }) => void;
  requestDifficultyAdjustment: (direction: 'easier' | 'harder') => void;
  sendEngagementMetrics: (metrics: {
    focusTime: number;
    idleTime: number;
    tabSwitches: number;
    scrollDepth: number;
  }) => void;
}

// =============================================================================
// HOOK IMPLEMENTATION
// =============================================================================

export function useSotaWebSocket(
  options: UseSotaWebSocketOptions = {}
): UseSotaWebSocketReturn {
  const {
    autoConnect = true,
    onAdaptiveFeedback,
    onDifficultyAdjustment,
    onProgressUpdate,
    onBreakSuggestion,
    onAchievementUnlocked,
    onConnect,
    onDisconnect,
    onError,
  } = options;

  const { authContext, connectionStatus, connectWebSocket, disconnectWebSocket } = useSotaStore();
  const unsubscribeRef = useRef<(() => void)[]>([]);

  // ===========================================================================
  // CONNECTION MANAGEMENT
  // ===========================================================================

  const connect = useCallback(() => {
    if (authContext.isAuthenticated && authContext.token) {
      connectWebSocket();
    }
  }, [authContext.isAuthenticated, authContext.token, connectWebSocket]);

  const disconnect = useCallback(() => {
    disconnectWebSocket();
  }, [disconnectWebSocket]);

  // ===========================================================================
  // EVENT HANDLERS SETUP
  // ===========================================================================

  useEffect(() => {
    // Clear previous subscriptions
    unsubscribeRef.current.forEach((unsub) => unsub());
    unsubscribeRef.current = [];

    // Set up event handlers
    if (onAdaptiveFeedback) {
      unsubscribeRef.current.push(sotaWebSocket.onAdaptiveFeedback(onAdaptiveFeedback));
    }

    if (onDifficultyAdjustment) {
      unsubscribeRef.current.push(sotaWebSocket.onDifficultyAdjustment(onDifficultyAdjustment));
    }

    if (onProgressUpdate) {
      unsubscribeRef.current.push(sotaWebSocket.onProgressUpdate(onProgressUpdate));
    }

    if (onBreakSuggestion) {
      unsubscribeRef.current.push(sotaWebSocket.onBreakSuggestion(onBreakSuggestion));
    }

    if (onAchievementUnlocked) {
      unsubscribeRef.current.push(sotaWebSocket.onAchievementUnlocked(onAchievementUnlocked));
    }

    if (onConnect) {
      unsubscribeRef.current.push(sotaWebSocket.onConnect(onConnect));
    }

    if (onDisconnect) {
      unsubscribeRef.current.push(sotaWebSocket.onDisconnect(onDisconnect));
    }

    if (onError) {
      unsubscribeRef.current.push(sotaWebSocket.onError(onError));
    }

    // Cleanup on unmount
    return () => {
      unsubscribeRef.current.forEach((unsub) => unsub());
    };
  }, [
    onAdaptiveFeedback,
    onDifficultyAdjustment,
    onProgressUpdate,
    onBreakSuggestion,
    onAchievementUnlocked,
    onConnect,
    onDisconnect,
    onError,
  ]);

  // ===========================================================================
  // AUTO CONNECT
  // ===========================================================================

  useEffect(() => {
    if (autoConnect && authContext.isAuthenticated && !connectionStatus.isWebSocketConnected) {
      connect();
    }

    return () => {
      // Don't disconnect on unmount - let the store manage connection
    };
  }, [autoConnect, authContext.isAuthenticated, connectionStatus.isWebSocketConnected, connect]);

  // ===========================================================================
  // SEND METHODS
  // ===========================================================================

  const sendProgress = useCallback((progress: SOTAProgressUpdate) => {
    sotaWebSocket.sendProgress(progress);
  }, []);

  const sendResponse = useCallback(
    (response: {
      questionId: string;
      selectedOption: number;
      timeSpent: number;
      confidence?: number;
    }) => {
      sotaWebSocket.sendResponse(response);
    },
    []
  );

  const requestDifficultyAdjustment = useCallback((direction: 'easier' | 'harder') => {
    sotaWebSocket.requestDifficultyAdjustment(direction);
  }, []);

  const sendEngagementMetrics = useCallback(
    (metrics: {
      focusTime: number;
      idleTime: number;
      tabSwitches: number;
      scrollDepth: number;
    }) => {
      sotaWebSocket.sendEngagementMetrics(metrics);
    },
    []
  );

  // ===========================================================================
  // RETURN
  // ===========================================================================

  const status = sotaWebSocket.getConnectionStatus();

  return {
    isConnected: connectionStatus.isWebSocketConnected,
    isConnecting: status.isConnecting,
    reconnectAttempts: status.reconnectAttempts,
    connect,
    disconnect,
    sendProgress,
    sendResponse,
    requestDifficultyAdjustment,
    sendEngagementMetrics,
  };
}

// =============================================================================
// ADDITIONAL HOOKS
// =============================================================================

/**
 * Hook for tracking engagement metrics automatically
 */
export function useSotaEngagementTracking() {
  const { sendEngagementMetrics } = useSotaWebSocket({ autoConnect: false });
  const metricsRef = useRef({
    focusTime: 0,
    idleTime: 0,
    tabSwitches: 0,
    scrollDepth: 0,
  });
  const lastActivityRef = useRef(Date.now());

  useEffect(() => {
    // Track focus time
    const focusInterval = setInterval(() => {
      if (document.hasFocus()) {
        metricsRef.current.focusTime += 1;
      }
    }, 1000);

    // Track idle time
    const idleInterval = setInterval(() => {
      const now = Date.now();
      if (now - lastActivityRef.current > 30000) {
        metricsRef.current.idleTime += 1;
      }
    }, 1000);

    // Track activity
    const handleActivity = () => {
      lastActivityRef.current = Date.now();
    };

    // Track tab switches
    const handleVisibilityChange = () => {
      if (document.hidden) {
        metricsRef.current.tabSwitches += 1;
      }
    };

    // Track scroll depth
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      metricsRef.current.scrollDepth = Math.max(metricsRef.current.scrollDepth, scrollPercent);
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Send metrics every minute
    const sendInterval = setInterval(() => {
      if (metricsRef.current.focusTime > 0) {
        sendEngagementMetrics(metricsRef.current);
        // Reset metrics
        metricsRef.current = {
          focusTime: 0,
          idleTime: 0,
          tabSwitches: 0,
          scrollDepth: 0,
        };
      }
    }, 60000);

    return () => {
      clearInterval(focusInterval);
      clearInterval(idleInterval);
      clearInterval(sendInterval);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [sendEngagementMetrics]);
}
