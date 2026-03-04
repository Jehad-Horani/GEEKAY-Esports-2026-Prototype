
import React, { useState, useRef, useMemo, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { MapPin, Trophy, ChevronRight, ChevronLeft, Search, PlayCircle, Info, History, Activity, Target, Calendar, Radio, Crosshair, Clock, Globe, Shield } from 'lucide-react';
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

const CalendarInterface = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 1)); // FEB 2026
  const [gameFilter, setGameFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1; // Adjust to Mon-Sun
  };

  const monthName = currentDate.toLocaleString('default', { month: 'short' }).toUpperCase();
  const year = currentDate.getFullYear();

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const filteredEvents = useMemo(() => {
    return MOCK_EVENTS.filter(event => {
      const matchesGame = gameFilter === 'ALL' || event.game.includes(gameFilter);
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           event.game.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesGame && matchesSearch;
    });
  }, [gameFilter, searchQuery]);

  const getEventsForDay = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return filteredEvents.filter(e => e.date === dateStr);
  };

  const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const totalDays = daysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const startOffset = firstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());
  
  const today = new Date();
  const isToday = (day: number) => {
    return today.getDate() === day && 
           today.getMonth() === currentDate.getMonth() && 
           today.getFullYear() === currentDate.getFullYear();
  };

  const handleEventClick = () => {
    window.open('https://x.com/geekay_esports?lang=en', '_blank');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full"
    >
      {/* 🛠 FILTER BAR */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mb-16">
        <div className="flex flex-wrap justify-center gap-2">
          {['ALL', 'RL', 'HOK', 'PUBG', 'VAL', 'CS2'].map(tag => (
            <button
              key={tag}
              onClick={() => setGameFilter(tag)}
              className={`px-6 py-2 font-syncopate text-[10px] font-black tracking-widest transition-all duration-300 border
                ${gameFilter === tag 
                  ? 'bg-[#FFC400] border-[#FFC400] text-black shadow-[0_0_20px_rgba(255,196,0,0.3)]' 
                  : 'bg-transparent border-slate-800 text-slate-500 hover:border-slate-600 hover:text-white'}`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="relative w-full max-w-md">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
          <input 
            type="text"
            placeholder="SEARCH OPERATIONS..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#081B3A] border border-slate-800 py-4 pl-12 pr-6 font-syncopate text-[10px] text-white placeholder:text-slate-600 focus:outline-none focus:border-[#FFC400] transition-colors"
          />
        </div>
      </div>

      {/* 📅 CALENDAR HEADER */}
      <div className="flex items-center justify-between mb-12 bg-[#081B3A] border border-slate-800 p-8">
        <div className="flex items-center gap-6">
          <button onClick={prevMonth} className="p-2 hover:text-[#FFC400] transition-colors text-slate-500">
            <ChevronLeft size={24} />
          </button>
          <h2 className="font-syncopate text-2xl md:text-4xl font-black text-white tracking-tighter">
            {monthName} <span className="text-[#FFC400]">{year}</span>
          </h2>
          <button onClick={nextMonth} className="p-2 hover:text-[#FFC400] transition-colors text-slate-500">
            <ChevronRight size={24} />
          </button>
        </div>
        <div className="hidden md:flex items-center gap-4 opacity-40">
           <div className="w-2 h-2 bg-[#FFC400] rounded-full animate-pulse" />
           <span className="font-syncopate text-[8px] tracking-[0.4em] text-white font-bold">CALENDAR_SYNC_ACTIVE</span>
        </div>
      </div>

      {/* 🗓 CALENDAR GRID */}
      <div className="grid grid-cols-7 border-t border-l border-slate-800">
        {/* Weekday Headers */}
        {weekDays.map(day => (
          <div key={day} className="border-r border-b border-slate-800 bg-[#081B3A]/50 py-4 text-center">
            <span className="font-syncopate text-[9px] font-black tracking-widest text-slate-500">{day}</span>
          </div>
        ))}

        {/* Empty cells for start offset */}
        {[...Array(startOffset)].map((_, i) => (
          <div key={`empty-${i}`} className="border-r border-b border-slate-800 aspect-square md:aspect-video bg-[#040E1E]/30" />
        ))}

        {/* Day cells */}
        {[...Array(totalDays)].map((_, i) => {
          const day = i + 1;
          const events = getEventsForDay(day);
          const hasEvents = events.length > 0;
          const isCurrent = isToday(day);
          const isExpanded = expandedDay === day;

          return (
            <div 
              key={day} 
              className={`border-r border-b border-slate-800 p-2 md:p-4 min-h-[120px] md:min-h-[160px] relative group transition-colors
                ${isCurrent ? 'bg-[#FFC400]/5' : 'hover:bg-white/[0.02]'}`}
            >
              {isCurrent && (
                <div className="absolute inset-0 border border-[#FFC400]/30 pointer-events-none" />
              )}
              
              <div className="flex justify-between items-start mb-4">
                <span className={`font-syncopate text-xs md:text-sm font-black 
                  ${isCurrent ? 'text-[#FFC400]' : 'text-slate-600 group-hover:text-slate-400'}`}>
                  {String(day).padStart(2, '0')}
                </span>
              </div>

              <div className="space-y-2">
                <AnimatePresence>
                  {(isExpanded ? events : events.slice(0, 2)).map((event, idx) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={handleEventClick}
                      className="bg-[#081B3A] border border-slate-800 p-2 rounded-sm cursor-pointer hover:border-[#FFC400] transition-all group/chip relative overflow-hidden"
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#FFC400]" />
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-syncopate text-[7px] font-black text-[#FFC400] tracking-tighter">{event.game}</span>
                        <span className="font-syncopate text-[6px] text-slate-500 font-bold">{event.time}</span>
                      </div>
                      <h4 className="font-syncopate text-[8px] font-bold text-white uppercase truncate leading-tight">{event.title}</h4>
                      <div className="mt-1 flex items-center gap-1">
                        <div className={`w-1 h-1 rounded-full ${event.type === 'TOURNAMENT' ? 'bg-purple-500' : 'bg-blue-500'}`} />
                        <span className="font-syncopate text-[6px] text-slate-600 font-bold uppercase">{event.type}</span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {events.length > 2 && !isExpanded && (
                  <button 
                    onClick={() => setExpandedDay(day)}
                    className="w-full py-1 font-syncopate text-[8px] font-black text-[#FFC400] hover:text-white transition-colors uppercase tracking-widest"
                  >
                    +{events.length - 2} MORE
                  </button>
                )}
                
                {isExpanded && (
                  <button 
                    onClick={() => setExpandedDay(null)}
                    className="w-full py-1 font-syncopate text-[8px] font-black text-slate-500 hover:text-white transition-colors uppercase tracking-widest"
                  >
                    COLLAPSE
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {/* Empty cells for end padding to keep grid consistent */}
        {[...Array((7 - ((startOffset + totalDays) % 7)) % 7)].map((_, i) => (
          <div key={`empty-end-${i}`} className="border-r border-b border-slate-800 aspect-square md:aspect-video bg-[#040E1E]/30" />
        ))}
      </div>
    </motion.div>
  );
};

const Schedule = () => {
  const containerRef = useRef(null);

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

      {/* 🧩 MAIN OPERATIONS LAYOUT — CALENDAR INTERFACE */}
      <section className="py-32 px-6 bg-[#040E1E] relative border-t border-white/5">
        <div className="max-w-screen-2xl mx-auto">
          
          <CalendarInterface />

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
