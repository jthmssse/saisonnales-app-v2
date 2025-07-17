import React, { useState } from 'react';
import { Users, ChevronDown } from 'lucide-react';
import StatCard from './StatCard.tsx';
import { Resident } from '../types';

type Period = 'Journalier' | 'Hebdomadaire' | 'Mensuel';

interface OccupancyCardProps {
    residents: Resident[];
}

const OccupancyCard: React.FC<OccupancyCardProps> = ({ residents }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [period, setPeriod] = useState<Period>('Journalier');
    const periods: Period[] = ['Journalier', 'Hebdomadaire', 'Mensuel'];

    const calculateOccupancy = (p: Period) => {
        const totalRooms = 24; // Assuming 24 rooms as per planningData in App.tsx

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let activeResidentsCount = 0;

        if (p === 'Journalier') {
            activeResidentsCount = residents.filter(r => {
                const arrival = new Date(r.arrival);
                const departure = new Date(r.departure);
                arrival.setHours(0, 0, 0, 0);
                departure.setHours(0, 0, 0, 0);
                return arrival <= today && departure >= today;
            }).length;
        } else if (p === 'Hebdomadaire') {
            const startOfWeek = new Date(today);
            startOfWeek.setDate(today.getDate() - today.getDay()); // Sunday as start of week
            startOfWeek.setHours(0, 0, 0, 0);
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6);
            endOfWeek.setHours(23, 59, 59, 999);

            activeResidentsCount = residents.filter(r => {
                const arrival = new Date(r.arrival);
                const departure = new Date(r.departure);
                arrival.setHours(0, 0, 0, 0);
                departure.setHours(0, 0, 0, 0);
                return (arrival <= endOfWeek && departure >= startOfWeek);
            }).length;
        } else if (p === 'Mensuel') {
            const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
            startOfMonth.setHours(0, 0, 0, 0);
            const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            endOfMonth.setHours(23, 59, 59, 999);

            activeResidentsCount = residents.filter(r => {
                const arrival = new Date(r.arrival);
                const departure = new Date(r.departure);
                arrival.setHours(0, 0, 0, 0);
                departure.setHours(0, 0, 0, 0);
                return (arrival <= endOfMonth && departure >= startOfMonth);
            }).length;
        }

        const occupancyRate = (activeResidentsCount / totalRooms) * 100;
        return `${occupancyRate.toFixed(0)}%`;
    };

    const StatOccupationContent: React.FC<{period: Period, residents: Resident[]}> = ({ period, residents }) => {
        const occupancyValue = calculateOccupancy(period);
        const color = occupancyValue === '100%' ? 'text-[#006561]' : 'text-orange-600'; // Example color logic
        return (
            <p className={`text-xl sm:text-2xl font-bold ${color}`}>{occupancyValue} <span className="text-xs sm:text-sm font-normal text-gray-500">{period}</span></p>
        );
    };

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
            content={<StatOccupationContent period={period} residents={residents} />}
            color="green"
            titleAction={titleAction}
        />
    );
};

export default OccupancyCard;