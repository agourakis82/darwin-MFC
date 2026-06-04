/**
 * DARWIN-MFC SOTA WEBSOCKET CLIENT
 * =================================
 *
 * WebSocket client for real-time communication with SOTA backend.
 * Handles connection management, reconnection, and event handling.
 */

import { SOTA_WS_URL, SOTA_ENABLED, buildWebSocketUrl } from './sota-endpoints';
import {
  SOTAWebSocketEvent,
  SOTAWebSocketEventType,
  SOTAAdaptiveFeedback,
  SOTAProgressUpdate,
  SOTASessionType,
} from '../types/sota';

// =============================================================================
// TYPES
// =============================================================================

type WebSocketEventHandler<T = unknown> = (data: T) => void;

interface WebSocketEventHandlers {
  session_start: WebSocketEventHandler<{ sessionId: string }>;
  session_end: WebSocketEventHandler<{ sessionId: string; summary: unknown }>;
  learning_progress: WebSocketEventHandler<SOTAProgressUpdate>;
  adaptive_feedback: WebSocketEventHandler<SOTAAdaptiveFeedback>;
  difficulty_adjustment: WebSocketEventHandler<{ newDifficulty: number; reason: string }>;
  engagement_alert: WebSocketEventHandler<{ type: string; message: string }>;
  break_suggestion: WebSocketEventHandler<{ duration: number; reason: string }>;
  achievement_unlocked: WebSocketEventHandler<{ achievementId: string; title: string }>;
  sync_complete: WebSocketEventHandler<{ timestamp: string }>;
  error: WebSocketEventHandler<{ message: string; code?: string }>;
  connect: WebSocketEventHandler<void>;
  disconnect: WebSocketEventHandler<{ reason: string }>;
  reconnecting: WebSocketEventHandler<{ attempt: number }>;
}

interface ConnectionOptions {
  autoReconnect?: boolean;
  maxReconnectAttempts?: number;
  reconnectDelay?: number;
  heartbeatInterval?: number;
}

// =============================================================================
// WEBSOCKET CLIENT CLASS
// =============================================================================

class SOTAWebSocketClient {
  private socket: WebSocket | null = null;
  private token: string | null = null;
  private handlers: Partial<Record<keyof WebSocketEventHandlers, Set<WebSocketEventHandler>>> = {};
  private isConnecting = false;
  private isConnected = false;
  private reconnectAttempts = 0;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private heartbeatTimer: ReturnType<typeof setInterval> | null = null;
  private options: Required<ConnectionOptions>;
  private messageQueue: Array<{ event: string; data: unknown }> = [];

  constructor() {
    this.options = {
      autoReconnect: true,
      maxReconnectAttempts: 5,
      reconnectDelay: 1000,
      heartbeatInterval: 30000,
    };
  }

  // ===========================================================================
  // CONNECTION MANAGEMENT
  // ===========================================================================

  /**
   * Check if WebSocket is enabled
   */
  isEnabled(): boolean {
    return SOTA_ENABLED && typeof WebSocket !== 'undefined';
  }

  /**
   * Connect to SOTA WebSocket server
   */
  connect(token: string, options?: ConnectionOptions): void {
    if (!this.isEnabled()) {
      console.warn('[SOTA WebSocket] WebSocket is disabled or not supported');
      return;
    }

    if (this.isConnecting || this.isConnected) {
      console.warn('[SOTA WebSocket] Already connected or connecting');
      return;
    }

    this.token = token;
    this.options = { ...this.options, ...options };
    this.establishConnection();
  }

  /**
   * Disconnect from WebSocket server
   */
  disconnect(): void {
    this.clearTimers();
    this.reconnectAttempts = 0;

    if (this.socket) {
      this.socket.close(1000, 'Client disconnect');
      this.socket = null;
    }

    this.isConnected = false;
    this.isConnecting = false;
    this.emit('disconnect', { reason: 'Client initiated' });
  }

  /**
   * Check if connected
   */
  getConnectionStatus(): {
    isConnected: boolean;
    isConnecting: boolean;
    reconnectAttempts: number;
  } {
    return {
      isConnected: this.isConnected,
      isConnecting: this.isConnecting,
      reconnectAttempts: this.reconnectAttempts,
    };
  }

