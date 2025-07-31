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
    <div className={`rounded-lg shadow-sm bg-white p-4 flex flex-col gap-2 border border-gray-100`}>
      <div className="flex items-center gap-2">
        {Icon && <Icon className="w-5 h-5 text-gray-400" />}
        <span className="font-semibold text-gray-700 flex-1">{title}</span>
        {titleAction}
      </div>
      <div className={`text-2xl font-bold ${title.includes('Durée Moyenne') ? 'text-[#16a34a]' : color === 'green' ? 'text-[#16a34a]' : color === 'orange' ? 'text-orange-500' : color === 'emerald' ? 'text-emerald-500' : 'text-gray-700'}`}>{content}</div>
    </div>
  );
};

export default StatCard;