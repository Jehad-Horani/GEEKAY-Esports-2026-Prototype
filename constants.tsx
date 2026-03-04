
import { Team, Event, Job, NewsItem, Creator } from './types';

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
    region: 'MENA',
    league: 'VALORANT CHALLENGERS',
    logo: 'https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?auto=format&fit=crop&q=80&w=100&h=100',
    banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200&h=600',
    achievements: ['VCT Masters 2025 Winner', 'Regional League Champions'],
    bio: 'Established as the premier tactical squad in the MENA region, GEEKAY VALORANT combines aggressive playstyles with deep strategic depth.',
    stats: {
      winRate: '72%',
      rank: '#4 Global',
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
    region: 'GLOBAL',
    league: 'DPC DIVISION I',
    logo: 'https://images.unsplash.com/photo-1614027164847-1b280143eb9c?auto=format&fit=crop&q=80&w=100&h=100',
    banner: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=1200&h=600',
    achievements: ['TI 2024 Finalist', 'DreamLeague S22 Champions'],
    bio: 'Renowned for their intricate drafting and relentless macro-pressure, the DOTA 2 division represents GEEKAY at the highest level of MOBA competition.',
    stats: {
      winRate: '65%',
      rank: '#8 Global',
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
  },
  {
    id: 'lol-1',
    name: 'LEAGUE OF LEGENDS',
    game: 'LEAGUE OF LEGENDS',
    region: 'MENA',
    league: 'ARABIAN LEAGUE',
    logo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=100&h=100',
    banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200&h=600',
    achievements: ['Arabian League Champions', 'EMEA Masters Participant'],
    players: [],
    stats: { winRate: '70%', rank: '#1 MENA', championships: 3, globalEvents: 2, seasonRecord: '14-2' }
  },
  {
    id: 'r6-1',
    name: 'RAINBOW SIX SIEGE',
    game: 'R6 SIEGE',
    region: 'MENA',
    logo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=100&h=100',
    banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200&h=600',
    achievements: ['MENA League Winner', 'Six Invitational Contender'],
    players: [],
    stats: { winRate: '68%', rank: '#2 MENA', championships: 4, globalEvents: 3, seasonRecord: '12-4' }
  },
  {
    id: 'apex-1',
    name: 'APEX LEGENDS',
    game: 'APEX LEGENDS',
    region: 'GLOBAL',
    logo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=100&h=100',
    banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200&h=600',
    achievements: ['ALGS Split 1 Playoffs', 'EMEA Regional Finals'],
    players: [],
    stats: { winRate: '55%', rank: '#8 EMEA', championships: 1, globalEvents: 5, seasonRecord: 'N/A' }
  },
  {
    id: 'pubgm-1',
    name: 'PUBG MOBILE',
    game: 'PUBG MOBILE',
    region: 'MENA',
    logo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=100&h=100',
    banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200&h=600',
    achievements: ['PMPL Arabia Champions', 'PMGC Finalists'],
    players: [],
    stats: { winRate: '75%', rank: '#1 Arabia', championships: 5, globalEvents: 4, seasonRecord: 'N/A' }
  },
  {
    id: 'ff-1',
    name: 'FREE FIRE',
    game: 'FREE FIRE',
    region: 'MENA',
    logo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=100&h=100',
    banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200&h=600',
    achievements: ['MEA League Winners', 'World Series Participants'],
    players: [],
    stats: { winRate: '65%', rank: '#2 MEA', championships: 2, globalEvents: 2, seasonRecord: 'N/A' }
  },
  {
    id: 'ow2-1',
    name: 'OVERWATCH 2',
    game: 'OVERWATCH 2',
    region: 'EU',
    logo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=100&h=100',
    banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200&h=600',
    achievements: ['OWCS EMEA Stage 1', 'Faceit League Contenders'],
    players: [],
    stats: { winRate: '60%', rank: '#5 EU', championships: 1, globalEvents: 1, seasonRecord: '10-5' }
  },
  {
    id: 'sf6-1',
    name: 'STREET FIGHTER 6',
    game: 'STREET FIGHTER 6',
    region: 'GLOBAL',
    logo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=100&h=100',
    banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200&h=600',
    achievements: ['Capcom Cup Qualified', 'Evo Top 8'],
    players: [],
    stats: { winRate: '80%', rank: '#3 Global', championships: 6, globalEvents: 10, seasonRecord: 'N/A' }
  },
  {
    id: 't8-1',
    name: 'TEKKEN 8',
    game: 'TEKKEN 8',
    region: 'GLOBAL',
    logo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=100&h=100',
    banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200&h=600',
    achievements: ['TWT Finals Top 16', 'Combo Breaker Champion'],
    players: [],
    stats: { winRate: '72%', rank: '#6 Global', championships: 4, globalEvents: 8, seasonRecord: 'N/A' }
  }
];

