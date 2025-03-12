import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NotificationState, Notification } from '../types/notification';
import { v4 as uuidv4 } from 'uuid';

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set) => ({
      notifications: [],
      addNotification: (notification) => 
        set((state) => ({
          notifications: [
            ...state.notifications, 
            {
              ...notification,
              id: uuidv4(),
              createdAt: new Date(),
              read: false
            }
          ]
        })),
      markAsRead: (notificationId) => 
        set((state) => ({
          notifications: state.notifications.map(notif => 
            notif.id === notificationId 
              ? { ...notif, read: true } 
              : notif
          )
        })),
      clearNotifications: () => 
        set({ notifications: [] })
    }),
    {
      name: 'notification-storage',
      partialize: (state) => ({ notifications: state.notifications })
    }
  )
);
