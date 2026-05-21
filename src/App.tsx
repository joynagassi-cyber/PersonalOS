/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Sun,
  Moon,
  Calendar,
  BookOpen,
  Rocket,
  BarChart2,
  Flame,
  Bell,
  CheckCircle2,
  Circle,
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  Check,
  Book,
  Clock,
  Award,
  BookMarked,
  Layers,
  CheckSquare,
  Square,
  PlusCircle,
  Search,
  Filter,
  X,
  Info,
  ChevronDown,
  Zap,
  TrendingUp,
  Sliders,
  Sparkles
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
} from 'recharts';

import {
  Book as BookType,
  AppState,
  DailyData,
  BookDomain,
  BookStatus,
  SaaSPhase,
  KanbanStatus,
  PriorityLevel,
  SaaSJournalEntry,
  KanbanTask
} from './types';

// ============================================================================
// CONSTANTS & ASSETS
// ============================================================================

const BANNER_IMAGES = [
  "https://images.unsplash.com/photo-1697197473908-46MZbf_9P5I?w=1600&q=95&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1746388400782-2wzUVOx3o00?w=1600&q=95&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1573612664822-L6sE85KbQrc?w=1600&q=95&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1672730412715-J69ERsG93hI?w=1600&q=95&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1703565671296-ltxqjknZdFo?w=1600&q=95&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1684161432566-ANuuRuCRRAc?w=1600&q=95&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1748838126553-kz0E99cuYyY?w=1600&q=95&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1727666236563-gb37v81_Ni4?w=1600&q=95&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1693652979425-NUgw4RSeHOs?w=1600&q=95&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1686985578499-aT24h1Lm_vw?w=1600&q=95&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1600&q=95&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=95&fit=crop&auto=format"
];

const ALL_QUOTES = [
  { text: "La discipline est le pont entre les rêves et la réalité.", author: "Jim Rohn" },
  { text: "Ne souhaitez pas que ce soit plus facile. Souhaitez être meilleur.", author: "Jim Rohn" },
  { text: "Le succès n'est que quelques disciplines simples pratiquées chaque jour.", author: "Jim Rohn" },
  { text: "Soit vous dirigez la journée, soit la journée vous dirige.", author: "Jim Rohn" },
  { text: "Les petites habitudes composées créent des résultats extraordinaires.", author: "Darren Hardy" },
  { text: "Ce n'est pas ce que vous faites de temps en temps qui compte, c'est ce que vous faites constamment.", author: "Darren Hardy" },
  { text: "Chaque action que vous posez aujourd'hui se compose dans le temps.", author: "Darren Hardy" },
  { text: "Le monde appartient à ceux qui se lèvent tôt et ne s'arrêtent pas.", author: "Robin Sharma" },
  { text: "L'excellence n'est pas un acte, c'est une habitude.", author: "Robin Sharma" },
  { text: "Ce n'est pas votre condition, c'est votre décision qui détermine votre destin.", author: "Tony Robbins" },
  { text: "Tout ce que l'esprit peut concevoir et croire, il peut l'accomplir.", author: "Napoleon Hill" },
  { text: "Un leader est celui qui connaît le chemin, l'emprunte, et le montre.", author: "John C. Maxwell" },
  { text: "Travaillez plus dur sur vous-même que sur votre travail.", author: "Jim Rohn" },
  { text: "Nous devons tous souffrir d'une des deux douleurs : la discipline ou le regret.", author: "Jim Rohn" },
  { text: "Si vous n'avez pas de plan pour votre vie, vous tomberez dans le plan de quelqu'un d'autre.", author: "Jim Rohn" },
  { text: "Le succès n'est pas à poursuivre, c'est à attirer par la personne que vous devenez.", author: "Jim Rohn" },
  { text: "Votre vie ne s'échappe pas d'un coup, elle s'effrite par petits abandons.", author: "Robin Sharma" },
  { text: "La constance bat le talent chaque jour de la semaine.", author: "James Clear" },
  { text: "Pour doubler vos revenus, triplez vos investissements sur vous-même.", author: "Robin Sharma" },
  { text: "Vous ne vous élevez pas au niveau de vos objectifs, vous tombez au niveau de vos systèmes.", author: "James Clear" },
  { text: "Chaque action est un vote pour le type de personne que vous voulez devenir.", author: "James Clear" },
  { text: "Les habitudes sont les intérêts composés de l'amélioration de soi.", author: "James Clear" },
  { text: "L'action massive guérit la peur et engendre la foi.", author: "Tony Robbins" },
  { text: "Un objectif sans système n'est qu'un vœu pieux.", author: "James Clear" },
  { text: "Ceux qui abandonnent ne gagnent jamais. Les gagnants n'abandonnent jamais.", author: "Napoleon Hill" },
  
  // 30 bible verses style
  { text: "Je puis tout par Celui qui me fortifie.", author: "Philippiens 4:13" },
  { text: "Car Dieu n'a pas donné un esprit de peur, mais de force, d'amour et de sagesse.", author: "2 Timothée 1:7" },
  { text: "Confie-toi en l'Éternel de tout ton cœur et ne t'appuie pas sur ta propre intelligence.", author: "Proverbes 3:5" },
  { text: "Cherchez d'abord le Royaume de Dieu et sa justice, et toutes ces choses vous seront données.", author: "Matthieu 6:33" },
  { text: "L'Éternel est ma lumière et mon salut. De qui aurais-je crainte ?", author: "Psaume 27:1" },
  { text: "Sois fort et courageux. Ne crains point et ne t'effraie point.", author: "Josué 1:9" },
  { text: "Car je connais les projets que j'ai formés sur vous, projets de paix et non de malheur.", author: "Jérémie 29:11" },
  { text: "C'est par l'humilité et la crainte de l'Éternel que viennent la richesse, la gloire et la vie.", author: "Proverbes 22:4" },
  { text: "Remets ton sort à l'Éternel, espère en lui, et il agira.", author: "Psaume 37:5" },
  { text: "L'homme qui médite la Parole est comme un arbre planté près d'un courant d'eau.", author: "Psaume 1:3" },
  { text: "Tout ce que vous ferez, ferez-le de bon cœur, comme pour le Seigneur.", author: "Colossiens 3:23" },
  { text: "Soyez fermes, inébranlables, travaillant de mieux en mieux à l'œuvre du Seigneur.", author: "1 Corinthiens 15:58" },
  { text: "Ne vous lassez pas de faire le bien, car nous moissonnerons au temps convenable.", author: "Galates 6:9" },
  { text: "Tout est possible à celui qui croit.", author: "Marc 9:23" },
  { text: "Craignez Dieu et observez ses commandements, c'est là le tout de l'homme.", author: "Ecclésiaste 12:13" },
  { text: "L'Éternel fortifie son peuple. L'Éternel bénit son peuple.", author: "Psaume 29:11" },
  { text: "Heureux l'homme qui médite la loi de Dieu jour et nuit.", author: "Psaume 1:1-2" },
  { text: "Mais ceux qui espèrent en l'Éternel renouvellent leur force.", author: "Ésaïe 40:31" },
  { text: "Dieu est notre refuge et notre force, un secours qui ne manque jamais dans la détresse.", author: "Psaume 46:1" },
  { text: "En toutes choses, nous sommes plus que vainqueurs par celui qui nous a aimés.", author: "Romains 8:37" },
  { text: "Si Dieu est pour nous, qui sera contre nous ?", author: "Romains 8:31" },
  { text: "L'Éternel te conduira continuellement et te rassasiera dans les lieux arides.", author: "Ésaïe 58:11" },
  { text: "Réjouissez-vous toujours dans le Seigneur.", author: "Philippiens 4:4" },
  { text: "Demandez et vous recevrez, cherchez et vous trouverez, frappez et on vous ouvrira.", author: "Matthieu 7:7" },
  { text: "N'abandonnez donc pas votre assurance, à laquelle est attachée une grande récompense.", author: "Hébreux 10:35" },
  { text: "La foi, c'est la certitude des choses qu'on espère, la démonstration de celles qu'on ne voit pas.", author: "Hébreux 11:1" },
  { text: "La main des diligents dominera, mais la main lâche sera assujettie.", author: "Proverbes 12:24" },
  { text: "Aie confiance en moi de tout ton cœur et je dirigerai tes pas.", author: "Proverbes 3:6" },
  { text: "Celui qui garde les commandements garde son âme.", author: "Proverbes 19:16" },
  { text: "Que la paix de Dieu, qui surpasse toute intelligence, garde vos cœurs et vos pensées.", author: "Philippiens 4:7" }
];

// Extract verses specifically mapping them
const BIBLE_VERSES = ALL_QUOTES.filter(q => 
  q.author.match(/Philippiens|Timothée|Proverbes|Matthieu|Psaume|Josué|Jérémie|Colossiens|Corinthiens|Galates|Marc|Ecclésiaste|Ésaïe|Romains|Hébreux/)
);

const getDailyQuote = (dayNum: number) => {
  return ALL_QUOTES[dayNum % ALL_QUOTES.length];
};

// Housework items definition
const DAILY_HOUSEWORK_KEYS = [
  "Faire son lit",
  "Balayer la chambre",
  "Ranger vêtements et affaires",
  "Nettoyer le bureau de travail",
  "Vaisselle / Cuisine propre",
  "Salle de bain : lavabo et miroir",
  "Aérer la pièce (10 min)",
  "Vider les poubelles"
];

const WEEKLY_HOUSEWORK_KEYS = [
  "Balayage complet de la maison",
  "Serpillière / Lavage des sols",
  "Nettoyage des toilettes",
  "Nettoyage complet salle de bain",
  "Dépoussiérage meubles et surfaces",
  "Lessive (laver et ranger)",
  "Nettoyage fenêtres et vitres",
  "Vider et nettoyer poubelles"
];

const MONTHLY_HOUSEWORK_KEYS = [
  "Nettoyage derrière les meubles",
  "Désinfection cuisine",
  "Lavage des rideaux / draps",
  "Tri et désencombrement",
  "Vérification ampoules, prises, ventilateurs"
];

// Progressive sports rules
const getWorkoutQuota = (dayNumber: number, exercise: 'pushups' | 'abs' | 'squats' | 'plank'): number => {
  if (exercise === 'pushups') {
    if (dayNumber <= 14)  return 50;
    if (dayNumber <= 28)  return 60;
    if (dayNumber <= 60)  return 70;
    if (dayNumber <= 90)  return 80;
    if (dayNumber <= 150) return 90;
    return 100;
  }
  if (exercise === 'abs' || exercise === 'squats') {
    const month = Math.floor((dayNumber - 1) / 30);
    return 50 + month * 10;
  }
  if (exercise === 'plank') {
    const month = Math.floor((dayNumber - 1) / 30);
    return 90 + month * 30; // total seconds target
  }
  return 50;
};

// ============================================================================
// CORE METRIC AND SCORE CALCULATIONS
// ============================================================================

