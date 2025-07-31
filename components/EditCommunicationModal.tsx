import React, { useState } from 'react';
import FormInput from './FormInput';
import FormTextArea from './FormTextArea';
import { Communication } from '../types';

interface EditCommunicationModalProps {
  communication: Communication;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: Communication) => void;
}

const EditCommunicationModal: React.FC<EditCommunicationModalProps> = ({ communication, isOpen, onClose, onSave }) => {
  const [form, setForm] = useState({
    type: communication.type,
    status: communication.status,
    subject: communication.subject,
    description: communication.description,
    active: communication.active,
  });

  React.useEffect(() => {
    setForm({
      type: communication.type,
      status: communication.status,
      subject: communication.subject,
      description: communication.description,
      active: communication.active,
    });
  }, [communication]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">✕</button>
        <h2 className="text-lg font-semibold mb-4">Éditer le modèle</h2>
        <form
          onSubmit={e => {
            e.preventDefault();
            onSave({ ...communication, ...form });
          }}
          className="space-y-4"
        >
          <FormInput label="Type" name="type" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} />
          <FormInput label="Statut" name="status" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} />
          <FormInput label="Objet" name="subject" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} />
          <FormTextArea label="Description" name="description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
          <div className="flex items-center gap-2">
            <input type="checkbox" id="active" checked={form.active} onChange={e => setForm(f => ({ ...f, active: e.target.checked }))} />
            <label htmlFor="active" className="text-sm">Actif</label>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-700">Annuler</button>
            <button type="submit" className="px-4 py-2 rounded bg-[#16a34a] text-white hover:bg-[#15803d]">Enregistrer</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCommunicationModal;
