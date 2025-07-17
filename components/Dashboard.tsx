import React from 'react';
import { Clock, ArrowRight, TrendingDown, AlertTriangle, Send, ArrowLeft } from 'lucide-react';
import StatCard from './StatCard';
import PlanningCalendar from './PlanningCalendar';
import { Resident } from '../types';
import OccupancyCard from './OccupancyCard';
import PeriodStatCard from './PeriodStatCard';

interface DashboardProps {
    onSelectResident: (residentId: number) => void;
    residents: Resident[];
    planningData: any[]; // adapte le type si tu veux
    search?: string;
}

const PRESTATAIRES_EMAIL = "prestataires@example.com";

const calculateArrivalsDepartures = (residents: Resident[]) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Daily
    const dailyArrivals = residents.filter(r => {
        const arrival = new Date(r.arrival);
        arrival.setHours(0, 0, 0, 0);
        return arrival.getTime() === today.getTime();
    }).length;

    const dailyDepartures = residents.filter(r => {
        const departure = new Date(r.departure);
        departure.setHours(0, 0, 0, 0);
        return departure.getTime() === today.getTime();
    }).length;

    // Weekly
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Sunday as start of week
    startOfWeek.setHours(0, 0, 0, 0);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const weeklyArrivals = residents.filter(r => {
        const arrival = new Date(r.arrival);
        arrival.setHours(0, 0, 0, 0);
        return arrival >= startOfWeek && arrival <= endOfWeek;
    }).length;

    const weeklyDepartures = residents.filter(r => {
        const departure = new Date(r.departure);
        departure.setHours(0, 0, 0, 0);
        return departure >= startOfWeek && departure <= endOfWeek;
    }).length;

    // Monthly
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    startOfMonth.setHours(0, 0, 0, 0);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    endOfMonth.setHours(23, 59, 59, 999);

    const monthlyArrivals = residents.filter(r => {
        const arrival = new Date(r.arrival);
        arrival.setHours(0, 0, 0, 0);
        return arrival >= startOfMonth && arrival <= endOfMonth;
    }).length;

    const monthlyDepartures = residents.filter(r => {
        const departure = new Date(r.departure);
        departure.setHours(0, 0, 0, 0);
        return departure >= startOfMonth && departure <= endOfMonth;
    }).length;

    return {
        arrivals: {
            'Journalier': { value: dailyArrivals.toString(), subtext: "Aujourd'hui" },
            'Hebdomadaire': { value: weeklyArrivals.toString(), subtext: 'Cette semaine' },
            'Mensuel': { value: monthlyArrivals.toString(), subtext: 'Ce mois-ci' },
        },
        departures: {
            'Journalier': { value: dailyDepartures.toString(), subtext: "Aujourd'hui" },
            'Hebdomadaire': { value: weeklyDepartures.toString(), subtext: 'Cette semaine' },
            'Mensuel': { value: monthlyDepartures.toString(), subtext: 'Ce mois-ci' },
        }
    };
};

export default function Dashboard({ onSelectResident, residents, planningData, search }: DashboardProps) {
  const { arrivals, departures } = React.useMemo(() => calculateArrivalsDepartures(residents), [residents]);

  // Filtrage des résidents pour le planning si search fourni
  const filteredResidents = React.useMemo(() => {
    if (!search) return residents;
    const s = search.trim().toLowerCase();
    return residents.filter(r =>
      r.name.toLowerCase().includes(s) ||
      (r.room && r.room.toLowerCase().includes(s)) ||
      (r.familyContactName && r.familyContactName.toLowerCase().includes(s))
    );
  }, [search, residents]);
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
        <OccupancyCard residents={residents} />
        {/* GIR moyen */}
        <StatCard
          icon={Clock}
          title="GIR moyen"
          content={<p className="text-2xl font-bold text-[#006561]">{
            (() => {
              const girs = residents.map(r => {
                const girValue = parseInt((r.gir || '').replace(/\D/g, ''));
                // GIR values are typically 1 to 6. Filter out invalid GIRs.
                return (girValue >= 1 && girValue <= 6) ? girValue : NaN;
              }).filter(n => !isNaN(n));

              if (!girs.length) return 'N/A';
              return (girs.reduce((a, b) => a + b, 0) / girs.length).toFixed(2);
            })()
          }</p>}
          color="green"
        />
        <StatCard icon={Clock} title="Durée Moyenne Séjour" content={<p className="text-2xl font-bold text-[#006561]">21 jours</p>} color="green" />
        <PeriodStatCard icon={ArrowRight} title="Arrivées" data={arrivals} color="green" colorClass="text-[#006561]" />
        <PeriodStatCard icon={ArrowLeft} title="Départs" data={departures} color="orange" colorClass="text-orange-600" />
      </div>


      <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
        <div className="flex items-center space-x-2 mb-3 sm:mb-4">
          <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
          <h2 className="text-base sm:text-lg font-semibold text-gray-800">Prévisions d'Occupation Faible</h2>
        </div>
        <div className="bg-red-50 rounded-lg p-3 sm:p-4 flex flex-col">
          <p className="font-semibold text-red-800 text-sm sm:text-base">Du 30 juin au 27 septembre 2025</p>
          <a href={`mailto:${PRESTATAIRES_EMAIL}?subject=Contact%20concernant%20le%20taux%20d'occupation%20faible`} className="mt-4 bg-red-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-red-700 text-xs sm:text-sm font-medium whitespace-nowrap flex items-center gap-2 transition-colors shadow-sm hover:shadow-md self-start">
            <Send size={14} className="sm:w-4 sm:h-4"/> Contacter les prestataires
          </a>
        </div>
      </div>

      <PlanningCalendar planningData={planningData} onSelectResident={onSelectResident} residents={filteredResidents} />
    </div>
  );
}