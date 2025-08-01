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

    const totalRooms = 24; // Assuming 24 rooms as per planningData in App.tsx


    // Calcule le taux d'occupation réel sur la période (jours-chambres occupés / jours-chambres totaux)
    const calculateOccupancyRate = (p: Period): number => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        let totalOccupied = 0;
        let totalPossible = 0;

        if (p === 'Journalier') {
            // 1 jour, 24 chambres
            totalPossible = 24;
            totalOccupied = residents.filter(r => {
                const arrival = new Date(r.arrival);
                const departure = new Date(r.departure);
                arrival.setHours(0, 0, 0, 0);
                departure.setHours(0, 0, 0, 0);
                return arrival <= today && departure >= today;
            }).length;
        } else if (p === 'Hebdomadaire') {
            // 7 jours, 24 chambres
            const startOfWeek = new Date(today);
            startOfWeek.setDate(today.getDate() - today.getDay()); // Sunday as start of week
            startOfWeek.setHours(0, 0, 0, 0);
            totalPossible = 7 * 24;
            for (let i = 0; i < 7; i++) {
                const currentDay = new Date(startOfWeek);
                currentDay.setDate(startOfWeek.getDate() + i);
                currentDay.setHours(0, 0, 0, 0);
                const occupiedRooms = residents.filter(r => {
                    const arrival = new Date(r.arrival);
                    const departure = new Date(r.departure);
                    arrival.setHours(0, 0, 0, 0);
                    departure.setHours(0, 0, 0, 0);
                    return arrival <= currentDay && departure >= currentDay;
                }).length;
                totalOccupied += occupiedRooms;
            }
        } else if (p === 'Mensuel') {
            // Mois courant, 24 chambres
            const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
            const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            const daysInMonth = endOfMonth.getDate();
            totalPossible = daysInMonth * 24;
            for (let day = 1; day <= daysInMonth; day++) {
                const currentDay = new Date(today.getFullYear(), today.getMonth(), day);
                currentDay.setHours(0, 0, 0, 0);
                const occupiedRooms = residents.filter(r => {
                    const arrival = new Date(r.arrival);
                    const departure = new Date(r.departure);
                    arrival.setHours(0, 0, 0, 0);
                    departure.setHours(0, 0, 0, 0);
                    return arrival <= currentDay && departure >= currentDay;
                }).length;
                totalOccupied += occupiedRooms;
            }
        }
        if (totalPossible === 0) return 0;
        return (totalOccupied / totalPossible) * 100;
    };

    const getMonthlyOccupancyRate = (): number => {
        return calculateOccupancyRate('Mensuel');
    };

    const StatOccupationContent: React.FC<{period: Period, residents: Resident[]}> = ({ period, residents }) => {
        const occupancyValue = calculateOccupancyRate(period);
        const roundedValue = Math.ceil(occupancyValue);
        const color = roundedValue === 100 ? 'text-[#16a34a]' : 'text-orange-600';
        return (
            <p className={`text-xl sm:text-2xl font-bold ${color}`}>{roundedValue}% <span className="text-xs sm:text-sm font-normal text-gray-500">{period}</span></p>
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
        <div className="flex flex-col">
            <StatCard
                icon={Users}
                title="Taux d'occupation"
                content={<StatOccupationContent period={period} residents={residents} />}
                color="green"
                titleAction={titleAction}
            />
            {period === 'Mensuel' && getMonthlyOccupancyRate() < 80 && (
                <div className="mt-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM10 13a1 1 0 100-2 1 1 0 000 2zm0-6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                    <div>
                        <p className="font-bold">Alerte : Taux d'occupation faible</p>
                        <p className="text-sm mt-1">Le taux d'occupation mensuel est inférieur à 80%. Pensez à contacter les prestataires.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OccupancyCard;