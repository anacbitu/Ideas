
import React from 'react';
import { APP_NAME } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  onGoHome: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onGoHome }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <button 
            onClick={onGoHome}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold text-xl font-header">
              B
            </div>
            <h1 className="text-xl font-bold font-header text-gray-800 hidden sm:block">
              {APP_NAME}
            </h1>
          </button>
          
          <nav className="flex gap-4">
            <button className="px-3 py-1 text-sm font-medium text-gray-600 hover:text-green-600">Modules</button>
            <button className="px-3 py-1 text-sm font-medium text-gray-600 hover:text-green-600">Practice</button>
          </nav>
        </div>
      </header>
      
      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-gray-100 border-t border-gray-200 py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© 2024 {APP_NAME}. Learn Brazilian Portuguese with AI.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
