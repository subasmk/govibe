import React from 'react';
import { Link } from 'react-router-dom';
import { ThumbsUp, MessageSquare, ShieldAlert, Users, Sparkles, Clock, Check } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

export const NotificationItem = ({ notification }) => {
  const { markAsRead } = useNotifications();

  const getIcon = () => {
    switch (notification.type) {
      case 'upvote':
        return <ThumbsUp className="w-4 h-4 text-emerald-600" />;
      case 'comment':
        return <MessageSquare className="w-4 h-4 text-brand-600" />;
      case 'safety':
        return <ShieldAlert className="w-4 h-4 text-rose-600" />;
      case 'group':
        return <Users className="w-4 h-4 text-indigo-600" />;
      default:
        return <Sparkles className="w-4 h-4 text-amber-600" />;
    }
  };

  const getBg = () => {
    switch (notification.type) {
      case 'upvote':
        return 'bg-emerald-50';
      case 'comment':
        return 'bg-brand-50';
      case 'safety':
        return 'bg-rose-50';
      case 'group':
        return 'bg-indigo-50';
      default:
        return 'bg-amber-50';
    }
  };

  return (
    <div
      onClick={() => markAsRead(notification.id)}
      className={`flex items-start justify-between gap-3.5 rounded-2xl p-4 transition-all duration-200 border ${
        notification.read
          ? 'bg-white border-slate-100 opacity-80'
          : 'bg-brand-50/30 border-brand-100 shadow-soft'
      }`}
    >
      <div className="flex items-start gap-3.5">
        <div className={`rounded-xl p-2.5 shrink-0 ${getBg()}`}>
          {getIcon()}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <h4 className="text-xs font-bold text-slate-900">{notification.title}</h4>
            {!notification.read && (
              <span className="h-1.5 w-1.5 rounded-full bg-brand-600" />
            )}
          </div>
          <p className="text-xs text-slate-700 leading-relaxed mb-1.5">{notification.message}</p>
          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {notification.timestamp}
            </span>
            {notification.link && (
              <Link
                to={notification.link}
                className="font-bold text-brand-600 hover:text-brand-700"
              >
                View Details →
              </Link>
            )}
          </div>
        </div>
      </div>

      {!notification.read && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            markAsRead(notification.id);
          }}
          className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          title="Mark as read"
        >
          <Check className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};
