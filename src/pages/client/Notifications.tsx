import React from 'react';
import { useNotificationStore } from '../../store/notificationStore';
import { Bell, CheckCircle } from 'lucide-react';

function ClientNotifications() {
  const { notifications, markAsRead } = useNotificationStore();

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold text-primary mb-6">Meus Avisos</h1>
      
      {notifications.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          <Bell className="mx-auto w-16 h-16 text-gray-300 mb-4" />
          <p>Você não tem novas notificações</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`
                bg-gray-50 p-4 rounded-lg border-l-4 flex items-center justify-between
                ${notification.read ? 'border-gray-300' : 'border-primary'}
              `}
            >
              <div>
                <h3 className="font-semibold text-primary">{notification.title}</h3>
                <p className="text-gray-700">{notification.message}</p>
                {notification.link && (
                  <a 
                    href={notification.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-accent hover:underline mt-2 inline-block"
                  >
                    Saiba mais
                  </a>
                )}
              </div>
              {!notification.read && (
                <button 
                  onClick={() => markAsRead(notification.id)}
                  className="text-primary hover:text-primary-600"
                >
                  <CheckCircle />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ClientNotifications;