  // ===========================================================================
  // INTERNAL CONNECTION HANDLING
  // ===========================================================================

  private establishConnection(): void {
    if (!this.token) {
      console.error('[SOTA WebSocket] No token provided');
      return;
    }

    this.isConnecting = true;

    try {
      const url = buildWebSocketUrl(this.token);
      this.socket = new WebSocket(url);

      this.socket.onopen = this.handleOpen.bind(this);
      this.socket.onclose = this.handleClose.bind(this);
      this.socket.onerror = this.handleError.bind(this);
      this.socket.onmessage = this.handleMessage.bind(this);
    } catch (error) {
      console.error('[SOTA WebSocket] Connection error:', error);
      this.isConnecting = false;
      this.scheduleReconnect();
    }
  }

  private handleOpen(): void {
    console.log('[SOTA WebSocket] Connected');
    this.isConnected = true;
    this.isConnecting = false;
    this.reconnectAttempts = 0;

    // Start heartbeat
    this.startHeartbeat();

    // Process queued messages
    this.processMessageQueue();

    // Emit connect event
    this.emit('connect', undefined);
  }

  private handleClose(event: CloseEvent): void {
    console.log('[SOTA WebSocket] Disconnected:', event.code, event.reason);
    this.isConnected = false;
    this.isConnecting = false;
    this.clearTimers();

    // Emit disconnect event
    this.emit('disconnect', { reason: event.reason || 'Connection closed' });

    // Attempt reconnection if not intentional
    if (event.code !== 1000 && this.options.autoReconnect) {
      this.scheduleReconnect();
    }
  }

  private handleError(event: Event): void {
    console.error('[SOTA WebSocket] Error:', event);
    this.emit('error', { message: 'WebSocket error occurred' });
  }

  private handleMessage(event: MessageEvent): void {
    try {
      const message: SOTAWebSocketEvent = JSON.parse(event.data);
      this.emitNetworkEvent(message.type, message.data);
    } catch (error) {
      console.error('[SOTA WebSocket] Failed to parse message:', error);
    }
  }

  // ===========================================================================
  // RECONNECTION
  // ===========================================================================

  private scheduleReconnect(): void {
    if (this.reconnectAttempts >= this.options.maxReconnectAttempts) {
      console.error('[SOTA WebSocket] Max reconnection attempts reached');
      this.emit('error', { message: 'Max reconnection attempts reached' });
      return;
    }

    this.reconnectAttempts++;
    const delay = this.options.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);

    console.log(`[SOTA WebSocket] Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts})`);
    this.emit('reconnecting', { attempt: this.reconnectAttempts });

