
import { Team, Event, Job } from './types';

export const BRAND_COLORS = {
  primary: '#081B3A', // Tactical Navy
  secondary: '#1652A3', // Performance Blue
  accent: '#FFC400',  // High-Visibility Yellow
  accentGlow: 'rgba(255, 196, 0, 0.6)',
  surface: '#0A254D',
};

export const MOCK_TEAMS: Team[] = [
  {
    id: 'val-1',
    name: 'VALORANT PRO',
    game: 'VALORANT',
    logo: 'https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?auto=format&fit=crop&q=80&w=100&h=100',
    banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200&h=600',
    achievements: ['VCT Masters 2025 Winner', 'Regional League Champions'],
    bio: 'Established as the premier tactical squad in the MENA region, GEEKAY VALORANT combines aggressive playstyles with deep strategic depth.',
    stats: {
      winRate: '72%',
      rank: '#4 Global',
      earnings: '$2.4M',
      championships: 12,
      globalEvents: 24,
      seasonRecord: '24-6'
    },
    trophies: [
      { id: 't1', title: 'VCT MASTERS TOKYO', year: '2025', rank: '1ST' },
      { id: 't2', title: 'RED BULL HOME GROUND', year: '2024', rank: '1ST' },
      { id: 't3', title: 'VALORANT CHALLENGERS', year: '2024', rank: '1ST' },
      { id: 't4', title: 'LOCK//IN SÃO PAULO', year: '2023', rank: '2ND' },
    ],
    players: [
      {
        id: 'p1',
        name: 'Alex Johnson',
        nickname: 'SPECTRE',
        role: 'Duelist',
        photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600&h=800',
        bio: 'The unmatched entry fragger known for his aggressive map control and clutch ability in high-pressure finals.',
        stats: { kd: 1.45, mvps: 12, tournaments: 24, winRate: '68%' },
        achievements: [
          { year: '2025', title: 'MVP VCT Masters' },
          { year: '2024', title: 'Top 5 Players Global' }
        ],
        timeline: [
          { year: '2022', event: 'Joined GEEKAY' },
          { year: '2023', event: 'Regional Finalist' },
          { year: '2025', event: 'Masters Champion' }
        ],
        socials: { twitter: '#', twitch: '#' }
      },
      {
        id: 'p2',
        name: 'Sarah Chen',
        nickname: 'NOVA',
        role: 'Initiator',
        photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600&h=800',
        bio: 'Strategic mastermind behind some of the greatest comebacks in VCT history. Her utility usage is considered the gold standard.',
        stats: { kd: 1.12, mvps: 8, tournaments: 20, winRate: '62%' },
        achievements: [
          { year: '2024', title: 'Best Initiator MENA' }
        ],
        socials: { twitter: '#', instagram: '#' }
      },
      {
        id: 'p3',
        nickname: 'VORTEX',
        name: 'Marcus Thorne',
        role: 'Controller',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600&h=800',
        bio: 'King of smokes and site denial. Vortex provides the anchors needed for the team to rotate effectively.',
        stats: { kd: 1.05, mvps: 5, tournaments: 18, winRate: '58%' },
        socials: { twitter: '#', twitch: '#' }
      },
      {
        id: 'p4',
        nickname: 'ECHO',
        name: 'Elena Rossi',
        role: 'Sentinel',
        photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600&h=800',
        bio: 'The unbreakable wall of GEEKAY defense. Elena holds sites alone while her team executes on the other side.',
        stats: { kd: 1.28, mvps: 15, tournaments: 30, winRate: '71%' },
        socials: { twitter: '#', instagram: '#' }
      }
    ]
  },
  {
    id: 'dota-1',
    name: 'DOTA 2 ELITE',
    game: 'DOTA 2',
    logo: 'https://images.unsplash.com/photo-1614027164847-1b280143eb9c?auto=format&fit=crop&q=80&w=100&h=100',
    banner: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=1200&h=600',
    achievements: ['TI 2024 Finalist', 'DreamLeague S22 Champions'],
    bio: 'Renowned for their intricate drafting and relentless macro-pressure, the DOTA 2 division represents GEEKAY at the highest level of MOBA competition.',
    stats: {
      winRate: '65%',
      rank: '#8 Global',
      earnings: '$12.8M',
      championships: 8,
      globalEvents: 16,
      seasonRecord: '18-12'
    },
    trophies: [
      { id: 't5', title: 'THE INTERNATIONAL 2024', year: '2024', rank: '3RD' },
      { id: 't6', title: 'DREAMLEAGUE S22', year: '2024', rank: '1ST' },
      { id: 't6b', title: 'RIYADH MASTERS', year: '2023', rank: '1ST' },
    ],
    players: [
      {
        id: 'dp1',
        nickname: 'ZENITH',
        name: 'Hiroshi Sato',
        role: 'Carry',
        photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600&h=800',
        bio: 'A farm-heavy carry known for flawless positioning in late-game teamfights.',
        stats: { kd: 4.8, mvps: 22, tournaments: 45, winRate: '68%' },
        socials: { twitter: '#' }
      },
      {
        id: 'dp2',
        nickname: 'MIRAGE',
        name: 'Li Wei',
        role: 'Mid',
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600&h=800',
        bio: 'Highly mechanical mid-laner with a signature Ember Spirit that terrifies opponents.',
        stats: { kd: 3.9, mvps: 18, tournaments: 40, winRate: '64%' },
        socials: { twitch: '#' }
      },
      {
        id: 'dp3',
        nickname: 'IRON',
        name: 'Dmitri Volkov',
        role: 'Offlane',
        photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=600&h=800',
        bio: 'The captain and the rock of the team. Never loses his lane.',
        stats: { kd: 2.5, mvps: 10, tournaments: 55, winRate: '70%' },
        socials: { twitter: '#' }
      },
      {
        id: 'dp4',
        nickname: 'PULSE',
        name: 'Arjun Nair',
        role: 'Soft Support',
        photo: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=600&h=800',
        bio: 'Incredible map awareness. Always where he needs to be for a gank.',
        stats: { kd: 1.8, mvps: 5, tournaments: 32, winRate: '62%' },
        socials: { twitter: '#' }
      },
      {
        id: 'dp5',
        nickname: 'AURA',
        name: 'Sofia Martinez',
        role: 'Hard Support',
        photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600&h=800',
        bio: 'Strategic genius who manages the vision game like no other.',
        stats: { kd: 1.2, mvps: 4, tournaments: 28, winRate: '60%' },
        socials: { twitch: '#' }
      }
    ]
  },
  {
    id: 'cs-1',
    name: 'CS2 SQUAD',
    game: 'CS2',
    logo: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=100&h=100',
    banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200&h=600',
    achievements: ['Major Quarter-Finalist', 'Pro League Champions'],
    bio: 'Pure precision and tactical mastery. Our CS2 squad is built on the foundation of elite mechanical skill and disciplined communication.',
    stats: {
      winRate: '61%',
      rank: '#12 Global',
      earnings: '$1.8M',
      championships: 5,
      globalEvents: 20,
      seasonRecord: '15-15'
    },
    trophies: [
      { id: 't7', title: 'ESL PRO LEAGUE', year: '2024', rank: '1ST' },
      { id: 't8', title: 'BLAST SPRING FINALS', year: '2024', rank: '4TH' },
    ],
    players: [
      {
        id: 'cp1',
        nickname: 'HAWK',
        name: 'Erik Nielsen',
        role: 'Sniper',
        photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600&h=800',
        bio: 'One of the fastest AWP flick shots in the pro scene.',
        stats: { kd: 1.35, mvps: 15, tournaments: 35, winRate: '60%' },
        socials: { twitter: '#' }
      },
      {
        id: 'cp2',
        nickname: 'GLITCH',
        name: 'Simon Katz',
        role: 'Entry',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600&h=800',
        bio: 'Fearless entry fragger with pinpoint AK-47 accuracy.',
        stats: { kd: 1.15, mvps: 8, tournaments: 30, winRate: '58%' },
        socials: { twitch: '#' }
      },
      {
        id: 'cp3',
        nickname: 'CODE',
        name: 'Julian Ross',
        role: 'IGL',
        photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600&h=800',
        bio: 'The tactician behind GEEKAY aggressive CT sides.',
        stats: { kd: 0.95, mvps: 4, tournaments: 50, winRate: '65%' },
        socials: { twitter: '#' }
      },
      {
        id: 'cp4',
        nickname: 'PHANTOM',
        name: 'Leo Silva',
        role: 'Lurker',
        photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600&h=800',
        bio: 'Silent and deadly. Always appears behind the enemy at the worst time.',
        stats: { kd: 1.25, mvps: 12, tournaments: 28, winRate: '62%' },
        socials: { twitter: '#' }
      },
      {
        id: 'cp5',
        nickname: 'SHIELD',
        name: 'Toby Miller',
        role: 'Support',
        photo: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=600&h=800',
        bio: 'Utility usage expert. Sets his team up for success every round.',
        stats: { kd: 1.05, mvps: 2, tournaments: 33, winRate: '59%' },
        socials: { twitch: '#' }
      }
    ]
  },
  {
    id: 'rl-1',
    name: 'ROCKET STRIKE',
    game: 'Rocket League',
    logo: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=100&h=100',
    banner: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=1200&h=600',
    achievements: ['RLCS Winter Split Champs', 'MENA Major Winner'],
    bio: 'Mechanical gods on wheels. Our Rocket League team is known for insane aerials and unbeatable defensive rotation.',
    stats: {
      winRate: '82%',
      rank: '#1 Global',
      earnings: '$950K',
      championships: 10,
      globalEvents: 12,
      seasonRecord: '20-4'
    },
    trophies: [
      { id: 't12', title: 'RLCS MENA MAJOR', year: '2025', rank: '1ST' },
      { id: 't13', title: 'DREAMHACK ATLANTA', year: '2024', rank: '1ST' },
    ],
    players: [
      {
        id: 'rp1',
        nickname: 'FLYER',
        name: 'Zane Miller',
        role: 'Striker',
        photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600&h=800',
        bio: 'Master of the double-tap and flip resets.',
        stats: { kd: 2.5, mvps: 25, tournaments: 15, winRate: '85%' },
        socials: { twitter: '#' }
      },
      {
        id: 'rp2',
        nickname: 'TURBO',
        name: 'Marc Dubois',
        role: 'Midfield',
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600&h=800',
        bio: 'Fastest car on the pitch. Unmatched challenge winner.',
        stats: { kd: 1.8, mvps: 12, tournaments: 18, winRate: '80%' },
        socials: { twitch: '#' }
      },
      {
        id: 'rp3',
        nickname: 'GOALIE',
        name: 'Sam Smith',
        role: 'Defense',
        photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600&h=800',
        bio: 'The wall. Saves shots that seem impossible.',
        stats: { kd: 1.2, mvps: 8, tournaments: 20, winRate: '81%' },
        socials: { twitter: '#' }
      }
    ]
  }
];

