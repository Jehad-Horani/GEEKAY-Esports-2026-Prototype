
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronLeft,
  X, 
  Trophy as TrophyIcon, 
  Twitter, 
  Twitch, 
  Instagram, 
  Youtube,
  Activity, 
  Shield,
  Layers,
  Target,
  ExternalLink,
  Award,
  Globe
} from 'lucide-react';
import { MOCK_TEAMS, MOCK_CREATORS } from '../constants';
import { Player, Team, Trophy, Creator } from '../types';
import ArenaButton from '../components/ui/ArenaButton';

// --- Redesigned Player Detail Modal (UI/UX Friendly) ---

const PlayerModal: React.FC<{ player: Player, onClose: () => void }> = ({ player, onClose }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-[#040E1E]/95 backdrop-blur-xl"
    onClick={onClose}
  >
    <motion.div 
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0, y: 20 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="bg-[#0B1C2D] border border-slate-800 w-full max-w-lg relative overflow-hidden shadow-2xl rounded-2xl flex flex-col max-h-[90vh]"
      onClick={e => e.stopPropagation()}
    >
      {/* Close Button */}
      <button onClick={onClose} className="absolute top-4 right-4 z-[160] text-white/40 hover:text-[#FFC400] transition-all p-2 bg-black/20 rounded-full backdrop-blur-md">
        <X size={24} />
      </button>

      {/* Header: Visual */}
      <div className="relative h-[420px] sm:h-[450px] md:h-[480px] overflow-hidden">
        <img 
          src={player.photo} 
          alt={player.nickname} 
          className="w-full h-full object-cover object-[50%_14%] sm:object-[50%_12%] md:object-[50%_10%]" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1C2D] via-transparent to-transparent" />
        <div className="absolute bottom-6 left-8">
          <h2 className="font-syncopate text-4xl font-black text-white uppercase tracking-tighter">{player.nickname}</h2>
          <p className="text-slate-400 font-syncopate text-[10px] tracking-widest uppercase mt-1">{player.role}</p>
        </div>
      </div>

      {/* Content: Intel */}
      <div className="p-8 flex flex-col overflow-y-auto custom-scrollbar">
        {/* Basic Info Grid */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="space-y-1">
            <p className="text-white font-bold text-sm">{player.name}</p>
          </div>
          <div className="flex gap-6">
            <div className="space-y-1">
              <p className="text-white font-bold text-sm">{player.age || '22'}</p>
            </div>
            <div className="space-y-1">
              <p className="text-white font-bold text-sm">{player.nationality || 'GLOBAL'}</p>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-8 p-4 bg-white/5 rounded-xl border border-white/5">
          <p className="text-slate-300 text-sm leading-relaxed font-inter italic">
            "{player.bio}"
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 text-center">
            <span className="text-xl font-syncopate font-black text-white">{player.stats.kd}</span>
          </div>
          <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 text-center">
            <span className="text-xl font-syncopate font-black text-[#FFC400]">{player.stats.winRate}</span>
          </div>
          <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 text-center">
            <span className="text-xl font-syncopate font-black text-white">{player.stats.mvps}</span>
          </div>
        </div>

        {/* Achievements */}
        {player.achievements && player.achievements.length > 0 && (
          <div className="mb-8">
            <div className="space-y-2">
              {player.achievements.slice(0, 3).map((ach, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
                  <Award size={16} className="text-[#FFC400]" />
                  <span className="text-white text-[10px] font-bold uppercase tracking-tight">{ach.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer: Socials & Action */}
        <div className="mt-auto pt-6 border-t border-slate-800 flex items-center justify-between">
          <div className="flex gap-4">
            {player.socials.twitter && <a href={player.socials.twitter} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-[#FFC400] transition-all"><Twitter size={20} /></a>}
            {player.socials.twitch && <a href={player.socials.twitch} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-[#FFC400] transition-all"><Twitch size={20} /></a>}
            {player.socials.instagram && <a href={player.socials.instagram} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-[#FFC400] transition-all"><Instagram size={20} /></a>}
          </div>
          <button className="bg-[#FFC400] text-black px-6 py-2 rounded-full font-syncopate text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all">
            FOLLOW
          </button>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

// --- Achievement Card Component ---

const TrophyCard: React.FC<{ trophy: Trophy, index: number }> = ({ trophy, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ y: -5, borderColor: '#FFC400' }}
    className="bg-[#081B3A] border border-slate-800 p-8 flex flex-col items-center text-center group transition-all duration-500"
  >
    <div className="mb-6 relative">
       <div className="absolute inset-0 bg-[#FFC400]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
       <Award size={48} className="text-[#FFC400] relative z-10" />
    </div>
    <span className="text-slate-500 font-syncopate text-[9px] tracking-[0.4em] mb-2 uppercase">{trophy.year}</span>
    <h4 className="font-syncopate text-sm font-black text-white mb-4 tracking-tighter uppercase leading-tight h-10 flex items-center">{trophy.title}</h4>
    <div className="bg-[#FFC400] text-black px-4 py-1 font-syncopate text-[10px] font-black skew-x-[-15deg]">
       <span className="block skew-x-[15deg]">{trophy.rank}</span>
    </div>
  </motion.div>
);

// --- Main Team Detail Component ---

const TeamDetail: React.FC<{ team: Team, onBack: () => void }> = ({ team, onBack }) => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="bg-[#0B1C2D] pb-32 relative"
    >
      {/* 🎬 MINIMAL CENTERED HEADER */}
      <div className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10 }}
          src={team.banner} 
          alt={team.name} 
          className="w-full h-full object-cover grayscale brightness-[0.4]" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1C2D] via-[#0B1C2D]/40 to-transparent" />
        <div className="absolute inset-0 bg-grid opacity-10" />

        {/* Back Button */}
        <button 
          onClick={onBack}
          className="absolute top-24 left-8 z-50 flex items-center gap-2 text-white/60 hover:text-[#FFC400] transition-all font-syncopate text-[10px] font-black uppercase tracking-[0.4em] group"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>← PREVIOUS</span>
        </button>

        {/* Centered Team Name */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-syncopate text-6xl md:text-[120px] font-black text-white uppercase tracking-tighter text-center px-6"
          >
            {team.name}
          </motion.h1>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-6">
        
        {/* 👥 ROSTER SECTION */}
        <section className="py-32">
          <div className="flex items-end justify-between mb-16">
            <div>
              <h2 className="font-syncopate text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">ACTIVE ROSTER</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {team.players.map(player => (
              <div 
                key={player.id}
                className="group relative aspect-[3/4] overflow-hidden bg-slate-900 border border-slate-800 transition-all duration-300"
              >
                <img src={player.photo} alt={player.nickname} className="w-full h-full object-cover grayscale transition-transform duration-500 group-hover:scale-[1.05] group-hover:grayscale-0" />
                
                {/* Default State: IGN */}
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 group-hover:opacity-0">
                  <h3 className="font-syncopate text-3xl font-black text-white uppercase tracking-tighter">{player.nickname}</h3>
                </div>

                {/* Hover State: Overlay */}
                <div className="absolute inset-0 bg-[#0B1C2D]/90 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-8">
                  {/* Diagonal Cut Background Accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFC400]/10 skew-x-[-45deg] translate-x-16 -translate-y-16" />
                  
                  <div className="relative z-10 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-6 h-[1px] bg-[#FFC400]" />
                      <span className="text-[#FFC400] font-syncopate text-[9px] tracking-[0.4em] font-black uppercase">{player.role}</span>
                    </div>
                    <h3 className="font-syncopate text-3xl font-black text-white uppercase mb-1 tracking-tighter">{player.nickname}</h3>
                    <p className="text-slate-400 font-syncopate text-[10px] tracking-widest uppercase mb-6">{player.name} // {player.age || '22'} // {player.nationality || 'MENA'}</p>
                    
                    {player.achievements && player.achievements.length > 0 && (
                      <div className="mb-8">
                        <ul className="space-y-2">
                          {player.achievements.slice(0, 2).map((ach, i) => (
                            <li key={i} className="text-slate-300 text-[9px] flex items-center gap-3 font-medium">
                              <div className="w-1 h-1 bg-[#FFC400]" />
                              {ach.title}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex items-center gap-5 pt-6 border-t border-white/10">
                      {player.socials.twitter && <Twitter size={18} className="text-slate-400 hover:text-[#FFC400] transition-all hover:scale-110" />}
                      {player.socials.twitch && <Twitch size={18} className="text-slate-400 hover:text-[#FFC400] transition-all hover:scale-110" />}
                      {player.socials.instagram && <Instagram size={18} className="text-slate-400 hover:text-[#FFC400] transition-all hover:scale-110" />}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 🏆 ACHIEVEMENT HALL SECTION */}
        <section className="py-32 border-t border-slate-800/50">
          <div className="flex items-end justify-between mb-16">
            <div>
              <h2 className="font-syncopate text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">ACHIEVEMENTS</h2>
            </div>
            <div className="hidden lg:block h-[1px] flex-grow mx-20 bg-slate-800" />
            <TrophyIcon size={40} className="text-slate-700" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {team.trophies?.map((trophy, idx) => (
              <TrophyCard key={trophy.id} trophy={trophy} index={idx} />
            )) || (
              <div className="col-span-full py-12 text-center border border-dashed border-slate-800 text-slate-600 font-syncopate text-xs tracking-widest">
                NO REGISTERED TROPHIES FOR THIS UNIT
              </div>
            )}
          </div>
        </section>
      </div>
    </motion.div>
  );
};

// --- Main Teams Listing Components ---

const RadarPulse = () => (
  <motion.div
    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    className="w-12 h-12 border-2 border-[#FFC400] rounded-full flex items-center justify-center"
  >
    <div className="w-2 h-2 bg-[#FFC400] rounded-full" />
  </motion.div>
);

const DivisionCard: React.FC<{ team: Team; onClick: () => void; index: number }> = ({ team, onClick, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      whileHover={{ y: -6 }}
      onClick={onClick}
      className="group relative aspect-[4/5] bg-slate-900 border border-slate-800 overflow-hidden cursor-pointer rounded-none transition-all duration-300 hover:border-[#FFC400] hover:shadow-[0_0_30px_rgba(255,196,0,0.15)]"
    >
      <img
        src={team.banner}
        alt={team.name}
        className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#040E1E] via-[#040E1E]/60 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-300" />
      
      <div className="absolute top-6 left-6 flex flex-col gap-2">
        <div className="bg-[#FFC400] text-black px-3 py-1 font-syncopate text-[9px] font-black tracking-widest uppercase inline-block w-max">
          {team.game}
        </div>
        {team.region && (
          <div className="bg-white/10 backdrop-blur-sm text-white px-3 py-1 font-syncopate text-[9px] font-bold tracking-widest uppercase inline-block w-max border border-white/10">
            {team.region}
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end">
        <h3 className="font-syncopate text-2xl md:text-3xl font-black text-white uppercase tracking-tighter leading-none mb-4">
          {team.name}
        </h3>
        
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex flex-col">
            <span className="text-white font-syncopate text-[9px] font-bold uppercase">{team.league || 'PRO DIVISION'}</span>
          </div>
          <div className="flex items-center gap-2 text-[#FFC400] font-syncopate text-[8px] font-black tracking-widest group-hover:gap-3 transition-all">
            <span>VIEW TEAM</span>
            <ChevronRight size={12} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const CreatorCard: React.FC<{ creator: Creator; index: number }> = ({ creator, index }) => {
  const getPlatformIcon = (type: string) => {
    switch (type) {
      case 'youtube': return <Youtube size={16} />;
      case 'twitch': return <Twitch size={16} />;
      case 'twitter': return <Twitter size={16} />;
      case 'instagram': return <Instagram size={16} />;
      case 'tiktok': return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.6-4.12-1.31a6.417 6.417 0 0 1-1.87-1.55v7.64c-.03 2.34-.84 4.64-2.6 6.12-1.35 1.15-3.11 1.81-4.88 1.87-2.32.14-4.79-.92-6.07-2.84-1.21-1.88-1.16-4.5.43-6.16 1.14-1.18 2.86-1.77 4.47-1.61v4.02c-.69-.06-1.47.11-2.01.54-.54.43-.77 1.18-.57 1.85.17.75.95 1.29 1.71 1.25.75-.02 1.4-.65 1.44-1.39.03-3.3.02-6.6.03-9.91V0h.07z"/>
        </svg>
      );
      default: return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className="group relative aspect-[3/4] bg-slate-900 border border-slate-800 overflow-hidden cursor-pointer rounded-none transition-all duration-300 hover:border-[#FFC400] hover:shadow-[0_0_30px_rgba(255,196,0,0.15)]"
    >
      <img
        src={creator.photo}
        alt={creator.nickname}
        className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-transform duration-300 group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#040E1E] via-[#040E1E]/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300" />
      
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <h3 className="font-syncopate text-3xl font-black text-white uppercase mb-2 tracking-tighter">{creator.nickname}</h3>
        <p className="text-slate-400 font-syncopate text-[10px] tracking-widest uppercase mb-6">{creator.metrics.followers} FOLLOWERS</p>
        
        <div className="flex gap-4 mb-6 relative z-20">
          {creator.platforms.map((p, i) => (
            <div key={i} className="relative group/icon">
              <a 
                href={p.url} 
                target="_blank" 
                rel="noreferrer"
                className="text-slate-500 hover:text-[#FFC400] transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                {getPlatformIcon(p.type)}
              </a>
              {/* Floating Badge */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#FFC400] text-black text-[8px] font-black w-8 h-8 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(255,196,0,0.4)] opacity-0 scale-0 group-hover/icon:opacity-100 group-hover/icon:scale-100 transition-all duration-300 pointer-events-none z-30 border border-black/10">
                +3K
              </div>
            </div>
          ))}
        </div>

        <div className="h-0 overflow-hidden group-hover:h-auto opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out">
          <div className="pt-4 border-t border-white/10 space-y-4">
            <div>
              <p className="text-[#FFC400] font-syncopate text-sm font-black uppercase">{creator.metrics.totalReach}</p>
            </div>
            <div>
              <p className="text-white text-[10px] font-bold uppercase leading-tight">{creator.focus}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Teams = () => {
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);

  const selectedTeam = useMemo(() => 
    MOCK_TEAMS.find(t => t.id === selectedTeamId) || null,
    [selectedTeamId]
  );

  return (
    <div className="min-h-screen bg-[#0B1C2D] selection:bg-[#FFC400] selection:text-black">
      <AnimatePresence mode="wait">
        {!selectedTeam ? (
          <motion.div 
            key="war-room-listing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* ⚔ DIVISION GRID — “ACTIVE TEAMS” */}
            <section className="py-24 md:py-32 px-6 bg-[#0B1C2D] relative border-b border-white/5">
              <div className="max-w-screen-2xl mx-auto">
                <div className="mb-16 flex items-end justify-between">
                  <div className="max-w-2xl">
                    <h2 className="font-syncopate text-4xl md:text-7xl font-bold uppercase tracking-tighter text-white leading-[0.85]">
                      ACTIVE <br /> <span className="text-[#FFC400]">TEAMS</span>
                    </h2>
                  </div>
                  <div className="hidden md:block h-[1px] flex-grow mx-20 bg-slate-800" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {MOCK_TEAMS.map((team, idx) => (
                    <DivisionCard 
                      key={team.id} 
                      team={team} 
                      index={idx} 
                      onClick={() => setSelectedTeamId(team.id)} 
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* 🎬 CONTENT CREATORS SECTION */}
            <section className="py-32 md:py-60 px-6 bg-[#0B1C2D] relative border-b border-white/5">
              <div className="max-w-screen-2xl mx-auto">
                <div className="mb-24">
                  <h2 className="font-syncopate text-4xl md:text-7xl font-bold uppercase tracking-tighter text-white leading-[0.85] mb-6">
                    CONTENT <br /> <span className="text-[#FFC400]">CREATORS</span>
                  </h2>
                  <p className="text-slate-400 font-inter text-xl font-light tracking-wide max-w-2xl uppercase">
                    Creators representing the Geekay brand across platforms.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {MOCK_CREATORS.map((creator, idx) => (
                    <CreatorCard key={creator.id} creator={creator} index={idx} />
                  ))}
                </div>
              </div>
            </section>
          </motion.div>
        ) : (
          <TeamDetail 
            key="team-detail-view"
            team={selectedTeam} 
            onBack={() => {
              setSelectedTeamId(null);
              window.scrollTo(0, 0);
            }} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Teams;
