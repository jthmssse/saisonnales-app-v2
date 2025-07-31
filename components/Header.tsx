import React from 'react';
import { Search, Bell, Plus, Menu } from 'lucide-react'; // Import Menu icon

interface HeaderProps {
    onNewReservationClick: () => void;
    search: string;
    onSearchChange: (value: string) => void;
    onToggleSidebar: () => void; // New prop for toggling sidebar
}

const Header: React.FC<HeaderProps> = ({ onNewReservationClick, search, onSearchChange, onToggleSidebar }) => {
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className="flex flex-col xs:flex-row items-stretch xs:items-center justify-between gap-2 xs:gap-0 p-2 sm:p-4 h-auto sm:h-[69px] max-w-screen-2xl mx-auto px-2 sm:px-6">
        <div className="flex items-center justify-between w-full xs:w-auto">
          <button
            className="xs:hidden p-2 hover:bg-gray-100 rounded-full text-gray-500"
            onClick={onToggleSidebar}
            aria-label="Toggle sidebar"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full relative">
              <Bell className="w-6 h-6 text-gray-500" />
              <span className="absolute top-2 right-2 block h-1.5 w-1.5 rounded-full bg-red-500 ring-1 ring-white"></span>
            </button>
            <button onClick={onNewReservationClick} className="bg-[#16a34a] text-white px-3 py-2 rounded-lg hover:bg-[#15803d] flex items-center space-x-2 transition-colors text-base sm:text-sm w-full xs:w-auto">
              <Plus className="w-5 h-5" />
              <span className="font-medium hidden sm:inline">Nouvelle Réservation</span>
            </button>
          </div>
        </div>
        <div className="relative w-full xs:w-auto flex-grow max-w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Rechercher un résident..."
            className="pl-10 pr-4 py-3 sm:py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white w-full text-base sm:text-sm"
            value={search}
            onChange={e => onSearchChange(e.target.value)}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;