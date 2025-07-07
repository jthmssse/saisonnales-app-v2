import React from 'react';
import { ChevronDown } from 'lucide-react';

interface HistoryItemProps {
  label: string;
  date: string;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ label, date }) => (
    <div className="flex items-center justify-between text-sm py-2">
        <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="font-medium text-gray-700">{label}</span>
            <span className="text-gray-500">{date}</span>
        </div>
        <ChevronDown className="w-4 h-4 text-gray-400" />
    </div>
);

export default HistoryItem;