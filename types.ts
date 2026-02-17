
export interface PlayerAchievement {
  year: string;
  title: string;
}

export interface PlayerTimelineEvent {
  year: string;
  event: string;
}

export interface Player {
  id: string;
  name: string;
  nickname: string;
  role: string;
  photo: string;
  bio: string;
  stats: {
    kd: number;
    mvps: number;
    tournaments: number;
    winRate: string;
  };
  achievements?: PlayerAchievement[];
  timeline?: PlayerTimelineEvent[];
  socials: {
    twitter?: string;
    twitch?: string;
    instagram?: string;
  };
}

export interface Trophy {
  id: string;
  title: string;
  year: string;
  rank: string;
}

export interface Team {
  id: string;
  name: string;
  game: string;
  logo: string;
  banner: string;
  achievements: string[];
  trophies?: Trophy[];
  players: Player[];
  stats?: {
    winRate: string;
    rank: string;
    earnings: string;
    championships: number;
    globalEvents: number;
    seasonRecord: string;
  };
  bio?: string;
}

export interface Event {
  id: string;
  title: string;
  game: string;
  date: string;
  location: string;
  prizePool: string;
  status: 'LIVE' | 'UPCOMING' | 'FINISHED';
  image: string;
}

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
}
