import React from 'react';
import { Home, Users, MessageSquare } from 'lucide-react';
import { ActiveTab } from '../types';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isSidebarOpen: boolean; // New prop
  setIsSidebarOpen: (isOpen: boolean) => void; // New prop
}

const navItems = [
    { id: 'dashboard', label: 'Planning des Séjours', icon: Home },
    { id: 'residents', label: 'Résidents', icon: Users },
    { id: 'communications', label: 'Communications', icon: MessageSquare },
];

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <nav className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg border-r h-screen flex flex-col justify-between z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
      <div>
        <div className="p-4 flex items-center space-x-3 border-b h-[69px]">
            <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center overflow-hidden">
                {/* Remplacez le chemin ci-dessous par votre logo personnalisé (placer logo.png dans le dossier public ou assets) */}
                <img
                  src="/assets/logo.jpg"
                  alt="Logo Les Saisonnales"
                  className="w-9 h-9 object-cover"
                />
            </div>
            <div>
                <h1 className="text-md font-bold text-gray-800">Les Saisonnales</h1>
                <p className="text-xs text-gray-500">Gestion des séjours</p>
            </div>
        </div>
        <div className="p-4">
            <div className="space-y-2">
            {navItems.map(item => (
                <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as ActiveTab);
                  setIsSidebarOpen(false); // Close sidebar on item click
                }}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors relative ${
                    activeTab === item.id
                    ? 'text-[#16a34a] font-semibold bg-[#16a34a]/10'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                }`}
                >
                {activeTab === item.id && <div className="absolute left-0 top-2 bottom-2 w-1 bg-[#16a34a] rounded-r-full"></div>}
                <item.icon className={`w-5 h-5 flex-shrink-0`} />
                <span>{item.label}</span>
                </button>
            ))}
            </div>
        </div>
      </div>
      
      <div className="p-4 border-t">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-gray-600 font-semibold text-sm">JM</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">Jean-Michel</p>
            <p className="text-xs text-gray-500">Manager</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;