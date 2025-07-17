import { Resident, Communication, PlanningRoom, PlanningStay } from './types';

// Helper to parse YYYY-MM-DD strings safely into Date objects
const parseDate = (dateString: string): Date => {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
};

export const RESIDENTS: Resident[] = [
  {
    id: 1, name: "BONAVITA Joseph", room: "1", gir: "GIR 4", status: "Actif", arrival: "2025-07-07", departure: "2025-08-07", phone: "N/A", docsComplete: false, devisEnvoye: true, birthDate: "1948-04-03", imageRights: "oui",
    // email: "elise.dubois.famille@email.com",
    // allergies: "Pénicilline, Noix",
    // medicalHistory: "Hypertension, Arthrose",
    // treatingDoctor: "Dr. Lefevre",
    // mobility: "Canne",
    // dietaryNeeds: "Régime sans sel strict, aime la purée",
    // socialHabits: "Participe au loto, aime regarder la télévision dans le salon commun.",
    // documents: [
    //     { id: 1, name: "Contrat de séjour.pdf", type: 'pdf', size: "1.2 MB", addedAt: "2025-07-20"},
    //     { id: 2, name: "Pièce d'identité.jpg", type: 'image', size: "850 KB", addedAt: "2025-07-20"},
    // ]
  },
  {
    id: 2, name: "SACHOT Huguette", room: "2", gir: "GIR 6", status: "Actif", arrival: "2025-07-03", departure: "2025-07-25", phone: "N/A", docsComplete: false, devisEnvoye: true, birthDate: "1943-08-28", imageRights: "oui sauf réseaux sociaux",
    // email: "contact.famille.martin@email.com",
    // allergies: "Aucune connue",
    // medicalHistory: "Diabète de type 2",
    // treatingDoctor: "Dr. Bernard",
    // mobility: "Fauteuil roulant",
    // dietaryNeeds: "Régime diabétique, texture normale",
    // socialHabits: "Préfère manger dans sa chambre, reçoit de la visite tous les jours.",
    // documents: [
    //     { id: 3, name: "Dossier médical.pdf", type: 'pdf', size: "3.5 MB", addedAt: "2025-06-10"},
    // ]
  },
  {
    id: 3, name: "TRICHEREAU Marie Josèphe", room: "3", gir: "GIR 5", status: "Actif", arrival: "2025-06-13", departure: "2025-09-13", phone: "N/A", docsComplete: false, devisEnvoye: true, birthDate: "1946-08-26", imageRights: "oui sauf réseaux sociaux",
    // mobility: 'Déambulateur',
    // dietaryNeeds: 'Nourriture mixée'
  },
  {
    id: 4, name: "VINET Marie Madeleine", room: "4", gir: "GIR 4", status: "Actif", arrival: "2025-06-11", departure: "2025-09-11", phone: "N/A", docsComplete: false, devisEnvoye: true, birthDate: "1939-03-22", imageRights: "oui sauf réseaux sociaux",
    // allergies: "Iode",
    // mobility: 'Autonome',
    // email: "famille.lefebvre@email.com",
    // documents: [
    //   { id: 4, name: "Ordonnance.pdf", type: 'pdf', size: "345 KB", addedAt: "2025-07-18"},
    //   { id: 5, name: "Fiche de liaison.docx", type: 'word', size: "128 KB", addedAt: "2025-07-19"},
    // ]
  },
  {
    id: 5, name: "GIRARD Marie Josèphe", room: "5", gir: "GIR 4", status: "Actif", arrival: "2025-06-13", departure: "2025-09-13", phone: "N/A", docsComplete: false, devisEnvoye: true, birthDate: "1936-12-01", imageRights: "oui sauf réseaux sociaux",
  },
  {
    id: 6, name: "PBEAU Michelle", room: "6", gir: "GIR 4", status: "Actif", arrival: "2025-04-10", departure: "2025-09-13", phone: "N/A", docsComplete: false, devisEnvoye: true, birthDate: "1935-07-03", imageRights: "non",
  },
  {
    id: 7, name: "LAPORTE André", room: "7", gir: "GIR 4", status: "Actif", arrival: "2025-04-14", departure: "2025-08-15", phone: "N/A", docsComplete: false, devisEnvoye: true, birthDate: "1936-08-28", imageRights: "oui",
    // socialHabits: "Très sociable, participe à toutes les activités."
  },
  {
    id: 8, name: "GOURAUD Georgette", room: "8", gir: "GIR 5", status: "Actif", arrival: "2025-07-11", departure: "2025-07-23", phone: "N/A", docsComplete: false, devisEnvoye: true, birthDate: "1938-01-18", imageRights: "oui sauf réseaux sociaux",
  },
  {
    id: 9, name: "RAVELEAU Daniel", room: "9", gir: "GIR 4", status: "Actif", arrival: "2025-06-11", departure: "2025-07-23", phone: "N/A", docsComplete: false, devisEnvoye: true, birthDate: "1958-09-16", imageRights: "oui sauf réseaux sociaux",
  },
  {
    id: 10, name: "LUCAS Chantal", room: "10", gir: "GIR 6", status: "Actif", arrival: "2025-05-14", departure: "2025-08-15", phone: "N/A", docsComplete: false, devisEnvoye: true, birthDate: "1943-03-23", imageRights: "non",
  },
  {
    id: 11, name: "BERNARD Gilbert", room: "11", gir: "GIR 4", status: "Actif", arrival: "2025-03-12", departure: "2025-09-12", phone: "N/A", docsComplete: false, devisEnvoye: true, birthDate: "1927-10-20", imageRights: "non",
  },
  {
    id: 12, name: "ALLEMAND Guy", room: "12", gir: "GIR 3", status: "Actif", arrival: "2025-05-20", departure: "2025-07-31", phone: "N/A", docsComplete: false, devisEnvoye: true, birthDate: "1940-12-09", imageRights: "oui sauf réseaux sociaux",
  },
  {
    id: 13, name: "VALTON Andrée", room: "13", gir: "GIR 5", status: "Actif", arrival: "2025-07-15", departure: "2025-09-11", phone: "N/A", docsComplete: false, devisEnvoye: true, birthDate: "1944-01-02", imageRights: "oui",
  },
  {
    id: 14, name: "ZEELEN Bernadette", room: "14", gir: "GIR 4", status: "Actif", arrival: "2025-06-23", departure: "2025-09-23", phone: "N/A", docsComplete: false, devisEnvoye: true, birthDate: "1933-02-26", imageRights: "oui sauf réseaux sociaux",
  },
  {
    id: 15, name: "BILLAUD Louis", room: "15", gir: "GIR 4", status: "Actif", arrival: "2025-01-15", departure: "2025-08-17", phone: "N/A", docsComplete: false, devisEnvoye: true, birthDate: "1952-02-23", imageRights: "oui sauf réseaux sociaux",
  },
  {
    id: 16, name: "JEANNEAU Christiane", room: "16", gir: "GIR 6", status: "Actif", arrival: "2025-04-22", departure: "2025-07-21", phone: "N/A", docsComplete: false, devisEnvoye: true, birthDate: "1947-08-23", imageRights: "oui sauf réseaux sociaux",
  },
  {
    id: 17, name: "COUTAND Gérard", room: "17", gir: "GIR 4", status: "Actif", arrival: "2025-07-07", departure: "2025-08-07", phone: "N/A", docsComplete: false, devisEnvoye: true, birthDate: "1942-12-06", imageRights: "oui",
  },
  {
    id: 18, name: "GARAUD Ginette", room: "18", gir: "GIR 4", status: "Actif", arrival: "2025-04-03", departure: "2025-09-06", phone: "N/A", docsComplete: false, devisEnvoye: true, birthDate: "1938-09-21", imageRights: "oui sauf réseaux sociaux",
  },
  {
    id: 19, name: "JAMIN Bruno", room: "19", gir: "GIR 2", status: "Actif", arrival: "2025-03-03", departure: "2025-09-04", phone: "N/A", docsComplete: false, devisEnvoye: true, birthDate: "1955-03-19", imageRights: "non",
  },
  {
    id: 20, name: "GARAUD Jean", room: "20", gir: "GIR 3", status: "Actif", arrival: "2025-03-06", departure: "2025-09-06", phone: "N/A", docsComplete: false, devisEnvoye: true, birthDate: "1936-10-26", imageRights: "oui",
  },
  {
    id: 21, name: "GILBERT Marie-Cécile", room: "21", gir: "GIR 6", status: "Actif", arrival: "2025-07-04", departure: "2025-09-04", phone: "N/A", docsComplete: false, devisEnvoye: true, birthDate: "1940-11-19", imageRights: "oui sauf réseaux sociaux",
  },
  {
    id: 22, name: "BORDRON Lucienne", room: "22", gir: "GIR 5", status: "Actif", arrival: "2025-06-16", departure: "2025-07-31", phone: "N/A", docsComplete: false, devisEnvoye: true, birthDate: "1934-04-21", imageRights: "oui",
  },
  {
    id: 23, name: "RONDEAU Marie Thérèse", room: "23", gir: "GIR 3", status: "Actif", arrival: "2025-05-22", departure: "2025-08-28", phone: "N/A", docsComplete: false, devisEnvoye: true, birthDate: "1942-01-28", imageRights: "oui",
  },
  {
    id: 24, name: "LEBRETON André", room: "24", gir: "GIR 2", status: "Actif", arrival: "2025-06-05", departure: "2025-09-05", phone: "N/A", docsComplete: false, devisEnvoye: true, birthDate: "1937-08-03", imageRights: "oui",
  },
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