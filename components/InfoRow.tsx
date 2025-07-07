import React from 'react';

interface InfoRowProps {
  label: string;
  value: string | undefined;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => (
    <div>
        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</label>
        <p className="text-base font-semibold text-gray-800">{value || 'N/A'}</p>
    </div>
);

export default InfoRow;