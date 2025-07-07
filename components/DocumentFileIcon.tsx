import React from 'react';
import { FileText, FileImage } from 'lucide-react';

interface DocumentFileIconProps {
    type: 'pdf' | 'image' | 'word';
}

const DocumentFileIcon: React.FC<DocumentFileIconProps> = ({ type }) => {
    switch(type) {
        case 'pdf': return <FileText className="w-6 h-6 text-red-500 flex-shrink-0" />;
        case 'image': return <FileImage className="w-6 h-6 text-purple-500 flex-shrink-0" />;
        case 'word': return <FileText className="w-6 h-6 text-blue-500 flex-shrink-0" />;
        default: return <FileText className="w-6 h-6 text-gray-500 flex-shrink-0" />;
    }
};

export default DocumentFileIcon;