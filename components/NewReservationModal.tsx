
import React, { useState, useEffect } from 'react';
import { X, User, Calendar, Stethoscope, HeartPulse, Phone, FileText, Plus } from 'lucide-react';
import { NewReservationData, Resident } from '../types';
import FormInput from './FormInput';
import FormTextArea from './FormTextArea';
import FormSelect from './FormSelect';
import Section from './Section';

interface NewReservationModalProps {
  onClose: () => void;
  onSave: (data: NewReservationData) => void;
  residents: Resident[];
}

const NewReservationModal: React.FC<NewReservationModalProps> = ({ onClose, onSave, residents }) => {
    const [formData, setFormData] = useState<NewReservationData>({
        name: '',
        room: '',
        gir: '',
        arrival: '',
        departure: '',
        phone: '',
        docsComplete: false,
        devisEnvoye: false,
        familyContactName: '',
        email: '',
        allergies: '',
        medicalHistory: '',
        treatingDoctor: '',
        mobility: 'Autonome',
        dietaryNeeds: '',
        socialHabits: '',
        // Ajout des valeurs par défaut pour les champs optionnels pour éviter undefined
        gender: '',
        birthDate: '',
        address: '',
        familyContactRelation: '',
        notes: '',
        documents: [],
    });
    const [errors, setErrors] = useState<Partial<Record<keyof NewReservationData, string>>>({});

    const availableRooms = useMemo(() => {
        const totalRooms = Array.from({ length: 24 }, (_, i) => String(i + 1));
        
        if (!formData.arrival || !formData.departure) {
            // Si les dates ne sont pas définies, on retourne toutes les chambres.
            return totalRooms;
        }

        try {
            const newArrival = new Date(formData.arrival);
            const newDeparture = new Date(formData.departure);

            // Si la plage de dates est invalide, aucune chambre n'est disponible.
            if (newArrival >= newDeparture) {
                return [];
            }

            const occupiedRooms = new Set<string>();

            residents.forEach(resident => {
                if (resident.room && resident.arrival && resident.departure) {
                    const residentArrival = new Date(resident.arrival);
                    const residentDeparture = new Date(resident.departure);
                    // Vérifie si les séjours se chevauchent
                    if (residentArrival < newDeparture && residentDeparture > newArrival) {
                        occupiedRooms.add(resident.room);
                    }
                }
            });
            return totalRooms.filter(room => !occupiedRooms.has(room));
        } catch (e) { 
            // En cas d'erreur de date, on retourne un tableau vide pour la sécurité
            return []; 
        }
    }, [formData.arrival, formData.departure, residents]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement >) => {
        const { name, value, type } = e.target;
        // Efface l'erreur du champ en cours de modification
        if (errors[name as keyof NewReservationData]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }

        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = () => {
        const newErrors: Partial<Record<keyof NewReservationData, string>> = {};
        if (!formData.name) newErrors.name = "Le nom complet est requis.";
        if (!formData.arrival) newErrors.arrival = "La date d'arrivée est requise.";
        if (!formData.departure) newErrors.departure = "La date de départ est requise.";
        if (!formData.room) newErrors.room = "Le numéro de chambre est requis.";
        if (!formData.gir) newErrors.gir = "Le GIR est requis.";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        onSave(formData);
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-gray-50 rounded-lg max-w-3xl w-full max-h-[95vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="sticky top-0 bg-gray-50/80 backdrop-blur-sm p-4 sm:p-5 border-b z-10">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2"><Plus size={22} /> Nouvelle Réservation</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-800 hover:bg-gray-200 rounded-full p-1 transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="p-4 sm:p-5 space-y-4 overflow-y-auto modal-scrollbar">
                    <Section icon={User} title="Informations Résident">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">                           
                            <FormInput label="Nom complet" name="name" value={formData.name || ''} onChange={handleChange} placeholder="ex: Jean Dupont" isRequired error={errors.name} />
                            <FormSelect label="GIR" name="gir" value={formData.gir || ''} onChange={handleChange} isRequired error={errors.gir}>
                                <option value="">Sélectionner...</option>
                                {/* Génère dynamiquement les options pour les GIR de 1 à 6 */}
                                {Array.from({ length: 6 }, (_, i) => i + 1).map(g => (
                                    <option key={g} value={`GIR ${g}`}>GIR {g}</option>
                                ))}
                            </FormSelect>
                        </div>
                    </Section>

                    <Section icon={Calendar} title="Détails du Séjour">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                             <FormInput label="Date d'arrivée" name="arrival" value={formData.arrival || ''} onChange={handleChange} type="date" isRequired error={errors.arrival} />
                             <FormInput label="Date de départ" name="departure" value={formData.departure || ''} onChange={handleChange} type="date" isRequired error={errors.departure} />
                            <FormSelect label="Chambre" name="room" value={formData.room || ''} onChange={handleChange} isRequired error={errors.room}>
                                <option value="">Sélectionner...</option>
                                {availableRooms.length > 0 ? (
                                    availableRooms.map(roomNumber => (
                                        <option key={roomNumber} value={roomNumber}>Chambre {roomNumber}</option>
                                    ))
                                ) : (
                                    <option value="" disabled>Aucune chambre disponible</option>
                                )}
                            </FormSelect>
                        </div>
                    </Section>

                    <Section icon={Stethoscope} title="Informations Médicales">
                        <div className="space-y-4">
                           <FormTextArea label="Allergies et contre-indications" name="allergies" value={formData.allergies || ''} onChange={handleChange} placeholder="ex: Pénicilline, arachides. Indiquer 'Aucune' si pertinent." rows={2} />
                           <FormTextArea label="Antécédents médicaux importants" name="medicalHistory" value={formData.medicalHistory || ''} onChange={handleChange} placeholder="ex: Diabète, hypertension, prothèse de hanche..." rows={2}/>
                           <FormInput label="Médecin traitant" name="treatingDoctor" value={formData.treatingDoctor || ''} onChange={handleChange} placeholder="ex: Dr. Martin"/>
                        </div>
                    </Section>

                    <Section icon={HeartPulse} title="Habitudes de Vie">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <FormSelect label="Mobilité" name="mobility" value={formData.mobility || ''} onChange={handleChange}>
                                <option value="Autonome">Autonome</option>
                                <option value="Canne">Marche avec une canne</option>
                                <option value="Déambulateur">Marche avec un déambulateur</option>
                                <option value="Fauteuil roulant">En fauteuil roulant</option>
                           </FormSelect>
                           <FormTextArea label="Régime et habitudes alimentaires" name="dietaryNeeds" value={formData.dietaryNeeds || ''} onChange={handleChange} placeholder="ex: Texture mixée, régime sans sel, aime la soupe le soir..." />
                           <div className="md:col-span-2">
                               <FormTextArea label="Habitudes sociales et notes diverses" name="socialHabits" value={formData.socialHabits || ''} onChange={handleChange} placeholder="ex: Aime les jeux de société, fait la sieste à 14h..." />
                           </div>
                        </div>
                    </Section>

                    <Section icon={Phone} title="Contact Principal (Famille/Proche)">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <FormInput label="Nom du contact" name="familyContactName" value={formData.familyContactName || ''} onChange={handleChange} placeholder="ex: Martine Dupont"/>
                           <FormInput label="Téléphone" name="phone" value={formData.phone || ''} onChange={handleChange} placeholder="ex: 0612345678" />
                           <FormInput label="Email" name="email" value={formData.email || ''} onChange={handleChange} placeholder="ex: contact@famille.fr" type="email" />
                        </div>
                    </Section>

                     <Section icon={FileText} title="Dossier Administratif">
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                             <label className="flex items-center space-x-2 cursor-pointer">
                                 <input type="checkbox" name="devisEnvoye" checked={formData.devisEnvoye} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                 <span className="text-sm text-gray-700">Devis envoyé</span>
                             </label>
                             <label className="flex items-center space-x-2 cursor-pointer">
                                 <input type="checkbox" name="docsComplete" checked={formData.docsComplete} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                 <span className="text-sm text-gray-700">Dossier complet</span>
                             </label>
                         </div>
                    </Section>
                </div>

                <div className="sticky bottom-0 bg-gray-50/80 backdrop-blur-sm p-4 border-t mt-auto">
                    <div className="flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Annuler
                        </button>
                        <button type="button" onClick={handleSubmit} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Valider la réservation
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewReservationModal;