    this.reconnectTimer = setTimeout(() => {
      this.establishConnection();
    }, delay);
  }

  // ===========================================================================
  // HEARTBEAT
  // ===========================================================================

  private startHeartbeat(): void {
    this.heartbeatTimer = setInterval(() => {
      if (this.isConnected && this.socket) {
        this.send('heartbeat', { timestamp: new Date().toISOString() });
      }
    }, this.options.heartbeatInterval);
  }

  private clearTimers(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }

  // ===========================================================================
  // EVENT HANDLING
  // ===========================================================================

  /**
   * Subscribe to an event
   */
  on<K extends keyof WebSocketEventHandlers>(
    event: K,
    handler: WebSocketEventHandlers[K]
  ): () => void {
    if (!this.handlers[event]) {
      this.handlers[event] = new Set();
    }
    this.handlers[event]!.add(handler as WebSocketEventHandler);

    // Return unsubscribe function
    return () => {
      this.handlers[event]?.delete(handler as WebSocketEventHandler);
    };
  }

  /**
   * Remove event handler
   */
  off<K extends keyof WebSocketEventHandlers>(
    event: K,
    handler: WebSocketEventHandlers[K]
  ): void {
    this.handlers[event]?.delete(handler as WebSocketEventHandler);
  }

  /**
   * Emit an event to handlers
   */
  private emit<K extends keyof WebSocketEventHandlers>(
    event: K,
    data: Parameters<WebSocketEventHandlers[K]>[0]
  ): void {
    this.emitNetworkEvent(event, data);
  }

  private emitNetworkEvent(event: keyof WebSocketEventHandlers, data: unknown): void {
    this.handlers[event]?.forEach((handler) => {
      try {
        (handler as WebSocketEventHandler)(data);
      } catch (error) {
        console.error(`[SOTA WebSocket] Handler error for ${event}:`, error);
      }
    });
  }

  // ===========================================================================
  // SENDING MESSAGES
  // ===========================================================================

  /**
   * Send a message to the server
   */
  send(event: string, data: unknown): void {
    const message = JSON.stringify({ type: event, data, timestamp: new Date().toISOString() });

    if (this.isConnected && this.socket) {
      this.socket.send(message);
    } else {
      // Queue message for later
      this.messageQueue.push({ event, data });
    }
  }

  /**
   * Process queued messages after reconnection
   */
  private processMessageQueue(): void {
    while (this.messageQueue.length > 0) {
      const { event, data } = this.messageQueue.shift()!;
      this.send(event, data);
    }
  }

  // ===========================================================================
  // SESSION EVENTS
  // ===========================================================================

  /**
   * Notify server of session start
   */
  startSession(sessionData: {
    sessionType: SOTASessionType;
    moduleId?: string;
    contentId?: string;
  }): void {
    this.send('session_start', sessionData);
  }

  /**
   * Send learning progress update
   */
  sendProgress(progress: SOTAProgressUpdate): void {
    this.send('learning_progress', progress);
  }

  /**
   * Send quiz/assessment response
   */
  sendResponse(response: {
    questionId: string;
    selectedOption: number;
    timeSpent: number;
    confidence?: number;
  }): void {
    this.send('question_response', response);
  }

  /**
   * Notify server of session end
   */
  endSession(sessionId: string): void {
    this.send('session_end', { sessionId });
  }

  /**
   * Request difficulty adjustment
   */
  requestDifficultyAdjustment(direction: 'easier' | 'harder'): void {
    this.send('difficulty_request', { direction });
  }

  /**
   * Send engagement metrics
   */
  sendEngagementMetrics(metrics: {
    focusTime: number;
    idleTime: number;
    tabSwitches: number;
    scrollDepth: number;
  }): void {
    this.send('engagement_metrics', metrics);
  }

  // ===========================================================================
  // CONVENIENCE EVENT HANDLERS
  // ===========================================================================

  /**
   * Subscribe to adaptive feedback events
   */
  onAdaptiveFeedback(handler: (feedback: SOTAAdaptiveFeedback) => void): () => void {
    return this.on('adaptive_feedback', handler);
  }

  /**
   * Subscribe to difficulty adjustment events
   */
  onDifficultyAdjustment(
    handler: (data: { newDifficulty: number; reason: string }) => void
  ): () => void {
    return this.on('difficulty_adjustment', handler);
  }

  /**
   * Subscribe to progress update events
   */
  onProgressUpdate(handler: (progress: SOTAProgressUpdate) => void): () => void {
    return this.on('learning_progress', handler);
  }

  /**
   * Subscribe to break suggestion events
   */
  onBreakSuggestion(handler: (data: { duration: number; reason: string }) => void): () => void {
    return this.on('break_suggestion', handler);
  }

  /**
   * Subscribe to achievement events
   */
  onAchievementUnlocked(
    handler: (data: { achievementId: string; title: string }) => void
  ): () => void {
    return this.on('achievement_unlocked', handler);
  }

  /**
   * Subscribe to connection events
   */
  onConnect(handler: () => void): () => void {
    return this.on('connect', handler);
  }

  /**
   * Subscribe to disconnection events
   */
  onDisconnect(handler: (data: { reason: string }) => void): () => void {
    return this.on('disconnect', handler);
  }

  /**
   * Subscribe to reconnection events
   */
  onReconnecting(handler: (data: { attempt: number }) => void): () => void {
    return this.on('reconnecting', handler);
  }

  /**
   * Subscribe to error events
   */
  onError(handler: (data: { message: string; code?: string }) => void): () => void {
    return this.on('error', handler);
  }
}

// =============================================================================
// SINGLETON INSTANCE
// =============================================================================

export const sotaWebSocket = new SOTAWebSocketClient();

// =============================================================================
// CONVENIENCE EXPORTS
// =============================================================================

export { SOTAWebSocketClient };
