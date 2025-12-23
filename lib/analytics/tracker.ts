/**
 * ANALYTICS TRACKER
 * =================
 *
 * Tracks user interactions and usage patterns
 * All data stored locally in localStorage (privacy-first)
 */

const ANALYTICS_KEY = 'darwin-mfc-analytics';
const MAX_EVENTS = 1000; // Keep last 1000 events

export type EventType =
  | 'page_view'
  | 'search'
  | 'medication_view'
  | 'disease_view'
  | 'calculator_use'
  | 'protocol_view'
  | 'case_view'
  | 'export'
  | 'favorite_add'
  | 'favorite_remove'
  | 'note_create'
  | 'note_update';

export interface AnalyticsEvent {
  id: string;
  type: EventType;
  timestamp: number;
  data: Record<string, any>;
  sessionId: string;
}

export interface AnalyticsSession {
  id: string;
  startTime: number;
  endTime?: number;
  events: number;
}

// ==============================================
// SESSION MANAGEMENT
// ==============================================

let currentSession: AnalyticsSession | null = null;
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

function getOrCreateSession(): AnalyticsSession {
  const sessionKey = 'darwin-mfc-session';
  const stored = localStorage.getItem(sessionKey);

  if (stored) {
    const session = JSON.parse(stored) as AnalyticsSession;
    const timeSinceStart = Date.now() - session.startTime;

    // Continue session if less than timeout
    if (timeSinceStart < SESSION_TIMEOUT) {
      currentSession = session;
      return session;
    }
  }

  // Create new session
  const newSession: AnalyticsSession = {
    id: `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    startTime: Date.now(),
    events: 0,
  };

  localStorage.setItem(sessionKey, JSON.stringify(newSession));
  currentSession = newSession;
  return newSession;
}

function updateSession() {
  if (!currentSession) return;

  currentSession.events += 1;
  currentSession.endTime = Date.now();

  localStorage.setItem('darwin-mfc-session', JSON.stringify(currentSession));
}

// ==============================================
// EVENT TRACKING
// ==============================================

export function trackEvent(type: EventType, data: Record<string, any> = {}) {
  try {
    const session = getOrCreateSession();

    const event: AnalyticsEvent = {
      id: `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      timestamp: Date.now(),
      data,
      sessionId: session.id,
    };

    // Get existing events
    const events = getEvents();
    events.push(event);

    // Keep only last MAX_EVENTS
    const limited = events.slice(-MAX_EVENTS);

    // Save to localStorage
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(limited));

    // Update session
    updateSession();

    return event;
  } catch (error) {
    console.error('Failed to track event:', error);
    return null;
  }
}

// ==============================================
// QUERY FUNCTIONS
// ==============================================

export function getEvents(): AnalyticsEvent[] {
  try {
    const stored = localStorage.getItem(ANALYTICS_KEY);
    if (!stored) return [];

    const events = JSON.parse(stored);
    return Array.isArray(events) ? events : [];
  } catch (error) {
    console.error('Failed to load events:', error);
    return [];
  }
}

export function getEventsByType(type: EventType): AnalyticsEvent[] {
  return getEvents().filter(event => event.type === type);
}

export function getEventsByDateRange(startDate: Date, endDate: Date): AnalyticsEvent[] {
  const start = startDate.getTime();
  const end = endDate.getTime();

  return getEvents().filter(event =>
    event.timestamp >= start && event.timestamp <= end
  );
}

export function getEventsBySession(sessionId: string): AnalyticsEvent[] {
  return getEvents().filter(event => event.sessionId === sessionId);
}

// ==============================================
// AGGREGATION FUNCTIONS
// ==============================================

export function getMostViewedMedications(limit = 10): Array<{ id: string; name: string; views: number }> {
  const medicationViews = getEventsByType('medication_view');

  const counts = medicationViews.reduce((acc, event) => {
    const id = event.data.medicationId;
    const name = event.data.medicationName || id;

    if (!acc[id]) {
      acc[id] = { id, name, views: 0 };
    }
    acc[id].views += 1;
    return acc;
  }, {} as Record<string, { id: string; name: string; views: number }>);

  return Object.values(counts)
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
}

