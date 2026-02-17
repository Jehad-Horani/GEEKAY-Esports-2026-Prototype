
import React, { useState, useRef, useMemo, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { MapPin, Trophy, ChevronRight, PlayCircle, Info, History, Activity, Target, Calendar, Radio, Crosshair, Clock, Globe, Shield } from 'lucide-react';
import { MOCK_EVENTS } from '../constants';
import ArenaButton from '../components/ui/ArenaButton';
import { Event } from '../types';

// --- Sub-components ---

const BlueprintBackground = () => (
  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
    <div className="absolute inset-0 bg-grid opacity-10 animate-pulse" style={{ animationDuration: '8s' }} />
    <motion.div 
      animate={{ 
        x: [-20, 20, -20],
        y: [-20, 20, -20],
        rotate: [0, 0.5, 0]
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-grid opacity-[0.03]" 
    />
    <div className="absolute inset-0 bg-scanline opacity-20" />
  </div>
);

const RadarAnimation = () => (
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none opacity-[0.03]">
    <motion.div 
      animate={{ rotate: 360 }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      className="w-full h-full border border-[#FFC400] rounded-full relative"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1/2 bg-gradient-to-t from-[#FFC400] to-transparent origin-bottom" />
    </motion.div>
    <div className="absolute inset-0 border border-[#FFC400]/20 rounded-full scale-75" />
    <div className="absolute inset-0 border border-[#FFC400]/20 rounded-full scale-50" />
    <div className="absolute inset-0 border border-[#FFC400]/20 rounded-full scale-25" />
  </div>
);

const CountdownTerminal = ({ date }: { date: string }) => {
  // Static countdown for prototype feel
  return (
    <div className="flex gap-4">
      {[
        { val: "14", label: "DAYS" },
        { val: "08", label: "HRS" },
        { val: "42", label: "MIN" },
        { val: "18", label: "SEC" }
      ].map((t, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="w-16 h-20 bg-black/40 border border-slate-800 flex items-center justify-center relative group overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-[#FFC400]/20 group-hover:bg-[#FFC400] transition-colors" />
            <span className="font-syncopate text-2xl md:text-3xl font-black text-white group-hover:text-[#FFC400] transition-colors">
              {t.val}
            </span>
          </div>
          <span className="font-syncopate text-[7px] text-slate-500 mt-3 tracking-[0.4em] font-bold">{t.label}</span>
        </div>
      ))}
    </div>
  );
};

const Schedule = () => {
  const [filter, setFilter] = useState<'ALL' | 'LIVE' | 'UPCOMING' | 'FINISHED'>('ALL');
  const [selectedId, setSelectedId] = useState(MOCK_EVENTS[0].id);
  const containerRef = useRef(null);

  const filteredEvents = useMemo(() => {
    return MOCK_EVENTS.filter(e => filter === 'ALL' || e.status === filter);
  }, [filter]);

  const selectedEvent = useMemo(() => 
    MOCK_EVENTS.find(e => e.id === selectedId) || filteredEvents[0], 
    [selectedId, filteredEvents]
  );

  return (
    <div className="bg-[#0B1C2D] min-h-screen selection:bg-[#FFC400] selection:text-black pt-20 overflow-x-hidden" ref={containerRef}>
      <BlueprintBackground />
      
      {/* 🎬 HERO SECTION — GLOBAL OPERATIONS */}
      <section className="relative h-[80vh] flex items-center justify-center px-6">
        <RadarAnimation />
        <div className="max-w-7xl mx-auto relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Status Lines */}
            <div className="flex justify-center gap-12 mb-12 opacity-40">
              <div className="flex items-center gap-3">
                <Shield size={14} className="text-[#FFC400]" />
                <span className="font-syncopate text-[8px] tracking-[0.6em] font-bold text-white uppercase">GLOBAL STATUS: <span className="text-[#FFC400]">ACTIVE</span></span>
              </div>
              <div className="flex items-center gap-3">
                <Radio size={14} className="text-white" />
                <span className="font-syncopate text-[8px] tracking-[0.6em] font-bold text-white uppercase">LIVE FEED: <span className="text-slate-500">STANDBY</span></span>
              </div>
            </div>

            {/* Stroke Animation "2026" */}
            <div className="relative mb-6">
              <motion.h2 
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 0.05, scale: 1 }}
                transition={{ duration: 2, delay: 0.5 }}
                className="font-syncopate text-[20vw] font-black text-transparent border-text leading-none select-none tracking-tighter"
                style={{ WebkitTextStroke: '2px white' }}
              >
                2026
              </motion.h2>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.h1 
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1, ease: "circOut" }}
                  className="font-syncopate text-4xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none"
                >
                  GLOBAL OPERATIONS <span className="text-[#FFC400]">MAP</span>
                </motion.h1>
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 1.5, ease: "circOut" }}
                  className="h-1.5 md:h-2 bg-[#FFC400] w-full max-w-4xl mt-6 shadow-[0_0_30px_rgba(255,196,0,0.5)]"
                />
              </div>
            </div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.6, y: 0 }}
              transition={{ delay: 2 }}
              className="text-white font-syncopate text-xs md:text-xl tracking-[0.3em] uppercase max-w-2xl mx-auto mb-16"
            >
              We don't attend events. We execute operations.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              className="flex flex-col sm:flex-row gap-8 justify-center"
            >
              <ArenaButton className="h-20 min-w-[280px]" icon={<Radio size={18} className="animate-pulse" />}>
                WATCH LIVE FEED
              </ArenaButton>
              <ArenaButton variant="outline" className="h-20 min-w-[280px]" icon={<Calendar size={18} />}>
                VIEW FULL CALENDAR
              </ArenaButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 🧩 MAIN OPERATIONS LAYOUT */}
      <section className="py-32 px-6 bg-[#040E1E] relative border-t border-white/5">
        <div className="max-w-screen-2xl mx-auto">
          
          {/* Tactical Switcher (Filters) */}
          <div className="mb-24 flex justify-center">
             <div className="bg-[#081B3A] p-1 border border-slate-800 flex gap-2 relative skew-x-[-10deg]">
                {(['ALL', 'LIVE', 'UPCOMING', 'FINISHED'] as const).map(f => (
                  <button 
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`relative px-8 py-4 font-syncopate text-[9px] font-black tracking-[0.3em] uppercase transition-all duration-300 flex items-center justify-center
                      ${filter === f ? 'text-black' : 'text-slate-500 hover:text-white'}`}
                  >
                    <div className="skew-x-[10deg] z-10">{f}</div>
                    {filter === f && (
                      <motion.div 
                        layoutId="activeFilter"
                        className="absolute inset-0 bg-[#FFC400]" 
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </button>
                ))}
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            
            {/* LEFT: Tactical Timeline */}
            <div className="lg:col-span-4 relative pl-12">
               {/* Vertical Tactical Line */}
               <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-slate-800">
                  <motion.div 
                    initial={{ height: 0 }}
                    whileInView={{ height: '100%' }}
                    transition={{ duration: 1.5 }}
                    className="absolute top-0 left-0 w-full bg-[#FFC400]" 
                  />
               </div>

               <div className="space-y-6">
                 {filteredEvents.map((event, idx) => {
                   const isSelected = selectedId === event.id;
                   const isLive = event.status === 'LIVE';
                   const isUpcoming = event.status === 'UPCOMING';
                   const isFinished = event.status === 'FINISHED';

                   return (
                     <motion.div 
                       key={event.id}
                       initial={{ opacity: 0, x: -30 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       transition={{ delay: idx * 0.05 }}
                       onClick={() => setSelectedId(event.id)}
                       className={`relative p-8 cursor-pointer transition-all duration-300 group
                         ${isSelected ? 'bg-[#FFC400]/5 border border-[#FFC400] shadow-[0_0_30px_rgba(255,196,0,0.1)]' : 'hover:bg-slate-900/50'}`}
                     >
                       {/* Connection Dot */}
                       <div className={`absolute left-[-52px] top-1/2 -translate-y-1/2 w-3 h-3 border-2 transition-all duration-500
                         ${isSelected ? 'bg-[#FFC400] border-[#FFC400] scale-125' : 'bg-[#040E1E] border-slate-700'}`} 
                       />

                       <div className="flex flex-col gap-2">
                         <div className="flex justify-between items-center">
                           <span className="font-syncopate text-[8px] text-slate-500 font-bold tracking-widest uppercase">OP-0{idx + 1}</span>
                           <div className="flex items-center gap-2">
                              {isLive && (
                                <motion.div 
                                  animate={{ opacity: [1, 0.4, 1] }}
                                  transition={{ duration: 1.2, repeat: Infinity }}
                                  className="w-1.5 h-1.5 bg-red-600 rounded-full shadow-[0_0_10px_#dc2626]" 
                                />
                              )}
                              <span className={`font-syncopate text-[8px] font-black tracking-widest uppercase 
                                ${isLive ? 'text-red-600' : isUpcoming ? 'text-[#FFC400]' : 'text-slate-600'}`}>
                                {isUpcoming && 'UPCOMING_'}
                                {event.status}
                                {isUpcoming && <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="inline">_</motion.div>}
                              </span>
                           </div>
                         </div>
                         <div className="font-syncopate text-xs text-white/40 mb-1">{event.date}</div>
                         <h4 className={`font-syncopate text-lg font-bold uppercase tracking-tight transition-colors 
                           ${isSelected ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`}>
                           {event.title}
                           {isFinished && <div className="absolute inset-0 bg-slate-950/40 pointer-events-none skew-x-[-15deg]" />}
                         </h4>
                         <span className="font-syncopate text-[9px] text-[#FFC400] font-bold tracking-[0.2em] uppercase mt-2">{event.game}</span>
                       </div>
                     </motion.div>
                   );
                 })}
               </div>
            </div>

            {/* RIGHT: Mission Detail Panel */}
            <div className="lg:col-span-8 lg:sticky lg:top-40 h-fit">
               <AnimatePresence mode="wait">
                 <motion.div
                   key={selectedEvent.id}
                   initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
                   animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                   exit={{ opacity: 0, x: -50, filter: "blur(10px)" }}
                   transition={{ duration: 0.6, ease: "circOut" }}
                   className="bg-[#081B3A] border border-slate-800 p-12 md:p-20 relative overflow-hidden group"
                 >
                    {/* Panel Radar Background Decoration */}
                    <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] pointer-events-none opacity-[0.05] group-hover:opacity-[0.08] transition-opacity">
                       <Crosshair size={600} strokeWidth={0.5} className="text-[#FFC400] animate-spin-slow" />
                    </div>
                    
                    {/* Header Tactical Info */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16 border-b border-slate-800 pb-12">
                       <div>
                          <div className="flex items-center gap-3 mb-4">
                             <div className="w-1.5 h-1.5 bg-[#FFC400] animate-pulse" />
                             <span className="font-syncopate text-[#FFC400] text-[10px] tracking-[0.6em] font-bold uppercase">MISSION_INTEL</span>
                          </div>
                          <h2 className="font-syncopate text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.85]">
                             {selectedEvent.title}
                          </h2>
                       </div>
                       <div className="bg-[#040E1E] p-6 border border-slate-800 skew-x-[-15deg]">
                          <div className="skew-x-[15deg]">
                             <span className="font-syncopate text-slate-500 text-[8px] tracking-[0.4em] mb-2 block uppercase">LOCATION</span>
                             <div className="flex items-center gap-3">
                                <MapPin size={18} className="text-[#FFC400]" />
                                <span className="font-syncopate text-sm font-bold text-white uppercase">{selectedEvent.location}</span>
                             </div>
                          </div>
                       </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                       <div className="space-y-4">
                          <span className="font-syncopate text-slate-500 text-[10px] tracking-[0.5em] block uppercase">GAME_SECTOR</span>
                          <div className="flex items-center gap-4">
                             <div className="p-3 bg-white/5 border border-slate-800">
                                <Activity size={24} className="text-[#FFC400]" />
                             </div>
                             <span className="font-syncopate text-2xl font-bold text-white uppercase">{selectedEvent.game}</span>
                          </div>
                       </div>
                       <div className="space-y-4 text-right md:text-left">
                          <span className="font-syncopate text-slate-500 text-[10px] tracking-[0.5em] block uppercase">PRIZE_ALLOCATION</span>
                          <div className="flex items-center md:justify-start justify-end gap-4">
                             <div className="p-3 bg-white/5 border border-slate-800">
                                <Trophy size={24} className="text-[#FFC400]" />
                             </div>
                             <span className="font-syncopate text-2xl font-bold text-[#FFC400] uppercase">{selectedEvent.prizePool}</span>
                          </div>
                       </div>
                    </div>

                    {/* Dynamic Countdown / Status */}
                    <div className="mb-20">
                       {selectedEvent.status === 'UPCOMING' && (
                          <div className="space-y-8">
                             <span className="font-syncopate text-slate-500 text-[10px] tracking-[0.6em] block uppercase">OPERATION_COUNTDOWN</span>
                             <CountdownTerminal date={selectedEvent.date} />
                          </div>
                       )}
                       
                       {selectedEvent.status === 'LIVE' && (
                          <div className="flex items-center gap-8 p-10 bg-red-600/5 border border-red-600/20">
                             <motion.div 
                               animate={{ scale: [1, 1.2, 1], opacity: [1, 0.6, 1] }}
                               transition={{ duration: 1, repeat: Infinity }}
                               className="w-4 h-4 bg-red-600 rounded-full"
                             />
                             <div className="flex flex-col">
                                <span className="font-syncopate text-red-600 text-[10px] font-black tracking-[0.6em] uppercase">TRANSMISSION_ACTIVE</span>
                                <h3 className="font-syncopate text-2xl font-bold text-white uppercase mt-2">LIVE MATCH IN PROGRESS</h3>
                             </div>
                          </div>
                       )}

                       {selectedEvent.status === 'FINISHED' && (
                          <div className="flex items-center gap-8 p-10 bg-slate-900 border border-slate-800 grayscale">
                             <Shield size={32} className="text-slate-500" />
                             <div className="flex flex-col">
                                <span className="font-syncopate text-slate-500 text-[10px] font-black tracking-[0.6em] uppercase">OPERATION_CONCLUDED</span>
                                <h3 className="font-syncopate text-2xl font-bold text-slate-400 uppercase mt-2">VOD REPLAYS AVAILABLE</h3>
                             </div>
                          </div>
                       )}
                    </div>

                    {/* Action Bar */}
                    <div className="flex flex-col sm:flex-row gap-6">
                       {selectedEvent.status === 'LIVE' ? (
                         <ArenaButton icon={<Radio size={18} className="animate-pulse" />} className="h-20 min-w-[280px]">
                           WATCH LIVE FEED
                         </ArenaButton>
                       ) : selectedEvent.status === 'UPCOMING' ? (
                         <ArenaButton icon={<Target size={18} />} className="h-20 min-w-[280px]">
                           NOTIFY COMMAND
                         </ArenaButton>
                       ) : (
                         <ArenaButton variant="outline" icon={<History size={18} />} className="h-20 min-w-[280px]">
                           WATCH HIGHLIGHTS
                         </ArenaButton>
                       )}
                       <ArenaButton variant="outline" className="h-20 min-w-[280px]" icon={<Info size={18} />}>
                         MISSION_DETAILS
                       </ArenaButton>
                    </div>

                    {/* Bottom HUD Labels */}
                    <div className="absolute bottom-6 left-12 flex gap-12 opacity-20 group-hover:opacity-40 transition-opacity">
                       <span className="font-mono text-[8px] uppercase">ENCRYPT_LEVEL: 09</span>
                       <span className="font-mono text-[8px] uppercase">OPERATIVE: GEEKAY_SYSTEMS</span>
                       <span className="font-mono text-[8px] uppercase">FEED_SYNC: STABLE</span>
                    </div>
                 </motion.div>
               </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* 🧭 FINAL STATUS FOOTER */}
      <section className="py-24 bg-black border-t border-slate-900 relative">
         <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12 opacity-40">
            <div className="flex items-center gap-8">
               <Globe size={24} className="text-[#FFC400]" />
               <div className="flex flex-col">
                  <span className="font-syncopate text-[10px] font-bold text-white tracking-[0.4em]">DUBAI_CORE_ARENA</span>
                  <span className="font-syncopate text-[8px] text-slate-500 mt-1">PRIMARY SERVER // 12ms LATENCY</span>
               </div>
            </div>
            <div className="flex gap-4">
               {[...Array(6)].map((_, i) => (
                 <div key={i} className="w-1 h-6 bg-slate-800" />
               ))}
            </div>
            <div className="text-right">
               <span className="font-syncopate text-[8px] text-slate-500 tracking-[0.5em] block uppercase">ALL SYSTEMS NOMINAL</span>
               <span className="font-syncopate text-[10px] text-white font-bold uppercase mt-1">OPERATIONAL_FEED_V2.6</span>
            </div>
         </div>
      </section>

      <style>{`
        .border-text {
          -webkit-text-stroke: 1px rgba(255, 196, 0, 0.3);
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 60s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Schedule;
