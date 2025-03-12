import React, { useState, useEffect } from 'react';
import { X, Bell } from 'lucide-react';
import { useNotificationStore } from '../store/notificationStore';

export const NotificationPopup: React.FC = () => {
  const { notifications, markAsRead } = useNotificationStore();
  const [isVisible, setIsVisible] = useState(false);
  const [currentNotification, setCurrentNotification] = useState(notifications[0]);

  useEffect(() => {
    if (notifications.length > 0 && !notifications[0].read) {
      setCurrentNotification(notifications[0]);
      setIsVisible(true);
    }
  }, [notifications]);

  const handleClose = () => {
    if (currentNotification) {
      markAsRead(currentNotification.id);
    }
    setIsVisible(false);
  };

  if (!isVisible || !currentNotification) return null;

  return (
    <div className="fixed top-4 right-4 z-50 w-80 bg-white shadow-lg rounded-lg border-l-4 border-primary">
      <div className="flex justify-between items-center p-4 bg-primary/10">
        <div className="flex items-center">
          <Bell className="mr-2 text-primary" />
          <h3 className="font-semibold text-primary">{currentNotification.title}</h3>
        </div>
        <button 
          onClick={handleClose} 
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="p-4">
        <p className="text-gray-700">{currentNotification.message}</p>
        {currentNotification.link && (
          <a 
            href={currentNotification.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-2 text-accent hover:underline"
          >
            Saiba mais
          </a>
        )}
      </div>
    </div>
  );
};
