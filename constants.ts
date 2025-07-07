import { Resident, Communication, PlanningRoom, PlanningStay } from './types';

// Helper to parse YYYY-MM-DD strings safely into Date objects
const parseDate = (dateString: string): Date => {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
};

export const RESIDENTS: Resident[] = [
  { 
    id: 1, name: "Élise Dubois", room: "19", gir: "GIR 2", status: "Actif", arrival: "2025-07-25", departure: "2025-08-13", phone: "0601020304", docsComplete: false, devisEnvoye: true,
    email: "elise.dubois.famille@email.com",
    allergies: "Pénicilline, Noix",
    medicalHistory: "Hypertension, Arthrose",
    treatingDoctor: "Dr. Lefevre",
    mobility: "Canne",
    dietaryNeeds: "Régime sans sel strict, aime la purée",
    socialHabits: "Participe au loto, aime regarder la télévision dans le salon commun.",
    documents: [
        { id: 1, name: "Contrat de séjour.pdf", type: 'pdf', size: "1.2 MB", addedAt: "2025-07-20"},
        { id: 2, name: "Pièce d'identité.jpg", type: 'image', size: "850 KB", addedAt: "2025-07-20"},
    ]
  },
  { 
    id: 2, name: "David Martin", room: "3", gir: "GIR 1", status: "Actif", arrival: "2025-06-15", departure: "2025-08-20", phone: "0602030405", docsComplete: true, devisEnvoye: true,
    email: "contact.famille.martin@email.com",
    allergies: "Aucune connue",
    medicalHistory: "Diabète de type 2",
    treatingDoctor: "Dr. Bernard",
    mobility: "Fauteuil roulant",
    dietaryNeeds: "Régime diabétique, texture normale",
    socialHabits: "Préfère manger dans sa chambre, reçoit de la visite tous les jours.",
    documents: [
        { id: 3, name: "Dossier médical.pdf", type: 'pdf', size: "3.5 MB", addedAt: "2025-06-10"},
    ]
  },
  { 
    id: 3, name: "Bernard Dubois", room: "5", gir: "GIR 1", status: "Actif", arrival: "2025-06-10", departure: "2025-07-15", phone: "0603040506", docsComplete: false, devisEnvoye: true,
    mobility: 'Déambulateur',
    dietaryNeeds: 'Nourriture mixée'
  },
  { 
    id: 4, name: "Hector Lefebvre", room: "17", gir: "GIR 4", status: "Actif", arrival: "2025-07-20", departure: "2025-08-25", phone: "0604050607", docsComplete: true, devisEnvoye: true,
    allergies: "Iode",
    mobility: 'Autonome',
    email: "famille.lefebvre@email.com",
    documents: [
      { id: 4, name: "Ordonnance.pdf", type: 'pdf', size: "345 KB", addedAt: "2025-07-18"},
      { id: 5, name: "Fiche de liaison.docx", type: 'word', size: "128 KB", addedAt: "2025-07-19"},
    ]
  },
  { id: 5, name: "Laura Lefevre", room: "4", gir: "GIR 3", status: "À venir", arrival: "2025-08-15", departure: "2025-09-20", phone: "0605060708", docsComplete: false, devisEnvoye: false },
  { id: 6, name: "Lucas Garcia", room: "6", gir: "GIR 4", status: "À venir", arrival: "2025-08-10", departure: "2025-09-15", phone: "0606070809", docsComplete: false, devisEnvoye: false },
  { 
    id: 7, name: "Giselle Simon", room: "2", gir: "GIR 3", status: "Actif", arrival: "2025-07-11", departure: "2025-07-26", phone: "0607080910", docsComplete: true, devisEnvoye: true,
    socialHabits: "Très sociable, participe à toutes les activités."
  },
  { id: 8, name: "Inès Moreau", room: "21", gir: "GIR 5", status: "Actif", arrival: "2025-07-01", departure: "2025-07-30", phone: "0608091011", docsComplete: false, devisEnvoye: true },
  { id: 9, name: "Giselle Richard", room: "12", gir: "GIR 2", status: "À venir", arrival: "2025-08-01", departure: "2025-08-25", phone: "0609101112", docsComplete: false, devisEnvoye: false },
  { id: 10, name: "David Moreau", room: "1", gir: "GIR 2", status: "Actif", arrival: "2025-07-05", departure: "2025-07-19", phone: "0610111213", docsComplete: true, devisEnvoye: true },
  { id: 11, name: "Inès Girard", room: "9", gir: "GIR 4", status: "Parti", arrival: "2025-06-01", departure: "2025-06-20", phone: "0611121314", docsComplete: true, devisEnvoye: true },
  { id: 12, name: "Bernard Moreau", room: "20", gir: "GIR 1", status: "Actif", arrival: "2025-07-10", departure: "2025-08-10", phone: "0612131415", docsComplete: true, devisEnvoye: true },
  { id: 13, name: "Alice Robert", room: "14", gir: "GIR 3", status: "À venir", arrival: "2025-08-05", departure: "2025-09-01", phone: "0613141516", docsComplete: false, devisEnvoye: true },
];

export const COMMUNICATIONS: Communication[] = [
    { id: 1, type: "Email de Bienvenue", status: "À la confirmation", subject: "Bienvenue à la Saisonnale d'Aizenay !", description: "Votre séjour est confirmé. Nous sommes ravis de vous accueillir prochainement.", active: true },
    { id: 2, type: "Rappel J-7", status: "J-7", subject: "Votre arrivée approche !", description: "L'équipe de la Saisonnale est prête à vous accueillir. N'hésitez pas si vous avez des questions.", active: true },
    { id: 3, type: "Préparation du séjour", status: "J-15", subject: "Plus que 15 jours avant votre séjour !", description: "Voici quelques informations utiles pour préparer votre arrivée à la Saisonnale.", active: true },
    { id: 4, type: "Message Jour J", status: "Jour J (pour la famille)", subject: "Bienvenue à M./Mme [Nom du résident]", description: "C'est le grand jour ! Bienvenue à votre proche au sein de notre résidence.", active: true }
];

// Create stays from resident data for a specific month (e.g., July 2025)
const generateStaysForMonth = (year: number, month: number): PlanningStay[] => {
    const stays: PlanningStay[] = [];
    let stayIdCounter = 1;
    RESIDENTS.forEach(resident => {
        const start = parseDate(resident.arrival);
        const end = parseDate(resident.departure);
        
        // Check if the stay overlaps with the target month
        const targetMonthStart = new Date(year, month, 1);
        const targetMonthEnd = new Date(year, month + 1, 0);

        if (start <= targetMonthEnd && end >= targetMonthStart) {
            stays.push({
                id: stayIdCounter++,
                residentId: resident.id,
                start,
                end,
            });
        }
    });
    return stays;
};

const staysForJuly2025 = generateStaysForMonth(2025, 6); // Month is 0-indexed, so 6 is July

// Generate 24 rooms and distribute stays among them
const generatePlanningData = (): PlanningRoom[] => {
    const rooms: PlanningRoom[] = Array.from({ length: 24 }, (_, i) => ({
        roomName: `Chambre ${i + 1}`,
        stays: [],
    }));

    staysForJuly2025.forEach(stay => {
        const resident = RESIDENTS.find(r => r.id === stay.residentId);
        if (resident) {
            const roomNumber = parseInt(resident.room, 10);
            if (roomNumber > 0 && roomNumber <= 24) {
                rooms[roomNumber - 1].stays.push(stay);
            }
        }
    });

    return rooms;
};

export const PLANNING_DATA: PlanningRoom[] = generatePlanningData();