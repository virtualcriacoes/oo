import React, { useState } from 'react';
import { MessageCircle, Check, X } from 'lucide-react';

interface SupportTicket {
  id: number;
  name: string;
  email: string;
  message: string;
  status: 'pending' | 'resolved' | 'closed';
}

function Support() {
  const [tickets, setTickets] = useState<SupportTicket[]>([
    { 
      id: 1, 
      name: 'João Silva', 
      email: 'joao@exemplo.com', 
      message: 'Problema com meu plano atual', 
      status: 'pending' 
    }
  ]);

  const updateTicketStatus = (id: number, status: SupportTicket['status']) => {
    setTickets(tickets.map(ticket => 
      ticket.id === id ? { ...ticket, status } : ticket
    ));
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold text-primary mb-6">Central de Suporte</h1>

      <div className="space-y-4">
        {tickets.map(ticket => (
          <div 
            key={ticket.id} 
            className={`
              bg-gray-50 p-4 rounded-lg flex justify-between items-center
              ${ticket.status === 'pending' ? 'border-l-4 border-accent' : 
                ticket.status === 'resolved' ? 'border-l-4 border-green-500' : 
                'border-l-4 border-red-500'}
            `}
          >
            <div>
              <div className="flex items-center mb-2">
                <MessageCircle className="mr-2 text-primary" />
                <h3 className="font-medium text-primary">{ticket.name}</h3>
                <span className="ml-2 text-sm text-gray-500">{ticket.email}</span>
              </div>
              <p className="text-gray-700">{ticket.message}</p>
            </div>
            <div className="flex space-x-2">
              {ticket.status === 'pending' && (
                <>
                  <button 
                    onClick={() => updateTicketStatus(ticket.id, 'resolved')}
                    className="text-green-500 hover:bg-green-50 p-2 rounded-full"
                  >
                    <Check size={18} />
                  </button>
                  <button 
                    onClick={() => updateTicketStatus(ticket.id, 'closed')}
                    className="text-red-500 hover:bg-red-50 p-2 rounded-full"
                  >
                    <X size={18} />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Support; // Changed from Backgrounds to Support
