import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Moon, Sun, LogOut, MapPin, User, LayoutDashboard } from 'lucide-react';
import Button from '../ui/Button';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();

  const getDashboardLink = () => {
    if (!user) return '/login';
    if (user.role === 'ADMIN') return '/admin/dashboard';
    if (user.role === 'SELLER') return '/seller/dashboard';
    return '/dashboard';
  };

  return (
    <nav className="sticky top-0 z-50 glass border-b-0 border-x-0 rounded-none px-6 py-4 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2">
        <MapPin className="text-primary-500 w-8 h-8" />
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400">
          Localyze
        </span>
      </Link>

      <div className="flex items-center gap-4">
        <button 
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {user ? (
          <div className="flex items-center gap-4">
            <Link to={getDashboardLink()} className="text-sm font-medium hover:text-primary-500 transition-colors flex items-center gap-1">
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </Link>
            
            <div className="flex items-center gap-2 pl-4 border-l border-slate-300 dark:border-slate-700">
              <span className="text-sm font-medium">{user.name}</span>
              <button 
                onClick={logout}
                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-medium hover:text-primary-500 transition-colors">
              Log in
            </Link>
            <Button onClick={() => navigate('/register')} className="text-sm py-1.5">
              Sign up
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
