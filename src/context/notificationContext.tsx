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
    // Automatically reset the notification after a certain time
    /* istanbul ignore next @preserve */
    setTimeout(() => {
      setNotifications({id: '', message: '', type: 'info'}); // Reset notification
    }, 5000); // Reset after 5 seconds
  };

  return (
    <NotificationContext.Provider value={{ notifications, pushNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationContext, NotificationProvider };
