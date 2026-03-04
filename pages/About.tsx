
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Play, ArrowRight, Activity, ChevronRight, ChevronLeft, Zap, Target, Shield, Cpu, X } from 'lucide-react';
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
  const timelineData = [
    { year: '2021', title: 'BREAKTHROUGH', desc: 'Broken into the Global Top 10.' },
    { year: '2022', title: 'EXPANSION', desc: 'Launched multiple new divisions.' },
    { year: '2023', title: 'INFRASTRUCTURE', desc: 'Inauguration of the Performance Center.' },
    { year: '2024', title: 'DOMINANCE', desc: 'Secured major international trophies.' },
    { year: '2025', title: 'GLOBAL REACH', desc: 'Expanded operations to new regions.' },
    { year: '2026', title: 'ELITE STATUS', desc: 'Dictating the meta. Global dominance.' },
  ];

  const leadershipData = [
    { 
      name: "KISHAN", 
      role: "CEO / FOUNDER", 
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=500&h=600", 
      preview: "Visionary leader driving global expansion.",
      desc: "Kishan founded Geekay Esports with a singular vision: to put MENA on the global esports map. Under his leadership, the organization has grown from a regional contender to a globally recognized powerhouse.",
      linkedin: "#"
    },
    { 
      name: "IHAB", 
      role: "CHIEF STRATEGY OFFICER", 
      photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=500&h=600", 
      preview: "Architect of competitive dominance.",
      desc: "Ihab oversees the strategic direction of all competitive divisions. His data-driven approach to roster building and tactical analysis has secured multiple international championships.",
      linkedin: "#"
    },
    { 
      name: "RAGHEED", 
      role: "HEAD OF OPERATIONS", 
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=500&h=600", 
      preview: "Ensuring operational excellence.",
      desc: "Ragheed manages the day-to-day operations of the Geekay Performance Center, ensuring that players and staff have the infrastructure needed to perform at the highest level.",
      linkedin: "#"
    },
    { 
      name: "ALI", 
      role: "COMMERCIAL DIRECTOR", 
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=500&h=600", 
      preview: "Driving brand partnerships.",
      desc: "Ali leads the commercial strategy, forging partnerships with global brands and expanding Geekay's footprint in the esports ecosystem.",
      linkedin: "#"
    },
    { 
      name: "AOY", 
      role: "CREATIVE DIRECTOR", 
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=500&h=600", 
      preview: "Shaping the Geekay identity.",
      desc: "Aoy is the creative force behind the Geekay brand. From apparel design to content production, she ensures the organization's visual identity remains elite and uncompromising.",
      linkedin: "#"
    }
  ];

  const [selectedLeader, setSelectedLeader] = useState<typeof leadershipData[0] | null>(null);

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

      {/* 🧭 SECTION — OUR JOURNEY (TIMELINE FIX) */}
      <section className="py-24 md:py-40 bg-[#081B3A] border-b border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <SectionTitle subtitle="TIMELINE_CHRONOLOGY" title="OUR" titleAccent="JOURNEY" />

          <div className="relative mt-20 md:mt-32">
            {/* Connector line */}
            <div className="absolute top-0 md:top-6 left-[15px] md:left-0 w-[2px] md:w-full h-full md:h-[2px] bg-slate-800/50 z-0" />
            
            <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-4">
              {timelineData.map((item, idx) => {
                const isActive = item.year === '2026';
                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="relative z-10 flex md:flex-col items-start md:items-center gap-8 md:gap-6 flex-1"
                  >
                    {/* Node */}
                    <div className={`w-8 h-8 rounded-full border-4 bg-[#081B3A] z-10 flex-shrink-0 flex items-center justify-center transition-all duration-500 ${isActive ? 'border-[#FFC400] shadow-[0_0_20px_rgba(255,196,0,0.4)] scale-110' : 'border-slate-700'}`}>
                      {isActive && <div className="w-2 h-2 bg-[#FFC400] rounded-full" />}
                    </div>
                    
                    {/* Content */}
                    <div className="md:text-center md:px-2 pt-1 md:pt-0">
                      <h3 className={`font-syncopate text-3xl md:text-4xl font-black tracking-tighter mb-2 transition-colors duration-500 ${isActive ? 'text-[#FFC400]' : 'text-white'}`}>
                        {item.year}
                      </h3>
                      <h4 className="font-syncopate text-xs font-bold text-white uppercase tracking-widest mb-3">
                        {item.title}
                      </h4>
                      <p className="text-slate-400 text-sm font-light leading-relaxed max-w-[200px] md:mx-auto">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 👥 SECTION — COMMAND STRUCTURE (Leadership) */}
      <section className="py-24 md:py-48 px-6 md:px-12 bg-[#040E1E] border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="COMMAND_HIERARCHY" title="LEADERSHIP" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-20">
            {leadershipData.map((leader, i) => (
              <div 
                key={i}
                onClick={() => setSelectedLeader(leader)}
                className="group relative aspect-[3/4] overflow-hidden border border-slate-800 bg-slate-900/10 cursor-pointer transition-all duration-300 hover:border-[#FFC400]/50 hover:shadow-[0_0_30px_rgba(255,196,0,0.15)]"
              >
                <img 
                  src={leader.photo} 
                  alt={leader.name} 
                  className="w-full h-full object-cover grayscale transition-transform duration-300 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040E1E] via-[#040E1E]/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-syncopate text-xl font-bold text-white mb-1 uppercase tracking-tighter leading-none">{leader.name}</h3>
                  <div className="h-0 overflow-hidden group-hover:h-auto opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-[#FFC400] font-syncopate text-[8px] tracking-[0.2em] font-bold uppercase block mb-3">{leader.role}</span>
                    <p className="text-slate-300 text-xs font-light leading-relaxed">
                      {leader.preview}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Modal */}
      <AnimatePresence>
        {selectedLeader && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLeader(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 w-full max-w-3xl bg-[#040E1E] border border-[#FFC400]/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col md:flex-row overflow-hidden"
            >
              <button 
                onClick={() => setSelectedLeader(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white z-20"
              >
                <X size={24} />
              </button>
              
              <div className="w-full md:w-2/5 aspect-square md:aspect-auto relative">
                <img src={selectedLeader.photo} alt={selectedLeader.name} className="w-full h-full object-cover grayscale" />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#040E1E] to-transparent" />
              </div>
              
              <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                <h3 className="font-syncopate text-3xl md:text-5xl font-bold text-white uppercase tracking-tighter mb-2">
                  {selectedLeader.name}
                </h3>
                <h4 className="font-syncopate text-xs text-[#FFC400] tracking-[0.3em] font-bold uppercase mb-6">
                  {selectedLeader.role}
                </h4>
                <div className="w-12 h-[1px] bg-white/20 mb-6" />
                <p className="text-slate-400 text-sm leading-relaxed font-light mb-8">
                  {selectedLeader.desc}
                </p>
                
                {selectedLeader.linkedin && (
                  <motion.a 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    href={selectedLeader.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-slate-400 hover:text-[#FFC400] transition-colors text-sm font-syncopate"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    LINKEDIN
                  </motion.a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
