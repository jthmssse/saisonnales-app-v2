import React, { useState } from 'react';
import { Users, ChevronDown } from 'lucide-react';
import StatCard from './StatCard.tsx';

type Period = 'Journalier' | 'Hebdomadaire' | 'Mensuel';

const StatOccupationContent: React.FC<{period: Period}> = ({ period }) => {
    const data = {
        'Journalier': { value: '75%', color: 'text-[#006561]' },
        'Hebdomadaire': { value: '72%', color: 'text-[#006561]' },
        'Mensuel': { value: '24%', color: 'text-[#006561]' },
    };
    return (
        <p className={`text-xl sm:text-2xl font-bold ${data[period].color}`}>{data[period].value} <span className="text-xs sm:text-sm font-normal text-gray-500">{period}</span></p>
    );
};

const OccupancyCard: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [period, setPeriod] = useState<Period>('Journalier');
    const periods: Period[] = ['Journalier', 'Hebdomadaire', 'Mensuel'];

    const handleSelect = (p: Period) => {
        setPeriod(p);
        setIsOpen(false);
    };

    const titleAction = (
        <div className="relative">
            <button onClick={() => setIsOpen(!isOpen)} className="p-1 rounded-full hover:bg-gray-200">
                <ChevronDown size={16} className="text-gray-500" />
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-xl z-20">
                    {periods.map(p => (
                         <a key={p} href="#" onClick={(e) => { e.preventDefault(); handleSelect(p); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                           {p}
                         </a>
                    ))}
                </div>
            )}
        </div>
    );

    return (
        <StatCard
            icon={Users}
            title="Taux d'occupation"
            content={<StatOccupationContent period={period} />}
            color="green"
            titleAction={titleAction}
        />
    );
};

export default OccupancyCard;