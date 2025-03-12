import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = (role: 'admin' | 'client') => {
    // Simulação de login - no futuro, substituir por chamada de API real
    const mockUsers = {
      admin: {
        id: 'admin-1',
        name: 'Administrador',
        email: 'admin@radiocast.com',
        cpf: '00000000000',
        role: 'admin'
      },
      client: {
        id: 'client-1',
        name: 'Cliente Teste',
        email: 'cliente@radiocast.com',
        cpf: '11111111111',
        role: 'client'
      }
    };

    const user = role === 'admin' ? mockUsers.admin : mockUsers.client;
    
    setUser(user);
    
    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Escolha seu Painel
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            <button
              onClick={() => handleLogin('admin')}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Painel do Administrador
            </button>
            <button
              onClick={() => handleLogin('client')}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Painel do Cliente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
