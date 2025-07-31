import React, { useState } from 'react';
import { Plus, Edit, MessageSquare } from 'lucide-react';
import { COMMUNICATIONS } from '../constants';
import EditCommunicationModal from './EditCommunicationModal';

const CommunicationsView: React.FC = () => {
  const [editModal, setEditModal] = useState<{ open: boolean; comm: any | null }>({ open: false, comm: null });
  const [comms, setComms] = useState(COMMUNICATIONS);

  const handleEdit = (comm: any) => setEditModal({ open: true, comm });
  const handleClose = () => setEditModal({ open: false, comm: null });
  const handleSave = (updated: any) => {
    setComms(prev => prev.map(c => c.id === updated.id ? updated : c));
    handleClose();
  };
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Stratégie d'envoi automatique</h2>
          <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium mt-2">
            Activée
          </span>
        </div>
        <button className="bg-[#16a34a] text-white px-4 py-2 rounded-lg hover:bg-[#15803d] flex items-center space-x-2 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Nouveau Modèle</span>
        </button>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Modèles d'e-mails</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {comms.map(comm => (
            <div key={comm.id} className="bg-white rounded-lg shadow-sm border p-6 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-800">{comm.type}</h4>
                <span className="text-xs text-[#cc5500] bg-[#cc5500] bg-opacity-10 px-2 py-1 rounded-full font-medium">{comm.status}</span>
              </div>
              <p className="text-sm text-gray-600 mb-1"><span className="font-medium">Objet :</span> {comm.subject}</p>
              <p className="text-sm text-gray-600 mb-4 flex-grow">{comm.description}</p>
              <button className="text-[#16a34a] hover:text-[#15803d] text-sm flex items-center space-x-1 self-start" onClick={() => handleEdit(comm)}>
                <Edit className="w-4 h-4" />
                <span>Éditer</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Prochains envois programmés</h3>
        <div className="text-center py-8 text-gray-500">
          <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>Aucun envoi programmé dans les prochains jours.</p>
        </div>
      </div>
      {editModal.open && editModal.comm && (
        <EditCommunicationModal
          communication={editModal.comm}
          isOpen={editModal.open}
          onClose={handleClose}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default CommunicationsView;