export const MOCK_EVENTS: Event[] = [
  {
    id: 'e1',
    title: 'VCT GLOBAL FINALS 2026',
    game: 'VALORANT',
    date: 'OCT 12, 2026',
    location: 'TOKYO, JP',
    prizePool: '$1,000,000',
    status: 'LIVE',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800&h=450'
  },
  {
    id: 'e2',
    title: 'THE INTERNATIONAL 2026',
    game: 'DOTA 2',
    date: 'NOV 05, 2026',
    location: 'COPENHAGEN, DK',
    prizePool: '$18,000,000',
    status: 'UPCOMING',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800&h=450'
  },
  {
    id: 'e3',
    title: 'GEEKAY CHALLENGERS Q1',
    game: 'VALORANT',
    date: 'JAN 22, 2026',
    location: 'DUBAI, UAE',
    prizePool: '$50,000',
    status: 'FINISHED',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800&h=450'
  },
  {
    id: 'e4',
    title: 'PRO LEAGUE SEASON 12',
    game: 'CS2',
    date: 'FEB 15, 2026',
    location: 'STOCKHOLM, SE',
    prizePool: '$250,000',
    status: 'FINISHED',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800&h=450'
  },
  {
    id: 'e5',
    title: 'SUMMER MASTERS INVITATIONAL',
    game: 'VALORANT',
    date: 'JUN 08, 2026',
    location: 'PARIS, FR',
    prizePool: '$500,000',
    status: 'UPCOMING',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800&h=450'
  },
  {
    id: 'e6',
    title: 'MENA REGIONAL SHOWDOWN',
    game: 'DOTA 2',
    date: 'JUL 20, 2026',
    location: 'RIYADH, SA',
    prizePool: '$100,000',
    status: 'UPCOMING',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800&h=450'
  },
  {
    id: 'e7',
    title: 'GRAND SLAM FINALS',
    game: 'CS2',
    date: 'DEC 18, 2026',
    location: 'NEW YORK, USA',
    prizePool: '$2,000,000',
    status: 'UPCOMING',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800&h=450'
  }
];

export const MOCK_JOBS: Job[] = [
  { id: 'j1', title: 'Content Director', department: 'Creative', location: 'Remote', type: 'Full-time' },
  { id: 'j2', title: 'Senior Motion Designer', department: 'Production', location: 'Dubai, UAE', type: 'Full-time' },
  { id: 'j3', title: 'Social Media Manager', department: 'Marketing', location: 'Remote', type: 'Contract' }
];
