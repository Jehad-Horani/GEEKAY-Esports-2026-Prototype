
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
      <div className="relative h-64 overflow-hidden">
        <img 
          src={player.photo} 
          alt={player.nickname} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1C2D] via-transparent to-transparent" />
        <div className="absolute bottom-6 left-8">
          <span className="text-[#FFC400] font-syncopate text-[8px] tracking-[0.4em] font-black uppercase mb-1 block">OPERATIVE</span>
          <h2 className="font-syncopate text-4xl font-black text-white uppercase tracking-tighter">{player.nickname}</h2>
          <p className="text-slate-400 font-syncopate text-[10px] tracking-widest uppercase mt-1">{player.role}</p>
        </div>
      </div>

      {/* Content: Intel */}
      <div className="p-8 flex flex-col overflow-y-auto custom-scrollbar">
        {/* Basic Info Grid */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="space-y-1">
            <span className="text-slate-500 font-syncopate text-[8px] tracking-widest block uppercase">FULL_NAME</span>
            <p className="text-white font-bold text-sm">{player.name}</p>
          </div>
          <div className="flex gap-6">
            <div className="space-y-1">
              <span className="text-slate-500 font-syncopate text-[8px] tracking-widest block uppercase">AGE</span>
              <p className="text-white font-bold text-sm">{player.age || '22'}</p>
            </div>
            <div className="space-y-1">
              <span className="text-slate-500 font-syncopate text-[8px] tracking-widest block uppercase">ORIGIN</span>
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
            <span className="text-slate-500 font-syncopate text-[7px] tracking-widest block mb-1 uppercase">K/D</span>
            <span className="text-xl font-syncopate font-black text-white">{player.stats.kd}</span>
          </div>
          <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 text-center">
            <span className="text-slate-500 font-syncopate text-[7px] tracking-widest block mb-1 uppercase">WIN%</span>
            <span className="text-xl font-syncopate font-black text-[#FFC400]">{player.stats.winRate}</span>
          </div>
          <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 text-center">
            <span className="text-slate-500 font-syncopate text-[7px] tracking-widest block mb-1 uppercase">MVPS</span>
            <span className="text-xl font-syncopate font-black text-white">{player.stats.mvps}</span>
          </div>
        </div>

        {/* Achievements */}
        {player.achievements && player.achievements.length > 0 && (
          <div className="mb-8">
            <span className="text-slate-500 font-syncopate text-[8px] tracking-widest block mb-4 uppercase">ACHIEVEMENTS</span>
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
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

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
      {/* 🎬 TACTICAL HEADER BAR (NEAT INTEGRATION) */}
      <div className="bg-[#0B1C2D] border-b border-white/5 px-6 md:px-12 py-8 relative z-[80]">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-4 bg-[#FFC400] px-8 py-4 text-black hover:bg-white transition-all font-syncopate text-[11px] font-black uppercase tracking-[0.4em] skew-x-[-15deg] group shadow-[0_0_30px_rgba(255,196,0,0.2)]"
          >
            <div className="skew-x-[15deg] flex items-center gap-3">
              <ChevronLeft size={18} className="group-hover:scale-125 group-hover:-translate-x-1 transition-all" /> 
              <span>EXIT_DIVISION</span>
            </div>
          </button>

          <div className="hidden md:flex items-center gap-12">
            <div className="flex flex-col items-end">
              <span className="text-slate-500 font-syncopate text-[9px] tracking-[0.5em] uppercase mb-2">CURRENT_SECTOR</span>
              <span className="text-white font-syncopate text-sm font-black uppercase tracking-widest">{team.name} // {team.game}</span>
            </div>
            <div className="w-[1px] h-12 bg-slate-800" />
            <div className="flex items-center gap-6">
               <div className="w-3 h-3 bg-[#FFC400] rounded-full animate-pulse shadow-[0_0_15px_rgba(255,196,0,0.5)]" />
               <span className="text-[#FFC400] font-syncopate text-[10px] font-black tracking-[0.3em] uppercase">LIVE_STATUS_ACTIVE</span>
            </div>
          </div>
        </div>
      </div>

      {/* 🎬 CINEMATIC HERO */}
      <div className="relative h-[75vh] min-h-[650px] overflow-hidden">
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

        <div className="absolute bottom-24 left-6 md:left-12 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-[#FFC400] text-black px-3 py-1 font-syncopate text-[10px] font-black tracking-widest uppercase inline-block">
                {team.game}
              </span>
            </div>

            <h1 className="font-syncopate text-6xl md:text-[140px] font-black text-white mb-6 leading-none tracking-tighter uppercase drop-shadow-2xl">
              {team.name}
            </h1>
            
            <div className="flex items-center gap-6 mb-12">
              <div className="h-[2px] w-16 bg-[#FFC400]" />
              <p className="text-slate-300 font-inter text-xl font-light tracking-wide">
                {team.bio || "Elite performance unit operating at the highest level."}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-12 items-center bg-[#0B1C2D]/60 backdrop-blur-2xl p-10 border border-white/5 inline-flex shadow-2xl">
              <div className="flex flex-col">
                <span className="text-slate-500 font-syncopate text-[9px] tracking-widest mb-2 uppercase">REGION</span>
                <span className="font-syncopate font-black text-[#FFC400] text-4xl">{team.region || 'GLOBAL'}</span>
              </div>
              <div className="h-16 w-[1px] bg-slate-800" />
              <div className="flex flex-col">
                <span className="text-slate-500 font-syncopate text-[9px] tracking-widest mb-2 uppercase">LEAGUE</span>
                <span className="font-syncopate font-black text-white text-4xl">{team.league || 'PRO DIVISION'}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-6">
        
        {/* 🏆 ACHIEVEMENT HALL SECTION */}
        <section className="py-32 border-b border-slate-800/50">
          <div className="flex items-end justify-between mb-16">
            <div>
              <span className="text-[#FFC400] font-syncopate text-[10px] tracking-[0.6em] font-bold mb-4 block uppercase">HALL_OF_FAME</span>
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

        {/* 👥 ROSTER SECTION */}
        <section className="py-32">
          <div className="flex items-end justify-between mb-16">
            <div>
              <span className="text-[#FFC400] font-syncopate text-[10px] tracking-[0.6em] font-bold mb-4 block uppercase">ACTIVE_OPERATIVES</span>
              <h2 className="font-syncopate text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">ACTIVE ROSTER</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {team.players.map(player => (
              <motion.div 
                key={player.id}
                onClick={() => setSelectedPlayer(player)}
                className="group relative aspect-[3/4] overflow-hidden cursor-pointer bg-slate-900 border border-slate-800 hover:border-[#FFC400] transition-all duration-300"
              >
                <img src={player.photo} alt={player.nickname} className="w-full h-full object-cover grayscale transition-transform duration-500 group-hover:scale-[1.03]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1C2D] via-[#0B1C2D]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-6 h-[1px] bg-[#FFC400]" />
                    <span className="text-[#FFC400] font-syncopate text-[9px] tracking-[0.4em] font-black block uppercase">{player.role}</span>
                  </div>
                  <h3 className="font-syncopate text-3xl font-black text-white uppercase mb-4 tracking-tighter">{player.nickname}</h3>
                  
                  <div className="h-0 overflow-hidden group-hover:h-auto opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                    <div className="grid grid-cols-2 gap-6 mb-6 pt-4 border-t border-white/10">
                      <div>
                        <span className="text-slate-500 font-syncopate text-[8px] tracking-widest block mb-1 uppercase">IDENTIFICATION</span>
                        <p className="text-white text-[10px] font-bold uppercase">{player.name}</p>
                      </div>
                      <div className="flex gap-4">
                        <div>
                          <span className="text-slate-500 font-syncopate text-[8px] tracking-widest block mb-1 uppercase">AGE</span>
                          <p className="text-white text-[10px] font-bold uppercase">{player.age || '22'}</p>
                        </div>
                        <div>
                          <span className="text-slate-500 font-syncopate text-[8px] tracking-widest block mb-1 uppercase">ORIGIN</span>
                          <p className="text-white text-[10px] font-bold uppercase">{player.nationality || 'MENA'}</p>
                        </div>
                      </div>
                    </div>
                    
                    {player.achievements && player.achievements.length > 0 && (
                      <div className="mb-8">
                        <span className="text-slate-500 font-syncopate text-[8px] tracking-widest block mb-3 uppercase">MISSION_SUCCESS_LOG</span>
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

                    <div className="flex items-center justify-between pt-6 border-t border-white/10">
                      <div className="flex gap-5">
                        {player.socials.twitter && <Twitter size={18} className="text-slate-400 hover:text-[#FFC400] transition-all hover:scale-110" />}
                        {player.socials.twitch && <Twitch size={18} className="text-slate-400 hover:text-[#FFC400] transition-all hover:scale-110" />}
                        {player.socials.instagram && <Instagram size={18} className="text-slate-400 hover:text-[#FFC400] transition-all hover:scale-110" />}
                      </div>
                      <div className="flex items-center gap-2 text-[#FFC400] font-syncopate text-[8px] font-black tracking-widest">
                        <span>VIEW_DOSSIER</span>
                        <ChevronRight size={14} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      <AnimatePresence>
        {selectedPlayer && <PlayerModal player={selectedPlayer} onClose={() => setSelectedPlayer(null)} />}
      </AnimatePresence>
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
            <span className="text-slate-500 font-syncopate text-[7px] tracking-widest uppercase mb-1">LEAGUE</span>
            <span className="text-white font-syncopate text-[9px] font-bold uppercase">{team.league || 'PRO DIVISION'}</span>
          </div>
          <div className="flex items-center gap-2 text-[#FFC400] font-syncopate text-[8px] font-black tracking-widest group-hover:gap-3 transition-all">
            <span>ENTER_SECTOR</span>
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
        <div className="flex items-center gap-3 mb-2">
          <div className="w-6 h-[1px] bg-[#FFC400]" />
          <span className="text-[#FFC400] font-syncopate text-[9px] tracking-[0.4em] font-black block uppercase">CREATOR</span>
        </div>
        <h3 className="font-syncopate text-3xl font-black text-white uppercase mb-2 tracking-tighter">{creator.nickname}</h3>
        <p className="text-slate-400 font-syncopate text-[10px] tracking-widest uppercase mb-6">{creator.metrics.followers} FOLLOWERS</p>
        
        <div className="flex gap-4 mb-6 relative z-20">
          {creator.platforms.map((p, i) => (
            <a 
              key={i} 
              href={p.url} 
              target="_blank" 
              rel="noreferrer"
              className="text-slate-500 hover:text-[#FFC400] transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              {getPlatformIcon(p.type)}
            </a>
          ))}
        </div>

        <div className="h-0 overflow-hidden group-hover:h-auto opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out">
          <div className="pt-4 border-t border-white/10 space-y-4">
            <div>
              <span className="text-slate-500 font-syncopate text-[8px] tracking-widest block mb-1 uppercase">TOTAL_REACH</span>
              <p className="text-[#FFC400] font-syncopate text-sm font-black uppercase">{creator.metrics.totalReach}</p>
            </div>
            <div>
              <span className="text-slate-500 font-syncopate text-[8px] tracking-widest block mb-1 uppercase">CONTENT_FOCUS</span>
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
            {/* 🔥 HERO SECTION — “ENTER THE DIVISIONS” */}
            <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-grid opacity-10" />
                <div className="absolute inset-0 bg-scanline opacity-20" />
                <div className="absolute inset-0 bg-[#0B1C2D]/80 z-0" />
                <motion.img 
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.3 }}
                  transition={{ duration: 1.5 }}
                  src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2000"
                  className="w-full h-full object-cover grayscale brightness-50 contrast-125"
                />
                <motion.div 
                  animate={{ x: [-100, 100, -100], y: [-50, 50, -50] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FFC400]/5 rounded-full blur-[150px]" 
                />
              </div>

              <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="flex flex-col items-start text-left">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                  >
                    <span className="font-syncopate text-[#FFC400] text-[10px] md:text-xs tracking-[0.8em] font-bold uppercase border-l-2 border-[#FFC400] pl-4">
                      DIVISION_ROSTER_V2.6
                    </span>
                  </motion.div>

                  <div className="overflow-hidden mb-8">
                    <motion.h1 
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.8, delay: 0.7, ease: "circOut" }}
                      className="font-syncopate text-white text-6xl md:text-[120px] font-black uppercase tracking-tighter leading-none"
                    >
                      ELITE <br /> DIVISIONS
                    </motion.h1>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.8 }}
                    className="max-w-xl"
                  >
                    <p className="text-white/40 font-syncopate text-xs md:text-xl tracking-[0.3em] uppercase leading-loose mb-12">
                      Competing across global competitive titles with relentless precision. <br />
                      Global Ranking: <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }} className="text-[#FFC400] font-black">SUPERIOR</motion.span>
                    </p>
                  </motion.div>
                </div>

                <div className="hidden lg:flex justify-end pr-12">
                   <div className="relative w-96 h-96">
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border border-[#FFC400]/20 rounded-full"
                      />
                      <motion.div 
                        animate={{ rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-10 border border-[#FFC400]/10 rounded-full"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                         <Shield size={120} className="text-[#FFC400]/30 animate-pulse" />
                      </div>
                   </div>
                </div>
              </div>

              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40">
                <RadarPulse />
                <span className="font-syncopate text-[8px] tracking-[0.4em] uppercase font-bold text-white/50">ENGAGE_UNITS</span>
              </div>
            </section>

            {/* ⚔ DIVISION GRID — “ACTIVE UNITS” */}
            <section className="py-32 md:py-60 px-6 bg-[#040E1E] relative border-y border-white/5">
              <div className="max-w-screen-2xl mx-auto">
                <div className="mb-24 flex items-end justify-between">
                  <div className="max-w-2xl">
                    <span className="text-[#FFC400] font-syncopate text-[10px] tracking-[0.6em] font-bold mb-4 block uppercase">UNIT_CLASSIFICATION</span>
                    <h2 className="font-syncopate text-4xl md:text-7xl font-bold uppercase tracking-tighter text-white leading-[0.85]">
                      ACTIVE <br /> <span className="text-[#FFC400]">UNITS</span>
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
                  <span className="text-[#FFC400] font-syncopate text-[10px] tracking-[0.6em] font-bold mb-4 block uppercase">MEDIA UNIT</span>
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

            {/* 🌍 SECTION — “GLOBAL FOOTPRINT” */}
            <section className="py-40 md:py-80 px-6 bg-[#0B1C2D] relative overflow-hidden border-t border-white/5">
               <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none">
                  <Globe size={1400} className="absolute -right-1/3 -top-1/3 text-[#FFC400]" strokeWidth={0.2} />
               </div>
               
               <div className="max-w-screen-2xl mx-auto relative z-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                    <div className="lg:col-span-4 order-2 lg:order-1">
                      <div className="border border-slate-800 bg-[#040E1E]/60 backdrop-blur-xl p-10 relative">
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#FFC400] to-transparent" />
                        <span className="text-[#FFC400] font-syncopate text-[9px] tracking-[0.5em] font-bold mb-8 block uppercase">SECTOR_STATUS // LIVE</span>
                        <div className="space-y-10">
                          {[
                            { sector: 'MENA_CORE', loc: 'DUBAI', load: 'CRITICAL', uptime: '99.9%' },
                            { sector: 'ASIA_PAC', loc: 'TOKYO', load: 'NOMINAL', uptime: '100%' },
                            { sector: 'EURO_ZONE', loc: 'PARIS', load: 'NOMINAL', uptime: '99.8%' },
                            { sector: 'AMERICAS', loc: 'NYC', load: 'STANDBY', uptime: '100%' },
                          ].map((sec, i) => (
                            <motion.div 
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="group cursor-default"
                            >
                              <div className="flex justify-between items-end mb-3">
                                <span className="font-syncopate text-xs font-bold text-white group-hover:text-[#FFC400] transition-colors">{sec.sector}</span>
                                <span className="font-syncopate text-[8px] text-slate-500 font-bold">{sec.loc}</span>
                              </div>
                              <div className="h-1 w-full bg-slate-800 mb-2 overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  whileInView={{ width: sec.load === 'CRITICAL' ? '100%' : '60%' }}
                                  transition={{ duration: 1.5, delay: 0.5 }}
                                  className={`h-full ${sec.load === 'CRITICAL' ? 'bg-[#FFC400]' : 'bg-slate-500'}`}
                                />
                              </div>
                              <div className="flex justify-between font-mono text-[7px] text-slate-600 uppercase">
                                <span>LOAD: {sec.load}</span>
                                <span>UPTIME: {sec.uptime}</span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                        <div className="mt-16 pt-10 border-t border-slate-800 flex items-center gap-4">
                           <Layers size={20} className="text-[#FFC400]" />
                           <span className="font-syncopate text-[8px] tracking-[0.4em] font-bold text-white uppercase">VIEW_ALL_SECTOR_DATA</span>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-8 order-1 lg:order-2">
                       <div className="mb-20">
                          <span className="text-[#FFC400] font-syncopate text-[10px] tracking-[1em] font-bold mb-6 block uppercase">GLOBAL_FOOTPRINT</span>
                          <h2 className="font-syncopate text-5xl md:text-[140px] font-black uppercase tracking-tighter text-white leading-[0.8]">
                             BEYOND <br /> <span className="text-[#FFC400]">BORDERS.</span>
                          </h2>
                          <p className="mt-12 text-slate-400 font-inter text-2xl font-light leading-relaxed max-w-2xl uppercase tracking-wide">
                            WE OPERATE AT THE INTERSECTION OF ELITE PERFORMANCE AND GLOBAL ACCESSIBILITY. FROM THE DUBAI CORE TO THE WORLD STAGE.
                          </p>
                       </div>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-20">
                          {[
                            { label: "OPERATIONAL NODES", val: "24", sub: "SYNCED" },
                            { label: "GLOBAL REACH", val: "140M+", sub: "UNIQUE" },
                          ].map((stat, i) => (
                            <div key={i} className="p-12 border border-slate-800 bg-[#081B3A]/20">
                               <div className="font-syncopate text-[8px] text-[#FFC400] tracking-[0.5em] mb-4 uppercase">{stat.label}</div>
                               <div className="font-syncopate text-5xl md:text-7xl font-black text-white">{stat.val}</div>
                               <div className="font-syncopate text-[8px] text-slate-600 tracking-[0.4em] mt-4 font-bold uppercase">{stat.sub} // VERIFIED</div>
                            </div>
                          ))}
                       </div>
                    </div>
                  </div>
               </div>
               <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
               <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-slate-800 to-transparent" />
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
