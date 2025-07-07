import React from 'react';

interface ContactValueProps {
    name?: string;
    phone?: string;
}

const ContactValue: React.FC<ContactValueProps> = ({ name, phone }) => (
    <div>
        <div>{name || "Non renseigné"}</div>
        {phone && <div className="text-gray-500">{phone}</div>}
    </div>
);

export default ContactValue;