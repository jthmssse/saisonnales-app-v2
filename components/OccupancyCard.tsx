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

    const calculateOccupancyRate = (p: Period): number => {
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
            const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            const daysInMonth = endOfMonth.getDate();
            let totalOccupiedDays = 0;

            for (let day = 1; day <= daysInMonth; day++) {
                const currentDay = new Date(today.getFullYear(), today.getMonth(), day);
                currentDay.setHours(0, 0, 0, 0);

                const occupiedRoomsToday = residents.filter(r => {
                    const arrival = new Date(r.arrival);
                    const departure = new Date(r.departure);
                    arrival.setHours(0, 0, 0, 0);
                    departure.setHours(0, 0, 0, 0);
                    return (arrival <= currentDay && departure >= currentDay);
                }).length;
                totalOccupiedDays += occupiedRoomsToday;
            }
            // Calculate average daily occupancy for the month
            activeResidentsCount = totalOccupiedDays / daysInMonth;
        }

        return (activeResidentsCount / totalRooms) * 100;
    };

    const getMonthlyOccupancyRate = (): number => {
        return calculateOccupancyRate('Mensuel');
    };

    const StatOccupationContent: React.FC<{period: Period, residents: Resident[]}> = ({ period, residents }) => {
        const occupancyValue = calculateOccupancyRate(period);
        const color = occupancyValue === 100 ? 'text-[#006561]' : 'text-orange-600'; // Example color logic
        return (
            <p className={`text-xl sm:text-2xl font-bold ${color}`}>{occupancyValue.toFixed(0)}% <span className="text-xs sm:text-sm font-normal text-gray-500">{period}</span></p>
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
            <div className="mt-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg flex items-center justify-between">
                {period === 'Mensuel' && getMonthlyOccupancyRate() < 80 && (
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM10 13a1 1 0 100-2 1 1 0 000 2zm0-6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                        <div>
                            <p className="font-bold">Alerte : Taux d'occupation faible</p>
                            <p className="text-sm mt-1">Le taux d'occupation mensuel est inférieur à 80%. Pensez à contacter les prestataires.</p>
                        </div>
                    </div>
                )}
                <button className="ml-auto px-4 py-2 rounded-lg text-white font-bold bg-[#cc5500] hover:bg-[#b34b00] flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l.684-.275a1 1 0 001.086.342l2.545 1.137a1 1 0 001.046 0l2.545-1.137a1 1 0 001.086-.342l.684.275a1 1 0 001.169-1.409l-7-14z" />
                    </svg>
                    Contacter les prestataires
                </button>
            </div>
        </div>
    );
};

export default OccupancyCard;