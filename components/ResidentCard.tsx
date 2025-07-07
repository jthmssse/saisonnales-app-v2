import React from 'react';
import { Resident } from '../types';
import { FileText } from 'lucide-react';

interface ResidentCardProps {
  resident: Resident;
  onClick: (resident: Resident) => void;
}

const ResidentCard: React.FC<ResidentCardProps> = ({ resident, onClick }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-sm border p-4 cursor-pointer hover:shadow-md hover:border-blue-500 transition-all duration-200 group"
      onClick={() => onClick(resident)}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-gray-800 group-hover:text-blue-600">{resident.name}</h3>
          <p className="text-sm text-gray-600">Chambre {resident.room} • {resident.gir}</p>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${resident.status === 'Actif' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
          {resident.status}
        </span>
      </div>
      <div className="flex items-center space-x-4 text-sm text-gray-600 pt-3 border-t">
        <div className={`flex items-center space-x-1.5 ${resident.devisEnvoye ? 'text-green-700' : 'text-gray-500'}`}>
          <FileText size={14} />
          <span>Devis {resident.devisEnvoye ? 'envoyé' : 'manquant'}</span>
        </div>
        <div className={`flex items-center space-x-1.5 ${resident.docsComplete ? 'text-green-700' : 'text-red-600'}`}>
          <FileText size={14} />
          <span>Docs {resident.docsComplete ? 'complets' : 'incomplets'}</span>
        </div>
      </div>
    </div>
  );
};

export default ResidentCard;