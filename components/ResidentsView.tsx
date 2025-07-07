import React from 'react';
import { Plus } from 'lucide-react';
import { Resident } from '../types';
import ResidentCard from './ResidentCard.tsx';

interface ResidentsViewProps {
  onSelectResident: (resident: Resident) => void;
  residents: Resident[];
}

const ResidentsView: React.FC<ResidentsViewProps> = ({ onSelectResident, residents }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Liste des Résidents</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Nouveau Résident</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {residents.map(resident => (
          <ResidentCard
            key={resident.id}
            resident={resident}
            onClick={() => onSelectResident(resident)}
          />
        ))}
      </div>
    </div>
  );
};

export default ResidentsView;