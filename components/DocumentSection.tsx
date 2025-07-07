import React from 'react';
import { Paperclip, Plus, Download, Trash2 } from 'lucide-react';
import { ResidentDocument } from '../types';
import DocumentFileIcon from './DocumentFileIcon.tsx';

interface DocumentSectionProps {
    documents: ResidentDocument[] | undefined;
    formatDate: (dateString: string | undefined) => string;
}

const DocumentSection: React.FC<DocumentSectionProps> = ({ documents, formatDate }) => {
    return (
        <div className="bg-white border rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-gray-800 text-base flex items-center gap-2">
                    <Paperclip className="w-5 h-5 text-blue-600" />
                    Documents
                </h3>
                <button 
                    onClick={() => alert("Fonctionnalité à implémenter : ajout de document.")}
                    className="flex items-center gap-1.5 text-sm bg-blue-50 text-blue-700 font-medium px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors"
                >
                    <Plus size={16} /> Ajouter un document
                </button>
            </div>
            <div className="space-y-2">
                {documents?.length > 0 ? (
                    documents.map(doc => (
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
    );
};

export default DocumentSection;