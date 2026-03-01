
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Play, ArrowRight, Activity, ChevronRight, ChevronLeft, Zap, Target, Shield, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import ArenaButton from '../components/ui/ArenaButton';

// --- Utility: Animated Counter ---
const Counter = ({ value, duration = 2 }: { value: string; duration?: number }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const match = value.match(/(\d+)/);
  const numericValue = match ? parseInt(match[0]) : 0;
  const prefix = value.split(/\d+/)[0] || '';
  const suffix = value.split(/\d+/)[1] || '';

  useEffect(() => {
    if (isInView && numericValue > 0) {
      let start = 0;
      const end = numericValue;
      const totalMiliseconds = duration * 1000;
      const incrementTime = totalMiliseconds / end;
      const timer = setInterval(() => {
        start += 1;
        setDisplayValue(start);
        if (start === end) clearInterval(timer);
      }, Math.max(incrementTime, 20));
      return () => clearInterval(timer);
    }
  }, [isInView, numericValue, duration]);

  if (numericValue === 0) return <span>{value}</span>;

  return <span ref={ref}>{prefix}{displayValue}{suffix}</span>;
};

// --- Sub-components ---

const SectionTitle = ({ subtitle, title, titleAccent }: { subtitle: string; title: string; titleAccent?: string }) => (
  <div className="mb-10">
    <motion.span
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      className="font-syncopate text-[#FFC400] text-[9px] tracking-[0.6em] font-bold mb-3 block uppercase opacity-80"
    >
      {subtitle}
    </motion.span>
    <h2 className="font-syncopate text-4xl md:text-6xl font-bold uppercase tracking-tighter text-white">
      {title} {titleAccent && <span className="text-[#FFC400]">{titleAccent}</span>}
    </h2>
  </div>
);

const HUDStatCard = ({ label, value, index, isPriority = false }: { label: string; value: string; index: number; isPriority?: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.6 }}
    whileHover={{ 
      y: -8, 
      borderColor: 'rgba(255, 196, 0, 0.4)', 
      backgroundColor: 'rgba(10, 37, 77, 0.4)',
      boxShadow: '0 20px 40px -10px rgba(0,0,0,0.6), inset 0 0 20px rgba(255,196,0,0.05)'
    }}
    className={`
      relative p-8 md:p-10 flex flex-col justify-center min-h-[160px] md:min-h-[200px] group transition-all duration-500 
      backdrop-blur-xl border border-white/5 overflow-hidden
      ${isPriority ? 'bg-[#FFC400]/5 border-[#FFC400]/20' : 'bg-white/[0.02]'}
    `}
  >
    {/* Inner Shadow / Glow Effect */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
    
    {/* Gold Micro Separator */}
    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FFC400]/20 to-transparent" />
    
    {/* System Feed Micro-text */}
    <div className="absolute top-4 right-6 font-mono text-[7px] text-white/20 tracking-widest uppercase pointer-events-none">
      GK_CORE_DATA // v2.6
    </div>

    {/* Priority Pulse */}
    {isPriority && (
      <motion.div 
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-[#FFC400]/5 pointer-events-none"
      />
    )}
    
    <div className="font-syncopate text-[10px] text-slate-500 tracking-[0.4em] mb-4 uppercase group-hover:text-[#FFC400] transition-colors flex items-center gap-3">
      <div className={`w-1.5 h-1.5 rounded-full ${isPriority ? 'bg-[#FFC400] animate-pulse' : 'bg-slate-700'}`} />
      {label}
    </div>
    
    <div className={`font-syncopate text-4xl md:text-6xl font-bold tracking-tighter transition-all duration-500 ${isPriority ? 'text-[#FFC400]' : 'text-white'}`}>
      <Counter value={value} />
    </div>

    {isPriority && (
      <div className="mt-4 inline-flex items-center gap-2 bg-[#FFC400]/10 border border-[#FFC400]/20 px-3 py-1 rounded-full">
        <div className="w-1 h-1 bg-[#FFC400] rounded-full" />
        <span className="font-syncopate text-[8px] text-[#FFC400] font-bold tracking-widest uppercase">PRIORITY METRIC</span>
      </div>
    )}
    
    {/* Corner Accents */}
    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#FFC400]/30" />
    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#FFC400]/30" />
  </motion.div>
);