export function getMostViewedDiseases(limit = 10): Array<{ id: string; name: string; views: number }> {
  const diseaseViews = getEventsByType('disease_view');

  const counts = diseaseViews.reduce((acc, event) => {
    const id = event.data.diseaseId;
    const name = event.data.diseaseName || id;

    if (!acc[id]) {
      acc[id] = { id, name, views: 0 };
    }
    acc[id].views += 1;
    return acc;
  }, {} as Record<string, { id: string; name: string; views: number }>);

  return Object.values(counts)
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
}

export function getMostUsedCalculators(limit = 10): Array<{ id: string; name: string; uses: number }> {
  const calculatorUses = getEventsByType('calculator_use');

  const counts = calculatorUses.reduce((acc, event) => {
    const id = event.data.calculatorId;
    const name = event.data.calculatorName || id;

    if (!acc[id]) {
      acc[id] = { id, name, uses: 0 };
    }
    acc[id].uses += 1;
    return acc;
  }, {} as Record<string, { id: string; name: string; uses: number }>);

  return Object.values(counts)
    .sort((a, b) => b.uses - a.uses)
    .slice(0, limit);
}

export function getActivityByHour(): Record<number, number> {
  const events = getEvents();
  const byHour: Record<number, number> = {};

  // Initialize all hours
  for (let i = 0; i < 24; i++) {
    byHour[i] = 0;
  }

  events.forEach(event => {
    const hour = new Date(event.timestamp).getHours();
    byHour[hour] += 1;
  });

  return byHour;
}

export function getActivityByDayOfWeek(): Record<number, number> {
  const events = getEvents();
  const byDay: Record<number, number> = {};

  // Initialize all days (0 = Sunday, 6 = Saturday)
  for (let i = 0; i < 7; i++) {
    byDay[i] = 0;
  }

  events.forEach(event => {
    const day = new Date(event.timestamp).getDay();
    byDay[day] += 1;
  });

  return byDay;
}

export function getEventCountByType(): Record<EventType, number> {
  const events = getEvents();
  const counts: Partial<Record<EventType, number>> = {};

  events.forEach(event => {
    counts[event.type] = (counts[event.type] || 0) + 1;
  });

  return counts as Record<EventType, number>;
}

// ==============================================
// SESSION ANALYTICS
// ==============================================

export function getAllSessions(): AnalyticsSession[] {
  const events = getEvents();
  const sessionsMap = new Map<string, AnalyticsSession>();

  events.forEach(event => {
    if (!sessionsMap.has(event.sessionId)) {
      sessionsMap.set(event.sessionId, {
        id: event.sessionId,
        startTime: event.timestamp,
        endTime: event.timestamp,
        events: 0,
      });
    }

    const session = sessionsMap.get(event.sessionId)!;
    session.events += 1;
    session.endTime = Math.max(session.endTime || 0, event.timestamp);
  });

  return Array.from(sessionsMap.values())
    .sort((a, b) => b.startTime - a.startTime);
}

export function getAverageSessionDuration(): number {
  const sessions = getAllSessions();

  if (sessions.length === 0) return 0;

  const totalDuration = sessions.reduce((sum, session) => {
    const duration = (session.endTime || session.startTime) - session.startTime;
    return sum + duration;
  }, 0);

  return totalDuration / sessions.length;
}

export function getAverageEventsPerSession(): number {
  const sessions = getAllSessions();

  if (sessions.length === 0) return 0;

  const totalEvents = sessions.reduce((sum, session) => sum + session.events, 0);
  return totalEvents / sessions.length;
}

// ==============================================
// STATISTICS
// ==============================================

export function getAnalyticsStats() {
  const events = getEvents();
  const sessions = getAllSessions();

  return {
    totalEvents: events.length,
    totalSessions: sessions.length,
    averageSessionDuration: getAverageSessionDuration(),
    averageEventsPerSession: getAverageEventsPerSession(),
    eventsByType: getEventCountByType(),
    todayEvents: getEventsByDateRange(
      new Date(new Date().setHours(0, 0, 0, 0)),
      new Date()
    ).length,
    weekEvents: getEventsByDateRange(
      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      new Date()
    ).length,
  };
}

// ==============================================
// CLEAR ANALYTICS
// ==============================================

export function clearAnalytics() {
  localStorage.removeItem(ANALYTICS_KEY);
  localStorage.removeItem('darwin-mfc-session');
  currentSession = null;
}

export function exportAnalytics(): AnalyticsEvent[] {
  return getEvents();
}
