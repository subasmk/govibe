import React, { createContext, useContext, useState } from 'react';
import { sampleNotifications } from '../data/sampleData';

const NotificationContext = createContext();
const demoModeEnabled = import.meta.env.VITE_ENABLE_DEMO_MODE === 'true';

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(demoModeEnabled ? sampleNotifications : []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const addNotification = (notif) => {
    const newNotif = {
      id: "notif_" + Date.now(),
      timestamp: "Just now",
      read: false,
      ...notif
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        addNotification
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
