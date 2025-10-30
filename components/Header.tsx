
import React from 'react';

type View = 'dashboard' | 'leads';

interface HeaderProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

const CarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM8.707 6.293a1 1 0 00-1.414 1.414L8.586 9H5a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414L11.414 10l-2.707-2.707z" clipRule="evenodd" />
        <path d="M12.5 5a.5.5 0 01.5.5v1a.5.5 0 01-1 0v-1a.5.5 0 01.5-.5zM15 7a.5.5 0 00-.5-.5h-1a.5.5 0 000 1h1a.5.5 0 00.5-.5zM17.5 9a.5.5 0 01.5.5v1a.5.5 0 01-1 0v-1a.5.5 0 01.5-.5zM15 13a.5.5 0 00-.5-.5h-1a.5.5 0 000 1h1a.5.5 0 00.5-.5z" />
        <path d="M5.5 5a.5.5 0 00-.5.5v1a.5.5 0 001 0v-1a.5.5 0 00-.5-.5zM3 7a.5.5 0 01.5-.5h1a.5.5 0 010 1h-1A.5.5 0 013 7zM1.5 9a.5.5 0 00-.5.5v1a.5.5 0 001 0v-1a.5.5 0 00-.5-.5zM3 13a.5.5 0 01.5-.5h1a.5.5 0 010 1h-1a.5.5 0 01-.5-.5z" />
    </svg>
);


const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  const navItemClasses = "px-4 py-2 rounded-md text-sm font-medium transition-colors";
  const activeClasses = "bg-primary text-white";
  const inactiveClasses = "text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700";

  return (
    <header className="bg-white dark:bg-secondary shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <CarIcon />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">LeadFlow CRM</h1>
          </div>
          <nav className="flex space-x-2 bg-light dark:bg-dark p-1 rounded-lg">
            <button
              onClick={() => onNavigate('dashboard')}
              className={`${navItemClasses} ${currentView === 'dashboard' ? activeClasses : inactiveClasses}`}
            >
              Dashboard
            </button>
            <button
              onClick={() => onNavigate('leads')}
              className={`${navItemClasses} ${currentView === 'leads' ? activeClasses : inactiveClasses}`}
            >
              Leads
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
