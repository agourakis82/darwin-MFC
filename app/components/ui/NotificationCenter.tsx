import React, { useState } from 'react';
import { Trash2, Archive, Check, ListChecks, Bell } from 'lucide-react';

export type NotificationType = 'protocol_update' | 'new_evidence' | 'mention' | 'system';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface NotificationCenterProps {
  notifications: Notification[];
  onMarkAsRead?: (id: string) => void;
  onMarkAllAsRead?: () => void;
  onDelete?: (id: string) => void;
  onArchive?: (id: string) => void;
  maxHeight?: string;
}

const typeConfig = {
  protocol_update: {
    color: 'bg-blue-500/10 border-blue-500/30',
    badge: 'bg-blue-500/20 text-blue-400',
  },
  new_evidence: {
    color: 'bg-green-500/10 border-green-500/30',
    badge: 'bg-green-500/20 text-green-400',
  },
  mention: {
    color: 'bg-purple-500/10 border-purple-500/30',
    badge: 'bg-purple-500/20 text-purple-400',
  },
  system: {
    color: 'bg-yellow-500/10 border-yellow-500/30',
    badge: 'bg-yellow-500/20 text-yellow-400',
  },
};

const typeLabels: Record<NotificationType, string> = {
  protocol_update: 'Protocol Update',
  new_evidence: 'New Evidence',
  mention: 'Mention',
  system: 'System',
};

export function NotificationCenter({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDelete,
  onArchive,
  maxHeight = 'max-h-96',
}: NotificationCenterProps) {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const unreadCount = notifications.filter(n => !n.read).length;
  const filteredNotifications =
    filter === 'unread'
      ? notifications.filter(n => !n.read)
      : notifications;

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="flex flex-col h-full bg-neutral-800 border border-neutral-700 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="border-b border-neutral-700 p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="flex items-center gap-2 font-semibold text-neutral-200">
            <Bell size={18} />
            Notifications
            {unreadCount > 0 && (
              <span className="ml-2 px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full font-mono">
                {unreadCount}
              </span>
            )}
          </h2>
          {unreadCount > 0 && (
            <button
              onClick={onMarkAllAsRead}
              className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
            >
              <ListChecks size={14} />
              Mark all read
            </button>
          )}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 text-xs rounded transition-colors ${
              filter === 'all'
                ? 'bg-blue-500/30 text-blue-300'
                : 'text-neutral-400 hover:text-neutral-300'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-3 py-1 text-xs rounded transition-colors ${
              filter === 'unread'
                ? 'bg-blue-500/30 text-blue-300'
                : 'text-neutral-400 hover:text-neutral-300'
            }`}
          >
            Unread
          </button>
        </div>
      </div>

      {/* Notifications list */}
      <div className={`flex-1 overflow-y-auto ${maxHeight}`}>
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-neutral-500">
            <Bell size={32} className="mb-2 opacity-50" />
            <p className="text-sm">No notifications</p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-700">
            {filteredNotifications.map((notification) => {
              const config = typeConfig[notification.type];

              return (
                <div
                  key={notification.id}
                  className={`p-4 border-l-4 transition-all ${config.color} ${
                    !notification.read ? 'bg-neutral-700/50' : ''
                  } hover:bg-neutral-700/30`}
                >
                  <div className="flex items-start gap-3">
                    {/* Icon/Badge */}
                    <div className="flex-shrink-0 mt-0.5">
                      {notification.icon ? (
                        <div className="text-lg">{notification.icon}</div>
                      ) : (
                        <span className={`px-2 py-1 text-xs font-medium rounded ${config.badge}`}>
                          {typeLabels[notification.type]}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-neutral-200 text-sm">
                          {notification.title}
                          {!notification.read && (
                            <span className="ml-2 inline-block w-2 h-2 bg-blue-500 rounded-full" />
                          )}
                        </h3>
                        <span className="text-xs text-neutral-500 ml-2 flex-shrink-0">
                          {formatTime(notification.createdAt)}
                        </span>
                      </div>

                      <p className="text-sm text-neutral-400 mt-1">{notification.message}</p>

                      {/* Action button */}
                      {notification.action && (
                        <button
                          onClick={notification.action.onClick}
                          className="mt-2 text-xs text-blue-400 hover:text-blue-300 transition-colors font-medium"
                        >
                          {notification.action.label}
                        </button>
                      )}

                      {/* Actions */}
                      <div className="flex gap-2 mt-3">
                        {!notification.read && (
                          <button
                            onClick={() => onMarkAsRead?.(notification.id)}
                            className="p-1 text-neutral-500 hover:text-neutral-300 transition-colors"
                            title="Mark as read"
                          >
                            <Check size={14} />
                          </button>
                        )}
                        <button
                          onClick={() => onArchive?.(notification.id)}
                          className="p-1 text-neutral-500 hover:text-neutral-300 transition-colors"
                          title="Archive"
                        >
                          <Archive size={14} />
                        </button>
                        <button
                          onClick={() => onDelete?.(notification.id)}
                          className="p-1 text-neutral-500 hover:text-red-400 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
