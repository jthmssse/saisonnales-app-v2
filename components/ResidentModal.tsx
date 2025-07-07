import React from 'react';
import { X, Phone, User, Stethoscope, HeartPulse, FileText, Mail, Paperclip, Plus, Download, Trash2 } from 'lucide-react';
import { Resident } from '../types';
import DocumentFileIcon from './DocumentFileIcon.tsx';
import DetailCard from './DetailCard.tsx';
import DetailItem from './DetailItem.tsx';
import InfoRow from './InfoRow.tsx';
import HistoryItem from './HistoryItem.tsx';
import AllergyAlert from './AllergyAlert.tsx';

interface ResidentModalProps {
  resident: Resident;
  onClose: () => void;
}

// Helper function moved outside the component for better performance and to fix syntax errors.
const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
};

const ResidentModal: React.FC<ResidentModalProps> = ({ resident, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-gray-50 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-gray-50/80 backdrop-blur-sm p-5 border-b z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">{resident.name}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800 hover:bg-gray-200 rounded-full p-1 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="p-5 space-y-4 overflow-y-auto modal-scrollbar">
          {/* Main Info */}
          <div className="bg-white border rounded-lg p-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-6">
                  <InfoRow label="Chambre" value={resident.room} />
                  <InfoRow label="GIR" value={resident.gir} />
                  <InfoRow label="Arrivée" value={formatDate(resident.arrival)} />
                  <InfoRow label="Départ" value={formatDate(resident.departure)} />
              </div>
          </div>

          {/* Allergy Alert */}
          <AllergyAlert allergies={resident.allergies} />

          {/* Medical & Care */}
          <DetailCard icon={Stethoscope} title="Dossier Médical & Soins">
              <DetailItem label="Antécédents médicaux" value={<p>{resident.medicalHistory}</p>} />
              <DetailItem label="Médecin traitant" value={resident.treatingDoctor} />
          </DetailCard>
          
          {/* Daily Life */}
          <DetailCard icon={HeartPulse} title="Vie Quotidienne & Habitudes">
             <DetailItem label="Mobilité" value={resident.mobility} />
             <DetailItem label="Régime et habitudes alimentaires" value={<p>{resident.dietaryNeeds}</p>} />
             <DetailItem label="Habitudes sociales et notes" value={<p>{resident.socialHabits}</p>} />
          </DetailCard>

          {/* Admin */}
          <DetailCard icon={FileText} title="Dossier Administratif">
             <DetailItem label="Devis" value={<span className={`font-semibold ${resident.devisEnvoye ? 'text-green-600' : 'text-gray-500'}`}>{resident.devisEnvoye ? 'Envoyé' : 'Non envoyé'}</span>} />
             <DetailItem label="Pièces justificatives" value={<span className={`font-semibold ${resident.docsComplete ? 'text-green-600' : 'text-red-600'}`}>{resident.docsComplete ? 'Complet' : 'Incomplet'}</span>} />
          </DetailCard>
          
           {/* Contact */}
          <DetailCard icon={User} title="Personnes à Contacter">
             <DetailItem label={resident.familyContactRelation || "Contact Principal"} value={<div><div>{resident.familyContactName || "Famille Durand"}</div><div className="text-gray-500">{resident.phone}</div></div>} />
             {resident.email && (
                <DetailItem label="Email" value={
                    <div className="flex items-center justify-end gap-2">
                        <span>{resident.email}</span>
                        <a href={`mailto:${resident.email}`} className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-100 rounded-full transition-colors">
                            <Mail size={16} />
                        </a>
                    </div>
                } />
             )}
          </DetailCard>

          {/* Documents */}
          <div className="bg-white border rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-gray-800 text-base flex items-center gap-2">
                      <Paperclip className="w-5 h-5 text-blue-600" />
                      Documents
                  </h3>
                  <button className="flex items-center gap-1.5 text-sm bg-blue-50 text-blue-700 font-medium px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors">
                      <Plus size={16} /> Ajouter un document
                  </button>
              </div>
              <div className="space-y-2">
                  {(resident.documents && resident.documents.length > 0) ? (
                      resident.documents.map(doc => (
                          <div key={doc.id} className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 transition-colors">
                              <div className="flex items-center gap-3">
                                  <DocumentFileIcon type={doc.type} />
                                  <div>
                                      <p className="font-medium text-sm text-gray-800">{doc.name}</p>
                                      <p className="text-xs text-gray-500">{`Ajouté le ${formatDate(doc.addedAt)} • ${doc.size}`}</p>
                                  </div>
                              </div>
                              <div className="flex items-center gap-2">
                                  <button title="Télécharger" className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-100 rounded-full transition-colors"><Download size={16} /></button>
                                  <button title="Supprimer" className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded-full transition-colors"><Trash2 size={16} /></button>
                              </div>
                          </div>
                      ))
                  ) : (
                      <p className="text-sm text-gray-500 text-center py-4">Aucun document ajouté.</p>
                  )}
              </div>
          </div>

          {/* History */}
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-1 text-base">Historique des Communications</h3>
            <div className="divide-y divide-gray-100">
              <HistoryItem label="Devis envoyé" date="10/06/2025" />
              <HistoryItem label="Email de Bienvenue" date="12/06/2025" />
              <HistoryItem label="Rappel J-7" date="18/06/2025" />
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-gray-50/80 backdrop-blur-sm p-4 border-t mt-auto">
          <div className="flex justify-end">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 transition-colors">
              <Phone className="w-4 h-4" />
              <span>Contacter la famille</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResidentModal;