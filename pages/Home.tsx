
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { ChevronRight, PlayCircle, Search, BarChart3, Globe, Shield, X, Twitter, Twitch, Cpu, Target, Layers, Zap, ArrowDown } from 'lucide-react';
import ArenaButton from '../components/ui/ArenaButton';
import { MOCK_EVENTS, MOCK_TEAMS } from '../constants';
import { Link } from 'react-router-dom';
import { Player } from '../types';

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
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="font-syncopate text-5xl md:text-8xl font-bold text-white block"
    >
      {value}
    </motion.span>
  );
};

const EventSpotlight = () => {
  const event = MOCK_EVENTS[0];
  return (
    <section className="py-32 px-6 bg-[#040E1E]/40 relative overflow-hidden border-y border-slate-800/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-6 mb-16">
          <div className="w-16 h-[2px] bg-[#FFC400]" />
          <h2 className="font-syncopate text-xl font-bold tracking-[0.3em]">EVENT SPOTLIGHT</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-slate-800 bg-[#081B3A] group shadow-2xl">
          <div className="lg:col-span-5 p-10 md:p-16 relative z-20 flex flex-col justify-center">
             <div className="flex items-center gap-3 mb-8">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                </span>
                <span className="font-syncopate text-[10px] font-black text-red-600 tracking-widest">LIVE BROADCAST</span>
             </div>
             
             <span className="text-slate-500 font-syncopate text-[10px] tracking-[0.5em] mb-4 block uppercase">{event.game}</span>
             <h3 className="font-syncopate text-4xl md:text-6xl font-bold mb-12 leading-[1.1] text-white">
                {event.title.split(' ').map((word, i) => (
                  <span key={i} className={i === 0 ? 'text-[#FFC400]' : ''}>{word} </span>
                ))}
             </h3>
             
             <div className="flex gap-4 mb-16">
                {[
                  { label: 'HRS', val: '04' },
                  { label: 'MIN', val: '22' },
                  { label: 'SEC', val: '18' }
                ].map((t, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-900 border border-slate-800 flex items-center justify-center font-syncopate text-2xl md:text-3xl font-bold text-white group-hover:border-[#FFC400] transition-colors duration-500">
                      {t.val}
                    </div>
                    <span className="text-[8px] font-syncopate text-slate-500 mt-3 tracking-widest">{t.label}</span>
                  </div>
                ))}
             </div>

             <div className="flex items-center gap-8 pt-10 border-t border-slate-800/50">
                <ArenaButton icon={<PlayCircle size={18} />}>
                  WATCH LIVE
                </ArenaButton>
             </div>
          </div>

          <div className="lg:col-span-7 relative aspect-video lg:aspect-auto overflow-hidden">
             <motion.img 
               animate={{ scale: [1.05, 1.1, 1.05] }}
               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               src={event.image} 
               alt={event.title} 
               className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
             />
             <div className="absolute inset-0 bg-gradient-to-r from-[#081B3A] via-[#081B3A]/40 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

const TheFrontline = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const players = MOCK_TEAMS[0].players.slice(0, 4);

  return (
    <section className="py-32 px-6 bg-[#081B3A] border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="font-syncopate text-white/40 text-[10px] tracking-[0.5em] font-bold mb-4 block uppercase">OPERATIVES</span>
          <h2 className="font-syncopate text-4xl md:text-6xl font-bold uppercase tracking-tighter text-white">THE FRONTLINE</h2>
          <p className="mt-4 text-slate-500 font-syncopate text-[10px] tracking-[0.2em] uppercase">
            Built for pressure. Engineered to win.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {players.map((player) => (
            <motion.div 
              key={player.id}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
              onClick={() => setSelectedPlayer(player)}
              className="group relative aspect-[4/5] overflow-hidden bg-slate-900 border border-slate-800 hover:border-[#FFC400] hover:shadow-[0_0_30px_rgba(255,196,0,0.15)] transition-all duration-500 cursor-pointer"
            >
              <img 
                src={player.photo} 
                alt={player.nickname} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#081B3A] via-[#081B3A]/20 to-transparent opacity-90 transition-opacity group-hover:opacity-70" />
              
              <div className="absolute bottom-8 left-8 right-8">
                <span className="inline-block bg-[#FFC400] text-black px-3 py-1 font-syncopate text-[8px] font-bold tracking-widest uppercase mb-4 skew-x-[-15deg]">
                  <span className="block skew-x-[15deg]">{player.role}</span>
                </span>
                <h3 className="font-syncopate text-3xl font-bold text-white uppercase leading-none mb-6 group-hover:text-[#FFC400] transition-colors">
                  {player.nickname}
                </h3>
                <div className="flex justify-between py-4 border-t border-white/10">
                  <div className="flex flex-col">
                    <span className="text-slate-500 font-syncopate text-[7px] tracking-widest block mb-1 uppercase">K/D</span>
                    <span className="text-sm font-syncopate font-bold text-white">{player.stats.kd}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-slate-500 font-syncopate text-[7px] tracking-widest block mb-1 uppercase">MVP</span>
                    <span className="text-sm font-syncopate font-bold text-white">{player.stats.mvps}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-slate-500 font-syncopate text-[7px] tracking-widest block mb-1 uppercase">WIN RATE</span>
                    <span className="text-sm font-syncopate font-bold text-[#FFC400]">{player.stats.winRate}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedPlayer && <PlayerDetailModal player={selectedPlayer} onClose={() => setSelectedPlayer(null)} />}
      </AnimatePresence>
    </section>
  );
};

const AchievementStats = () => (
  <section className="py-48 px-6 bg-transparent border-y border-slate-900 relative overflow-hidden">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-syncopate text-[25vw] font-black text-white/[0.02] select-none pointer-events-none whitespace-nowrap">
      ARENA 2026
    </div>
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-24 relative z-10">
      {[
        { label: 'GLOBAL FANS', value: '2.4M', sub: 'Active community' },
        { label: 'MAJOR TROPHIES', value: '32', sub: 'Championship wins' },
        { label: 'WIN RATE', value: '68%', sub: 'Last 100 matches' },
      ].map((stat, i) => (
        <div key={i} className="group flex flex-col items-center md:items-start text-center md:text-left">
          <div className="mb-4">
             <AnimatedNumber value={stat.value} />
          </div>
          <div className="font-syncopate text-[10px] md:text-xs text-white tracking-[0.5em] mb-4 uppercase font-bold">{stat.label}</div>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '60px' }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-1 bg-[#FFC400] mb-6"
          />
          <p className="text-slate-500 font-syncopate text-[9px] tracking-widest uppercase">{stat.sub}</p>
        </div>
      ))}
    </div>
  </section>
);

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
      <EventSpotlight />
      <TheFrontline />
      <AchievementStats />
      <TheGeekayEdge />
    </motion.div>
  );
};

export default Home;