const About = () => {
  const [activeYearIndex, setActiveYearIndex] = useState(4); 
  
  const milestones = [
    { 
      year: '2018', 
      title: 'FOUNDATION', 
      desc: 'GEEKAY is established in Dubai with a mission to unify MENA. We began as a small cadre of specialists with a global vision.',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=1200&h=800'
    },
    { 
      year: '2019', 
      title: 'DOMINANCE', 
      desc: 'Within 12 months, GEEKAY secured major trophies. Our standard of play redefined what was possible in regional leagues.',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200&h=800'
    },
    { 
      year: '2021', 
      title: 'BREAKTHROUGH', 
      desc: 'Broken into the Global Top 10. Our performance at international majors signaled the arrival of a new power player.',
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=1200&h=800'
    },
    { 
      year: '2023', 
      title: 'INFRASTRUCTURE', 
      desc: 'Inauguration of the GEEKAY Performance Center. A hub dedicated to biometric analysis and elite tactical conditioning.',
      image: 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?auto=format&fit=crop&q=80&w=1200&h=800'
    },
    { 
      year: '2026', 
      title: 'ELITE STATUS', 
      desc: 'GEEKAY represents the pinnacle of operations. We don’t just compete; we dictate the meta. Global dominance is reality.',
      image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&q=80&w=1200&h=800'
    },
  ];

  const leadership = [
    { name: "SAMIR AL-FASSI", role: "CEO / FOUNDER", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=500&h=600", quote: "Excellence is not an act, but a standard we live by every single game. We built GEEKAY to win." },
    { name: "ELENA CHEN", role: "CHIEF STRATEGY OFFICER", photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=500&h=600", quote: "Data is our weapon. Winning is our only metric. We engineer every rotation." },
    { name: "MARCUS THORNE", role: "HEAD OF PERFORMANCE", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=500&h=600", quote: "Pressure doesn't break us. It focuses us. We train under simulation to thrive." }
  ];

  const nextYear = () => {
    setActiveYearIndex(prev => Math.min(prev + 1, milestones.length - 1));
  };

  const prevYear = () => {
    setActiveYearIndex(prev => Math.max(prev - 1, 0));
  };

  return (
    <div className="bg-[#081B3A] overflow-x-hidden selection:bg-[#FFC400] selection:text-black">
      
      {/* 🎬 ULTIMATE ABOUT HERO - REFINED 2-COLUMN LUXURY */}
      <section className="relative min-h-[60vh] lg:min-h-[70vh] w-full flex items-center overflow-hidden pt-24 lg:pt-32 pb-12">
        {/* Background Visuals Layer */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            initial={{ scale: 1 }}
            animate={{ scale: 1.1 }}
            transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
            className="w-full h-full"
          >
            <video autoPlay muted loop playsInline className="w-full h-full object-cover grayscale brightness-[0.25] opacity-30">
              <source src="https://assets.mixkit.co/videos/preview/mixkit-electronic-sports-players-shaking-hands-4467-large.mp4" type="video/mp4" />
            </video>
          </motion.div>
          
          <div className="absolute inset-0 bg-[#040E1E]/90 z-10" />
          <div className="absolute inset-0 bg-grid opacity-[0.05] z-10" />
          
          {/* Ghost Typography Positioned Better */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
            <h2 className="font-syncopate text-[35vw] font-black text-white/[0.02] select-none tracking-tighter">
              META
            </h2>
          </div>
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* LEFT: DRAMATIC TEXT CONTENT */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                
                {/* Line 1: Spaced for clarity */}
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="mb-6"
                >
                  <span className="font-syncopate text-white text-2xl md:text-5xl font-black uppercase tracking-tight">
                    WE DON'T FOLLOW.
                  </span>
                </motion.div>

                {/* Line 2: Small focal point */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  className="mb-4"
                >
                  <span className="font-syncopate text-white/60 text-xl md:text-3xl font-black uppercase tracking-widest">
                    WE
                  </span>
                </motion.div>

                {/* Main Heading Group: Refined negative margins for elite styling */}
                <div className="relative mb-16">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 1.5, ease: "circOut" }}
                  >
                    <h1 className="font-syncopate text-[#FFC400] text-6xl md:text-[150px] font-black uppercase tracking-tighter leading-[0.85] drop-shadow-[0_0_40px_rgba(255,196,0,0.4)]">
                      DEFINE
                    </h1>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 1.8, ease: "circOut" }}
                    className="md:mt-[-20px] ml-4 md:ml-12"
                  >
                    <h1 className="font-syncopate text-white text-6xl md:text-[150px] font-black uppercase tracking-tighter leading-[0.85]">
                      THE META.
                    </h1>
                  </motion.div>

                  {/* Underline Sweep */}
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.2, delay: 2.2, ease: "circOut" }}
                    className="absolute -bottom-4 left-0 right-0 h-1.5 md:h-2.5 bg-[#FFC400] origin-left shadow-[0_0_20px_rgba(255,196,0,0.5)]"
                  />
                </div>

                {/* Punchy Subtext */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 0.7, y: 0 }}
                  transition={{ duration: 1, delay: 2.8 }}
                  className="mb-12 border-l-2 border-[#FFC400]/40 pl-8 max-w-xl"
                >
                  <p className="text-white font-syncopate text-sm md:text-xl leading-relaxed font-light tracking-wide">
                    Forged in pressure. Engineered for dominance. <br />
                    GEEKAY isn’t chasing relevance. <br />
                    <span className="text-[#FFC400] font-bold">We build eras.</span>
                  </p>
                </motion.div>

                {/* CTAs */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3.2 }}
                  className="flex flex-col sm:flex-row gap-6"
                >
                  <ArenaButton className="h-20 min-w-[280px]" icon={<Play size={18} fill="currentColor" />}>
                    WATCH MANIFESTO
                  </ArenaButton>
                  <ArenaButton variant="outline" className="h-20 min-w-[280px]" icon={<ArrowRight size={18} />}>
                    EXPLORE EVOLUTION
                  </ArenaButton>
                </motion.div>
              </motion.div>
            </div>

            {/* RIGHT: CINEMATIC VISUAL BLOCK */}
            <div className="lg:col-span-5 hidden lg:flex justify-center relative">
               <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
                className="relative w-full aspect-[3/4] max-w-[450px]"
               >
                  {/* Holographic Frames */}
                  <div className="absolute inset-0 border-2 border-[#FFC400]/20 -translate-x-4 -translate-y-4 z-0" />
                  <div className="absolute inset-0 border-2 border-white/10 translate-x-4 translate-y-4 z-0" />
                  
                  {/* The Visual Operative */}
                  <div className="relative w-full h-full overflow-hidden border border-slate-800 bg-[#040E1E] shadow-[0_0_100px_rgba(0,0,0,0.5)] group">
                    <motion.img 
                      animate={{ 
                        scale: [1, 1.05, 1],
                        filter: ['grayscale(100%) brightness(0.7)', 'grayscale(0%) brightness(1)', 'grayscale(100%) brightness(0.7)']
                      }}
                      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                      src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200" 
                      className="w-full h-full object-cover transition-all duration-1000"
                      alt="Operative"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#040E1E] via-transparent to-transparent opacity-60" />
                    
                    {/* HUD Elements */}
                    <div className="absolute top-6 left-6 flex flex-col gap-2">
                      <div className="flex gap-1">
                        {[1, 2, 3].map(i => <div key={i} className="w-1 h-4 bg-[#FFC400]" />)}
                      </div>
                      <span className="font-syncopate text-[8px] text-[#FFC400] font-bold tracking-widest">STATUS: SUPERIOR</span>
                    </div>

                    <div className="absolute bottom-6 right-6 flex flex-col items-end text-right">
                      <Cpu size={24} className="text-[#FFC400]/40 mb-2" />
                      <span className="font-syncopate text-[7px] text-slate-500 tracking-[0.4em]">NODE_04 // SECTOR_GK</span>
                    </div>
                  </div>

                  {/* Floating Particle Accents */}
                  <motion.div 
                    animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="absolute -top-10 -right-10 w-24 h-24 bg-[#FFC400]/10 rounded-full blur-3xl"
                  />
                  <motion.div 
                    animate={{ y: [0, 30, 0], x: [0, -10, 0] }}
                    transition={{ duration: 7, repeat: Infinity }}
                    className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#FFC400]/10 rounded-full blur-3xl"
                  />

                  {/* Parallax HUD Circles */}
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-[#FFC400]/5 rounded-full pointer-events-none"
                  >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#FFC400]/40 rounded-full" />
                  </motion.div>
               </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 📊 SECTION — PERFORMANCE SNAPSHOT (REDESIGNED) */}
      <section className="py-32 md:py-48 px-6 md:px-12 bg-[#040E1E] relative border-y border-white/5 overflow-hidden">
        {/* Background Grid Overlay */}
        <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center relative z-10">
          
          {/* LEFT: EXECUTIVE HEADLINE */}
          <div className="lg:col-span-5">
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8 }} 
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="h-[1px] w-12 bg-[#FFC400]" />
                <span className="font-syncopate text-[#FFC400] text-[10px] tracking-[0.6em] font-bold uppercase">
                  ABOUT_GEEKAY // PERFORMANCE_SNAPSHOT
                </span>
              </div>

              <h2 className="font-syncopate text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter uppercase text-white mb-10">
                WHO IS<br />
                <span className="text-[#FFC400]">GEEKAY ESPORTS?</span>
              </h2>

              <div className="space-y-8 border-l border-white/10 pl-10 py-2">
                <p className="text-white/80 text-lg md:text-xl font-light leading-relaxed font-syncopate tracking-tight uppercase">
                  A multi-division organization engineered for sustained performance across global titles.
                </p>
                <p className="text-slate-500 font-inter text-base leading-relaxed font-light max-w-md">
                  We operate at the intersection of elite talent and analytical precision, maintaining a consistent presence on the world's most competitive stages.
                </p>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: DATA GRID */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <HUDStatCard label="ACTIVE TEAMS" value="12" index={0} />
            <HUDStatCard label="GLOBAL REACH" value="24.0M" index={1} />
            <HUDStatCard label="TOTAL ACCOMPLISHMENTS" value="32" index={2} />
            <HUDStatCard label="EWC PLACEMENTS" value="TOP 4" index={3} isPriority={true} />
          </div>
        </div>
      </section>

      {/* 🧭 SECTION — OUR JOURNEY (CINEMATIC & STRUCTURED) */}
      <section className="py-24 md:py-40 bg-[#081B3A] border-b border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <SectionTitle subtitle="TIMELINE_CHRONOLOGY" title="OUR" titleAccent="JOURNEY" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-stretch mt-12 md:mt-24">
            {/* Left Content Column */}
            <div className="flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeYearIndex}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.6, ease: "circOut" }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-6">
                    <span className="font-syncopate text-[#FFC400] text-3xl md:text-5xl font-black tracking-tighter">
                      {milestones[activeYearIndex].year}
                    </span>
                    <div className="h-[2px] flex-grow bg-slate-800" />
                  </div>
                  
                  <h3 className="font-syncopate text-3xl md:text-5xl font-bold text-white uppercase tracking-tighter leading-none">
                    {milestones[activeYearIndex].title}
                  </h3>
                  
                  <p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed max-w-xl">
                    {milestones[activeYearIndex].desc}
                  </p>

                  <div className="pt-8 flex items-center gap-4">
                    <button 
                      onClick={prevYear}
                      disabled={activeYearIndex === 0}
                      className={`p-4 border transition-all duration-300 ${activeYearIndex === 0 ? 'border-slate-800 text-slate-800' : 'border-slate-700 text-white hover:border-[#FFC400] hover:text-[#FFC400] hover:shadow-[0_0_15px_rgba(255,196,0,0.2)]'}`}
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button 
                      onClick={nextYear}
                      disabled={activeYearIndex === milestones.length - 1}
                      className={`p-4 border transition-all duration-300 ${activeYearIndex === milestones.length - 1 ? 'border-slate-800 text-slate-800' : 'border-slate-700 text-white hover:border-[#FFC400] hover:text-[#FFC400] hover:shadow-[0_0_15px_rgba(255,196,0,0.2)]'}`}
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Image Column */}
            <div className="relative aspect-[4/5] md:aspect-auto h-[400px] md:h-full overflow-hidden border border-slate-800 group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeYearIndex}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <img 
                    src={milestones[activeYearIndex].image} 
                    alt={milestones[activeYearIndex].title}
                    className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#081B3A] via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute top-8 right-8 text-white/20">
                    <Zap size={32} />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom Timeline Bar */}
          <div className="mt-24 md:mt-32 w-full flex justify-between gap-4 md:gap-8 overflow-x-auto no-scrollbar py-4 border-t border-slate-800/50">
            {milestones.map((m, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveYearIndex(idx)}
                className="flex flex-col gap-4 group min-w-max"
              >
                <div className={`h-[3px] transition-all duration-500 ${activeYearIndex === idx ? 'w-24 bg-[#FFC400]' : 'w-12 bg-slate-800 group-hover:w-24 group-hover:bg-slate-700'}`} />
                <span className={`font-syncopate text-[10px] font-bold tracking-[0.2em] transition-colors ${activeYearIndex === idx ? 'text-[#FFC400]' : 'text-slate-600 group-hover:text-slate-400'}`}>
                  {m.year}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 👥 SECTION — COMMAND STRUCTURE (Leadership) */}
      <section className="py-24 md:py-48 px-6 md:px-12 bg-[#040E1E] border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="COMMAND_HIERARCHY" title="LEADERSHIP" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            {leadership.map((leader, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="group relative aspect-[4/5] overflow-hidden border border-slate-800 bg-slate-900/10 transition-all duration-500 shadow-2xl"
              >
                <img 
                  src={leader.photo} 
                  alt={leader.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 brightness-50 group-hover:brightness-100" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040E1E] via-transparent to-transparent opacity-90 group-hover:opacity-70 transition-all" />
                
                <div className="absolute bottom-0 left-0 right-0 p-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-[2px] w-8 bg-[#FFC400]" />
                    <span className="text-[#FFC400] font-syncopate text-[9px] tracking-[0.4em] font-bold uppercase">{leader.role}</span>
                  </div>
                  <h3 className="font-syncopate text-2xl md:text-3xl font-bold text-white mb-6 uppercase tracking-tighter leading-none">{leader.name}</h3>
                  <div className="overflow-hidden h-0 group-hover:h-auto opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-slate-400 italic text-sm font-light leading-relaxed mb-6">
                      "{leader.quote}"
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ⚫ FINAL STATEMENT SECTION */}
      <section className="py-32 md:py-60 px-6 bg-black relative overflow-hidden flex items-center justify-center text-center">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-grid" />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.h2 
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="font-syncopate text-4xl md:text-[100px] font-black text-white mb-12 uppercase leading-none tracking-tighter"
          >
            THE META IS <br />
            OURS TO <span className="text-[#FFC400] inline-block drop-shadow-[0_0_50px_rgba(255,196,0,0.3)]">COMMAND.</span>
          </motion.h2>
          <p className="text-slate-500 font-syncopate text-[10px] tracking-[0.8em] uppercase mb-16 font-bold">
            ESTABLISHED 2018 // DOMINATING 2026
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <Link to="/teams"><ArenaButton className="min-w-[280px]">VIEW ROSTERS</ArenaButton></Link>
            <Link to="/careers"><ArenaButton variant="outline" className="min-w-[280px]">JOIN MISSION</ArenaButton></Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
