import React from 'react';
import { StatCardProps } from '../types';

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, title, content, color = "gray", titleAction }) => {
  const colorClasses = {
    blue: 'text-blue-500 bg-blue-50',
    green: 'text-[#16a34a] bg-[#16a34a]/10',
    purple: 'text-purple-500 bg-purple-50',
    orange: 'text-orange-500 bg-orange-50',
    red: 'text-red-500 bg-red-50',
    gray: 'text-gray-500 bg-gray-50',
  };

  const iconColor = colorClasses[color as keyof typeof colorClasses] || colorClasses.gray;

  return (
    <div className="bg-white rounded-xl shadow-sm border p-5">
        <div className="flex justify-between items-center mb-4">
             <div className={`p-2 rounded-lg ${iconColor}`}>
                <Icon className={`w-6 h-6`} />
            </div>
            {titleAction && <div>{titleAction}</div>}
        </div>
      <div>
        <p className="text-sm text-gray-500 mb-1 font-medium">{title}</p>
        {content}
      </div>
    </div>
  );
};

export default StatCard;