const calculatePillarScores = (day: number, data: DailyData) => {
  if (!data) return { spirituel: 0, lecture: 0, anglais: 0, tech: 0, pitch: 0, marketing: 0, physique: 0, menage: 0, total: 0 };

  // 1. Spirituel (30%)
  const prayerScore = (Math.min(data.prayerHours, 6) / 6) * 100;
  const bibleScore = (Math.min(data.bibleChapters, 40) / 40) * 100;
  const fastingScore = data.fastingObserved ? 100 : 0;
  const spirituel = (prayerScore * 0.5) + (bibleScore * 0.3) + (fastingScore * 0.2);

  // 2. Lecture (11%)
  const lecture = data.notes.toLowerCase().includes("lu") || data.notes.toLowerCase().includes("livre") ? 100 : 85;

  // 3. Anglais (11%)
  const anglais = (Math.min(data.englishMinutes, 30) / 30) * 100;

  // 4. Tech/SaaS (11%)
  const tech = data.saasFeaturesDelivered > 0 ? 100 : (data.notes.toLowerCase().includes("codé") || data.notes.toLowerCase().includes("mvp") ? 90 : 75);

  // 5. Pitch (11%)
  const pitch = data.pitchConfidence * 10;

  // 6. Marketing (11%)
  const marketing = (data.marketingCourses > 0 ? 50 : 0) + (data.marketingActions.length > 0 ? 50 : 25);

  // 7. Sport (10%)
  const pushQuota = getWorkoutQuota(day, 'pushups');
  const absQuota = getWorkoutQuota(day, 'abs');
  const squatsQuota = getWorkoutQuota(day, 'squats');
  const plankQuota = getWorkoutQuota(day, 'plank');

  const pushupSc = (Math.min(data.sportsPushups, pushQuota) / pushQuota) * 100;
  const absSc = (Math.min(data.sportsAbs, absQuota) / absQuota) * 100;
  const squatsSc = (Math.min(data.sportsSquats, squatsQuota) / squatsQuota) * 100;
  const plankSc = (Math.min(data.sportsPlank, plankQuota) / plankQuota) * 100;
  const jjSc = (Math.min(data.sportsJumpingJacks, 50) / 50) * 100;
  const stretchSc = data.sportsStretching ? 100 : 0;
  const physique = (pushupSc + absSc + squatsSc + plankSc + jjSc + stretchSc) / 6;

  // 8. Ménage (5%)
  const dailyTasks = Object.values(data.dailyHousework);
  const checkedDaily = dailyTasks.filter(Boolean).length;
  const dailyTotal = dailyTasks.length || 8;
  const menage = (checkedDaily / dailyTotal) * 100;

  // Weighted total (100%)
  const total = (spirituel * 0.30) + (lecture * 0.11) + (anglais * 0.11) + (tech * 0.11) + (pitch * 0.11) + (marketing * 0.11) + (physique * 0.10) + (menage * 0.05);

  return {
    spirituel: Math.round(spirituel),
    lecture: Math.round(lecture),
    anglais: Math.round(anglais),
    tech: Math.round(tech),
    pitch: Math.round(pitch),
    marketing: Math.round(marketing),
    physique: Math.round(physique),
    menage: Math.round(menage),
    total: Math.round(total)
  };
};

// ============================================================================
// DEMO DATA INITIAL STATE GENERATOR
// ============================================================================

const generateDemoState = (): AppState => {
  const books: BookType[] = [
    {
      id: 'book-1',
      title: "L'Effet composé",
      author: "Darren Hardy",
      domain: "Business",
      status: "Terminé",
      dateEnd: "2026-04-10",
      rating: 9,
      summary: "De petits choix quotidiens répétés mènent à un succès retentissant.",
      keyPoints: ["Les choix définissent le destin", "Le temps est votre meilleur allié", "La constance est reine"]
    },
    {
      id: 'book-2',
      title: "Atomic Habits",
      author: "James Clear",
      domain: "Développement perso",
      status: "En cours",
      rating: 0,
      summary: "Comment de minuscules changements d'habitudes peuvent transformer notre vie.",
      keyPoints: ["Systèmes plutôt qu'objectifs", "Faciliter l'habitude", "La règle des 2 minutes"]
    },
    {
      id: 'book-3',
      title: "La Bible",
      author: "Humbles Serviteurs",
      domain: "Spirituel",
      status: "En cours",
      rating: 0,
      summary: "Le livre sacré guidant le pilier spirituel fondamental.",
      keyPoints: ["La parole de vérité", "Méditation jour et nuit", "Force spirituelle quotidienne"]
    },
    {
      id: 'book-4',
      title: "Dotcom Secrets",
      author: "Russell Brunson",
      domain: "Marketing",
      status: "À lire",
      rating: 0,
      summary: "Les tunnels de vente pour faire croître l'audience.",
      keyPoints: ["Les échelles de valeur", "La formule secrète", "Les structures marketing"]
    },
    {
      id: 'book-5',
      title: "Zero to One",
      author: "Peter Thiel",
      domain: "Business",
      status: "À lire",
      rating: 0,
      summary: "Bâtir des monopoles pour inventer le futur.",
      keyPoints: ["Passer de 0 à 1", "La puissance des monopoles", "Questions clés pour le SaaS"]
    }
  ];

  const kanbanTasks: KanbanTask[] = [
    { id: 't-1', title: "Définition de la proposition de valeur SaaS", priority: "Haute", status: "Terminé", phase: "Idéation" },
    { id: 't-2', title: "Maquettes Figma et parcours utilisateur", priority: "Moyenne", status: "Terminé", phase: "Idéation" },
    { id: 't-3', title: "Création du dépôt Git et structure monorepo", priority: "Haute", status: "Terminé", phase: "MVP" },
    { id: 't-4', title: "Intégration de la base de données Supabase", priority: "Haute", status: "En cours", phase: "MVP" },
    { id: 't-5', title: "Mettre en place l'authentification et JWT", priority: "Moyenne", status: "À faire", phase: "MVP" },
    { id: 't-6', title: "Page de checkout Stripe et gestion abonnements", priority: "Haute", status: "À faire", phase: "MVP" },
    { id: 't-7', title: "Design du dashboard SaaS principal", priority: "Moyenne", status: "En cours", phase: "MVP" },
    { id: 't-8', title: "Campagne d'emails d'attente", priority: "Basse", status: "À faire", phase: "Beta" }
  ];

  const journal: SaaSJournalEntry[] = [
    { id: 'j-1', date: "2026-05-18", text: "Journée productive. Fin des maquettes Figma, j'entame l'architecture de la DB. Tout est axé sur la performance." },
    { id: 'j-2', date: "2026-05-19", text: "Configuration de la stack express-typescript initiale. Les premières routes d'API répondent bien." },
    { id: 'j-3', date: "2026-05-20", text: "Développement de l'intégration localStorage pour DashPro. L'UI est incroyable de fluidité." }
  ];

  // History simulation from day 1 to day 46
  const history: { [day: number]: DailyData } = {};
  
  for (let i = 1; i <= 46; i++) {
    const prayer = 5.0 + Math.sin(i / 4.0) * 1.0;
    const chapters = Math.min(40, Math.floor(35 + Math.sin(i / 2.5) * 6));
    const isFasting = i % 6 !== 0;
    const engMin = Math.floor(25 + Math.cos(i / 3.0) * 10);
    
    // Workout targets
    const pushTarget = getWorkoutQuota(i, 'pushups');
    const absTarget = getWorkoutQuota(i, 'abs');
    const squatsTarget = getWorkoutQuota(i, 'squats');
    const plankTarget = getWorkoutQuota(i, 'plank');

    const dHouse: { [key: string]: boolean } = {};
    DAILY_HOUSEWORK_KEYS.forEach((k, idx) => {
      dHouse[idx.toString()] = i % 5 === 0 ? idx % 2 === 0 : true;
    });

    const wHouse: { [key: string]: boolean } = {};
    WEEKLY_HOUSEWORK_KEYS.forEach((k, idx) => {
      wHouse[idx.toString()] = i % 7 === 1;
    });

    const mHouse: { [key: string]: boolean } = {};
    MONTHLY_HOUSEWORK_KEYS.forEach((k, idx) => {
      mHouse[idx.toString()] = i <= 30 ? (idx < 4) : true;
    });

    history[i] = {
      prayerHours: parseFloat((Math.min(6, Math.max(0, prayer))).toFixed(1)),
      bibleChapters: chapters,
      fastingObserved: isFasting,
      englishMinutes: Math.max(10, engMin),
      englishLevel: i < 20 ? 'B1' : 'B2',
      saasFeaturesDelivered: i % 12 === 0 ? 1 : 0,
      saasPaidCustomers: 0,
      pitchCount: i % 7 === 0 ? 1 : 0,
      pitchConfidence: Math.floor(6 + (i % 4)),
      pitchNotes: `Répétition rythmée n°${i}`,
      marketingCourses: Math.floor(i / 15),
      marketingActions: ["Séquence de post LinkedIn", "Veille de concurrents directs"],
      sportsPushups: Math.round(pushTarget * (0.9 + Math.sin(i) * 0.1)),
      sportsAbs: Math.round(absTarget * (0.9 + Math.cos(i) * 0.1)),
      sportsSquats: Math.round(squatsTarget * (0.92 + Math.sin(i) * 0.08)),
      sportsPlank: Math.round(plankTarget * (0.95 + Math.cos(i) * 0.05)),
      sportsJumpingJacks: 50,
      sportsStretching: i % 2 === 0,
      sportsCardioMinutes: i % 3 === 0 ? 15 : 0,
      dailyHousework: dHouse,
      weeklyHousework: wHouse,
      monthlyHousework: mHouse,
      notes: `Journée ${i} du programme intense de 7 mois réalisée avec brio.`,
      validated: true,
      timestamp: new Date(Date.now() - (47 - i) * 86400000).toISOString()
    };
  }

  return {
    currentDay: 47,
    streak: 12,
    bestStreak: 15,
    activeTheme: 'dark',
    books,
    kanbanTasks,
    journal,
    history
  };
};

const getDefaultDay47Data = (): DailyData => {
  const dHouse: { [key: string]: boolean } = {};
  DAILY_HOUSEWORK_KEYS.forEach((_, idx) => {
    dHouse[idx.toString()] = idx < 6; // default 6/8
  });

  const wHouse: { [key: string]: boolean } = {};
  WEEKLY_HOUSEWORK_KEYS.forEach((_, idx) => { wHouse[idx.toString()] = false; });

  const mHouse: { [key: string]: boolean } = {};
  MONTHLY_HOUSEWORK_KEYS.forEach((_, idx) => { mHouse[idx.toString()] = false; });

  return {
    prayerHours: 5.5,
    bibleChapters: 38,
    fastingObserved: true,
    englishMinutes: 25,
    englishLevel: 'B1',
    saasFeaturesDelivered: 1,
    saasPaidCustomers: 0,
    pitchCount: 0,
    pitchConfidence: 7,
    pitchNotes: "Le pitch se peaufine pour l'idéation. Je dois accentuer l'urgence marché.",
    marketingCourses: 2,
    marketingActions: ["Recherche hashtags SaaS", "Optimisation profil Twitter/X"],
    sportsPushups: 65,
    sportsAbs: 60,
    sportsSquats: 60,
    sportsPlank: 100,
    sportsJumpingJacks: 50,
    sportsStretching: true,
    sportsCardioMinutes: 0,
    dailyHousework: dHouse,
    weeklyHousework: wHouse,
    monthlyHousework: mHouse,
    notes: "Excellente journée globale. Le spirituel est maintenu et les séances de sport augmentent de niveau.",
    validated: false,
    timestamp: new Date().toISOString()
  };
};

// ============================================================================
// MAIN APPLICATION COMPONENT
// ============================================================================