export const MOCK_CREATORS: Creator[] = [
  {
    id: 'creator-1',
    nickname: 'NINJA_X',
    name: 'Tariq Al-Fahad',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600&h=800',
    platforms: [
      { type: 'twitch', url: '#', handle: '@ninja_x' },
      { type: 'youtube', url: '#', handle: 'NinjaX' },
      { type: 'twitter', url: '#', handle: '@ninja_x' }
    ],
    metrics: {
      followers: '1.2M',
      totalReach: '2.5M+'
    },
    focus: 'Streaming / Gameplay'
  },
  {
    id: 'creator-2',
    nickname: 'LUNA',
    name: 'Aisha Rahman',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600&h=800',
    platforms: [
      { type: 'youtube', url: '#', handle: 'LunaPlays' },
      { type: 'tiktok', url: '#', handle: '@luna_rahman' },
      { type: 'instagram', url: '#', handle: '@luna.rahman' }
    ],
    metrics: {
      followers: '850K',
      totalReach: '1.8M+'
    },
    focus: 'Entertainment / Commentary'
  },
  {
    id: 'creator-3',
    nickname: 'VORTEX_CC',
    name: 'Omar Khalid',
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600&h=800',
    platforms: [
      { type: 'twitch', url: '#', handle: '@vortex_cc' },
      { type: 'twitter', url: '#', handle: '@vortex_cc' }
    ],
    metrics: {
      followers: '450K',
      totalReach: '900K+'
    },
    focus: 'Gameplay / Strategy'
  },
  {
    id: 'creator-4',
    nickname: 'NOVA_MEDIA',
    name: 'Sarah Chen',
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600&h=800',
    platforms: [
      { type: 'youtube', url: '#', handle: 'NovaMedia' },
      { type: 'instagram', url: '#', handle: '@nova_media' }
    ],
    metrics: {
      followers: '2.1M',
      totalReach: '4.2M+'
    },
    focus: 'Entertainment / Lifestyle'
  }
];

