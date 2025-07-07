import React from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface AllergyAlertProps {
    allergies: string | undefined;
}

const AllergyAlert: React.FC<AllergyAlertProps> = ({ allergies }) => {
    const hasAllergies = allergies && allergies.toLowerCase() !== 'aucune connue';

    const baseClasses = "rounded-lg p-4 flex items-start gap-3";
    const theme = hasAllergies 
        ? {
            bg: 'bg-red-50',
            border: 'border-red-200',
            icon: <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0" />,
            titleColor: 'text-red-800',
            textColor: 'text-red-700'
        }
        : {
            bg: 'bg-green-50',
            border: 'border-green-200',
            icon: <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />,
            titleColor: 'text-green-800',
            textColor: 'text-green-700'
        };

    return (
        <div className={`${baseClasses} ${theme.bg} ${theme.border}`}>
            {theme.icon}
            <div>
                <h4 className={`font-semibold ${theme.titleColor}`}>Allergies et contre-indications</h4>
                <p className={`text-sm ${theme.textColor}`}>{allergies || 'Aucune renseignée'}</p>
            </div>
        </div>
    );
};

export default AllergyAlert;