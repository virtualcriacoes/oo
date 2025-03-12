import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  Wallet,
  Briefcase
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

interface AdminLayoutProps {
  children: React.ReactNode;
}

function AdminLayout({ children }: AdminLayoutProps) {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { 
      icon: LayoutDashboard, 
      label: 'Dashboard', 
      path: '/administrador' 
    },
    { 
      icon: Users, 
      label: 'Clientes', 
      path: '/administrador/customers' 
    },
    { 
      icon: Wallet, 
      label: 'Financeiro', 
      path: '/administrador/financial' 
    },
    { 
      icon: Briefcase, 
      label: 'Serviços', 
      path: '/administrador/services' 
    },
    { 
      icon: Bell, 
      label: 'Notificações', 
      path: '/administrador/notifications' 
    },
    { 
      icon: Settings, 
      label: 'Configurações', 
      path: '/administrador/settings' 
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
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
          <p className="text-sm text-white/80">Admin Dashboard</p>
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
              {/* Hover effect */}
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
        <header className="bg-white shadow-soft p-4 flex justify-end items-center">
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 font-medium">{user?.name}</span>
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-accent/10 rounded-full text-gray-500 hover:text-accent transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