export const MOCK_EVENTS: Event[] = [
  {
    id: 'e1',
    title: 'VCT GLOBAL FINALS 2026',
    game: 'VALORANT',
    date: '2026-10-12',
    time: '18:00',
    type: 'TOURNAMENT',
    location: 'TOKYO, JP',
    prizePool: '$1,000,000',
    status: 'LIVE',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800&h=450'
  },
  {
    id: 'e2',
    title: 'THE INTERNATIONAL 2026',
    game: 'DOTA 2',
    date: '2026-11-05',
    time: '14:00',
    type: 'TOURNAMENT',
    location: 'COPENHAGEN, DK',
    prizePool: '$18,000,000',
    status: 'UPCOMING',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800&h=450'
  },
  {
    id: 'e3',
    title: 'GEEKAY CHALLENGERS Q1',
    game: 'VALORANT',
    date: '2026-01-22',
    time: '20:00',
    type: 'MATCH',
    location: 'DUBAI, UAE',
    prizePool: '$50,000',
    status: 'FINISHED',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800&h=450'
  },
  {
    id: 'e4',
    title: 'PRO LEAGUE SEASON 12',
    game: 'CS2',
    date: '2026-02-15',
    time: '19:00',
    type: 'MATCH',
    location: 'STOCKHOLM, SE',
    prizePool: '$250,000',
    status: 'FINISHED',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800&h=450'
  },
  {
    id: 'e5',
    title: 'SUMMER MASTERS INVITATIONAL',
    game: 'VALORANT',
    date: '2026-06-08',
    time: '16:00',
    type: 'TOURNAMENT',
    location: 'PARIS, FR',
    prizePool: '$500,000',
    status: 'UPCOMING',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800&h=450'
  },
  {
    id: 'e6',
    title: 'MENA REGIONAL SHOWDOWN',
    game: 'DOTA 2',
    date: '2026-07-20',
    time: '12:00',
    type: 'MATCH',
    location: 'RIYADH, SA',
    prizePool: '$100,000',
    status: 'UPCOMING',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800&h=450'
  },
  {
    id: 'e7',
    title: 'GRAND SLAM FINALS',
    game: 'CS2',
    date: '2026-12-18',
    time: '21:00',
    type: 'TOURNAMENT',
    location: 'NEW YORK, USA',
    prizePool: '$2,000,000',
    status: 'UPCOMING',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800&h=450'
  },
  {
    id: 'e8',
    title: 'RLCS MAJOR 1',
    game: 'RL',
    date: '2026-02-10',
    time: '17:00',
    type: 'TOURNAMENT',
    location: 'LONDON, UK',
    prizePool: '$500,000',
    status: 'FINISHED',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800&h=450'
  },
  {
    id: 'e9',
    title: 'HOK INVITATIONAL',
    game: 'HOK',
    date: '2026-02-12',
    time: '15:00',
    type: 'MATCH',
    location: 'SHANGHAI, CN',
    prizePool: '$100,000',
    status: 'FINISHED',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800&h=450'
  },
  {
    id: 'e10',
    title: 'PUBG MOBILE GLOBAL',
    game: 'PUBG',
    date: '2026-02-18',
    time: '13:00',
    type: 'TOURNAMENT',
    location: 'BANGKOK, TH',
    prizePool: '$2,000,000',
    status: 'UPCOMING',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800&h=450'
  },
  {
    id: 'e11',
    title: 'VALORANT MASTERS',
    game: 'VAL',
    date: '2026-02-22',
    time: '19:00',
    type: 'TOURNAMENT',
    location: 'MADRID, ES',
    prizePool: '$500,000',
    status: 'UPCOMING',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800&h=450'
  },
  {
    id: 'e12',
    title: 'CS2 SHOWDOWN',
    game: 'CS2',
    date: '2026-02-22',
    time: '21:00',
    type: 'MATCH',
    location: 'ONLINE',
    prizePool: '$10,000',
    status: 'UPCOMING',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800&h=450'
  },
  {
    id: 'e13',
    title: 'RL REGIONAL FINALS',
    game: 'RL',
    date: '2026-02-22',
    time: '23:00',
    type: 'MATCH',
    location: 'ONLINE',
    prizePool: '$25,000',
    status: 'UPCOMING',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800&h=450'
  }
];

