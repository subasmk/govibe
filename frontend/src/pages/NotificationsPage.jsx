import React from 'react';
import { Bell, CheckCheck } from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';
import { NotificationItem } from '../components/cards/NotificationItem';
import { Button } from '../components/common/Button';

export const NotificationsPage = () => {
  const { notifications, unreadCount, markAllAsRead } = useNotifications();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <Bell className="h-6 w-6 text-brand-600" />
            Activity Notifications
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Community upvotes, answers to your questions, and group updates
          </p>
        </div>

        {unreadCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            icon={CheckCheck}
            onClick={markAllAsRead}
          >
            Mark all as read
          </Button>
        )}
      </div>

      {/* List */}
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center">
            <p className="text-xs text-slate-400">You're all caught up! No new notifications.</p>
          </div>
        ) : (
          notifications.map((notif) => (
            <NotificationItem key={notif.id} notification={notif} />
          ))
        )}
      </div>
    </div>
  );
};
