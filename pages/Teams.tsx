
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
  Activity, 
  Shield,
  Layers,
  Target,
  ExternalLink,
  Award,
  Globe
} from 'lucide-react';
import { MOCK_TEAMS } from '../constants';
import { Player, Team, Trophy } from '../types';
import ArenaButton from '../components/ui/ArenaButton';

// --- Redesigned Player Detail Modal (UI/UX Friendly) ---

const PlayerModal: React.FC<{ player: Player, onClose: () => void }> = ({ player, onClose }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-8 bg-[#040E1E]/95 backdrop-blur-md"
    onClick={onClose}
  >
    <motion.div 
      initial={{ scale: 0.9, y: 20, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      exit={{ scale: 0.9, y: 20, opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="bg-[#0B1C2D] border border-slate-800 w-full max-w-5xl relative overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.6)] rounded-none"
      onClick={e => e.stopPropagation()}
    >
      {/* Tactical Accents */}
      <div className="absolute top-0 left-0 w-16 h-[2px] bg-[#FFC400]" />
      <div className="absolute top-0 left-0 w-[2px] h-16 bg-[#FFC400]" />
      <div className="absolute bottom-0 right-0 w-16 h-[2px] bg-slate-800" />
      <div className="absolute bottom-0 right-0 w-[2px] h-16 bg-slate-800" />

      <button onClick={onClose} className="absolute top-6 right-6 z-50 text-white/50 hover:text-[#FFC400] transition-colors">
        <X size={32} />
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
        {/* Left Side: Visual */}
        <div className="lg:col-span-5 relative overflow-hidden bg-slate-900 border-r border-slate-800">
          <img 
            src={player.photo} 
            alt={player.nickname} 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1C2D] via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-10 left-10">
            <span className="text-[#FFC400] font-syncopate text-[10px] tracking-[0.4em] font-bold block mb-3 uppercase border-l-2 border-[#FFC400] pl-4">
              OPERATIVE_UNIT
            </span>
            <h2 className="font-syncopate text-6xl font-black leading-none uppercase">{player.nickname}</h2>
          </div>
        </div>

        {/* Right Side: Intel */}
        <div className="lg:col-span-7 p-10 md:p-16 flex flex-col justify-center">
          <div className="flex justify-between items-start mb-12">
            <div>
               <h3 className="font-syncopate text-slate-500 text-[10px] tracking-[0.4em] mb-2 uppercase">OFFICIAL_IDENTIFICATION</h3>
               <p className="font-syncopate text-xl text-white font-bold">{player.name}</p>
            </div>
            <div className="flex gap-4">
              {player.socials.twitter && <Twitter size={18} className="text-slate-500 hover:text-[#FFC400] cursor-pointer transition-colors" />}
              {player.socials.twitch && <Twitch size={18} className="text-slate-500 hover:text-[#FFC400] cursor-pointer transition-colors" />}
              {player.socials.instagram && <Instagram size={18} className="text-slate-500 hover:text-[#FFC400] cursor-pointer transition-colors" />}
            </div>
          </div>

          <div className="mb-12">
             <h3 className="font-syncopate text-slate-500 text-[10px] tracking-[0.4em] mb-4 uppercase">MISSION_OBJECTIVE_BIO</h3>
             <p className="text-slate-300 text-lg leading-relaxed font-light font-inter">
               {player.bio}
             </p>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-10 border-t border-slate-800">
            <div>
              <span className="text-slate-500 font-syncopate text-[8px] tracking-[0.3em] block mb-2 uppercase">K/D_RATIO</span>
              <span className="text-3xl font-syncopate font-black text-white">{player.stats.kd}</span>
            </div>
            <div>
              <span className="text-slate-500 font-syncopate text-[8px] tracking-[0.3em] block mb-2 uppercase">WIN_RATE</span>
              <span className="text-3xl font-syncopate font-black text-[#FFC400]">{player.stats.winRate}</span>
            </div>
            <div>
              <span className="text-slate-500 font-syncopate text-[8px] tracking-[0.3em] block mb-2 uppercase">MVPS</span>
              <span className="text-3xl font-syncopate font-black text-white">{player.stats.mvps}</span>
            </div>
          </div>
          
          <div className="mt-12 flex gap-4">
             <ArenaButton className="flex-grow">FOLLOW_OPERATIVE</ArenaButton>
             <button className="p-5 border border-slate-800 text-white hover:border-[#FFC400] hover:text-[#FFC400] transition-all skew-x-[-15deg]">
                <ExternalLink size={20} className="skew-x-[15deg]" />
             </button>
          </div>
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

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="bg-[#0B1C2D] pb-32 relative"
    >
      {/* 🎬 DEDICATED SUB-NAVBAR AREA */}
      <div className="absolute top-28 left-0 w-full z-[70] px-6 md:px-12 py-4 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="container mx-auto"
        >
          <button 
            onClick={onBack}
            className="pointer-events-auto flex items-center gap-4 bg-[#FFC400] px-6 py-4 text-black hover:bg-white transition-all font-syncopate text-[10px] font-black uppercase tracking-[0.4em] skew-x-[-15deg] group shadow-[0_0_30px_rgba(255,196,0,0.3)]"
          >
            <div className="skew-x-[15deg] flex items-center gap-3">
              <ChevronLeft size={18} className="group-hover:scale-125 group-hover:-translate-x-1 transition-all" /> 
              <span>EXIT_DIVISION</span>
            </div>
          </button>
        </motion.div>
      </div>

      {/* 🎬 CINEMATIC HERO */}
      <div className="relative h-[80vh] min-h-[700px] overflow-hidden">
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
            <h1 className="font-syncopate text-6xl md:text-[140px] font-black text-white mb-10 leading-none tracking-tighter uppercase drop-shadow-2xl">
              {team.name}
            </h1>
            
            <div className="flex flex-wrap gap-12 items-center bg-[#0B1C2D]/60 backdrop-blur-2xl p-10 border border-white/5 inline-flex shadow-2xl">
              <div className="flex flex-col">
                <span className="text-slate-500 font-syncopate text-[9px] tracking-widest mb-2 uppercase">WIN_RATE</span>
                <span className="font-syncopate font-black text-[#FFC400] text-4xl">{team.stats?.winRate || '0%'}</span>
              </div>
              <div className="h-16 w-[1px] bg-slate-800" />
              <div className="flex flex-col">
                <span className="text-slate-500 font-syncopate text-[9px] tracking-widest mb-2 uppercase">GLOBAL_RANK</span>
                <span className="font-syncopate font-black text-white text-4xl">{team.stats?.rank || 'N/A'}</span>
              </div>
              <div className="h-16 w-[1px] bg-slate-800" />
              <div className="flex flex-col">
                <span className="text-slate-500 font-syncopate text-[9px] tracking-widest mb-2 uppercase">TOTAL_EARNINGS</span>
                <span className="font-syncopate font-black text-white text-4xl">{team.stats?.earnings || '$0'}</span>
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
              <h2 className="font-syncopate text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">THE ROSTER</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {team.players.map(player => (
              <motion.div 
                key={player.id}
                whileHover={{ y: -15 }}
                onClick={() => setSelectedPlayer(player)}
                className="group relative aspect-[3/4] overflow-hidden cursor-pointer bg-slate-900 border border-slate-800 hover:border-[#FFC400] transition-all duration-500 shadow-2xl"
              >
                <img src={player.photo} alt={player.nickname} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1C2D] via-transparent to-transparent opacity-90" />
                
                <div className="absolute bottom-0 left-0 right-0 p-10">
                  <span className="text-[#FFC400] font-syncopate text-[8px] tracking-[0.4em] font-black block mb-3 uppercase">{player.role}</span>
                  <h3 className="font-syncopate text-3xl font-black text-white uppercase group-hover:text-[#FFC400] transition-colors mb-4">{player.nickname}</h3>
                  <div className="w-0 group-hover:w-full h-[2px] bg-[#FFC400] transition-all duration-500" />
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

const DivisionCard: React.FC<{ team: Team; onClick: () => void; index: number }> = ({ team, onClick, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.8 }}
    whileHover={{ scale: 1.02 }}
    onClick={onClick}
    className="group relative aspect-[16/9] bg-slate-900 border border-slate-800 overflow-hidden cursor-pointer rounded-none"
  >
    <motion.img
      src={team.banner}
      alt={team.name}
      className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
    />
    <div className="absolute inset-0 bg-[#0B1C2D]/60 group-hover:bg-[#0B1C2D]/40 transition-colors duration-500" />
    <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#FFC400]/40 transition-all duration-500 pointer-events-none" />
    <div className="absolute top-6 left-6">
      <div className="bg-[#FFC400] text-black px-3 py-1 font-syncopate text-[9px] font-black tracking-widest uppercase skew-x-[-15deg]">
        <span className="block skew-x-[15deg]">{team.game}</span>
      </div>
    </div>
    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 group-hover:-translate-y-4 transition-transform duration-500">
      <h3 className="font-syncopate text-3xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-none text-center">
        {team.name}
      </h3>
    </div>
    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between border-t border-white/10 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
      <div className="flex gap-8">
        <div className="flex flex-col">
          <span className="font-syncopate text-[7px] text-slate-500 tracking-widest uppercase">TITLES</span>
          <span className="font-syncopate text-sm font-bold text-white">{team.stats?.championships || '0'}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-syncopate text-[7px] text-slate-500 tracking-widest uppercase">EVENTS</span>
          <span className="font-syncopate text-sm font-bold text-white">{team.stats?.globalEvents || '0'}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-syncopate text-[7px] text-slate-500 tracking-widest uppercase">REGION</span>
          <span className="font-syncopate text-sm font-bold text-white">MENA</span>
        </div>
      </div>
      <div className="bg-[#FFC400] text-black px-6 py-3 font-syncopate text-[10px] font-black tracking-widest uppercase skew-x-[-15deg] group-hover:shadow-[0_0_20px_rgba(255,196,0,0.4)] transition-all">
        <span className="block skew-x-[15deg] flex items-center gap-2">
          ENTER DIVISION <ChevronRight size={14} />
        </span>
      </div>
    </div>
  </motion.div>
);

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

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
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
            onBack={() => setSelectedTeamId(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Teams;
