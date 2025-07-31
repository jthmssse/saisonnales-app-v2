// Ajout du calcul du taux d'occupation pour le mois d'août
function getAugustOccupancy(residents: Resident[]): number {
  const year = 2025;
  const month = 7; // Août (0-indexed)
  const daysInAugust = 31;
  let totalOccupied = 0;
  for (let day = 1; day <= daysInAugust; day++) {
    const currentDay = new Date(year, month, day);
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
  const totalPossible = daysInAugust * 24;
  if (totalPossible === 0) return 0;
  return Math.ceil((totalOccupied / totalPossible) * 100);
}
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

  // Calcul de la période à venir où le taux d'occupation est < 80%
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let lowStart: Date | null = null;
  let lowEnd: Date | null = null;
  let lastWasLow = false;
  // planningData doit contenir des objets { date: string, occupancy: number }
  if (Array.isArray(planningData)) {
    for (let i = 0; i < planningData.length; i++) {
      const d = new Date(planningData[i].date);
      d.setHours(0, 0, 0, 0);
      if (d < today) continue;
      if (planningData[i].occupancy < 80) {
        if (!lastWasLow) lowStart = d;
        lowEnd = d;
        lastWasLow = true;
      } else {
        if (lastWasLow) break;
        lastWasLow = false;
      }
    }
  }

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
  // Calcul du taux d'occupation d'août
  const augustRate = getAugustOccupancy(residents);
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
      {augustRate < 80 && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg p-4 flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-yellow-600" />
          <div>
            <p className="font-bold">Alerte : Taux d'occupation faible en août</p>
            <p className="text-sm mt-1">Le taux d'occupation prévu pour août est de {augustRate}% (inférieur à 80%).</p>
          </div>
        </div>
      )}
        <OccupancyCard residents={residents} />
        {/* GIR moyen */}
        <StatCard
          icon={Clock}
          title="GIR moyen"
          content={<p className="text-2xl font-bold text-[#16a34a]">{
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
        <StatCard icon={Clock} title="Durée Moyenne Séjour" content={<p className="text-2xl font-bold text-[#16a34a]">21 jours</p>} color="green" />
        <PeriodStatCard icon={ArrowRight} title="Arrivées" data={arrivals} color="green" colorClass="text-[#16a34a]" />
        <PeriodStatCard icon={ArrowLeft} title="Départs" data={departures} color="orange" colorClass="text-orange-600" />
      </div>


      <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
        <div className="flex items-center space-x-2 mb-3 sm:mb-4">
          <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
          <h2 className="text-base sm:text-lg font-semibold text-gray-800">Prévisions d'Occupation Faible</h2>
        </div>
        <div className="rounded-lg p-1 sm:p-2 flex flex-col">
          {lowStart && lowEnd ? (
            <p className="font-semibold text-[#cc5500] text-sm sm:text-base">
              Du {lowStart.toLocaleDateString()} au {lowEnd.toLocaleDateString()}
            </p>
          ) : (
            <p className="font-semibold text-gray-500 text-sm sm:text-base">Aucune période à venir sous 80% d'occupation</p>
          )}
          <a href={`mailto:${PRESTATAIRES_EMAIL}?subject=Contact%20concernant%20le%20taux%20d'occupation%20faible`} className="mt-4 bg-[#cc5500] text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-[#e66600] text-xs sm:text-sm font-medium whitespace-nowrap flex items-center gap-2 transition-colors shadow-sm hover:shadow-md self-start">
            <Send size={14} className="sm:w-4 sm:h-4"/> Contacter les prestataires
          </a>
        </div>
      </div>

      <PlanningCalendar planningData={planningData} onSelectResident={onSelectResident} residents={filteredResidents} />
    </div>
  );
}