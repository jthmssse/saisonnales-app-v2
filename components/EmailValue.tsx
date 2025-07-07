import React from 'react';
import { Mail } from 'lucide-react';

interface EmailValueProps {
    email: string;
}

const EmailValue: React.FC<EmailValueProps> = ({ email }) => (
    <div className="flex items-center justify-end gap-2">
        <span>{email}</span>
        <a href={`mailto:${email}`} className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-100 rounded-full transition-colors">
            <Mail size={16} />
        </a>
    </div>
);

export default EmailValue;