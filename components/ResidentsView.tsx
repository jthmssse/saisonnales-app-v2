import React from 'react';
import { Plus } from 'lucide-react';
import { Resident } from '../types';
import ResidentCard from './ResidentCard.tsx';

interface ResidentsViewProps {
  onSelectResident: (resident: Resident) => void;
  residents: Resident[];
}

const ResidentsView: React.FC<ResidentsViewProps> = ({ onSelectResident, residents }) => {
  const [search, setSearch] = React.useState("");
  const filteredResidents = React.useMemo(() => {
    const s = search.trim().toLowerCase();
    if (!s) return residents;
    return residents.filter(r =>
      r.name.toLowerCase().includes(s) ||
      (r.room && r.room.toLowerCase().includes(s)) ||
      (r.familyContactName && r.familyContactName.toLowerCase().includes(s))
    );
  }, [search, residents]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h2 className="text-xl font-semibold text-gray-800">Liste des Résidents</h2>
        <div className="flex gap-2 items-center w-full sm:w-auto">
          <input
            type="text"
            className="border rounded px-3 py-2 text-sm w-full sm:w-64"
            placeholder="Rechercher par nom, chambre, contact..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Nouveau Résident</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredResidents.length > 0 ? (
          filteredResidents.map(resident => (
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