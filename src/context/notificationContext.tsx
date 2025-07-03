import React, { createContext, useState } from 'react';

interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface NotificationContextType {
  notifications: Notification;
  pushNotification: (notification: Notification) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification>({id: '', message: '', type: 'info'});

  const pushNotification = (notification: Notification) => {
    setNotifications(notification);
    // Optionally, you can add logic to remove the notification after a certain time
    setTimeout(() => {
      setNotifications({id: '', message: '', type: 'info'}); // Reset notification
    }, 10000); // Reset after 3 seconds
  };

  return (
    <NotificationContext.Provider value={{ notifications, pushNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationContext, NotificationProvider };
