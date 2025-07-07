import React from 'react';

interface DetailCardProps {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}

const DetailCard: React.FC<DetailCardProps> = ({ icon: Icon, title, children }) => (
    <div className="bg-white border rounded-lg p-4">
        <h3 className="font-semibold text-gray-800 mb-3 text-base flex items-center gap-2">
            <Icon className="w-5 h-5 text-blue-600" />
            {title}
        </h3>
        <div className="space-y-2 text-sm text-gray-700">
            {children}
        </div>
    </div>
);

export default DetailCard;