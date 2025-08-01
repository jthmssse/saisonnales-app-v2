import React from 'react';
import { Plus } from 'lucide-react';
import { Resident } from '../types';
import ResidentCard from './ResidentCard.tsx';

interface ResidentsViewProps {
  onSelectResident: (resident: Resident) => void;
  onNewResidentClick: () => void;
  residents: Resident[];
}

const ResidentsView: React.FC<ResidentsViewProps> = ({ onSelectResident, residents, onNewResidentClick }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h2 className="text-xl font-semibold text-gray-800">Liste des Résidents</h2>
        <button onClick={onNewResidentClick} className="bg-[#16a34a] text-white px-4 py-2 rounded-lg hover:bg-[#15803d] flex items-center space-x-2 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Nouveau Résident</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {residents.length > 0 ? (
          residents.map(resident => (
            <ResidentCard
              key={resident.id}
              resident={resident}
              onClick={() => onSelectResident(resident)}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-8">Aucun résident trouvé.</div>
        )}
      </div>
    </div>
  );
};

export default ResidentsView;