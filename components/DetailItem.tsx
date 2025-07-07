import React from 'react';

interface DetailItemProps {
  label: string;
  value: React.ReactNode;
}

const DetailItem: React.FC<DetailItemProps> = ({ label, value }) => (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
        <span className="font-medium text-gray-600">{label}</span>
        <div className="text-right">{value || <span className="text-gray-400">Non renseigné</span>}</div>
    </div>
);

export default DetailItem;