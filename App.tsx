import React, { useState, useCallback, useEffect } from 'react';
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // New state for sidebar
  // On initialise avec un tableau vide pour éviter d'écraser le localStorage avec les données par défaut au premier rendu.
  const [residents, setResidents] = useState<Resident[]>([]);
  const [selectedResident, setSelectedResident] = useState<Resident | null>(null);
  const [isNewReservationModalOpen, setNewReservationModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null);
  // Ajoute un effet pour afficher le message après soumission native Netlify
  useEffect(() => {
    const handler = (event) => {
      // Vérifie que l'événement concerne le bon formulaire
      const form = document.forms['new-reservation'];
      if (form && event.target === form) {
        setConfirmationMessage("Votre réservation a bien été validée et un e-mail de confirmation a été envoyé automatiquement au client.");
        setTimeout(() => setConfirmationMessage(null), 4000);
      }
    };
    window.addEventListener('submit', handler, true);
    return () => window.removeEventListener('submit', handler, true);
  }, []);

  // Charge les données depuis le localStorage une seule fois au montage du composant (côté client)
  useEffect(() => {
    try {
      const localData = localStorage.getItem('saisonnales-residents');
      // Si des données existent dans le localStorage, on les utilise. Sinon, on charge les données par défaut.
      if (localData) {
        setResidents(JSON.parse(localData));
      } else {
        setResidents(RESIDENTS);
      }
    } catch (error) {
      console.error("Impossible de charger les résidents depuis le localStorage", error);
      setResidents(RESIDENTS); // En cas d'erreur, on revient aux données par défaut.
    }
  }, []); // Le tableau de dépendances vide assure que cela ne s'exécute qu'une fois.

  // Sauvegarde les résidents dans le localStorage à chaque modification
  useEffect(() => {
    // On ne sauvegarde que si la liste des résidents n'est pas vide (pour éviter d'écraser les données au montage initial)
    if (residents.length > 0) {
      try {
        localStorage.setItem('saisonnales-residents', JSON.stringify(residents));
      } catch (error) {
        console.error("Impossible de sauvegarder les résidents dans le localStorage", error);
      }
    }
  }, [residents]);

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
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const arrivalDate = new Date(data.arrival);
      const departureDate = new Date(data.departure);
      let status: 'Actif' | 'À venir' | 'Terminé';
      if (arrivalDate > today) {
        status = 'À venir';
      } else if (departureDate < today) {
        status = 'Terminé';
      } else {
        status = 'Actif';
      }
      const newResident: Resident = {
        ...data,
        id: (Math.max(...residents.map(r => r.id)) || 0) + 1,
        status: status,
      };
      setResidents(prev => [...prev, newResident]);
      setNewReservationModalOpen(false);
      setConfirmationMessage("Votre réservation a bien été validée. Un e-mail de confirmation a été automatiquement envoyé au client.");
      setTimeout(() => setConfirmationMessage(null), 4000);
  }, [residents]);
      {confirmationMessage && (
        <div className="fixed top-20 right-8 bg-green-100 text-green-800 px-6 py-3 rounded shadow-lg z-50">
          {confirmationMessage}
        </div>
      )}

  // Fonction pour mettre à jour un résident (ex: changement de chambre ou ajout de document)
  const handleUpdateResident = useCallback((updated: Resident) => {
    setResidents(prev => prev.map(r => r.id === updated.id ? updated : r));
    setSelectedResident(updated); // pour garder la fiche à jour
  }, []);

  const handleDeleteResident = useCallback((residentId: number) => {
    // On met à jour la liste des résidents en filtrant celui à supprimer
    setResidents(prev => prev.filter(r => r.id !== residentId));
    // On ferme la modale
    setSelectedResident(null);
  }, []);

  // Génère la structure attendue par PlanningCalendar : 24 chambres fixes, séjours dynamiques
  const planningData = React.useMemo(() => {
    // Génère 24 chambres (Chambre 1 à Chambre 24)
    const rooms = Array.from({ length: 24 }, (_, i) => ({
      roomName: `Chambre ${i + 1}`,
      stays: [] as any[],
    }));
    residents.forEach(resident => {
      const roomNumber = parseInt(resident.room, 10);
      if (!isNaN(roomNumber) && roomNumber > 0 && roomNumber <= 24) {
        rooms[roomNumber - 1].stays.push({
          id: resident.id,
          residentId: resident.id,
          start: resident.arrival,
          end: resident.departure,
        });
      }
    });
    return rooms;
  }, [residents]);

  const renderContent = () => {
    switch (activeTab) {
      case 'communications':
        return <CommunicationsView />;
      case 'residents': {
        // Barre de recherche fonctionnelle sur Résidents
        const s = search.trim().toLowerCase();
        const filteredResidents = !s ? residents : residents.filter(r =>
          r.name.toLowerCase().includes(s) ||
          (r.room && r.room.toLowerCase().includes(s)) ||
          (r.familyContactName && r.familyContactName.toLowerCase().includes(s))
        );
        return <ResidentsView
          residents={filteredResidents}
          onSelectResident={setSelectedResident}
          onNewResidentClick={() => setNewReservationModalOpen(true)}
        />;
      }
      case 'dashboard':
      default:
        return <Dashboard
          onSelectResident={handleSelectResidentById}
          residents={residents}
          planningData={planningData}
          search={search}
        />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header
        onNewReservationClick={() => setNewReservationModalOpen(true)}
        search={['dashboard', 'residents'].includes(activeTab) ? search : ''}
        onSearchChange={['dashboard', 'residents'].includes(activeTab) ? setSearch : () => {}}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} // Pass toggle function
      />
      <div className="flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <main className="flex-1 p-4 lg:p-8 lg:ml-64 mt-[69px] lg:mt-0">
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Bonjour, {CURRENT_USER_NAME}</h1>
            <p className="text-sm sm:text-base text-gray-600">Voici le résumé de l'activité de votre résidence.</p>
          </div>
          {renderContent()}
        </main>
      </div>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {selectedResident && (
        <ResidentModal
          resident={selectedResident}
          onClose={() => setSelectedResident(null)}
          onUpdateResident={handleUpdateResident}
          onDeleteResident={handleDeleteResident}
        />
      )}
      
      {isNewReservationModalOpen && (
        <NewReservationModal
          onClose={() => setNewReservationModalOpen(false)}
          onSave={handleSaveReservation}
          residents={residents}
        />
      )}

      {confirmationMessage && (
        <div className="fixed top-20 right-8 bg-green-100 text-green-800 px-6 py-3 rounded shadow-lg z-50">
          {confirmationMessage}
        </div>
      )}
    </div>
  );
};

export default App;
