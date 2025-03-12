import React, { useState } from 'react';
import { Send, Bell } from 'lucide-react';
import { useNotificationStore } from '../../store/notificationStore';

function AdminNotifications() {
  const { addNotification, notifications } = useNotificationStore();
  const [newNotification, setNewNotification] = useState({
    title: '',
    message: '',
    link: '',
    type: 'info' as 'info' | 'warning' | 'success' | 'error'
  });

  const handleSendNotification = () => {
    if (newNotification.title && newNotification.message) {
      addNotification({
        title: newNotification.title,
        message: newNotification.message,
        link: newNotification.link || undefined,
        type: newNotification.type
      });

      // Reset form
      setNewNotification({
        title: '',
        message: '',
        link: '',
        type: 'info'
      });
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold text-primary mb-6">Central de Notificações</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Enviar Nova Notificação</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Título</label>
              <input 
                type="text" 
                value={newNotification.title}
                onChange={(e) => setNewNotification({...newNotification, title: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring focus:ring-accent/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Mensagem</label>
              <textarea 
                value={newNotification.message}
                onChange={(e) => setNewNotification({...newNotification, message: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring focus:ring-accent/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Link Opcional</label>
              <input 
                type="text" 
                value={newNotification.link}
                onChange={(e) => setNewNotification({...newNotification, link: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring focus:ring-accent/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tipo de Notificação</label>
              <select 
                value={newNotification.type}
                onChange={(e) => setNewNotification({...newNotification, type: e.target.value as 'info' | 'warning' | 'success' | 'error'})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring focus:ring-accent/50"
              >
                <option value="info">Informação</option>
                <option value="warning">Aviso</option>
                <option value="success">Sucesso</option>
                <option value="error">Erro</option>
              </select>
            </div>
            <button 
              onClick={handleSendNotification}
              className="flex items-center bg-accent text-white px-4 py-2 rounded-md hover:bg-accent-600 transition-colors"
            >
              <Send className="mr-2" /> Enviar Notificação
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Histórico de Notificações</h2>
          <div className="space-y-4">
            {notifications.map(notification => (
              <div 
                key={notification.id} 
                className={`
                  bg-gray-50 p-4 rounded-lg border-l-4
                  ${notification.type === 'info' ? 'border-blue-500' : 
                    notification.type === 'warning' ? 'border-yellow-500' : 
                    notification.type === 'success' ? 'border-green-500' : 
                    'border-red-500'}
                `}
              >
                <div className="flex items-center mb-2">
                  <Bell className="mr-2 text-primary" />
                  <h3 className="font-medium text-primary">{notification.title}</h3>
                </div>
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminNotifications;
