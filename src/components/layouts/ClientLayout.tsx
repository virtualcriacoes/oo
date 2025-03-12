import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Download, 
  Image, 
  LogOut,
  Menu,
  X,
  CreditCard,
  HelpCircle,
  Bell
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { NotificationPopup } from '../NotificationPopup';

interface ClientLayoutProps {
  children: React.ReactNode;
}

function ClientLayout({ children }: ClientLayoutProps) {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { 
      icon: LayoutDashboard, 
      label: 'Visão Geral', 
      path: '/cliente' 
    },
    { 
      icon: FileText, 
      label: 'Faturas', 
      path: '/cliente/invoices' 
    },
    { 
      icon: CreditCard, 
      label: 'Planos', 
      path: '/cliente/plans' 
    },
    { 
      icon: Users, 
      label: 'Programa de Indicação', 
      path: '/cliente/referrals' 
    },
    { 
      icon: Download, 
      label: 'Downloads', 
      path: '/cliente/downloads' 
    },
    { 
      icon: Image, 
      label: 'Backgrounds', 
      path: '/cliente/backgrounds' 
    },
    { 
      icon: HelpCircle, 
      label: 'Suporte', 
      path: '/cliente/support' 
    },
    { 
      icon: Bell, 
      label: 'Avisos', 
      path: '/cliente/notifications' 
    }
  ];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <NotificationPopup />
      
      {/* Mobile Sidebar Toggle */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-primary text-white rounded-md shadow-lg"
      >
        {isSidebarOpen ? <X /> : <Menu />}
      </button>

      {/* Sidebar */}
      <aside 
        className={`
          fixed md:static z-40 w-64 bg-white shadow-2xl h-full transform transition-transform duration-300
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
      >
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-primary to-primary-600">
          <h1 className="text-2xl font-bold text-white">RadioCast</h1>
          <p className="text-sm text-white/80">Meu Painel</p>
        </div>

        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center px-4 py-2 rounded-lg transition-all duration-300 group
                ${location.pathname === item.path 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-gray-600 hover:bg-primary/10 hover:text-primary'}
                relative overflow-hidden
              `}
            >
              <span 
                className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></span>
              
              <item.icon className="mr-3 h-5 w-5 relative z-10" />
              <span className="relative z-10">{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-soft p-4 flex justify-between items-center">
          <div className="text-gray-600">
            <p className="text-sm">
              {formatDate(currentTime)}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div>
              <p className="text-sm text-gray-500">Bem-vindo(a),</p>
              <h2 className="font-bold text-primary">{user?.name}</h2>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-accent/10 rounded-full text-gray-500 hover:text-accent transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default ClientLayout;