export default function App() {
  // STATEPERSISTENCE
  const [state, setState] = useState<AppState>(() => {
    const stored = localStorage.getItem('dashboard-data');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error("Failed to parse stored state, fall back to initial", e);
      }
    }
    return generateDemoState();
  });

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const storedTheme = localStorage.getItem('dashboard-theme');
    if (storedTheme === 'light' || storedTheme === 'dark') return storedTheme;
    // Default system color logic
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  });

  // activePage
  const [activePage, setActivePage] = useState<'jour' | 'semaine' | 'biblio' | 'saas' | 'analytics'>('jour');

  // Input Data Temp Form
  const [tempData, setTempData] = useState<DailyData>(() => {
    if (state.history[state.currentDay]) {
      return { ...state.history[state.currentDay] };
    }
    return getDefaultDay47Data();
  });

  // Modals / Panels
  const [isInputModalOpen, setIsInputModalOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string>('spirituel');
  const [selectedBook, setSelectedBook] = useState<BookType | null>(null);
  const [isNewBookModalOpen, setIsNewBookModalOpen] = useState(false);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

  // New Book Form
  const [newBook, setNewBook] = useState<Partial<BookType>>({
    title: '', author: '', domain: 'Business', status: 'À lire', rating: 0, summary: '', keyPoints: ['']
  });

  // New Kanban task Form
  const [newTask, setNewTask] = useState<Partial<KanbanTask>>({
    title: '', priority: 'Moyenne', status: 'À faire', phase: 'MVP'
  });

  // SaaS Journal new line log
  const [newJournalText, setNewJournalText] = useState('');

  // Hero carousel
  const [bannerIndex, setBannerIndex] = useState(0);
  const [fadeBanner, setFadeBanner] = useState(false);
  const timerRef = useRef<number | null>(null);

  // Auto task Reset comparison state
  const [lastResetDate, setLastResetDate] = useState(() => {
    return localStorage.getItem('dashboard-last-reset') || new Date().toISOString().split('T')[0];
  });

  // Synchronize CSS attributes with currentTheme state
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('dashboard-theme', theme);
  }, [theme]);

  // Save changes to localStorage onStateChange
  useEffect(() => {
    localStorage.setItem('dashboard-data', JSON.stringify(state));
  }, [state]);

  // checkAndResetTasks midnight cycle
  useEffect(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    if (todayStr !== lastResetDate) {
      // Midnight trigger!
      // Clear daily checklists of dailyHousework in currentDay draft
      const updatedHistory = { ...state.history };
      const current = updatedHistory[state.currentDay] ? { ...updatedHistory[state.currentDay] } : getDefaultDay47Data();
      
      DAILY_HOUSEWORK_KEYS.forEach((_, idx) => {
        current.dailyHousework[idx.toString()] = false;
      });

      // Weekly reset if Monday
      const dayOfWeek = new Date().getDay(); // 1 = Monday
      if (dayOfWeek === 1) {
        WEEKLY_HOUSEWORK_KEYS.forEach((_, idx) => {
          current.weeklyHousework[idx.toString()] = false;
        });
      }

      // Monthly reset if 1st of month
      const dayOfMonth = new Date().getDate();
      if (dayOfMonth === 1) {
        MONTHLY_HOUSEWORK_KEYS.forEach((_, idx) => {
          current.monthlyHousework[idx.toString()] = false;
        });
      }

      updatedHistory[state.currentDay] = current;
      setState(prev => ({
        ...prev,
        history: updatedHistory
      }));
      setLastResetDate(todayStr);
      localStorage.setItem('dashboard-last-reset', todayStr);
    }
  }, [lastResetDate, state.currentDay, state.history]);

  // Banner rotation logic 600,000ms
  useEffect(() => {
    const interval = setInterval(() => {
      setFadeBanner(true);
      setTimeout(() => {
        setBannerIndex((prev) => (prev + 1) % BANNER_IMAGES.length);
        setFadeBanner(false);
      }, 700); // sync with theme layout
    }, 600000); // 10 minutes

    return () => clearInterval(interval);
  }, []);

  // Preloading mechanism
  useEffect(() => {
    const nextIdx1 = (bannerIndex + 1) % BANNER_IMAGES.length;
    const nextIdx2 = (bannerIndex + 2) % BANNER_IMAGES.length;
    const img1 = new Image();
    img1.src = BANNER_IMAGES[nextIdx1];
    const img2 = new Image();
    img2.src = BANNER_IMAGES[nextIdx2];
  }, [bannerIndex]);

  // Computed values
  const currentDayData = useMemo(() => {
    return state.history[state.currentDay] || getDefaultDay47Data();
  }, [state.history, state.currentDay]);

  const scoresForDay = useMemo(() => {
    return calculatePillarScores(state.currentDay, currentDayData);
  }, [state.currentDay, currentDayData]);

  const quoteOfTheDay = useMemo(() => {
    return getDailyQuote(state.currentDay);
  }, [state.currentDay]);

  // Overall program percentage
  const programPercentage = Math.round((state.currentDay / 210) * 100);

  // Toggle Theme handler
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Checkbox toggle helpers
  const handleHouseworkToggle = (type: 'daily' | 'weekly' | 'monthly', key: string) => {
    const updatedHistory = { ...state.history };
    const dayData = { ...currentDayData };

    if (type === 'daily') {
      dayData.dailyHousework = { ...dayData.dailyHousework, [key]: !dayData.dailyHousework[key] };
    } else if (type === 'weekly') {
      dayData.weeklyHousework = { ...dayData.weeklyHousework, [key]: !dayData.weeklyHousework[key] };
    } else if (type === 'monthly') {
      dayData.monthlyHousework = { ...dayData.monthlyHousework, [key]: !dayData.monthlyHousework[key] };
    }

    updatedHistory[state.currentDay] = dayData;
    setState(prev => ({ ...prev, history: updatedHistory }));
  };

  // Form submission handler
  const saveDailyData = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedHistory = { ...state.history };
    // Set validation confirmed state
    const dataToSave = { ...tempData, validated: true };
    updatedHistory[state.currentDay] = dataToSave;

    // calculate streak progress
    let newStreak = state.streak;
    const scores = calculatePillarScores(state.currentDay, dataToSave);
    if (scores.total >= 70) {
      if (!currentDayData.validated) {
        newStreak += 1;
      }
    } else {
      newStreak = 0; // reset
    }

    const updatedBest = Math.max(state.bestStreak, newStreak);

    setState(prev => ({
      ...prev,
      history: updatedHistory,
      streak: newStreak,
      bestStreak: updatedBest
    }));

    setIsInputModalOpen(false);
  };

  // Library Handlers
  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBook.title || !newBook.author) return;

    const bookToAdd: BookType = {
      id: `book-${Date.now()}`,
      title: newBook.title,
      author: newBook.author,
      domain: (newBook.domain || 'Business') as BookDomain,
      status: (newBook.status || 'À lire') as BookStatus,
      rating: newBook.rating || 0,
      summary: newBook.summary || '',
      keyPoints: newBook.keyPoints || [''],
      dateEnd: newBook.status === 'Terminé' ? new Date().toISOString().split('T')[0] : undefined
    };

    setState(prev => ({
      ...prev,
      books: [...prev.books, bookToAdd]
    }));

    setNewBook({ title: '', author: '', domain: 'Business', status: 'À lire', rating: 0, summary: '', keyPoints: [''] });
    setIsNewBookModalOpen(false);
  };

  const handleUpdateBook = (updated: BookType) => {
    setState(prev => ({
      ...prev,
      books: prev.books.map(b => b.id === updated.id ? updated : b)
    }));
    setSelectedBook(updated);
  };

  const handleDeleteBook = (id: string) => {
    setState(prev => ({
      ...prev,
      books: prev.books.filter(b => b.id !== id)
    }));
    setSelectedBook(null);
  };

  // Kanban Handlers
  const handleMoveKanban = (id: string, nextStatus: KanbanStatus) => {
    setState(prev => ({
      ...prev,
      kanbanTasks: prev.kanbanTasks.map(t => t.id === id ? { ...t, status: nextStatus } : t)
    }));
  };

  const handleCreateKanbanTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title) return;

    const task: KanbanTask = {
      id: `task-${Date.now()}`,
      title: newTask.title,
      priority: (newTask.priority || 'Moyenne') as PriorityLevel,
      status: (newTask.status || 'À faire') as KanbanStatus,
      phase: (newTask.phase || 'MVP') as SaaSPhase
    };

    setState(prev => ({
      ...prev,
      kanbanTasks: [...prev.kanbanTasks, task]
    }));

    setNewTask({ title: '', priority: 'Moyenne', status: 'À faire', phase: 'MVP' });
    setIsNewTaskModalOpen(false);
  };

  const handleDeleteKanbanTask = (id: string) => {
    setState(prev => ({
      ...prev,
      kanbanTasks: prev.kanbanTasks.filter(t => t.id !== id)
    }));
  };

  // SaaS Journal logs trigger
  const handleAddJournalEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJournalText.trim()) return;

    const entry: SaaSJournalEntry = {
      id: `j-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      text: newJournalText
    };

    setState(prev => ({
      ...prev,
      journal: [entry, ...prev.journal]
    }));
    setNewJournalText('');
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[color:var(--bg)] text-[color:var(--text)] font-dm select-none theme-transition">
      
      {/* SIDEBAR FIXED */}
      <aside className="w-[240px] h-full shrink-0 flex flex-col bg-[color:var(--surface)] border-r border-[color:var(--border)] relative z-20 font-dm theme-transition">
        
        {/* LOGO AREA */}
        <div className="p-5 flex items-center gap-3 border-b border-[color:var(--border)]">
          <div className="w-8 h-8 rounded-full bg-[#0066FF] flex items-center justify-center relative font-syne text-white text-base font-extrabold tracking-tight">
            D
          </div>
          <div className="flex flex-col">
            <span className="font-syne text-[15px] font-bold tracking-normal leading-none text-[color:var(--text)]">DashPro</span>
            <span className="text-[10px] text-[color:var(--text-muted)] font-medium mt-0.5">Prog. intensif 7 mois</span>
          </div>
        </div>

        {/* NAVIGATION MENUS */}
        <div className="flex-1 px-3 py-6 space-y-7 overflow-y-auto">
          <div>
            <span className="px-3 text-[10px] font-bold text-[color:var(--text-subtle)] tracking-widest block mb-3 uppercase">PAGES DE PILOTAGE</span>
            <nav className="space-y-1">
              <button
                id="sidebar-vue-jour"
                onClick={() => setActivePage('jour')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-150 ${activePage === 'jour' ? 'bg-[#0066FF] text-white' : 'text-[color:var(--text-muted)] hover:bg-[color:var(--surface-2)] hover:text-[color:var(--text)] border-l-0 hover:border-l-2 hover:border-[#0066FF]'}`}
              >
                <Sun className={`w-4 h-4 shrink-0 ${activePage === 'jour' ? 'text-white' : 'text-[color:var(--text-muted)]'}`} />
                Vue Jour
              </button>

              <button
                id="sidebar-vue-semaine"
                onClick={() => setActivePage('semaine')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-150 ${activePage === 'semaine' ? 'bg-[#0066FF] text-white' : 'text-[color:var(--text-muted)] hover:bg-[color:var(--surface-2)] hover:text-[color:var(--text)] border-l-0 hover:border-l-2 hover:border-[#0066FF]'}`}
              >
                <Calendar className={`w-4 h-4 shrink-0 ${activePage === 'semaine' ? 'text-white' : 'text-[color:var(--text-muted)]'}`} />
                Semaine
              </button>

              <button
                id="sidebar-vue-biblio"
                onClick={() => setActivePage('biblio')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-150 ${activePage === 'biblio' ? 'bg-[#0066FF] text-white' : 'text-[color:var(--text-muted)] hover:bg-[color:var(--surface-2)] hover:text-[color:var(--text)] border-l-0 hover:border-l-2 hover:border-[#0066FF]'}`}
              >
                <BookOpen className={`w-4 h-4 shrink-0 ${activePage === 'biblio' ? 'text-white' : 'text-[color:var(--text-muted)]'}`} />
                Bibliothèque
              </button>

              <button
                id="sidebar-vue-saas"
                onClick={() => setActivePage('saas')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-150 ${activePage === 'saas' ? 'bg-[#0066FF] text-white' : 'text-[color:var(--text-muted)] hover:bg-[color:var(--surface-2)] hover:text-[color:var(--text)] border-l-0 hover:border-l-2 hover:border-[#0066FF]'}`}
              >
                <Rocket className={`w-4 h-4 shrink-0 ${activePage === 'saas' ? 'text-white' : 'text-[color:var(--text-muted)]'}`} />
                Roadmap SaaS
              </button>

              <button
                id="sidebar-vue-analytics"
                onClick={() => setActivePage('analytics')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-150 ${activePage === 'analytics' ? 'bg-[#0066FF] text-white' : 'text-[color:var(--text-muted)] hover:bg-[color:var(--surface-2)] hover:text-[color:var(--text)] border-l-0 hover:border-l-2 hover:border-[#0066FF]'}`}
              >
                <BarChart2 className={`w-4 h-4 shrink-0 ${activePage === 'analytics' ? 'text-white' : 'text-[color:var(--text-muted)]'}`} />
                Analytics
              </button>
            </nav>
          </div>
        </div>

        {/* FOOTER SIDEBAR FOR THEME AND AVATAR */}
        <div className="p-4 border-t border-[color:var(--border)] bg-[color:var(--surface)] space-y-4">
          
          {/* THEME SELECTOR PILL */}
          <div className="flex items-center justify-between p-1 rounded-xl bg-[color:var(--surface-2)] border border-[color:var(--border)]">
            <button
              id="theme-dark-btn"
              onClick={() => setTheme('dark')}
              className={`flex-1 py-1.5 flex items-center justify-center gap-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${theme === 'dark' ? 'bg-[#111111] text-white border border-[color:var(--border-hover)]' : 'text-[color:var(--text-muted)] hover:text-[color:var(--text)]'}`}
            >
              <Moon className="w-3 h-3 transition-transform duration-300 group-hover:rotate-12" />
              SOMBRE
            </button>
            <button
              id="theme-light-btn"
              onClick={() => setTheme('light')}
              className={`flex-1 py-1.5 flex items-center justify-center gap-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${theme === 'light' ? 'bg-white text-black border border-[color:var(--border)] shadow-sm' : 'text-[color:var(--text-muted)] hover:text-[color:var(--text)]'}`}
            >
              <Sun className="w-3 h-3 transition-transform duration-300 group-hover:rotate-45" />
              CLAIR
            </button>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#0066FF]/20 text-[#0066FF] flex items-center justify-center font-bold text-xs ring-1 ring-[#0066FF]/30">
              JN
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] font-bold text-[color:var(--text)] truncate">Joy Nagassi</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C4B4]"></span>
                <span className="text-[10px] text-[color:var(--text-muted)] font-medium uppercase tracking-wider">Actif</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* VIEWPORT AREA */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative z-10 bg-[color:var(--bg)]">
        
        {/* HEADER FOR MAIN AREA */}
        <header className="h-16 shrink-0 border-b border-[color:var(--border)] bg-[color:var(--bg)] px-6 flex items-center justify-between z-10 theme-transition">
          
          <div className="flex items-center gap-4">
            <span className="font-syne text-[18px] font-bold text-[color:var(--text)] uppercase tracking-tight">
              {activePage === 'jour' && "Vue Quotidienne"}
              {activePage === 'semaine' && "Rétrospective Hebdomadaire"}
              {activePage === 'biblio' && "Bibliothèque Stratégique"}
              {activePage === 'saas' && "Lancement Roadmap SaaS"}
              {activePage === 'analytics' && "Synthèse Analytics"}
            </span>
          </div>

          {/* DYNAMIC PROGRESS INDICATOR */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-3">
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-[color:var(--text-muted)] font-bold tracking-wider uppercase">PROGRAMME SAAS</span>
                <span className="font-mono-jb text-[12px] font-bold text-[color:var(--text)]">Jour {state.currentDay} / 210 <span className="text-[10px] text-muted">({programPercentage}%)</span></span>
              </div>
              <div className="w-32 h-1.5 rounded-full bg-[color:var(--surface-3)] overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#0066FF] to-[#00B4FF] rounded-full transition-all duration-300" style={{ width: `${programPercentage}%` }}></div>
              </div>
            </div>

            {/* STREAK WIDGET BUTTON */}
            <div className="flex items-center gap-1.5 bg-[#0066FF]/8 border border-[#0066FF]/20 px-3 py-1.5 rounded-xl">
              <Flame className="w-4 h-4 text-[#0066FF] shrink-0 animate-bounce" />
              <span className="font-mono-jb text-xs font-bold text-[#0066FF]">STREAK: {state.streak}</span>
            </div>

            <div className="text-xs text-[color:var(--text-muted)] bg-[color:var(--surface-2)] border border-[color:var(--border)] px-3 py-1.5 rounded-xl block font-mono-jb shrink-0">
              UTC: 2026-05-20
            </div>
          </div>
        </header>

        {/* VIEWS SWITCH RENDER PANEL */}
        <section className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {activePage === 'jour' && (
            <div className="space-y-6 animate-[fadeIn_0.4s_ease-out]">
              
              {/* HERO BANNER */}
              <div className="w-full h-[220px] rounded-[20px] overflow-hidden relative border border-[color:var(--border)] group">
                
                {/* UNSPLASH ROTATIVE IMAGES PORT */}
                <div className="absolute inset-0 z-0 bg-neutral-900 leading-none">
                  <img
                    id="hero-banner-image"
                    src={BANNER_IMAGES[bannerIndex]}
                    alt="Space Art Cobalt Design"
                    className="w-full h-full object-cover animate-ken-burns transform opacity-90 transition-opacity duration-700 ease-in-out"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = BANNER_IMAGES[10]; // Fallback Milky Way
                    }}
                  />
                  {/* Overlay Gradient as requested in standard guidelines */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent z-0"></div>
                </div>

                {/* CONTENT BANNER WRAPPER */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between z-10 text-white">
                  
                  {/* Top line banner indicator */}
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[9px] font-bold text-white bg-white/10 backdrop-blur-md border border-white/20 uppercase tracking-widest leading-none">
                      ✦ JOUR {state.currentDay} SUR 210
                    </span>
                    
                    <div className="hidden sm:flex items-center gap-2">
                      <div className="flex flex-col items-end leading-none">
                        <span className="text-[9px] text-white/50 uppercase tracking-wider font-semibold">Cible Finale</span>
                        <span className="text-[14px] font-bold font-mono-jb text-[#00B4FF]">100 000 CLIENTS PAYANTS</span>
                      </div>
                    </div>
                  </div>

                  {/* Deeply inspirational quote banner side */}
                  <div className="space-y-2 max-w-[500px]">
                    <h2 className="font-syne text-xl sm:text-2xl font-extrabold tracking-tight leading-none text-white select-none">Bonjour, champion.</h2>
                    <p className="text-xs sm:text-sm font-light italic text-white/80 leading-relaxed font-dm select-none">
                      &quot;{quoteOfTheDay.text}&quot;
                    </p>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#00B4FF] block">
                      — {quoteOfTheDay.author}
                    </span>
                  </div>

                  {/* Dots carousel indicators */}
                  <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-2">
                    <div className="flex items-center gap-1.5">
                      {BANNER_IMAGES.map((_, idx) => (
                        <button
                          key={idx}
                          aria-label={`Carousel visual dot ${idx}`}
                          onClick={() => setBannerIndex(idx)}
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${bannerIndex === idx ? 'bg-[#0066FF] w-4' : 'bg-white/30 hover:bg-white/60'}`}
                        />
                      ))}
                    </div>
                    <span className="text-[9px] font-bold text-white/40 uppercase tracking-wider font-mono-jb">
                      Actualisation 10min
                    </span>
                  </div>
                </div>

                {/* BOTTOM TIMER LINE BAR */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0066FF]/20 z-20">
                  <div className="h-full bg-gradient-to-r from-[#0066FF] to-[#00B4FF] origin-right animate-[shrink_600s_linear_infinite]" style={{ width: '100%' }}></div>
                </div>
              </div>

              {/* BIBLE KAIROS HORIZONTAL TICKER */}
              <div className="h-[44px] rounded-xl bg-[color:var(--surface)] border border-[color:var(--border)] relative overflow-hidden flex items-center shrink-0 z-0">
                <div className="h-full px-4 shrink-0 bg-[#0066FF]/10 select-none text-xs font-dm font-bold tracking-wider text-[#0066FF] uppercase flex items-center border-r border-[color:var(--border)]">
                  📖 PAROLE
                </div>
                
                <div className="flex-1 overflow-hidden relative h-full flex items-center select-none">
                  {/* Repeated track scroll to loop seamlessly */}
                  <div className="flex gap-16 animate-ticker whitespace-nowrap">
                    {[...BIBLE_VERSES, ...BIBLE_VERSES].map((verse, idx) => (
                      <span key={idx} className="inline-flex items-center gap-2.5 text-xs text-[color:var(--text-muted)] italic font-dm">
                        &quot;{verse.text}&quot; <strong className="text-[#0066FF] font-semibold font-syne shrink-0">({verse.author})</strong>
                        <span className="text-[#0066FF]/50 text-xs shrink-0 pl-16">✦</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* DENSE NUMERIC KPI ROW */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[color:var(--surface-2)] border border-[color:var(--border)] p-5 rounded-2xl flex flex-col justify-between hover:-translate-y-1 transition-all duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#0066FF]">Prière Quotidienne</span>
                    <Clock className="w-4 h-4 text-[#0066FF]" />
                  </div>
                  <div className="flex items-baseline gap-1.5 my-1">
                    <span className="font-mono-jb text-2xl font-bold tracking-tight text-[color:var(--text)]">{currentDayData.prayerHours}h</span>
                    <span className="text-xs text-[color:var(--text-muted)]">/ 6h</span>
                  </div>
                  <div className="w-full h-1 bg-[color:var(--surface-3)] rounded-full overflow-hidden mt-3">
                    <div className="h-full bg-gradient-to-r from-[#0066FF] to-[#00B4FF]" style={{ width: `${Math.min(100, (currentDayData.prayerHours / 6) * 100)}%` }}></div>
                  </div>
                </div>

                <div className="bg-[color:var(--surface-2)] border border-[color:var(--border)] p-5 rounded-2xl flex flex-col justify-between hover:-translate-y-1 transition-all duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#0066FF]">Chapitres Bible</span>
                    <Book className="w-4 h-4 text-[#0066FF]" />
                  </div>
                  <div className="flex items-baseline gap-1.5 my-1">
                    <span className="font-mono-jb text-2xl font-bold tracking-tight text-[color:var(--text)]">{currentDayData.bibleChapters}</span>
                    <span className="text-xs text-[color:var(--text-muted)]">/ 40</span>
                  </div>
                  <div className="w-full h-1 bg-[color:var(--surface-3)] rounded-full overflow-hidden mt-3">
                    <div className="h-full bg-gradient-to-r from-[#0066FF] to-[#00B4FF]" style={{ width: `${Math.min(100, (currentDayData.bibleChapters / 40) * 100)}%` }}></div>
                  </div>
                </div>

                <div className="bg-[color:var(--surface-2)] border border-[color:var(--border)] p-5 rounded-2xl flex flex-col justify-between hover:-translate-y-1 transition-all duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#0066FF]">Bibliothèque Progrès</span>
                    <BookMarked className="w-4 h-4 text-[#0066FF]" />
                  </div>
                  <div className="flex items-baseline gap-1.5 my-1">
                    <span className="font-mono-jb text-2xl font-bold tracking-tight text-[color:var(--text)]">
                      {state.books.filter(b => b.status === 'Terminé').length} <span className="text-xs text-[color:var(--text-muted)] font-normal">lus</span>
                    </span>
                    <span className="text-xs text-[color:var(--text-muted)]">/ 100 livres</span>
                  </div>
                  <div className="w-full h-1 bg-[color:var(--surface-3)] rounded-full overflow-hidden mt-3">
                    <div className="h-full bg-gradient-to-r from-[#00C4B4] to-[#0066FF]" style={{ width: `${state.books.filter(b => b.status === 'Terminé').length}%` }}></div>
                  </div>
                </div>

                <div className="bg-[color:var(--surface-2)] border border-[color:var(--border)] p-5 rounded-2xl flex flex-col justify-between hover:-translate-y-1 transition-all duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#0066FF]">Jour de Pilotage</span>
                    <Award className="w-4 h-4 text-[#0066FF]" />
                  </div>
                  <div className="flex items-baseline gap-1.5 my-1">
                    <span className="font-mono-jb text-2xl font-bold tracking-tight text-[color:var(--text)]">{state.currentDay}</span>
                    <span className="text-xs text-[color:var(--text-muted)]">/ 210 jours</span>
                  </div>
                  <div className="w-full h-1 bg-[color:var(--surface-3)] rounded-full mt-3 flex items-center gap-1">
                    <span className="text-[9px] text-[#00C4B4] font-bold uppercase tracking-wider">Objectif : SaaS à 100k clients</span>
                  </div>
                </div>
              </div>

              {/* MAIN CONTENT SPLIT GRID */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                
                {/* LEFT BLOCK: ROUTINES & CHECKLIST (3 cols) */}
                <div className="lg:col-span-3 space-y-6">
                  
                  {/* MASTER DAILY LOG COMPLÉTION CARD */}
                  <div className="bg-[color:var(--surface-2)] border border-[color:var(--border)] rounded-2xl p-6 space-y-6">
                    <div className="flex items-center justify-between pb-3 border-b border-[color:var(--border)]">
                      <div className="flex flex-col">
                        <h3 className="font-syne text-sm font-bold uppercase text-[color:var(--text)]">Checklist Active du Jour</h3>
                        <p className="text-[11px] text-[color:var(--text-muted)]">Validez vos routines et actualisez vos métriques de bord</p>
                      </div>
                      <button
                        id="open-input-modal-btn"
                        onClick={() => {
                          setTempData({ ...currentDayData });
                          setIsInputModalOpen(true);
                        }}
                        className="bg-[#0066FF] hover:bg-[#0052CC] text-white px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-transform duration-150 active:scale-95"
                      >
                        <Sliders className="w-3.5 h-3.5" />
                        Saisir Mes Métriques
                      </button>
                    </div>

                    {/* INTERACTIVE COMPACT ACTIONS LIST */}
                    <div className="space-y-3">
                      
                      {/* PRIÈRE HOURLY CHECK */}
                      <div className="flex items-center justify-between p-3.5 rounded-xl bg-[color:var(--surface-3)] border border-[color:var(--border)]">
                        <div className="flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-[#0066FF]"></span>
                          <span className="text-xs font-semibold text-[color:var(--text)]">Prière intensive (Quota : 6h)</span>
                        </div>
                        <span className="font-mono-jb text-xs font-bold px-2 py-1 rounded bg-[color:var(--surface)] border border-[color:var(--border)]">
                          {currentDayData.prayerHours}h effectuées
                        </span>
                      </div>

                      {/* BIBLE CHAPTERS CHECK */}
                      <div className="flex items-center justify-between p-3.5 rounded-xl bg-[color:var(--surface-3)] border border-[color:var(--border)]">
                        <div className="flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-[#0066FF]"></span>
                          <span className="text-xs font-semibold text-[color:var(--text)]">Méditer 40 chapitres de la sainte bible</span>
                        </div>
                        <span className="font-mono-jb text-xs font-bold px-2 py-1 rounded bg-[color:var(--surface)] border border-[color:var(--border)]">
                          {currentDayData.bibleChapters} chapitres
                        </span>
                      </div>

                      {/* FASTING CHECKBOX */}
                      <label className="flex items-center justify-between p-3.5 rounded-xl bg-[color:var(--surface-3)] border border-[color:var(--border)] cursor-pointer hover:border-[color:var(--border-hover)] select-none">
                        <div className="flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-[#0066FF]"></span>
                          <span className="text-xs font-semibold text-[color:var(--text)]">Jeûne quotidien maintenu</span>
                        </div>
                        <button
                          role="checkbox"
                          aria-checked={currentDayData.fastingObserved}
                          onClick={() => {
                            const updated = { ...state.history };
                            updated[state.currentDay] = { ...currentDayData, fastingObserved: !currentDayData.fastingObserved };
                            setState(prev => ({ ...prev, history: updated }));
                          }}
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${currentDayData.fastingObserved ? 'bg-[#00C4B4] border-[#00C4B4] text-white' : 'border-[color:var(--border)] text-transparent'}`}
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      </label>

                      {/* READING CHECK */}
                      <div className="flex items-center justify-between p-3.5 rounded-xl bg-[color:var(--surface-3)] border border-[color:var(--border)]">
                        <div className="flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-[#4D9FFF]"></span>
                          <span className="text-xs font-semibold text-[color:var(--text)]">Lecture stratégique quotidienne (30 min)</span>
                        </div>
                        <span className="text-[10px] font-bold text-[#00C4B4] uppercase">
                          Intégré via Bibliothèque
                        </span>
                      </div>

                      {/* WORKOUTS PROGRESS PROGRESSIVE */}
                      <div className="flex items-center justify-between p-3.5 rounded-xl bg-[color:var(--surface-3)] border border-[color:var(--border)]">
                        <div className="flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-[#00B4FF]"></span>
                          <span className="text-xs font-semibold text-[color:var(--text)]">Entraînement physique progressive</span>
                        </div>
                        <span className="font-mono-jb text-xs font-bold text-[#0066FF] uppercase">
                          Pushups: {currentDayData.sportsPushups} / {getWorkoutQuota(state.currentDay, 'pushups')} (Quota Jour {state.currentDay})
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[color:var(--border)] flex items-center justify-between text-xs text-[color:var(--text-muted)]">
                      <span>Statut journalier : {currentDayData.validated ? <span className="text-[#00C4B4] font-bold uppercase tracking-wider">Rapport Validé ✔</span> : <span className="text-amber-500 font-bold uppercase tracking-wider">Modifications en cours...</span>}</span>
                      <span className="font-mono-jb text-[#0066FF] font-bold">SCORE GLOBAL ESTIMÉ : {scoresForDay.total}/100</span>
                    </div>
                  </div>

                  {/* 8 PILLARS OVERVIEW TILES GRID */}
                  <div className="bg-[color:var(--surface-2)] border border-[color:var(--border)] rounded-2xl p-6 space-y-4">
                    <h3 className="font-syne text-sm font-bold uppercase text-[color:var(--text)] tracking-wider">Mesure des 8 Piliers de Vie</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { title: "Spirituel", score: scoresForDay.spirituel, color: "border-l-4 border-l-[#0066FF]" },
                        { title: "Lecture", score: scoresForDay.lecture, color: "border-l-4 border-l-[#4D9FFF]" },
                        { title: "Anglais", score: scoresForDay.anglais, color: "border-l-4 border-l-[#00C4B4]" },
                        { title: "Tech / SaaS", score: scoresForDay.tech, color: "border-l-4 border-l-[#0066FF]" },
                        { title: "Pitch & Com", score: scoresForDay.pitch, color: "border-l-4 border-l-[#00B4FF]" },
                        { title: "Marketing", score: scoresForDay.marketing, color: "border-l-4 border-l-[#4D9FFF]" },
                        { title: "Discipline", score: scoresForDay.physique, color: "border-l-4 border-l-[#00C4B4]" },
                        { title: "Ménage", score: scoresForDay.menage, color: "border-l-4 border-l-[#CCCCCC]" }
                      ].map((pillar, idx) => (
                        <div key={idx} className={`bg-[color:var(--surface-3)] p-3 rounded-xl border border-[color:var(--border)] flex flex-col justify-between ${pillar.color}`}>
                          <span className="text-[10px] font-bold uppercase truncate text-[color:var(--text-muted)]">{pillar.title}</span>
                          <span className="font-mono-jb text-[15px] font-bold text-[color:var(--text)] mt-1.5">{pillar.score}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* RIGHT BLOCK: SPIRITUAL FOCUS & HOUSEWORK (2 cols) */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* CENTRAL SPIRITUEL SVGRING ACCENT */}
                  <div className="bg-[color:var(--surface-2)] border border-[color:var(--border)] rounded-2xl p-6 flex flex-col items-center justify-between text-center min-h-[280px]">
                    <div className="w-full text-left">
                      <h3 className="font-syne text-sm font-bold uppercase text-[color:var(--text)] tracking-wider">Le Pilier Fondateur</h3>
                      <p className="text-[10px] text-[color:var(--text-muted)]">Spirituel — Poids Majeur (30%)</p>
                    </div>

                    {/* SVG CIRCLE RING AS MANDATED BY SPECS INSIDE GRAPHICS SECTION */}
                    <div className="relative my-4 flex items-center justify-center">
                      <svg width="120" height="120" viewBox="0 0 120 120" className="transform -rotate-90">
                        {/* Background Track */}
                        <circle
                          cx="60"
                          cy="60"
                          r="50"
                          fill="none"
                          stroke="rgba(255,255,255,0.05)"
                          strokeWidth="8"
                        />
                        {/* Progress ring colored */}
                        <circle
                          cx="60"
                          cy="60"
                          r="50"
                          fill="none"
                          stroke="#0066FF"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray={314.16}
                          strokeDashoffset={314.16 - (314.16 * scoresForDay.spirituel) / 100}
                          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
                        />
                      </svg>
                      {/* Percent center display */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="font-mono-jb text-2xl font-bold tracking-tight text-[color:var(--text)]">{scoresForDay.spirituel}%</span>
                        <span className="text-[9px] uppercase font-bold text-[#00B4FF] mt-0.5">SCORE SPIR.</span>
                      </div>
                    </div>

                    <p className="text-xs text-[color:var(--text-muted)] max-w-[210px] font-dm italic">
                      &quot;Si le spirituel échoue, tout échoue.&quot; (Poids : 30% priorité absolue)
                    </p>
                  </div>

                  {/* DOMESTIC CHORES INTERACTIVE WIDGET MINI */}
                  <div className="bg-[color:var(--surface-2)] border border-[color:var(--border)] rounded-2xl p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-syne text-sm font-bold uppercase text-[color:var(--text)]">Tâches Ménagères</h3>
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-[#0066FF]/10 text-[#0066FF]">Routines (5%)</span>
                    </div>

                    {/* Daily house cleaning chore checklist */}
                    <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                      {DAILY_HOUSEWORK_KEYS.map((taskLabel, idx) => {
                        const isChecked = currentDayData.dailyHousework[idx.toString()] || false;
                        return (
                          <div
                            key={idx}
                            onClick={() => handleHouseworkToggle('daily', idx.toString())}
                            className="flex items-center gap-3 p-2 rounded-lg bg-[color:var(--surface-3)] border border-[color:var(--border)] hover:border-[color:var(--border-hover)] cursor-pointer select-none"
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              readOnly
                              aria-label={`Ménage: ${taskLabel}`}
                              className="w-3.5 h-3.5 accent-[#0066FF] pointer-events-none rounded"
                            />
                            <span className={`text-xs ${isChecked ? 'line-through text-[color:var(--text-muted)]' : 'text-[color:var(--text)] font-medium'}`}>
                              {taskLabel}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}

          {activePage === 'semaine' && (
            <div className="space-y-6 animate-[fadeIn_0.4s_ease-out]">
              
              {/* AREA MULTI-SERIES GRAPHIC */}
              <div className="bg-[color:var(--surface-2)] border border-[color:var(--border)] p-6 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase text-[#0066FF] tracking-wider">Graphique Recharts</span>
                    <h3 className="font-syne text-sm font-bold uppercase text-[color:var(--text)]">Rendement de la Semaine Glissante</h3>
                  </div>
                  <div className="text-xs text-[color:var(--text-muted)] font-mono-jb">
                    Données des Jours {state.currentDay - 6} à {state.currentDay}
                  </div>
                </div>

                {/* Simulated weekly series of 7 days */}
                <div className="h-[280px] w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={Array.from({ length: 7 }).map((_, idx) => {
                        const dayNum = state.currentDay - 6 + idx;
                        const dayD = state.history[dayNum] || getDefaultDay47Data();
                        const sc = calculatePillarScores(dayNum, dayD);
                        return {
                          name: `Jour ${dayNum}`,
                          Spirituel: sc.spirituel,
                          Physique: sc.physique,
                          Ménage: sc.menage,
                          Global: sc.total
                        };
                      })}
                      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                      <XAxis dataKey="name" fontSize={10} stroke="var(--text-muted)" />
                      <YAxis fontSize={10} stroke="var(--text-muted)" />
                      <Tooltip contentStyle={{ backgroundColor: 'var(--surface-2)', borderColor: 'var(--border)', color: 'var(--text)' }} />
                      
                      <Area type="monotone" dataKey="Global" stroke="#0066FF" fill="rgba(0, 102, 255, 0.15)" strokeWidth={2} />
                      <Area type="monotone" dataKey="Spirituel" stroke="#00C4B4" fill="rgba(0, 196, 180, 0.05)" strokeWidth={1} />
                      <Area type="monotone" dataKey="Physique" stroke="#4D9FFF" fill="none" strokeWidth={1} style={{ strokeDasharray: '4 4' }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* SECOND SPLIT RADAR AND TABLE GRID */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* RADAR METRICS DIAGRAM */}
                <div className="bg-[color:var(--surface-2)] border border-[color:var(--border)] p-6 rounded-2xl flex flex-col justify-between">
                  <div>
                    <h3 className="font-syne text-sm font-bold uppercase text-[color:var(--text)] tracking-wider">Profil de Cohérence</h3>
                    <p className="text-[10px] text-[color:var(--text-muted)] uppercase mt-0.5">RADAR DES 6 COMPÉTENCES MAJEURES</p>
                  </div>

                  <div className="h-[240px] w-full flex items-center justify-center my-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart
                        cx="50%"
                        cy="50%"
                        outerRadius="80%"
                        data={[
                          { subject: 'Spirit.', A: scoresForDay.spirituel },
                          { subject: 'Lect.', A: scoresForDay.lecture },
                          { subject: 'Anglais', A: scoresForDay.anglais },
                          { subject: 'SaaS', A: scoresForDay.tech },
                          { subject: 'Pitch', A: scoresForDay.pitch },
                          { subject: 'Physique', A: scoresForDay.physique }
                        ]}
                      >
                        <PolarGrid stroke="var(--border)" />
                        <PolarAngleAxis dataKey="subject" stroke="var(--text-muted)" fontSize={10} />
                        <Radar name="Mes scores" dataKey="A" stroke="#0066FF" fill="#0066FF" fillOpacity={0.15} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>

                  <span className="text-[10px] text-[color:var(--text-muted)] text-center italic block">
                    Amplitude équilibrée requise pour le lancement SaaS à 100 000 clients.
                  </span>
                </div>

                {/* TABLE COMPACT METRICS */}
                <div className="bg-[color:var(--surface-2)] border border-[color:var(--border)] p-6 rounded-2xl flex flex-col justify-between">
                  <div>
                    <h3 className="font-syne text-sm font-bold uppercase text-[color:var(--text)] tracking-wider">Synthèse des Chiffres Hebdo</h3>
                    <p className="text-[10px] text-[color:var(--text-muted)] uppercase mt-0.5 font-bold text-[#0066FF]">Période de rigueur</p>
                  </div>

                  <div className="overflow-x-auto w-full mt-4">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-[color:var(--border)] text-[color:var(--text-muted)] uppercase text-[10px] tracking-widest">
                          <th className="py-2">Jour</th>
                          <th className="py-2">Prière</th>
                          <th className="py-2">Bible</th>
                          <th className="py-2">Sport</th>
                          <th className="py-2 text-right">MScore</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[color:var(--border)] font-mono-jb">
                        {Array.from({ length: 7 }).map((_, idx) => {
                          const dayNum = state.currentDay - 6 + idx;
                          const dayD = state.history[dayNum] || getDefaultDay47Data();
                          const sc = calculatePillarScores(dayNum, dayD);
                          const isToday = dayNum === state.currentDay;
                          return (
                            <tr key={idx} className={isToday ? 'bg-[#0066FF]/8 font-bold' : ''}>
                              <td className="py-2 text-[color:var(--text)]">J-{dayNum}</td>
                              <td className="py-2 text-[color:var(--text-muted)]">{dayD.prayerHours}h</td>
                              <td className="py-2 text-[color:var(--text-muted)]">{dayD.bibleChapters} ch</td>
                              <td className="py-2 text-[color:var(--text-muted)]">{dayD.sportsPushups} pompes</td>
                              <td className={`py-2 text-right font-bold ${sc.total >= 80 ? 'text-[#00C4B4]' : 'text-[#0066FF]'}`}>{sc.total}%</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  <span className="text-[10px] text-muted font-bold uppercase tracking-wider block mt-4 border-t border-[color:var(--border)] pt-4 text-[color:var(--text-muted)]">
                    Moyenne : {Math.round((Array.from({ length: 7 }).reduce((acc: number, _, idx) => {
                      const dayNum = state.currentDay - 6 + idx;
                      const dayD = state.history[dayNum] || getDefaultDay47Data();
                      return acc + calculatePillarScores(dayNum, dayD).total;
                    }, 0) as number) / 7)}% sur la période glissante
                  </span>
                </div>

              </div>
            </div>
          )}

          {activePage === 'biblio' && (
            <div className="space-y-6 animate-[fadeIn_0.4s_ease-out]">
              
              {/* STATUS BAR HEADER BIBLIO */}
              <div className="bg-[color:var(--surface-2)] border border-[color:var(--border)] p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="font-syne text-sm font-bold uppercase text-[color:var(--text)]">État des Lieux : 100 Livres Challenge</h3>
                  <div className="flex items-center gap-3">
                    <span className="font-mono-jb text-2xl font-bold text-[#0066FF]">
                      {state.books.filter(b => b.status === 'Terminé').length} / 100 <span className="text-xs text-[color:var(--text-muted)] font-normal">livres finalisés</span>
                    </span>
                  </div>
                </div>

                <button
                  id="add-new-book-btn"
                  onClick={() => setIsNewBookModalOpen(true)}
                  className="bg-[#0066FF] hover:bg-[#0052CC] text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  + Nouveau Livre
                </button>
              </div>

              {/* BOOKSHELF COLUMN LAYOUT */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                
                {/* SHELF BOOKS LAYOUT CONTROLLER (3 cols) */}
                <div className="lg:col-span-3 space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {state.books.map((book) => {
                      const isSelected = selectedBook?.id === book.id;
                      return (
                        <div
                          key={book.id}
                          onClick={() => setSelectedBook(book)}
                          className={`relative aspect-[2/3] rounded-xl overflow-hidden border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between p-4 ${isSelected ? 'border-[#0066FF] scale-[1.03] shadow-lg' : 'border-[color:var(--border)] bg-[color:var(--surface-2)] hover:border-[color:var(--border-hover)]'}`}
                        >
                          {/* Simulated cover with Cobalt thick border spine left side */}
                          <div className="absolute top-0 bottom-0 left-0 w-2.5 bg-gradient-to-r from-[#003380] to-[#0066FF] z-10 shrink-0"></div>
                          
                          {/* Stat Badge */}
                          <div className="flex justify-end z-20">
                            <span className={`text-[8px] font-bold uppercase px-2 py-0.5 rounded-full ${book.status === 'Terminé' ? 'bg-[#00C4B4]/15 text-[#00C4B4]' : book.status === 'En cours' ? 'bg-[#0066FF]/15 text-[#4D9FFF]' : 'bg-[color:var(--surface-3)] text-[color:var(--text-muted)]'}`}>
                              {book.status}
                            </span>
                          </div>

                          {/* Cover Information text representation */}
                          <div className="z-20 mt-4 flex-1 flex flex-col justify-end">
                            <span className="text-[9px] font-bold uppercase text-[#00B4FF] tracking-wider block mb-1">{book.domain}</span>
                            <h4 className="font-syne text-[11px] font-extrabold leading-snug truncate block text-[color:var(--text)]">{book.title}</h4>
                            <span className="text-[9.5px] text-[color:var(--text-muted)] truncate block mt-0.5">{book.author}</span>
                            
                            {book.rating > 0 && (
                              <span className="font-mono-jb text-[10px] text-[#00C4B4] font-bold mt-2 tracking-tight">★ {book.rating} / 10</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* SIDE FOLDER PANEL INFO BOOK INLINE (1 col) */}
                <div className="lg:col-span-1 bg-[color:var(--surface-2)] border border-[color:var(--border)] p-5 rounded-2xl flex flex-col justify-between min-h-[350px]">
                  {selectedBook ? (
                    <div className="space-y-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-[color:var(--border)]">
                          <span className="text-[10px] font-bold uppercase text-[#0066FF] tracking-widest">Aperçu du Livre</span>
                          <button
                            id="delete-book-btn"
                            onClick={() => handleDeleteBook(selectedBook.id)}
                            className="text-red-500 hover:text-red-400 p-1 rounded hover:bg-red-500/10 cursor-pointer"
                            aria-label="Supprimer le livre"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div>
                          <h4 className="font-syne text-sm font-bold text-[color:var(--text)] leading-none">{selectedBook.title}</h4>
                          <span className="text-xs text-[color:var(--text-muted)] block mt-1">par {selectedBook.author}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-[10px] uppercase font-bold tracking-wider pt-2">
                          <div className="bg-[color:var(--surface-3)] p-2 rounded-lg">
                            <span className="text-[color:var(--text-muted)] block">Domaine</span>
                            <span className="text-[#00B4FF] block mt-0.5">{selectedBook.domain}</span>
                          </div>
                          <div className="bg-[color:var(--surface-3)] p-2 rounded-lg">
                            <span className="text-[color:var(--text-muted)] block">Statut</span>
                            <span className="text-[#00C4B4] block mt-0.5">{selectedBook.status}</span>
                          </div>
                        </div>

                        <div className="space-y-2 pt-2">
                          <span className="text-[10px] uppercase font-bold text-[color:var(--text-muted)] tracking-wider">Résumé de synthèse</span>
                          <p className="text-xs text-[color:var(--text)] bg-[color:var(--surface-3)] p-3 rounded-lg leading-relaxed max-h-[140px] overflow-y-auto">
                            {selectedBook.summary || "Aucun résumé rédigé."}
                          </p>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-[color:var(--border)]">
                        <span className="text-[10px] uppercase font-bold text-[color:var(--text-muted)] tracking-wider block mb-2">Changer le statut</span>
                        <div className="flex items-center gap-1.5 justify-between">
                          {(['À lire', 'En cours', 'Terminé'] as BookStatus[]).map((st) => (
                            <button
                              key={st}
                              onClick={() => {
                                handleUpdateBook({
                                  ...selectedBook,
                                  status: st,
                                  rating: st === 'Terminé' ? 8 : selectedBook.rating
                                });
                              }}
                              className={`flex-1 py-1 rounded text-[9px] uppercase font-bold tracking-wider ${selectedBook.status === st ? 'bg-[#0066FF] text-white' : 'bg-[color:var(--surface-3)] text-[color:var(--text-muted)] hover:text-[color:var(--text)]'}`}
                            >
                              {st}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center text-xs text-[color:var(--text-muted)]">
                      <BookOpen className="w-8 h-8 text-[color:var(--text-subtle)] mb-2" />
                      Sélectionnez un livre de l’étagère pour inspecter sa fiche descriptive
                    </div>
                  )}
                </div>

              </div>

            </div>
          )}

          {activePage === 'saas' && (
            <div className="space-y-6 animate-[fadeIn_0.4s_ease-out]">
              
              {/* TIMELINE HORIZONTAL PROGRESSION STAGE */}
              <div className="bg-[color:var(--surface-2)] border border-[color:var(--border)] p-6 rounded-2xl space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-syne text-sm font-bold uppercase text-[color:var(--text)]">Pipeline SaaS à 100k clients</h3>
                  <span className="text-xs font-mono-jb font-bold text-[#0066FF]">Étape actuelle : MVP</span>
                </div>

                <div className="relative pt-3 pb-4">
                  <div className="absolute top-[23px] left-0 right-0 h-0.5 bg-[color:var(--border)] z-0">
                    <div className="h-full bg-[#0066FF] w-[40%] rounded-full"></div>
                  </div>

                  <div className="flex items-center justify-between relative z-10 select-none">
                    {[
                      { name: 'Idéation', done: true, act: false },
                      { name: 'MVP', done: false, act: true },
                      { name: 'Beta', done: false, act: false },
                      { name: 'Lancement', done: false, act: false },
                      { name: 'Scale', done: false, act: false }
                    ].map((st, sidx) => (
                      <div key={sidx} className="flex flex-col items-center text-center">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 border-[color:var(--bg)] transition-all ${st.done ? 'bg-[#00C4B4]' : st.act ? 'bg-[#0066FF] ring-4 ring-[#0066FF]/25' : 'bg-[color:var(--surface-3)] border-[color:var(--border)]'}`}>
                          {st.done && <Check className="w-3.5 h-3.5 text-white" />}
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider mt-2.5 ${st.act ? 'text-[#0066FF]' : 'text-[color:var(--text-muted)]'}`}>{st.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* KANBAN AND JOURNAL WRAPPERS */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* KANBAN INTERACTIVE DASHBOARD AREA (2 cols) */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-syne text-sm font-bold uppercase text-[color:var(--text)]">Tableau Kanban Sprint</h3>
                    <button
                      id="kanban-new-task-btn"
                      onClick={() => setIsNewTaskModalOpen(true)}
                      className="text-xs text-[#0066FF] font-bold uppercase tracking-wider flex items-center gap-1.5 hover:underline cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      + Nouvelle Tâche
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {(['À faire', 'En cours', 'Terminé'] as KanbanStatus[]).map((colName) => {
                      const tasksInCol = state.kanbanTasks.filter(t => t.status === colName);
                      return (
                        <div key={colName} className="bg-[color:var(--surface-2)] border border-[color:var(--border)] rounded-2xl p-4 space-y-3 min-h-[300px]">
                          <div className="flex items-center justify-between pb-2 border-b border-[color:var(--border)] text-[10px] font-bold uppercase tracking-widest text-[color:var(--text-muted)]">
                            <span>{colName}</span>
                            <span className="px-2 py-0.5 rounded bg-[color:var(--surface-3)]">{tasksInCol.length}</span>
                          </div>

                          <div className="space-y-2">
                            {tasksInCol.map((task) => (
                              <div key={task.id} className="bg-[color:var(--surface)] border border-[color:var(--border)] p-3 rounded-xl space-y-2 relative group hover:border-[color:var(--border-hover)] duration-150">
                                <h4 className="text-xs font-semibold text-[color:var(--text)] pr-6">{task.title}</h4>
                                <div className="flex items-center justify-between text-[8px] font-bold uppercase tracking-wider text-[color:var(--text-muted)]">
                                  <span className={`px-1.5 py-0.5 rounded ${task.priority === 'Haute' ? 'bg-red-500/10 text-red-500' : 'bg-[#0066FF]/10 text-[#4D9FFF]'}`}>{task.priority}</span>
                                  <span>{task.phase}</span>
                                </div>
                                <div className="flex gap-1 border-t border-[color:var(--border)] pt-2 justify-end opacity-90">
                                  {colName !== 'À faire' && (
                                    <button
                                      onClick={() => handleMoveKanban(task.id, colName === 'Terminé' ? 'En cours' : 'À faire')}
                                      className="text-[9px] uppercase px-1.5 py-0.5 hover:bg-[#0066FF]/15 text-[#0066FF] rounded cursor-pointer font-bold shrink-0"
                                      aria-label="Déplacer à la colonne précédente"
                                    >
                                      ←
                                    </button>
                                  )}
                                  {colName !== 'Terminé' && (
                                    <button
                                      onClick={() => handleMoveKanban(task.id, colName === 'À faire' ? 'En cours' : 'Terminé')}
                                      className="text-[9px] uppercase px-1.5 py-0.5 hover:bg-[#0066FF]/15 text-[#0066FF] rounded cursor-pointer font-bold shrink-0"
                                      aria-label="Déplacer à la colonne suivante"
                                    >
                                      →
                                    </button>
                                  )}
                                  <button
                                    onClick={() => handleDeleteKanbanTask(task.id)}
                                    className="text-[8px] uppercase px-1.5 py-0.5 text-red-500 hover:bg-red-500/10 rounded cursor-pointer font-bold shrink-0 ml-1"
                                    aria-label="Supprimer la tâche"
                                  >
                                    Suppr.
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* JOURNAL TIMELINE logs (1 col) */}
                <div className="lg:col-span-1 bg-[color:var(--surface-2)] border border-[color:var(--border)] p-5 rounded-2xl flex flex-col h-full shrink-0">
                  <div className="pb-3 border-b border-[color:var(--border)] mb-4">
                    <h3 className="font-syne text-sm font-bold uppercase text-[color:var(--text)]">Journal de Bord SaaS</h3>
                    <p className="text-[10px] text-[color:var(--text-muted)]">Historique des pas de géant effectués</p>
                  </div>

                  {/* Input logs entry form */}
                  <form onSubmit={handleAddJournalEntry} className="space-y-2 mb-4">
                    <textarea
                      value={newJournalText}
                      onChange={(e) => setNewJournalText(e.target.value)}
                      placeholder="Notez les accomplissements majeurs de codage..."
                      rows={2}
                      className="w-full text-xs p-2 rounded-lg bg-[color:var(--surface-3)] border border-[color:var(--border)] text-[color:var(--text)] focus:outline-none focus:border-[#0066FF] resize-none"
                    />
                    <button
                      type="submit"
                      className="w-full bg-[#0066FF] hover:bg-[#0052CC] text-white py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider cursor-pointer"
                    >
                      Ajouter une entrée
                    </button>
                  </form>

                  {/* Dated log values list */}
                  <div className="flex-1 overflow-y-auto space-y-4 max-h-[300px]">
                    {state.journal.map((j) => (
                      <div key={j.id} className="border-l-2 border-l-[#0066FF] pl-3 py-0.5">
                        <span className="text-[9px] font-mono-jb font-bold text-[#00B4FF] uppercase">{j.date}</span>
                        <p className="text-xs text-[color:var(--text)] leading-relaxed mt-1 font-dm">
                          {j.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {activePage === 'analytics' && (
            <div className="space-y-6 animate-[fadeIn_0.4s_ease-out]">
              
              {/* COMPREHENSIVE 210 DAYS STATS HEATMAP */}
              <div className="bg-[color:var(--surface-2)] border border-[color:var(--border)] p-6 rounded-2xl space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[color:var(--border)]">
                  <div className="flex flex-col">
                    <h3 className="font-syne text-sm font-bold uppercase text-[color:var(--text)]">Grille d'Assiduité du Programme (210 Jours)</h3>
                    <p className="text-[10px] text-[color:var(--text-muted)] uppercase">INTENSITÉ DE COMPLÉTION DU SCORE GLOBAL (30 COLONNES × 7 RANGÉES)</p>
                  </div>
                </div>

                <div className="overflow-x-auto w-full py-2">
                  <div className="flex flex-col gap-[3px] min-w-[420px]">
                    
                    {Array.from({ length: 7 }).map((_, rowIdx) => {
                      const weekdaysText = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
                      return (
                        <div key={rowIdx} className="flex items-center gap-[3px]">
                          <span className="w-8 text-[9px] text-[color:var(--text-muted)] font-bold uppercase text-right mr-1.5">{weekdaysText[rowIdx]}</span>
                          
                          {Array.from({ length: 30 }).map((__, colIdx) => {
                            const dayNumber = colIdx * 7 + rowIdx + 1;
                            const hResult = state.history[dayNumber];
                            const scores = calculatePillarScores(dayNumber, hResult || getDefaultDay47Data());
                            const score = hResult ? scores.total : 0;
                            
                            // Fill color strictly according to guidelines Section 15
                            let bgClass = 'bg-[color:var(--surface-3)]';
                            if (hResult) {
                              if (score === 100) bgClass = 'bg-[#0066FF]';
                              else if (score >= 67) bgClass = 'bg-[#0066FF]/80';
                              else if (score >= 34) bgClass = 'bg-[#0066FF]/50';
                              else bgClass = 'bg-[#0066FF]/20';
                            }

                            const isFuture = dayNumber > state.currentDay;
                            const isToday = dayNumber === state.currentDay;

                            return (
                              <div
                                key={colIdx}
                                title={isFuture ? `Jour ${dayNumber} (Futur)` : `Jour ${dayNumber}: Score ${score}%`}
                                className={`w-3.5 h-3.5 rounded-[3px] shrink-0 border transition-all ${isToday ? 'border-[#00C4B4] scale-[1.12] z-10' : 'border-transparent'} ${isFuture ? 'bg-[color:var(--surface-3)]/40 opacity-30 cursor-not-allowed' : bgClass + ' hover:scale-110 cursor-alias'}`}
                              />
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 text-[10px] text-[color:var(--text-muted)] font-bold uppercase pt-2 border-t border-[color:var(--border)]">
                  <span>Moins d'effort</span>
                  <div className="flex gap-[3px]">
                    <span className="w-3 h-3 rounded-[3px] bg-[color:var(--surface-3)]"></span>
                    <span className="w-3 h-3 rounded-[3px] bg-[#0066FF]/20"></span>
                    <span className="w-3 h-3 rounded-[3px] bg-[#0066FF]/50"></span>
                    <span className="w-3 h-3 rounded-[3px] bg-[#0066FF]/80"></span>
                    <span className="w-3 h-3 rounded-[3px] bg-[#0066FF]"></span>
                  </div>
                  <span>100% Validé</span>
                </div>
              </div>

              {/* LONG-TERM CHART ROW */}
              <div className="grid grid-cols-1 gap-6">
                <div className="bg-[color:var(--surface-2)] border border-[color:var(--border)] p-6 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-syne text-sm font-bold uppercase text-[color:var(--text)] tracking-wider">Évolution du Score Global à Travers l’Histoire</h3>
                    <span className="text-xs text-[#0066FF] font-bold uppercase tracking-widest bg-[#0066FF]/10 px-3 py-1 rounded-full">30 derniers jours actifs</span>
                  </div>

                  <div className="h-[230px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={Array.from({ length: 30 }).map((_, idx) => {
                          const dayNum = Math.max(1, state.currentDay - 29 + idx);
                          const dayD = state.history[dayNum] || getDefaultDay47Data();
                          return {
                            name: `J-${dayNum}`,
                            Score: calculatePillarScores(dayNum, dayD).total
                          };
                        })}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                      >
                        <XAxis dataKey="name" fontSize={9} stroke="var(--text-muted)" />
                        <YAxis fontSize={9} stroke="var(--text-muted)" />
                        <Tooltip />
                        <Line type="monotone" dataKey="Score" stroke="#0066FF" strokeWidth={2.5} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

            </div>
          )}

        </section>
      </main>

      {/* MODAL INPUT METRIC DATA POPUP */}
      {isInputModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-[color:var(--surface-2)] border border-[color:var(--border)] rounded-[20px] max-w-[560px] w-full p-6 space-y-6 relative overflow-y-auto max-h-[90vh]">
            
            <button
              id="close-input-modal-btn"
              onClick={() => setIsInputModalOpen(false)}
              className="absolute top-4 right-4 text-[color:var(--text-muted)] hover:text-[color:var(--text)] p-2 cursor-pointer rounded-lg"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-[color:var(--border)] pb-3">
              <span className="px-2 py-0.5 rounded text-[8px] font-bold bg-[#0066FF] text-white uppercase tracking-wider">Modification Rapport</span>
              <h2 className="font-syne text-base font-bold uppercase text-[color:var(--text)] mt-1.5">Saisir les Données du Jour {state.currentDay}</h2>
            </div>

            <form onSubmit={saveDailyData} className="space-y-4">
              
              {/* Accordion Menu pillars selectors */}
              <div className="space-y-2 max-h-[380px] overflow-y-auto pr-2">
                
                {/* SPIRITUEL PART FORM */}
                <div className="border border-[color:var(--border)] rounded-xl overflow-hidden bg-[color:var(--surface)]">
                  <button
                    type="button"
                    onClick={() => setActiveAccordion(activeAccordion === 'spirituel' ? '' : 'spirituel')}
                    className="w-full p-3 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#0066FF]"
                  >
                    <span>1. Pilier Spirituel (Poids 30%)</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {activeAccordion === 'spirituel' && (
                    <div className="p-4 border-t border-[color:var(--border)] space-y-4 bg-[color:var(--surface-2)]">
                      <div>
                        <label className="text-xs font-bold text-[color:var(--text-muted)] mb-1 block uppercase">Heures de Prière effectives</label>
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          max="24"
                          value={tempData.prayerHours}
                          onChange={(e) => setTempData({ ...tempData, prayerHours: parseFloat(e.target.value) || 0 })}
                          className="w-full text-xs p-2 rounded-lg bg-[color:var(--surface-3)] border border-[color:var(--border)]"
                        />
                        <span className="text-[10px] text-[color:var(--text-muted)] mt-1 block font-mono-jb">Quota ciblé de rigueur : 6h / jour</span>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-[color:var(--text-muted)] mb-1 block uppercase">Chapitres bibliques lus</label>
                        <input
                          type="number"
                          step="1"
                          min="0"
                          value={tempData.bibleChapters}
                          onChange={(e) => setTempData({ ...tempData, bibleChapters: parseInt(e.target.value, 10) || 0 })}
                          className="w-full text-xs p-2 rounded-lg bg-[color:var(--surface-3)] border border-[color:var(--border)]"
                        />
                        <span className="text-[10px] text-[color:var(--text-muted)] mt-1 block font-mono-jb">Quota ciblé de rigueur : 40 chapitres</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* SPORTS INDICATION FORM */}
                <div className="border border-[color:var(--border)] rounded-xl overflow-hidden bg-[color:var(--surface)]">
                  <button
                    type="button"
                    onClick={() => setActiveAccordion(activeAccordion === 'sport' ? '' : 'sport')}
                    className="w-full p-3 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#00B4FF]"
                  >
                    <span>2. Discipline Sportive (Poids 10%)</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {activeAccordion === 'sport' && (
                    <div className="p-4 border-t border-[color:var(--border)] space-y-4 bg-[color:var(--surface-2)]">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-bold text-[color:var(--text-muted)] mb-1 block uppercase">Pompes effectuées</label>
                          <input
                            type="number"
                            value={tempData.sportsPushups}
                            onChange={(e) => setTempData({ ...tempData, sportsPushups: parseInt(e.target.value, 10) || 0 })}
                            className="w-full text-xs p-2 rounded-lg bg-[color:var(--surface-3)] border border-[color:var(--border)] font-mono-jb"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-bold text-[color:var(--text-muted)] mb-1 block uppercase">Abdos effectués</label>
                          <input
                            type="number"
                            value={tempData.sportsAbs}
                            onChange={(e) => setTempData({ ...tempData, sportsAbs: parseInt(e.target.value, 10) || 0 })}
                            className="w-full text-xs p-2 rounded-lg bg-[color:var(--surface-3)] border border-[color:var(--border)] font-mono-jb"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-bold text-[color:var(--text-muted)] mb-1 block uppercase">Squats faits</label>
                          <input
                            type="number"
                            value={tempData.sportsSquats}
                            onChange={(e) => setTempData({ ...tempData, sportsSquats: parseInt(e.target.value, 10) || 0 })}
                            className="w-full text-xs p-2 rounded-lg bg-[color:var(--surface-3)] border border-[color:var(--border)] font-mono-jb"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-bold text-[color:var(--text-muted)] mb-1 block uppercase">Gainage (seconde)</label>
                          <input
                            type="number"
                            value={tempData.sportsPlank}
                            onChange={(e) => setTempData({ ...tempData, sportsPlank: parseInt(e.target.value, 10) || 0 })}
                            className="w-full text-xs p-2 rounded-lg bg-[color:var(--surface-3)] border border-[color:var(--border)] font-mono-jb"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* COGNITIVE ENGLISH/PITCH FORM */}
                <div className="border border-[color:var(--border)] rounded-xl overflow-hidden bg-[color:var(--surface)]">
                  <button
                    type="button"
                    onClick={() => setActiveAccordion(activeAccordion === 'pitch' ? '' : 'pitch')}
                    className="w-full p-3 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#4D9FFF]"
                  >
                    <span>3. Pitch & Communication (Poids 11%)</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {activeAccordion === 'pitch' && (
                    <div className="p-4 border-t border-[color:var(--border)] space-y-4 bg-[color:var(--surface-2)]">
                      <div>
                        <label className="text-xs font-bold text-[color:var(--text-muted)] mb-1 block uppercase">Sélection Score Confiance Pitch (/10)</label>
                        <input
                          type="range"
                          min="0"
                          max="10"
                          value={tempData.pitchConfidence}
                          onChange={(e) => setTempData({ ...tempData, pitchConfidence: parseInt(e.target.value, 10) || 0 })}
                          className="w-full cursor-pointer accent-[#0066FF]"
                        />
                        <div className="flex justify-between text-[10px] font-mono-jb font-bold text-[color:var(--text-muted)] mt-1">
                          <span>0 - Timide</span>
                          <span className="text-[#0066FF]">{tempData.pitchConfidence} / 10</span>
                          <span>10 - Éloquent</span>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-[color:var(--text-muted)] mb-1 block uppercase">Étude Anglais (minutes)</label>
                        <input
                          type="number"
                          value={tempData.englishMinutes}
                          onChange={(e) => setTempData({ ...tempData, englishMinutes: parseInt(e.target.value, 10) || 0 })}
                          className="w-full text-xs p-2 rounded-lg bg-[color:var(--surface-3)] border border-[color:var(--border)] font-mono-jb"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* NOTES SUMMARY */}
                <div className="border border-[color:var(--border)] rounded-xl overflow-hidden bg-[color:var(--surface)]">
                  <button
                    type="button"
                    onClick={() => setActiveAccordion(activeAccordion === 'notes' ? '' : 'notes')}
                    className="w-full p-3 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[color:var(--text-muted)]"
                  >
                    <span>4. Remarques Libre & Validation</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {activeAccordion === 'notes' && (
                    <div className="p-4 border-t border-[color:var(--border)] space-y-2 bg-[color:var(--surface-2)]">
                      <label className="text-xs font-bold text-[color:var(--text-muted)] mb-1 block uppercase font-dm">Notes de la journée</label>
                      <textarea
                        value={tempData.notes}
                        onChange={(e) => setTempData({ ...tempData, notes: e.target.value })}
                        className="w-full text-xs p-2.5 rounded-lg bg-[color:var(--surface-3)] border border-[color:var(--border)] text-[color:var(--text)] resize-none"
                        rows={3}
                      />
                    </div>
                  )}
                </div>

              </div>

              {/* SAVE FORM SUBMIT */}
              <button
                type="submit"
                className="w-full bg-[#0066FF] hover:bg-[#0052CC] text-white py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest cursor-pointer transition-transform duration-150 active:scale-[0.98]"
              >
                Valider & Enregistrer le jour {state.currentDay}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* NEW KANBAN TASK MODAL */}
      {isNewTaskModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-[color:var(--surface-2)] border border-[color:var(--border)] p-6 rounded-[20px] max-w-[450px] w-full space-y-4 relative">
            <button
              onClick={() => setIsNewTaskModalOpen(false)}
              className="absolute top-4 right-4 text-[color:var(--text-muted)] hover:text-[color:var(--text)] cursor-pointer"
              aria-label="Fermer"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-syne text-sm font-bold uppercase text-[color:var(--text)] pb-2 border-b border-[color:var(--border)]">Ajouter une Tâche Kanban</h3>

            <form onSubmit={handleCreateKanbanTask} className="space-y-4 text-xs">
              <div>
                <label className="text-[10px] font-bold uppercase block mb-1">Titre de la tâche</label>
                <input
                  type="text"
                  required
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full p-2 rounded-lg bg-[color:var(--surface-3)] border border-[color:var(--border)] text-[color:var(--text)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold uppercase block mb-1">Priorité</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as PriorityLevel })}
                    className="w-full p-2 rounded-lg bg-[color:var(--surface-3)] border border-[color:var(--border)] text-[color:var(--text)]"
                  >
                    <option value="Basse">Basse</option>
                    <option value="Moyenne">Moyenne</option>
                    <option value="Haute">Haute</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase block mb-1">Phase</label>
                  <select
                    value={newTask.phase}
                    onChange={(e) => setNewTask({ ...newTask, phase: e.target.value as SaaSPhase })}
                    className="w-full p-2 rounded-lg bg-[color:var(--surface-3)] border border-[color:var(--border)] text-[color:var(--text)]"
                  >
                    <option value="Idéation">Idéation</option>
                    <option value="MVP">MVP</option>
                    <option value="Beta">Beta</option>
                    <option value="Lancement">Lancement</option>
                    <option value="Scale">Scale</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#0066FF] text-white py-2 rounded-xl font-bold uppercase tracking-wider cursor-pointer mt-2"
              >
                Créer la tâche
              </button>
            </form>
          </div>
        </div>
      )}

      {/* NEW BOOK MODAL DRAW */}
      {isNewBookModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-[color:var(--surface-2)] border border-[color:var(--border)] p-6 rounded-[20px] max-w-[480px] w-full space-y-4 relative">
            <button
              onClick={() => setIsNewBookModalOpen(false)}
              className="absolute top-4 right-4 text-[color:var(--text-muted)] hover:text-[color:var(--text)] cursor-pointer"
              aria-label="Fermer"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-syne text-sm font-bold uppercase text-[color:var(--text)] pb-2 border-b border-[color:var(--border)]">Ajouter un Ouvrage Stratégique</h3>

            <form onSubmit={handleAddBook} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold uppercase block mb-1">Titre de l’œuvre</label>
                  <input
                    type="text"
                    required
                    value={newBook.title}
                    onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                    className="w-full p-2 rounded-lg bg-[color:var(--surface-3)] border border-[color:var(--border)] text-[color:var(--text)]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase block mb-1 font-dm">Auteur / Écrivain</label>
                  <input
                    type="text"
                    required
                    value={newBook.author}
                    onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                    className="w-full p-2 rounded-lg bg-[color:var(--surface-3)] border border-[color:var(--border)] text-[color:var(--text)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold uppercase block mb-1 font-dm">Domaine scientifique</label>
                  <select
                    value={newBook.domain}
                    onChange={(e) => setNewBook({ ...newBook, domain: e.target.value as BookDomain })}
                    className="w-full p-2 rounded-lg bg-[color:var(--surface-3)] border border-[color:var(--border)] text-[color:var(--text)]"
                  >
                    <option value="Spirituel">Spirituel</option>
                    <option value="Business">Business</option>
                    <option value="Tech">Tech</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Développement perso">Développement perso</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase block mb-1">Statut d'assimilation</label>
                  <select
                    value={newBook.status}
                    onChange={(e) => setNewBook({ ...newBook, status: e.target.value as BookStatus })}
                    className="w-full p-2 rounded-lg bg-[color:var(--surface-3)] border border-[color:var(--border)] text-[color:var(--text)]"
                  >
                    <option value="À lire">À lire</option>
                    <option value="En cours">En cours</option>
                    <option value="Terminé">Terminé</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase block mb-1">Résumé synthétique</label>
                <textarea
                  value={newBook.summary}
                  onChange={(e) => setNewBook({ ...newBook, summary: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-[color:var(--surface-3)] border border-[color:var(--border)] text-[color:var(--text)] resize-none"
                  rows={3}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#0066FF] text-white py-2 rounded-xl font-bold uppercase tracking-wider cursor-pointer"
              >
                Enregistrer dans la bibliothèque
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
