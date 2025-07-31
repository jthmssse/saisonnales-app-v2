import React, { useState } from 'react';
import { X, Phone, User, Stethoscope, HeartPulse, FileText, Trash2 } from 'lucide-react';
import { Resident } from '../types';
import DetailCard from './DetailCard.tsx';
import DetailItem from './DetailItem.tsx';
import InfoRow from './InfoRow.tsx';
import DocumentSection from './DocumentSection.tsx';
import HistoryItem from './HistoryItem.tsx';
import AllergyAlert from './AllergyAlert.tsx';
import ContactValue from './ContactValue.tsx';
import StatusBadge from './StatusBadge.tsx';
// import MultilineText from './MultilineText.tsx';
import EmailValue from './EmailValue.tsx';

interface ResidentModalProps {
  resident: Resident;
  onClose: () => void;
  onUpdateResident: (resident: Resident) => void;
  onDeleteResident: (residentId: number) => void;
}

// Helper function to format date for display
const formatDateDisplay = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
};

// Helper function to format date for input type="date"
const formatDateInput = (dateString: string | undefined) => {
  if (!dateString) return '';
  return dateString.split('T')[0]; // Ensures YYYY-MM-DD format
};

const ResidentModal: React.FC<ResidentModalProps> = ({ resident, onClose, onUpdateResident, onDeleteResident }) => {
  const [editRoom, setEditRoom] = useState(resident.room);
  const [editGir, setEditGir] = useState(resident.gir);
  const [editArrival, setEditArrival] = useState(formatDateInput(resident.arrival));
  const [editDeparture, setEditDeparture] = useState(formatDateInput(resident.departure));
  const [editBirthDate, setEditBirthDate] = useState(formatDateInput(resident.birthDate));
  const [editImageRights, setEditImageRights] = useState(resident.imageRights);
  const [documents, setDocuments] = useState(resident.documents || []);
  const [editPhone, setEditPhone] = useState(resident.phone || '');
  const [editEmail, setEditEmail] = useState(resident.email || '');
  const [editAddress, setEditAddress] = useState(resident.address || '');
  const [editFamilyContactName, setEditFamilyContactName] = useState(resident.familyContactName || '');
  const [editFamilyContactRelation, setEditFamilyContactRelation] = useState(resident.familyContactRelation || '');
  const [editFamilyContactPhone, setEditFamilyContactPhone] = useState(resident.familyContactPhone || '');
  const [editFamilyContactEmail, setEditFamilyContactEmail] = useState(resident.familyContactEmail || '');

  // Ajout de pièce jointe
  const handleAddDocument = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Correction du typage pour respecter "pdf" | "word" | "image"
    let docType: 'pdf' | 'word' | 'image' = 'image';
    if (file.type.includes('pdf')) docType = 'pdf';
    else if (file.type.includes('word')) docType = 'word';
    const newDoc = {
      id: Date.now(),
      name: file.name,
      type: docType,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      addedAt: new Date().toISOString().slice(0, 10),
    };
    const newDocs = [...documents, newDoc];
    setDocuments(newDocs);
    onUpdateResident({ ...resident, documents: newDocs });
  };

  // Changement de chambre
  const handleRoomChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEditRoom(e.target.value);
  };

  const handleGirChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditGir(e.target.value);
  };

  const handleArrivalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditArrival(e.target.value);
  };

  const handleDepartureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditDeparture(e.target.value);
  };

  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditBirthDate(e.target.value);
  };

  const handleImageRightsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditImageRights(e.target.value as 'oui' | 'non' | 'oui sauf réseaux sociaux');
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditPhone(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditEmail(e.target.value);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditAddress(e.target.value);
  };

  const handleFamilyContactNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditFamilyContactName(e.target.value);
  };

  const handleFamilyContactRelationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditFamilyContactRelation(e.target.value);
  };

  const handleFamilyContactPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditFamilyContactPhone(e.target.value);
  };

  const handleFamilyContactEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditFamilyContactEmail(e.target.value);
  };

  const handleSave = () => {
    const updatedResident: Resident = {
      ...resident,
      room: editRoom,
      gir: editGir,
      arrival: editArrival,
      departure: editDeparture,
      birthDate: editBirthDate,
      imageRights: editImageRights,
      documents: documents,
      phone: editPhone,
      email: editEmail,
      address: editAddress,
      familyContactName: editFamilyContactName,
      familyContactRelation: editFamilyContactRelation,
      familyContactPhone: editFamilyContactPhone,
      familyContactEmail: editFamilyContactEmail,
    };
    onUpdateResident(updatedResident);
    onClose(); // Close modal after saving
  };

  const handleDelete = () => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer le résident ${resident.name} ? Cette action est irréversible.`)) {
      onDeleteResident(resident.id);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-gray-50 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
        {/* ...header and other content... */}
        <div className="p-5 space-y-4 overflow-y-auto modal-scrollbar">
          {/* ...autres sections... */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={handleDelete}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Supprimer le résident
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm font-medium text-white bg-[#16a34a] border border-transparent rounded-lg shadow-sm hover:bg-[#15803d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <span>Enregistrer les modifications</span>
            </button>
            <button
              onClick={() => window.open(`mailto:${resident.familyContactEmail || ''}`)}
              className="px-4 py-2 text-sm font-medium text-white bg-[#16a34a] border border-transparent rounded-lg shadow-sm hover:bg-[#15803d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <span>Contacter la famille</span>
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-6">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Date de naissance</label>
              <input
                type="date"
                className="w-full border rounded px-2 py-1 text-sm"
                value={editBirthDate}
                onChange={handleBirthDateChange}
              />
              <div className="flex items-center gap-2 mt-1">
                <span>{editBirthDate ? editBirthDate.split('-').reverse().join('/') : 'N/A'}</span>
                {editBirthDate && (
                  <span className="text-xs text-gray-600">(Âge : {Math.floor((new Date().getTime() - new Date(editBirthDate).getTime()) / (1000 * 60 * 60 * 24 * 365.25))} ans)</span>
                )}
              </div>
            </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Chambre</label>
                <select
                  className="w-full border rounded px-2 py-1 text-sm"
                  value={editRoom}
                  onChange={handleRoomChange}
                >
                  {Array.from({ length: 24 }, (_, i) => (
                    <option key={i + 1} value={String(i + 1)}>{i + 1}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">GIR</label>
                <select
                  className="w-full border rounded px-2 py-1 text-sm"
                  value={editGir}
                  onChange={handleGirChange}
                >
                  {Array.from({ length: 6 }, (_, i) => (
                    <option key={i + 1} value={`GIR ${i + 1}`}>{`GIR ${i + 1}`}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Arrivée</label>
                <input
                  type="date"
                  className="w-full border rounded px-2 py-1 text-sm"
                  value={editArrival}
                  onChange={handleArrivalChange}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Départ</label>
                <input
                  type="date"
                  className="w-full border rounded px-2 py-1 text-sm"
                  value={editDeparture}
                  onChange={handleDepartureChange}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Date de naissance</label>
                <input
                  type="date"
                  className="w-full border rounded px-2 py-1 text-sm"
                  value={editBirthDate}
                  onChange={handleBirthDateChange}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Droit à l'image</label>
                <select
                  className="w-full border rounded px-2 py-1 text-sm"
                  value={editImageRights}
                  onChange={handleImageRightsChange}
                >
                  <option value="oui">Oui</option>
                  <option value="non">Non</option>
                  <option value="oui sauf réseaux sociaux">Oui sauf réseaux sociaux</option>
                </select>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3 text-base">Coordonnées</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Téléphone</label>
                <input
                  type="text"
                  className="w-full border rounded px-2 py-1 text-sm"
                  value={editPhone}
                  onChange={handlePhoneChange}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full border rounded px-2 py-1 text-sm"
                  value={editEmail}
                  onChange={handleEmailChange}
                />
              </div>
              <div className="col-span-full">
                <label className="block text-xs font-medium text-gray-500 mb-1">Adresse Postale</label>
                <input
                  type="text"
                  className="w-full border rounded px-2 py-1 text-sm"
                  value={editAddress}
                  onChange={handleAddressChange}
                />
              </div>
            </div>
          </div>

          {/* Family Contact Info */}
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3 text-base">Famille à Contacter</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Nom du contact familial</label>
                <input
                  type="text"
                  className="w-full border rounded px-2 py-1 text-sm"
                  value={editFamilyContactName}
                  onChange={handleFamilyContactNameChange}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Lien de parenté</label>
                <input
                  type="text"
                  className="w-full border rounded px-2 py-1 text-sm"
                  value={editFamilyContactRelation}
                  onChange={handleFamilyContactRelationChange}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Téléphone du contact familial</label>
                <input
                  type="text"
                  className="w-full border rounded px-2 py-1 text-sm"
                  value={editFamilyContactPhone}
                  onChange={handleFamilyContactPhoneChange}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Email du contact familial</label>
                <input
                  type="email"
                  className="w-full border rounded px-2 py-1 text-sm"
                  value={editFamilyContactEmail}
                  onChange={handleFamilyContactEmailChange}
                />
              </div>
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
             <DetailItem
                label="Devis"
                value={<StatusBadge isPositive={resident.devisEnvoye} positiveText="Envoyé" negativeText="Non envoyé" />}
             />
             <DetailItem
                label="Pièces justificatives"
                value={<StatusBadge isPositive={resident.docsComplete} positiveText="Complet" negativeText="Incomplet" negativeColor="red" />}
             />
          </DetailCard>
          
           {/* Contact */}
          <DetailCard icon={User} title="Coordonnées & Famille à Contacter">
             <DetailItem label="Téléphone Résident" value={resident.phone} />
             {resident.email && (
                <DetailItem label="Email Résident" value={<EmailValue email={resident.email} />} />
             )}
             {resident.address && (
                <DetailItem label="Adresse Postale Résident" value={resident.address} />
             )}
             <DetailItem
                label={`Contact Familial (${resident.familyContactRelation || 'Principal'})`}
                value={<ContactValue name={resident.familyContactName} phone={resident.familyContactPhone} />}
             />
             {resident.familyContactEmail && (
                <DetailItem label="Email Contact Familial" value={<EmailValue email={resident.familyContactEmail} />} />
             )}
          </DetailCard>

          {/* Documents */}
          <div className="bg-white border rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-gray-800 text-base flex items-center gap-2">
                    Documents
                </h3>
            </div>
            <div className="space-y-2">
                {(documents && documents.length > 0) ? (
                    documents.map(doc => (
                        <div key={doc.id} className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-3">
                                <span className="font-medium text-sm text-gray-800">{doc.name}</span>
                                <span className="text-xs text-gray-500">{doc.size}</span>
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
          <div className="flex justify-between items-center">
            <button
              onClick={handleDelete}
              className="bg-red-50 text-red-700 px-4 py-2 rounded-lg hover:bg-red-100 flex items-center space-x-2 transition-colors text-sm font-medium"
            >
              <Trash2 className="w-4 h-4" />
              <span>Supprimer le résident</span>
            </button>
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 transition-colors text-sm font-medium"
            >
              <span>Enregistrer les modifications</span>
            </button>
            <a
              href={`tel:${resident.phone}`}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Contacter la famille</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResidentModal;