
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { ChevronRight, PlayCircle, Search, BarChart3, Globe, Shield, X, Twitter, Twitch, Cpu, Target, Layers, Zap, ArrowDown, ArrowRight, Clock, Calendar, MapPin, Trophy } from 'lucide-react';
import ArenaButton from '../components/ui/ArenaButton';
import { MOCK_EVENTS, MOCK_TEAMS, MOCK_NEWS } from '../constants';
import { Link } from 'react-router-dom';
import { Player, NewsItem } from '../types';

// --- Components ---

const RadarDots = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: Math.random() * 100 + "%", y: Math.random() * 100 + "%" }}
          animate={{ 
            opacity: [0, 0.5, 0],
            scale: [0.5, 1.2, 0.8],
          }}
          transition={{ 
            duration: 3 + Math.random() * 5, 
            repeat: Infinity, 
            delay: Math.random() * 5 
          }}
          className="absolute w-1 h-1 bg-[#FFC400] rounded-full"
        />
      ))}
    </div>
  );
};

const ScanLine = () => (
  <motion.div
    initial={{ top: '-10%' }}
    animate={{ top: '110%' }}
    transition={{ duration: 1.5, ease: "linear", repeat: 0 }}
    className="absolute left-0 w-full h-[2px] bg-[#FFC400]/30 z-[60] pointer-events-none blur-sm"
  />
);

const TacticalLines = () => (
  <div className="absolute inset-0 z-0 pointer-events-none opacity-10">
    <motion.div 
      animate={{ x: [-20, 20, -20] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[20%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FFC400] to-transparent" 
    />
    <motion.div 
      animate={{ x: [20, -20, 20] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-[30%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FFC400] to-transparent" 
    />
  </div>
);

const Shockwave = ({ trigger }: { trigger: boolean }) => (
  <AnimatePresence>
    {trigger && (
      <motion.div
        initial={{ scale: 0.5, opacity: 1 }}
        animate={{ scale: 3, opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-2 border-[#FFC400] rounded-full z-0"
      />
    )}
  </AnimatePresence>
);

const Hero = () => {
  const [dominateTrigger, setDominateTrigger] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Parallax effects
  const yRange = useTransform(scrollY, [0, 500], [0, -150]);
  const opacityRange = useTransform(scrollY, [0, 300], [1, 0]);
  const scaleRange = useTransform(scrollY, [0, 500], [1, 0.9]);
  const springY = useSpring(yRange, { stiffness: 100, damping: 30 });

  // Mouse parallax movement
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 40;
    const y = (clientY / innerHeight - 0.5) * 40;
    setMousePos({ x, y });
  };

  useEffect(() => {
    const timer = setTimeout(() => setDominateTrigger(true), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0B1C2D]"
    >
      <ScanLine />
      <RadarDots />
      <TacticalLines />
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid opacity-10 z-0 pointer-events-none" />
      
      {/* Ambient Gradient Glow */}
      <motion.div 
        animate={{ 
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.1, 1] 
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#FFC400]/5 rounded-full blur-[150px] z-0" 
      />

      <motion.div 
        style={{ y: springY, opacity: opacityRange, scale: scaleRange }}
        className="container mx-auto px-6 md:px-12 relative z-30"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-32">
          
          {/* LEFT: DRAMATIC HEADLINE */}
          <div className="flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-8"
            >
              <span className="font-syncopate text-[#FFC400] text-[10px] md:text-xs tracking-[0.6em] font-bold uppercase">
                GEEKAY ESPORTS 2026 // SEASON OPEN
              </span>
            </motion.div>

            <div className="relative mb-12 lg:mb-16">
              <div className="flex flex-col gap-1 lg:gap-2">
                {/* GEAR UP */}
                <motion.div
                  initial={{ opacity: 0, x: -100, filter: "blur(20px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                >
                  <h2 className="font-syncopate text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-none">
                    GEAR UP.
                  </h2>
                </motion.div>

                {/* LEVEL UP */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 1.5, ease: "easeOut" }}
                >
                  <h2 className="font-syncopate text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-none">
                    LEVEL UP.
                  </h2>
                </motion.div>

                {/* DOMINATE */}
                <div className="relative pt-2 lg:pt-4">
                  <Shockwave trigger={dominateTrigger} />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5, filter: "blur(40px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 2.2, 
                      type: "spring", 
                      stiffness: 120, 
                      damping: 10 
                    }}
                    className="relative z-10"
                  >
                    <motion.h1 
                      animate={dominateTrigger ? { 
                        textShadow: ["0 0 0px #FFC400", "0 0 40px #FFC400", "0 0 15px #FFC400"] 
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity, delay: 2.8 }}
                      className="font-syncopate text-5xl md:text-[80px] lg:text-[100px] font-black text-[#FFC400] uppercase tracking-tighter leading-none drop-shadow-[0_0_20px_rgba(255,196,0,0.5)]"
                    >
                      DOMINATE.
                    </motion.h1>
                  </motion.div>
                </div>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <ArenaButton className="h-16 md:h-20 min-w-[240px] md:min-w-[260px] text-base md:text-lg" icon={<ChevronRight size={20} />}>
                ENTER SEASON
              </ArenaButton>
              <Link to="/schedule">
                <ArenaButton variant="outline" className="h-16 md:h-20 min-w-[240px] md:min-w-[260px] text-base md:text-lg">
                  VIEW SCHEDULE
                </ArenaButton>
              </Link>
            </motion.div>
          </div>

          {/* RIGHT: 3D WORDMARK (LOGO) - Balanced Size and Spacing */}
          <div className="hidden lg:flex justify-center items-center relative perspective-[1200px]">
            <motion.div
              style={{ 
                rotateX: mousePos.y * 0.1, 
                rotateY: mousePos.x * 0.1,
                x: mousePos.x * 0.3,
                y: mousePos.y * 0.3
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 2.8, ease: "circOut" }}
              className="relative group cursor-default"
            >
              {/* Echo Layers */}
              <motion.div 
                initial={{ opacity: 0, x: 15, y: 15 }}
                animate={{ opacity: 0.04, x: 8, y: 8 }}
                transition={{ duration: 1, delay: 3 }}
                className="absolute top-0 left-0 font-syncopate text-[80px] lg:text-[90px] xl:text-[110px] font-black leading-none text-white skew-x-[-15deg] pointer-events-none tracking-tight whitespace-nowrap"
              >
                GEEKAY
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 30, y: 30 }}
                animate={{ opacity: 0.02, x: 15, y: 15 }}
                transition={{ duration: 1, delay: 3.2 }}
                className="absolute top-0 left-0 font-syncopate text-[80px] lg:text-[90px] xl:text-[110px] font-black leading-none text-white skew-x-[-15deg] pointer-events-none tracking-tight whitespace-nowrap"
              >
                GEEKAY
              </motion.div>

              {/* Main Text Wordmark */}
              <div className="relative">
                <h2 className="font-syncopate text-[80px] lg:text-[90px] xl:text-[110px] font-black leading-none text-[#FFC400] skew-x-[-15deg] select-none relative z-10 tracking-tight whitespace-nowrap">
                  GEEKAY
                  {/* Glow Sweep Overlay */}
                  <motion.div 
                    animate={{ left: ['-100%', '200%'] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", repeatDelay: 3 }}
                    className="absolute top-0 h-full w-20 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[15deg] z-20 pointer-events-none" 
                  />
                </h2>
                
                {/* Border Version Behind */}
                <h2 
                  className="absolute top-0 left-0 font-syncopate text-[80px] lg:text-[90px] xl:text-[110px] font-black leading-none text-transparent border-text skew-x-[-15deg] opacity-10 -z-10 translate-x-2 translate-y-2 pointer-events-none tracking-tight whitespace-nowrap" 
                  style={{ WebkitTextStroke: '2px #FFC400' }}
                >
                  GEEKAY
                </h2>
              </div>

              {/* HUD Frame Elements */}
              <div className="absolute -top-10 -left-10 w-20 h-20 border-t-2 border-l-2 border-[#FFC400]/40" />
              <div className="absolute -bottom-10 -right-10 w-20 h-20 border-b-2 border-r-2 border-[#FFC400]/40" />
              
              <div className="absolute -top-12 right-0 font-syncopate text-[8px] text-[#FFC400]/40 font-bold uppercase tracking-[0.5em]">
                GK_UNIT_CORE
              </div>
              <div className="absolute bottom-[-45px] left-0 font-syncopate text-[8px] text-[#FFC400]/40 font-bold uppercase tracking-[0.5em]">
                ARENA_SYNC_ACTIVE
              </div>
            </motion.div>
          </div>

        </div>
      </motion.div>
    </section>
  );
};

// --- Module Expansion Component ---

const ModuleExpansion = ({ module, index }: { module: any, index: number }) => (
  <motion.div
    initial={{ height: 0, opacity: 0 }}
    animate={{ height: 'auto', opacity: 1 }}
    exit={{ height: 0, opacity: 0 }}
    transition={{ duration: 0.5, ease: "circOut" }}
    className="overflow-hidden bg-[#0A1A31] border-x border-b border-[#FFC400]/20 mb-12 relative"
  >
    <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none" />
    <div className="p-12 md:p-16 grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
      <div className="space-y-10">
        <motion.h4 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-syncopate text-3xl font-black text-white uppercase"
        >
          {module.title} <span className="text-[#FFC400]">MISSION</span>
        </motion.h4>
        <ul className="space-y-6">
          {module.bullets.map((bullet: string, i: number) => (
            <motion.li 
              key={i}
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 + (i * 0.1) }}
              className="flex items-center gap-6"
            >
              <div className="w-1.5 h-1.5 bg-[#FFC400]" />
              <span className="font-syncopate text-[10px] md:text-xs text-slate-300 tracking-widest uppercase font-bold">
                {bullet}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="relative h-64 lg:h-auto flex items-center justify-center">
         {/* Tactical Graphic Animation */}
         <div className="relative w-48 h-48">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border border-[#FFC400]/30 rounded-full"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 border border-white/10 rounded-full"
            />
            <div className="absolute inset-0 flex items-center justify-center">
               <Target size={40} className="text-[#FFC400]/40 animate-pulse" />
            </div>
            {/* Procedure Line Drawing */}
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <motion.circle
                cx="50%"
                cy="50%"
                r="45%"
                fill="none"
                stroke="#FFC400"
                strokeWidth="2"
                strokeDasharray="283"
                initial={{ strokeDashoffset: 283 }}
                whileInView={{ strokeDashoffset: 100 }}
                transition={{ duration: 2, delay: 0.5 }}
              />
            </svg>
         </div>
      </div>
    </div>
  </motion.div>
);

// --- Tactical Module Panel Component ---

const ModulePanel = ({ module, index, isActive, onToggle }: any) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onToggle}
        whileHover={{ y: -6 }}
        className={`relative p-10 md:p-14 bg-[#0A254D]/10 border transition-all duration-500 cursor-pointer overflow-hidden group
          ${isActive ? 'border-[#FFC400] bg-[#0A254D]/30' : 'border-slate-800 hover:border-[#FFC400]/60'}`}
      >
        {/* Module Index */}
        <div className="absolute top-10 right-10 font-syncopate text-6xl font-black text-slate-800/20 group-hover:text-[#FFC400]/10 transition-colors pointer-events-none select-none">
          0{index + 1}
        </div>

        {/* Scan Line Animation (on hover) */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ left: '-100%' }}
              animate={{ left: '100%' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute top-0 bottom-0 w-1 bg-[#FFC400] z-20 shadow-[0_0_20px_#FFC400] pointer-events-none"
            />
          )}
        </AnimatePresence>

        <div className="relative z-10 flex flex-col justify-between h-full">
          <div>
            <motion.div 
              animate={isHovered ? { rotate: 8, scale: 1.1 } : { rotate: 0, scale: 1 }}
              className="mb-12 text-[#FFC400]/60 group-hover:text-[#FFC400] transition-colors"
            >
              {module.icon}
            </motion.div>
            <h3 className="font-syncopate text-xl md:text-2xl font-bold text-white uppercase group-hover:text-[#FFC400] transition-colors mb-6 tracking-tight">
              {module.title}
            </h3>
            <p className="text-slate-500 font-inter text-sm md:text-base leading-relaxed font-light tracking-wide uppercase group-hover:text-slate-400 transition-colors">
              {module.desc}
            </p>
          </div>

          <div className="mt-12 h-6 flex items-center">
            <AnimatePresence>
              {(isHovered || isActive) && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="font-syncopate text-[9px] font-black text-[#FFC400] tracking-[0.3em] flex items-center gap-3 uppercase"
                >
                  {isActive ? 'CLOSE MODULE' : 'OPEN MODULE'} <ChevronRight size={14} className={isActive ? 'rotate-90' : ''} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
      <AnimatePresence>
        {isActive && <ModuleExpansion module={module} index={index} />}
      </AnimatePresence>
    </div>
  );
};

const TheGeekayEdge = () => {
  const [activeModule, setActiveModule] = useState<number | null>(null);

  const modules = [
    { 
      icon: <Search size={28} />, 
      title: 'ELITE TALENT', 
      desc: 'Rigorous performance-based scouting and growth protocols.',
      bullets: ['BIOMETRIC TRAINING LOOPS', 'MENTAL CONDITIONING LABS', 'ROSTER DEPTH SCALING']
    },
    { 
      icon: <BarChart3 size={28} />, 
      title: 'DATA STRATEGY', 
      desc: 'Optimizing tactical execution through advanced analytics.',
      bullets: ['PREDICTIVE HEATMAPS', 'REAL-TIME META ANALYSIS', 'PROCEDURAL VOD REVIEW']
    },
    { 
      icon: <Globe size={28} />, 
      title: 'GLOBAL PRESENCE', 
      desc: 'A relentless pursuit of dominance on the world stages.',
      bullets: ['REGIONAL OPERATIONAL HUBS', 'GLOBAL FAN SYNC NODES', 'CROSS-BORDER LOGISTICS']
    },
    { 
      icon: <Shield size={28} />, 
      title: 'CHAMPION CULTURE', 
      desc: 'Built on a foundation of collective accountability and elite mindset.',
      bullets: ['RADICAL ACCOUNTABILITY', 'PRESSURE-TESTED LEADERSHIP', 'VICTORY-FIRST STANDARDS']
    }
  ];

  return (
    <section className="py-40 md:py-60 px-6 bg-[#030C1A] border-b border-slate-900 relative">
      {/* Background Noise & Grain */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 flex flex-col items-start relative">
          <motion.span 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-syncopate text-[#FFC400] text-[10px] md:text-xs tracking-[0.8em] font-bold mb-6 block uppercase"
          >
            THE_METHODOLOGY
          </motion.span>
          
          <div className="relative group">
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="font-syncopate text-5xl md:text-8xl font-black uppercase tracking-tighter text-white leading-none mb-6"
            >
              THE GEEKAY <span 
                className="text-transparent border-text-gold" 
                style={{ WebkitTextStroke: '2px #FFC400', textShadow: '0 0 20px rgba(255,196,0,0.1)' }}
              >EDGE</span>
            </motion.h2>
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.5 }}
            viewport={{ once: true }}
            className="text-white font-syncopate text-[10px] md:text-sm tracking-[0.5em] uppercase font-light"
          >
            WHAT SEPARATES CONTENDERS FROM CHAMPIONS.
          </motion.p>

          {/* Animated Loading Divider */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "circOut", delay: 0.5 }}
            className="absolute -bottom-8 left-0 w-full h-[1px] bg-gradient-to-r from-[#FFC400] to-transparent origin-left"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 lg:gap-4 mt-12">
          {modules.map((m, i) => (
            <ModulePanel 
              key={i} 
              module={m} 
              index={i} 
              isActive={activeModule === i}
              onToggle={() => setActiveModule(activeModule === i ? null : i)}
            />
          ))}
        </div>

        {/* Console Footer Info */}
        <div className="mt-20 flex justify-between items-center opacity-20 group">
          <div className="flex gap-4 items-center">
             <div className="w-1.5 h-1.5 bg-[#FFC400] animate-pulse" />
             <span className="font-syncopate text-[8px] tracking-[0.4em] font-bold text-white uppercase">GK_CORE_SYSTEM // EDGE_PROTOCOL_V1.2</span>
          </div>
          <div className="font-mono text-[8px] text-white uppercase tracking-widest">ENCRYPT_SEC_LEVEL: ALPHA_NINE</div>
        </div>
      </div>

      <style>{`
        .border-text-gold {
          -webkit-text-stroke: 1px #FFC400;
        }
        .bg-grid {
          background-image: linear-gradient(to right, rgba(255, 196, 0, 0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 196, 0, 0.05) 1px, transparent 1px);
        }
      `}</style>
    </section>
  );
};

// --- PlayerDetailModal ---
const PlayerDetailModal: React.FC<{ player: Player; onClose: () => void }> = ({ player, onClose }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-[#081B3A]/95 backdrop-blur-xl"
    onClick={onClose}
  >
    <motion.div 
      initial={{ scale: 0.9, y: 30 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.9, y: 30 }}
      className="bg-[#040E1E] border border-slate-800 w-full max-w-5xl relative overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]"
      onClick={e => e.stopPropagation()}
    >
      <button onClick={onClose} className="absolute top-6 right-6 z-20 text-white hover:text-[#FFC400] transition-colors">
        <X size={32} />
      </button>
      
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="h-[300px] lg:h-[600px] relative overflow-hidden">
          <img src={player.photo} alt={player.nickname} className="w-full h-full object-cover grayscale" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#040E1E] via-transparent to-transparent" />
          <div className="absolute bottom-10 left-10">
            <span className="text-[#FFC400] font-syncopate text-[10px] tracking-[0.4em] font-bold block mb-2 uppercase">{player.role}</span>
            <h2 className="font-syncopate text-5xl md:text-7xl font-bold leading-none">{player.nickname}</h2>
          </div>
        </div>

        <div className="p-8 md:p-16 flex flex-col justify-center">
          <div className="flex gap-4 mb-10">
            <Twitter size={20} className="text-slate-400 hover:text-[#FFC400] cursor-pointer" />
            <Twitch size={20} className="text-slate-400 hover:text-[#FFC400] cursor-pointer" />
          </div>

          <p className="text-slate-400 text-lg mb-12 leading-relaxed font-light">{player.bio}</p>

          <div className="grid grid-cols-2 gap-10">
            <div>
              <span className="text-slate-500 font-syncopate text-[9px] tracking-widest block mb-2 uppercase">K/D RATIO</span>
              <span className="text-4xl font-syncopate font-bold text-white">{player.stats.kd}</span>
              <div className="h-1 w-12 bg-[#FFC400] mt-3" />
            </div>
            <div>
              <span className="text-slate-500 font-syncopate text-[9px] tracking-widest block mb-2 uppercase">WIN RATE</span>
              <span className="text-4xl font-syncopate font-bold text-[#FFC400]">{player.stats.winRate}</span>
              <div className="h-1 w-12 bg-white mt-3" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const AnimatedNumber: React.FC<{ value: string }> = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const targetValue = parseFloat(value.replace(/[^0-9.]/g, '')) || 0;
  const isFloat = value.includes('.');
  const suffix = value.replace(/[0-9.]/g, '');
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 1000; // 1s duration as requested
      const startTime = performance.now();

      const update = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smoother count-up
        const easeOutQuad = (t: number) => t * (2 - t);
        const easedProgress = easeOutQuad(progress);
        
        const current = easedProgress * targetValue;
        
        setDisplayValue(current);

        if (progress < 1) {
          requestAnimationFrame(update);
        }
      };

      requestAnimationFrame(update);
    }
  }, [isInView, targetValue]);

  return (
    <motion.span
      ref={nodeRef}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      className="font-syncopate text-5xl md:text-6xl lg:text-7xl font-bold text-white block tracking-tighter"
    >
      {isFloat ? displayValue.toFixed(1) : Math.floor(displayValue)}{suffix}
    </motion.span>
  );
};

const NewsAnnouncements = () => {
  const news = MOCK_NEWS.slice(0, 3);
  const featured = news[0]; // International Qualifications
  const others = news.slice(1); // RL Decals and Roster Announcements

  return (
    <section className="py-32 px-6 bg-[#081B3A] relative overflow-hidden border-y border-slate-800/50">
      <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none" />
      <div className="max-w-7xl mx-auto">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-[1px] bg-[#FFC400]" />
              <span className="font-syncopate text-[#FFC400] text-[10px] font-black tracking-[0.4em] uppercase">NEWS_FEED // INTEL</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-syncopate text-4xl md:text-6xl font-bold text-white uppercase tracking-tighter relative inline-block"
            >
              NEWS & <span className="text-[#FFC400]">ANNOUNCEMENTS</span>
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5, ease: "circOut" }}
                className="absolute -bottom-2 left-0 w-full h-[2px] bg-[#FFC400] origin-left"
              />
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link to="/news" className="group flex items-center gap-4 font-syncopate text-[10px] font-bold text-slate-400 hover:text-[#FFC400] transition-colors tracking-[0.2em]">
              VIEW ALL NEWS <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* News Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Featured Card (International Qualifications) */}
          <motion.div 
            initial={{ opacity: 0, y: 30, clipPath: 'inset(0 100% 0 0)' }}
            whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0 0)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="lg:col-span-8 group relative bg-[#0A1A31] border border-slate-800 hover:border-[#FFC400]/40 transition-all duration-500 overflow-hidden h-[500px] md:h-[600px]"
          >
            <div className="absolute inset-0 overflow-hidden">
              <motion.img 
                src={featured.image} 
                alt={featured.title} 
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.6 }}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#081B3A] via-[#081B3A]/60 to-transparent" />
            </div>
            
            <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end">
              <div className="mb-6">
                <span className="bg-[#FFC400] text-black px-4 py-1 font-syncopate text-[9px] font-black tracking-widest uppercase inline-block">
                  {featured.category}
                </span>
              </div>
              
              <h3 className="font-syncopate text-3xl md:text-5xl font-bold text-white uppercase mb-6 leading-tight relative inline-block w-fit">
                {featured.title}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#FFC400] group-hover:w-full transition-all duration-500" />
              </h3>
              
              <p className="text-slate-300 text-sm md:text-lg mb-8 line-clamp-2 font-light max-w-2xl uppercase tracking-wide">
                {featured.excerpt}
              </p>
              
              <div className="flex items-center justify-between pt-8 border-t border-white/10">
                <div className="flex items-center gap-6 text-slate-500 font-syncopate text-[9px] tracking-widest">
                  <span>{featured.date}</span>
                  <div className="w-1 h-1 bg-slate-700 rounded-full" />
                  <span>{featured.readTime}</span>
                </div>
                <Link to={`/news/${featured.slug}`} className="flex items-center gap-3 text-[#FFC400] font-syncopate text-[9px] font-black tracking-[0.3em] uppercase group/link">
                  READ UPDATE <ArrowRight size={14} className="group-hover/link:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Corner Markers */}
            <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-[#FFC400]/20 group-hover:border-[#FFC400]/50 transition-colors" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-[#FFC400]/20 group-hover:border-[#FFC400]/50 transition-colors" />
          </motion.div>

          {/* Secondary Cards */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {others.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 30, clipPath: 'inset(0 0 0 100%)' }}
                whileInView={{ opacity: 1, x: 0, clipPath: 'inset(0 0 0 0)' }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + (idx * 0.1), duration: 0.6, ease: "circOut" }}
                className="group relative flex flex-col bg-[#0A1A31] border border-slate-800 hover:border-[#FFC400]/40 transition-all duration-500 overflow-hidden h-[241px] md:h-[291px]"
              >
                <div className="absolute inset-0 overflow-hidden">
                  <motion.img 
                    src={item.image} 
                    alt={item.title} 
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#081B3A] via-[#081B3A]/80 to-transparent" />
                </div>
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="mb-4">
                    <span className="bg-[#FFC400] text-black px-3 py-1 font-syncopate text-[8px] font-black tracking-widest uppercase inline-block">
                      {item.category}
                    </span>
                  </div>
                  
                  <h4 className="font-syncopate text-base md:text-lg font-bold text-white uppercase mb-4 group-hover:text-[#FFC400] transition-colors line-clamp-2 relative inline-block w-fit">
                    {item.title}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#FFC400] group-hover:w-full transition-all duration-500" />
                  </h4>
                  
                  <p className="text-slate-400 text-[10px] md:text-xs mb-6 line-clamp-2 font-light uppercase tracking-wide">
                    {item.excerpt}
                  </p>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-white/10">
                    <span className="text-slate-500 font-syncopate text-[8px] tracking-widest">{item.date}</span>
                    <Link to={`/news/${item.slug}`} className="text-[#FFC400] font-syncopate text-[8px] font-black tracking-widest flex items-center gap-2 group/btn">
                      READ <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
                
                {/* Corner Markers */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#FFC400]/20 group-hover:border-[#FFC400]/50 transition-colors" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const AboutSnapshot = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const leftY = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const rightY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  const stats = [
    { label: 'GLOBAL COMMUNITY', value: '24.1M', sub: 'Active network' },
    { label: 'MAJOR TITLES', value: '32', sub: 'Championship wins' },
    { label: 'WIN RATE', value: '68%', sub: 'Last 100 matches' },
    { label: 'ACTIVE TEAMS', value: '12', sub: 'Elite divisions' },
  ];

  return (
    <section ref={sectionRef} className="py-40 px-6 bg-[#081B3A] relative overflow-hidden border-t border-slate-800/50">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid opacity-[0.05] pointer-events-none" />
      
      {/* Animated Scanning Line */}
      <motion.div
        animate={{ top: ['-10%', '110%'] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 w-full h-[1px] bg-[#FFC400]/10 z-0 pointer-events-none"
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[0.4fr_0.6fr] gap-16 lg:gap-24 items-center relative z-10">
        
        {/* Left Side: Content */}
        <motion.div
          style={{ y: leftY }}
          className="flex flex-col items-start"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-syncopate text-[#FFC400] text-[10px] md:text-xs tracking-[0.5em] font-bold uppercase block mb-6"
          >
            ABOUT GEEKAY // SNAPSHOT
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-syncopate text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-[1.1] mb-8"
          >
            WHO IS <span className="text-[#FFC400]">GEEKAY ESPORTS?</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-base md:text-lg font-light leading-relaxed mb-10 max-w-md"
          >
            A premier multi-division organization dedicated to competitive excellence, 
            maintaining a relentless focus on regional dominance and international prestige.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-syncopate text-lg md:text-xl font-bold text-white uppercase tracking-[0.15em] border-l-4 border-[#FFC400] pl-8 py-2 bg-white/5"
          >
            “FORGED IN MENA.<br />BUILT FOR GLOBAL STAGES.”
          </motion.div>
        </motion.div>

        {/* Right Side: Stats Grid */}
        <motion.div 
          style={{ y: rightY }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + (i * 0.1), duration: 0.6 }}
              whileHover={{ 
                y: -8, 
                backgroundColor: 'rgba(10, 26, 49, 0.9)',
                boxShadow: '0 0 30px rgba(255, 196, 0, 0.15)'
              }}
              className="bg-[#0A1A31]/40 border border-slate-800 p-10 group transition-all duration-300 relative overflow-hidden"
            >
              {/* Subtle Edge Glow on Hover */}
              <div className="absolute inset-0 border border-[#FFC400]/0 group-hover:border-[#FFC400]/20 transition-colors pointer-events-none" />
              
              <div className="mb-8">
                 <AnimatedNumber value={stat.value} />
                 <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 1 + (i * 0.1) }}
                    className="h-[1px] bg-[#FFC400] mt-4 opacity-50"
                  />
              </div>
              
              <div className="space-y-2">
                <div className="font-syncopate text-[11px] text-white tracking-[0.3em] uppercase font-black group-hover:text-[#FFC400] transition-colors">
                  {stat.label}
                </div>
                <p className="text-slate-500 font-syncopate text-[9px] tracking-widest uppercase">
                  {stat.sub}
                </p>
              </div>

              {/* Tactical Corner Marker */}
              <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-[#FFC400]/10 group-hover:border-[#FFC400]/30 transition-colors" />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

const LiveOperationsHighlight = () => {
  const upcomingMatches = [
    {
      id: 'm1',
      game: 'VALORANT',
      title: 'VCT CHALLENGERS',
      opponent: 'TEAM FALCONS',
      date: 'FEB 28, 2026',
      time: '18:00 GST',
      region: 'MENA',
      countdown: '2D 11H'
    },
    {
      id: 'm2',
      game: 'DOTA 2',
      title: 'RIYADH MASTERS',
      opponent: 'NIGMA GALAXY',
      date: 'MAR 02, 2026',
      time: '20:00 GST',
      region: 'GLOBAL',
      countdown: '4D 13H'
    },
    {
      id: 'm3',
      game: 'CS2',
      title: 'PRO LEAGUE S13',
      opponent: 'G2 ESPORTS',
      date: 'MAR 05, 2026',
      time: '19:30 GST',
      region: 'EU',
      countdown: '7D 12H'
    }
  ];

  const featuredTournament = MOCK_EVENTS[1]; // THE INTERNATIONAL 2026

  return (
    <section className="py-32 px-6 bg-[#081B3A] relative overflow-hidden border-t border-slate-800/50">
      <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="w-8 h-[1px] bg-[#FFC400]" />
            <span className="font-syncopate text-[#FFC400] text-[10px] font-black tracking-[0.4em] uppercase">LIVE_OPERATIONS // HIGHLIGHT</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-syncopate text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4"
          >
            SCHEDULE <span className="text-[#FFC400]">HIGHLIGHT</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            viewport={{ once: true }}
            className="text-slate-400 font-syncopate text-[10px] tracking-[0.2em] uppercase"
          >
            Upcoming matches and featured tournaments.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Upcoming Matches */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-syncopate text-xs font-bold text-white/40 tracking-[0.3em] uppercase mb-8">UPCOMING MATCHES</h3>
            {upcomingMatches.map((match, idx) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="group relative bg-[#0A1A31]/40 border border-slate-800 p-6 md:p-8 hover:border-[#FFC400]/30 transition-all overflow-hidden"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="space-y-4">
                    <span className="text-[#FFC400] font-syncopate text-[9px] font-black tracking-widest uppercase">{match.game}</span>
                    <div className="space-y-1">
                      <h4 className="font-syncopate text-lg md:text-xl font-bold text-white uppercase">{match.title}</h4>
                      <p className="text-slate-400 font-syncopate text-[10px] tracking-widest uppercase">VS {match.opponent}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:items-end gap-2">
                    <div className="flex items-center gap-3 text-slate-300 font-syncopate text-[10px] tracking-widest">
                      <Calendar size={14} className="text-[#FFC400]" />
                      <span>{match.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-500 font-syncopate text-[10px] tracking-widest">
                      <Clock size={14} />
                      <span>{match.time} // {match.region}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="px-3 py-1 bg-[#FFC400]/10 border border-[#FFC400]/20 text-[#FFC400] font-syncopate text-[8px] font-bold tracking-widest uppercase">
                      STARTS IN: {match.countdown}
                    </div>
                  </div>
                  <Link to="/schedule" className="group/link flex items-center gap-2 font-syncopate text-[9px] font-black text-[#FFC400] tracking-[0.2em] uppercase relative">
                    VIEW MATCH 
                    <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#FFC400] group-hover/link:w-full transition-all duration-300" />
                  </Link>
                </div>

                {/* Hover Border Animation */}
                <div className="absolute top-0 right-0 w-0 h-[1px] bg-[#FFC400] group-hover:w-full transition-all duration-500" />
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#FFC400] group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </div>

          {/* Right Column: Featured Tournament */}
          <div className="lg:col-span-5">
            <h3 className="font-syncopate text-xs font-bold text-white/40 tracking-[0.3em] uppercase mb-8">FEATURED TOURNAMENT</h3>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group relative bg-[#0A1A31] border border-slate-800 hover:border-[#FFC400]/40 transition-all duration-500 overflow-hidden h-full flex flex-col"
            >
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={featuredTournament.image} 
                  alt={featuredTournament.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A31] via-[#0A1A31]/40 to-transparent" />
                <div className="absolute top-6 right-6">
                  <span className="bg-[#FFC400] text-black px-4 py-1 font-syncopate text-[10px] font-black tracking-widest uppercase">
                    {featuredTournament.status}
                  </span>
                </div>
              </div>

              <div className="p-8 md:p-12 flex-grow flex flex-col">
                <div className="mb-6">
                  <span className="text-[#FFC400] font-syncopate text-[10px] font-black tracking-widest uppercase">{featuredTournament.game}</span>
                  <h4 className="font-syncopate text-2xl md:text-4xl font-bold text-white uppercase mt-2 leading-tight">{featuredTournament.title}</h4>
                </div>

                <div className="space-y-6 mb-12">
                  <div className="flex items-center gap-4 text-slate-300">
                    <Calendar size={18} className="text-[#FFC400]" />
                    <span className="font-syncopate text-xs tracking-widest uppercase">{featuredTournament.date}</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-300">
                    <MapPin size={18} className="text-[#FFC400]" />
                    <span className="font-syncopate text-xs tracking-widest uppercase">{featuredTournament.location}</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-300">
                    <Trophy size={18} className="text-[#FFC400]" />
                    <span className="font-syncopate text-xs tracking-widest uppercase">PRIZE POOL: {featuredTournament.prizePool}</span>
                  </div>
                </div>

                <div className="mt-auto">
                  <Link to="/schedule">
                    <ArenaButton className="w-full" icon={<ArrowRight size={18} />}>
                      VIEW TOURNAMENT
                    </ArenaButton>
                  </Link>
                </div>
              </div>

              {/* Corner Markers */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-[#FFC400]/20 group-hover:border-[#FFC400]/50 transition-colors" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-[#FFC400]/20 group-hover:border-[#FFC400]/50 transition-colors" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Sponsors = () => (
  <div className="py-24 bg-[#081B3A]/60 overflow-hidden whitespace-nowrap border-b border-slate-800">
    <div className="inline-block animate-scroll">
       {['RAZER', 'LOGITECH', 'MONSTER', 'RED BULL', 'NVIDIA', 'INTEL'].map((s, i) => (
         <span key={i} className="font-syncopate text-2xl md:text-5xl font-bold mx-24 text-slate-800 hover:text-[#FFC400] transition-colors cursor-default opacity-40 hover:opacity-100">
           {s}
         </span>
       ))}
    </div>
    <div className="inline-block animate-scroll">
       {['RAZER', 'LOGITECH', 'MONSTER', 'RED BULL', 'NVIDIA', 'INTEL'].map((s, i) => (
         <span key={i} className="font-syncopate text-2xl md:text-5xl font-bold mx-24 text-slate-800 hover:text-[#FFC400] transition-colors cursor-default opacity-40 hover:opacity-100">
           {s}
         </span>
       ))}
    </div>
    <style>{`
      @keyframes scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .animate-scroll {
        animation: scroll 40s linear infinite;
      }
    `}</style>
  </div>
);

const Home = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative"
    >
      <Hero />
      <Sponsors />
      <NewsAnnouncements />
      <AboutSnapshot />
      <LiveOperationsHighlight />
      <TheGeekayEdge />
    </motion.div>
  );
};

export default Home;
