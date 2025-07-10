import React, { useState } from 'react';
import { LucideIcon, ChevronDown } from 'lucide-react';
import StatCard from './StatCard';

type Period = 'Journalier' | 'Hebdomadaire' | 'Mensuel';

interface PeriodData {
    value: string;
    subtext: string;
}

interface PeriodStatContentProps {
    period: Period;
    data: { [key in Period]: PeriodData };
    colorClass: string;
}

const PeriodStatContent: React.FC<PeriodStatContentProps> = ({ period, data, colorClass }) => {
    const currentData = data[period];
    return (
        <p className={`text-2xl font-bold ${colorClass}`}>{currentData.value} <span className="text-sm font-normal text-gray-500">{currentData.subtext}</span></p>
    );
};

interface PeriodStatCardProps {
    icon: LucideIcon;
    title: string;
    color: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'gray';
    data: { [key in Period]: PeriodData };
    colorClass: string;
}

const PeriodStatCard: React.FC<PeriodStatCardProps> = ({ icon, title, color, data, colorClass }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [period, setPeriod] = useState<Period>('Hebdomadaire');
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
            icon={icon}
            title={title}
            content={<PeriodStatContent period={period} data={data} colorClass={colorClass} />}
            color={color}
            titleAction={titleAction}
        />
    );
};

export default PeriodStatCard;

