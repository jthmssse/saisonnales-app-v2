import { LucideProps } from 'lucide-react';
import React from 'react';

export type ActiveTab = 'dashboard' | 'residents' | 'communications';

export interface Document {
  id: number;
  name: string;
  type: 'pdf' | 'image' | 'word';
  size: string; // e.g. "2.3 MB"
  addedAt: string; // "YYYY-MM-DD"
}

export interface Resident {
  id: number;
  name: string;
  room: string;
  gir: string;
  status: 'Actif' | 'À venir' | 'Terminé';
  arrival: string; // "YYYY-MM-DD"
  departure: string; // "YYYY-MM-DD"
  phone: string;
  docsComplete: boolean;
  devisEnvoye: boolean;
  imageRights: 'oui' | 'non' | 'oui sauf réseaux sociaux';
  
  // Optional fields for form
  gender?: 'Homme' | 'Femme' | 'Autre';
  birthDate?: string;
  email?: string;
  address?: string;
  familyContactName?: string;
  familyContactRelation?: string;
  familyContactPhone?: string;
  familyContactEmail?: string;
  
  // New fields for comprehensive care
  allergies?: string; // e.g., "Pollen, Pénicilline, Fruits à coque"
  medicalHistory?: string; // e.g., "Diabète type 2, Hypertension, Prothèse de hanche"
  treatingDoctor?: string; // e.g., "Dr. Martin"
  
  mobility?: 'Autonome' | 'Canne' | 'Déambulateur' | 'Fauteuil roulant';
  dietaryNeeds?: string; // e.g., "Texture mixée, régime sans sel, aime la soupe le soir"
  socialHabits?: string; // e.g., "Aime les jeux de société, préfère dîner en chambre, fait la sieste à 14h"
  notes?: string; // General important notes

  documents?: Document[];
}

export interface Communication {
  id: number;
  type: string;
  status: string;
  subject: string;
  description: string;
  active: boolean;
}

export interface PlanningStay {
    id: number;
    residentId: number;
    start: Date;
    end: Date;
}

export interface PlanningRoom {
  roomName: string;
  stays: PlanningStay[];
}

export interface StatCardProps {
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    title: string;
    content: React.ReactNode;
    color?: string;
    titleAction?: React.ReactNode;
}

export type NewReservationData = Omit<Resident, 'id' | 'status'>;

export type CalendarView = 'week' | 'month' | 'year';