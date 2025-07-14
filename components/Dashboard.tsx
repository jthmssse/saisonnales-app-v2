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

const arrivalsData = {
    'Journalier': { value: '0', subtext: "Aujourd'hui" },
    'Hebdomadaire': { value: '1', subtext: 'Cette semaine' },
    'Mensuel': { value: '8', subtext: 'Ce mois-ci' },
};

const departuresData = {
    'Journalier': { value: '0', subtext: "Aujourd'hui" },
    'Hebdomadaire': { value: '4', subtext: 'Cette semaine' },
    'Mensuel': { value: '11', subtext: 'Ce mois-ci' },
};

export default function Dashboard({ onSelectResident, residents, planningData, search }: DashboardProps) {
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
        <OccupancyCard />
        {/* GIR moyen */}
        <StatCard
          icon={Clock}
          title="GIR moyen"
          content={<p className="text-2xl font-bold text-[#006561]">{
            (() => {
              const girs = residents.map(r => parseInt((r.gir || '').replace(/\D/g, ''))).filter(n => !isNaN(n));
              if (!girs.length) return 'N/A';
              return (girs.reduce((a, b) => a + b, 0) / girs.length).toFixed(2);
            })()
          }</p>}
          color="green"
        />
        <StatCard icon={Clock} title="Durée Moyenne Séjour" content={<p className="text-2xl font-bold text-[#006561]">21 jours</p>} color="green" />
        <PeriodStatCard icon={ArrowRight} title="Arrivées" data={arrivalsData} color="green" colorClass="text-[#006561]" />
        <PeriodStatCard icon={ArrowLeft} title="Départs" data={departuresData} color="orange" colorClass="text-orange-600" />
      </div>

      <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4 sm:p-5">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-900 text-base sm:text-lg">Alerte : Taux d'occupation faible</h3>
              <p className="text-xs sm:text-sm text-yellow-800">Le taux d'occupation mensuel est inférieur à 80%. Pensez à contacter les prestataires.</p>
            </div>
          </div>
          <a href={`mailto:${PRESTATAIRES_EMAIL}?subject=Contact%20concernant%20le%20taux%20d'occupation%20faible`} className="bg-red-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-red-700 text-xs sm:text-sm font-medium whitespace-nowrap flex items-center gap-2 transition-colors shadow-sm hover:shadow-md">
            <Send size={14} className="sm:w-4 sm:h-4"/> Contacter les prestataires
          </a>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
        <div className="flex items-center space-x-2 mb-3 sm:mb-4">
          <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
          <h2 className="text-base sm:text-lg font-semibold text-gray-800">Prévisions d'Occupation Faible</h2>
        </div>
        <div className="bg-red-50 rounded-lg p-3 sm:p-4">
          <p className="font-semibold text-red-800 text-sm sm:text-base">Du 30 juin au 27 septembre 2025</p>
        </div>
      </div>

      <PlanningCalendar planningData={planningData} onSelectResident={onSelectResident} residents={filteredResidents} />
    </div>
  );
}