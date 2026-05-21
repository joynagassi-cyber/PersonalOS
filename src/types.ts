/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type BookDomain = 'Spirituel' | 'Business' | 'Tech' | 'Marketing' | 'Développement perso';
export type BookStatus = 'À lire' | 'En cours' | 'Terminé';

export interface Book {
  id: string;
  title: string;
  author: string;
  domain: BookDomain;
  status: BookStatus;
  dateEnd?: string;
  rating: number; // /10
  summary: string;
  keyPoints: string[];
}

export type SaaSPhase = 'Idéation' | 'MVP' | 'Beta' | 'Lancement' | 'Scale';
export type KanbanStatus = 'À faire' | 'En cours' | 'Terminé';
export type PriorityLevel = 'Basse' | 'Moyenne' | 'Haute';

export interface KanbanTask {
  id: string;
  title: string;
  priority: PriorityLevel;
  status: KanbanStatus;
  phase: SaaSPhase;
  notes?: string;
}

export interface SaaSJournalEntry {
  id: string;
  date: string;
  text: string;
}

export interface HouseworkTask {
  id: string;
  text: string;
}

export interface DailyData {
  prayerHours: number;      // target: 6
  bibleChapters: number;    // target: 40
  fastingObserved: boolean; // toggle
  
  englishMinutes: number;   // minutes
  englishLevel: string;     // A1 -> C2

  saasFeaturesDelivered: number;
  saasPaidCustomers: number;
  
  pitchCount: number;       // objective: 1/week
  pitchConfidence: number;  // /10
  pitchNotes: string;

  marketingCourses: number;
  marketingActions: string[];

  sportsPushups: number;
  sportsAbs: number;
  sportsSquats: number;
  sportsPlank: number;      // raw seconds
  sportsJumpingJacks: number;
  sportsStretching: boolean;
  sportsCardioMinutes: number;

  dailyHousework: { [key: string]: boolean };
  weeklyHousework: { [key: string]: boolean };
  monthlyHousework: { [key: string]: boolean };

  notes: string;
  validated: boolean;
  timestamp: string; // ISO date
}

export interface AppState {
  currentDay: number; // default: 47
  streak: number; // default: 12
  bestStreak: number; // default: 15
  activeTheme: 'dark' | 'light';
  books: Book[];
  kanbanTasks: KanbanTask[];
  journal: SaaSJournalEntry[];
  history: { [day: number]: DailyData };
}
