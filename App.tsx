import React, { useState, useCallback } from 'react';
import { ActiveTab, Resident, NewReservationData } from './types';
import { RESIDENTS } from './constants';
import Header from './components/Header.tsx';
import Sidebar from './components/Sidebar.tsx';
import Dashboard from './components/Dashboard.tsx';
import ResidentsView from './components/ResidentsView.tsx';
import CommunicationsView from './components/CommunicationsView.tsx';
import ResidentModal from './components/ResidentModal.tsx';
import NewReservationModal from './components/NewReservationModal.tsx';

const CURRENT_USER_NAME = "Jean-Michel";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [residents, setResidents] = useState<Resident[]>(RESIDENTS);
  const [selectedResident, setSelectedResident] = useState<Resident | null>(null);
  const [isNewReservationModalOpen, setNewReservationModalOpen] = useState(false);

  const handleSelectResidentById = useCallback((residentId: number | null) => {
    if (residentId === null) {
      setSelectedResident(null);
      return;
    }
    const resident = residents.find(r => r.id === residentId) || null;
    setSelectedResident(resident);
  }, [residents]);

  const handleSaveReservation = useCallback((data: NewReservationData) => {
      console.log("Saving new reservation: ", data);
      const newResident: Resident = {
        ...data,
        // Génère un ID unique et sûr en trouvant l'ID maximum existant et en ajoutant 1.
        // Le `|| 0` gère le cas où la liste des résidents est vide.
        id: (Math.max(...residents.map(r => r.id)) || 0) + 1,
        status: 'À venir',
      };
      setResidents(prev => [...prev, newResident]);
      setNewReservationModalOpen(false);
  }, [residents]);

  // Génère la structure attendue par PlanningCalendar à partir des residents
  const planningData = React.useMemo(() => {
    // Regroupe les résidents par chambre
    const rooms = new Map<string, { roomName: string, stays: any[] }>();
    residents.forEach(resident => {
      if (!resident.room) return;
      if (!rooms.has(resident.room)) {
        rooms.set(resident.room, { roomName: resident.room, stays: [] });
      }
      rooms.get(resident.room)!.stays.push({
        id: resident.id,
        residentId: resident.id,
        start: resident.arrival,
        end: resident.departure,
      });
    });
    return Array.from(rooms.values());
  }, [residents]);

  const renderContent = () => {
    switch (activeTab) {
      case 'communications':
        return <CommunicationsView />;
      case 'residents':
        return <ResidentsView onSelectResident={setSelectedResident} residents={residents} />;
      case 'dashboard':
      default:
        return <Dashboard onSelectResident={handleSelectResidentById} residents={residents} planningData={planningData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header onNewReservationClick={() => setNewReservationModalOpen(true)} />
      <div className="flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-6 lg:p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Bonjour, {CURRENT_USER_NAME}</h1>
            <p className="text-gray-600">Voici le résumé de l'activité de votre résidence.</p>
          </div>
          {renderContent()}
        </main>
      </div>

      {selectedResident && (
        <ResidentModal
          resident={selectedResident}
          onClose={() => setSelectedResident(null)}
        />
      )}
      
      {isNewReservationModalOpen && (
        <NewReservationModal
          onClose={() => setNewReservationModalOpen(false)}
          onSave={handleSaveReservation}
        />
      )}
    </div>
  );
};

export default App;