export const MOCK_JOBS: Job[] = [
  { 
    id: 'j1', 
    slug: 'content-director',
    title: 'Content Director', 
    department: 'Creative', 
    location: 'Remote', 
    type: 'Remote',
    summary: 'We are looking for a visionary Content Director to lead our creative storytelling and brand narrative across all digital platforms.',
    responsibilities: [
      'Define and execute the global content strategy for Geekay 2026.',
      'Lead a team of designers, editors, and creators to produce world-class esports content.',
      'Oversee the production of high-impact video series and documentaries.',
      'Collaborate with the marketing team to ensure brand consistency across all channels.',
      'Analyze content performance and optimize for engagement and reach.'
    ],
    requirements: [
      '5+ years of experience in creative direction or content management.',
      'Deep understanding of the esports and gaming landscape.',
      'Proven track record of building and scaling digital audiences.',
      'Strong leadership and project management skills.',
      'Excellent communication and storytelling abilities.'
    ],
    niceToHave: [
      'Experience working with professional esports teams.',
      'Background in video production or motion design.',
      'Knowledge of the MENA gaming market.'
    ],
    benefits: [
      'Competitive salary and performance bonuses.',
      'Remote-first work environment.',
      'Access to elite industry events and networks.',
      'Professional development and career acceleration.'
    ]
  },
  { 
    id: 'j2', 
    slug: 'senior-motion-designer',
    title: 'Senior Motion Designer', 
    department: 'Production', 
    location: 'Dubai, UAE', 
    type: 'On-site',
    summary: 'Join our production team to create high-end motion graphics and visual effects that define the Geekay aesthetic.',
    responsibilities: [
      'Create dynamic motion graphics for social media, broadcasts, and live events.',
      'Develop visual identities for new team rosters and tournament series.',
      'Collaborate with video editors to enhance storytelling through VFX.',
      'Stay ahead of design trends and implement cutting-edge techniques.',
      'Maintain and evolve the Geekay 2026 brand guidelines.'
    ],
    requirements: [
      'Expertise in After Effects, Cinema 4D, and the Adobe Creative Suite.',
      'Strong portfolio showcasing high-end motion design work.',
      'Ability to work in a fast-paced, high-intensity environment.',
      'Excellent eye for timing, rhythm, and typography.',
      '3+ years of professional design experience.'
    ],
    benefits: [
      'State-of-the-art workstation and hardware.',
      'Health insurance and wellness programs.',
      'Relocation assistance to Dubai.',
      'Opportunity to work on global esports broadcasts.'
    ]
  },
  { 
    id: 'j3', 
    slug: 'social-media-manager',
    title: 'Social Media Manager', 
    department: 'Marketing', 
    location: 'Remote', 
    type: 'Hybrid',
    summary: 'We need a Social Media Manager who lives and breathes esports to manage our community and grow our digital footprint.',
    responsibilities: [
      'Manage daily posting and community engagement across X, Instagram, and TikTok.',
      'Develop and execute social media campaigns for match days and announcements.',
      'Monitor social trends and implement real-time engagement strategies.',
      'Coordinate with players and creators for social content capture.',
      'Report on social metrics and community sentiment.'
    ],
    requirements: [
      'Deep knowledge of Valorant, Dota 2, and CS2 pro scenes.',
      'Experience managing large-scale social media accounts.',
      'Strong copywriting skills with a focus on gaming culture.',
      'Ability to work flexible hours during major tournaments.',
      'Data-driven mindset with experience in social analytics.'
    ],
    benefits: [
      'Flexible working hours.',
      'Performance-based growth opportunities.',
      'Inclusive and high-performance team culture.',
      'Direct impact on the MENA esports ecosystem.'
    ]
  }
];

export const MOCK_NEWS: NewsItem[] = [
  {
    id: 'n1',
    slug: 'international-qualifications-2026',
    title: 'GEEKAY SECURES SPOT IN INTERNATIONAL CHAMPIONSHIP QUALIFIERS',
    category: 'TOURNAMENT',
    date: 'FEB 26, 2026',
    readTime: '5 MIN READ',
    excerpt: 'After a dominant regional run, our elite squads have officially qualified for the global stage in London.',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200&h=800',
    content: 'Full article content for international qualifications...'
  },
  {
    id: 'n2',
    slug: 'rl-decals-launch-2026',
    title: 'OFFICIAL GEEKAY ROCKET LEAGUE DECALS NOW AVAILABLE IN-GAME',
    category: 'ANNOUNCEMENT',
    date: 'FEB 24, 2026',
    readTime: '3 MIN READ',
    excerpt: 'Represent the pride of MENA on the pitch. The 2026 GEEKAY decal collection is now live in the Rocket League item shop.',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=1200&h=800',
    content: 'Full article content for RL decals launch...'
  },
  {
    id: 'n3',
    slug: 'major-roster-announcement-2026',
    title: 'MAJOR ROSTER UPDATE: GEEKAY REVEALS NEW TALENT FOR 2026 SEASON',
    category: 'ROSTER',
    date: 'FEB 22, 2026',
    readTime: '4 MIN READ',
    excerpt: 'Strategic reinforcements have arrived. Meet the new operatives joining our championship-winning divisions.',
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=1200&h=800',
    content: 'Full article content for major roster announcement...'
  }
];
