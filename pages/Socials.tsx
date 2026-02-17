
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { Twitter, Twitch, Instagram, Youtube, Heart, MessageCircle, Share2, Users, Zap, TrendingUp, BarChart3, Globe, Play, ArrowRight, Activity, Share, Target, Cpu, RefreshCw, Shield } from 'lucide-react';
import ArenaButton from '../components/ui/ArenaButton';

// --- Components ---

const AnimatedCounter = ({ value, label, suffix = "" }: { value: number, label: string, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const counter = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(counter);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(counter);
    }, 500);
  }, [value]);

  return (
    <div ref={ref} className="flex flex-col">
      <div className="font-syncopate text-4xl md:text-6xl font-black text-[#FFC400] leading-none mb-2">
        {count}{suffix}
      </div>
      <div className="font-syncopate text-[9px] text-slate-500 tracking-[0.4em] uppercase font-bold">
        {label}
      </div>
    </div>
  );
};

const PlatformDominationCard = ({ platform, icon, stats, growth, engagement }: any) => {
  return (
    <motion.div
      whileHover={{ y: -10, rotateX: -5, rotateY: 5 }}
      style={{ perspective: 1000 }}
      className="relative group bg-[#0A254D]/20 border border-slate-800 p-10 md:p-14 overflow-hidden transition-all duration-500"
    >
      <div className="absolute inset-0 opacity-5 pointer-events-none flex items-end justify-center pb-10">
        <div className="flex gap-1 h-32 items-end">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ height: [10, Math.random() * 80 + 20, 10] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
              className="w-1 bg-white"
            />
          ))}
        </div>
      </div>

      <div className="absolute top-0 left-0 w-2 h-0 bg-[#FFC400] group-hover:h-full transition-all duration-700" />
      <div className="absolute top-0 left-0 w-0 h-2 bg-[#FFC400] group-hover:w-full transition-all duration-700 delay-100" />

      <div className="relative z-10">
        <div className={`mb-12 text-slate-400 group-hover:text-white transition-colors`}>
          {icon}
        </div>
        
        <div className="mb-10">
          <div className="font-syncopate text-5xl md:text-7xl font-black text-white mb-2 tracking-tighter group-hover:text-[#FFC400] transition-colors">
            {stats}
          </div>
          <div className="font-syncopate text-[10px] text-slate-500 tracking-[0.5em] uppercase font-bold">
            {platform} GLOBAL REACH
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-800/50">
          <div>
            <div className="font-syncopate text-[8px] text-slate-600 tracking-widest uppercase mb-2">GROWTH</div>
            <div className="flex items-center gap-2">
              <TrendingUp size={14} className="text-green-500" />
              <span className="font-syncopate text-sm font-bold text-white">{growth}</span>
            </div>
            <div className="mt-3 w-full h-[2px] bg-slate-800">
               <motion.div 
                 initial={{ width: 0 }}
                 whileInView={{ width: '75%' }}
                 transition={{ duration: 1.5, delay: 0.5 }}
                 className="h-full bg-green-500" 
               />
            </div>
          </div>
          <div>
            <div className="font-syncopate text-[8px] text-slate-600 tracking-widest uppercase mb-2">ENGAGEMENT</div>
            <div className="flex items-center gap-2">
              <Activity size={14} className="text-[#FFC400]" />
              <span className="font-syncopate text-sm font-bold text-white">{engagement}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const EcosystemGraph = () => {
  const nodes = [
    { icon: <Twitter size={20} />, angle: 0, label: "TWITTER", stats: "450K", color: "#1DA1F2" },
    { icon: <Twitch size={20} />, angle: 60, label: "TWITCH", stats: "1.2M", color: "#9146FF" },
    { icon: <Instagram size={20} />, angle: 120, label: "INSTAGRAM", stats: "620K", color: "#E1306C" },
    { icon: <Youtube size={20} />, angle: 180, label: "YOUTUBE", stats: "180K", color: "#FF0000" },
    { icon: <Zap size={20} />, angle: 240, label: "TIKTOK", stats: "800K", color: "#000000" },
    { icon: <MessageCircle size={20} />, angle: 300, label: "DISCORD", stats: "150K", color: "#5865F2" },
  ];

  return (
    <div className="relative w-full aspect-square max-w-3xl mx-auto flex items-center justify-center">
      {/* Tactical Radar Circles */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute w-[90%] h-[90%] border border-[#FFC400]/10 rounded-full"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute w-[70%] h-[70%] border border-[#FFC400]/5 rounded-full"
        />
        <div className="absolute w-[50%] h-[50%] border border-slate-800/30 rounded-full" />
      </div>

      {/* Center Command Node */}
      <motion.div 
        animate={{ scale: [1, 1.05, 1], boxShadow: ["0 0 20px rgba(255,196,0,0.1)", "0 0 50px rgba(255,196,0,0.3)", "0 0 20px rgba(255,196,0,0.1)"] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="w-40 h-40 md:w-56 md:h-56 bg-gradient-to-br from-[#FFC400] to-[#FF8C00] text-black rounded-full flex items-center justify-center z-20 skew-x-[-5deg] relative group cursor-pointer"
      >
        <div className="absolute inset-2 border border-black/20 rounded-full" />
        <div className="flex flex-col items-center skew-x-[5deg]">
          <span className="font-syncopate font-black text-2xl md:text-3xl tracking-tighter">GEEKAY</span>
          <span className="font-syncopate text-[8px] tracking-[0.4em] font-bold mt-2 opacity-60">HQ_CENTRAL</span>
        </div>
      </motion.div>

      {/* Orbiting Nodes */}
      {nodes.map((node, i) => {
        const radius = 320;
        const x = Math.cos((node.angle * Math.PI) / 180) * radius;
        const y = Math.sin((node.angle * Math.PI) / 180) * radius;

        return (
          <React.Fragment key={i}>
            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
              <motion.line
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.2 }}
                transition={{ duration: 1.5, delay: i * 0.1 }}
                x1="50%" y1="50%" 
                x2={`calc(50% + ${x}px)`} 
                y2={`calc(50% + ${y}px)`} 
                stroke="#FFC400" 
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <motion.circle
                animate={{ r: [0, 4, 0], opacity: [0, 0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                cx={`calc(50% + ${x/2}px)`}
                cy={`calc(50% + ${y/2}px)`}
                fill="#FFC400"
              />
            </svg>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 + 0.5 }}
              whileHover={{ scale: 1.1, zIndex: 50 }}
              className="absolute group cursor-pointer z-30"
              style={{ 
                left: `calc(50% + ${x}px)`, 
                top: `calc(50% + ${y}px)`,
                transform: 'translate(-50%, -50%)' 
              }}
            >
              <div className="bg-[#081B3A] border-2 border-slate-800 p-5 rounded-xl group-hover:border-[#FFC400] transition-all duration-300 relative overflow-hidden shadow-2xl">
                 <div className="absolute top-0 left-0 w-1 h-full bg-[#FFC400]/20 group-hover:bg-[#FFC400] transition-all" />
                 <div className="text-[#FFC400] group-hover:scale-110 transition-transform flex items-center justify-center">
                   {node.icon}
                 </div>
              </div>
              
              {/* Data Tooltip (Visible on Hover) */}
              <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 pointer-events-none">
                <div className="bg-[#040E1E]/95 backdrop-blur-md px-6 py-4 border border-[#FFC400] rounded-none skew-x-[-10deg] shadow-[0_0_30px_rgba(255,196,0,0.2)]">
                  <div className="skew-x-[10deg]">
                    <div className="font-syncopate text-[9px] text-slate-500 mb-1 tracking-widest">{node.label}</div>
                    <div className="font-syncopate text-lg text-white font-black">{node.stats}</div>
                    <div className="font-syncopate text-[7px] text-[#FFC400] font-bold mt-2">LINK_STABLE // 100%</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

const Socials = () => {
  return (
    <div className="bg-[#0B1C2D] min-h-screen overflow-x-hidden selection:bg-[#FFC400] selection:text-black">
      
      {/* 🎬 SECTION 1: HERO */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div 
            animate={{ 
              opacity: [0.3, 0.5, 0.3],
              scale: [1, 1.1, 1] 
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-[#FFC400]/5 rounded-full blur-[150px] z-0" 
          />
          <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
          <div className="absolute inset-0 bg-scanline opacity-20 pointer-events-none" />
          
          <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
             {[...Array(20)].map((_, i) => (
               <motion.div 
                 key={i}
                 initial={{ x: Math.random() * 100 + "%", y: Math.random() * 100 + "%" }}
                 animate={{ x: Math.random() * 100 + "%", y: Math.random() * 100 + "%" }}
                 transition={{ duration: 20 + Math.random() * 10, repeat: Infinity, ease: "linear" }}
                 className="absolute w-1 h-1 bg-white rounded-full"
               />
             ))}
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: 60 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-[2px] bg-[#FFC400] mb-8"
              />
              
              <div className="overflow-hidden mb-2">
                <motion.h1 
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7, ease: "circOut" }}
                  className="font-syncopate text-white text-4xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9]"
                >
                  WE DON’T POST.
                </motion.h1>
              </div>
              <div className="overflow-hidden mb-12">
                <motion.h1 
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 1, ease: "circOut" }}
                  className="font-syncopate text-[#FFC400] text-4xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] drop-shadow-[0_0_30px_rgba(255,196,0,0.3)]"
                >
                  WE COMMAND <br /> ATTENTION.
                </motion.h1>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="flex flex-col sm:flex-row gap-8"
              >
                <ArenaButton className="h-20 min-w-[280px]">ENTER THE ECOSYSTEM</ArenaButton>
                <ArenaButton variant="outline" className="h-20 min-w-[280px]">VIEW CONTENT STREAM</ArenaButton>
              </motion.div>
            </motion.div>
          </div>

          <div className="lg:col-span-4 lg:flex flex-col gap-12 pl-0 lg:pl-20 border-l border-slate-800 hidden">
             <AnimatedCounter value={24} label="COMBINED REACH" suffix="M+" />
             <AnimatedCounter value={1.2} label="MONTHLY GROWTH" suffix="M+" />
             <AnimatedCounter value={4} label="DOMINATED PLATFORMS" />
          </div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40"
        >
          <span className="font-syncopate text-[8px] tracking-[0.4em] uppercase font-bold">ENGAGE_DEPTH</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#FFC400] to-transparent" />
        </motion.div>
      </section>

      {/* 🌍 SECTION 2: PLATFORM DOMINATION */}
      <section className="py-32 md:py-60 px-6 bg-[#040E1E] border-y border-white/5 relative">
        <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <div className="mb-24">
             <span className="text-[#FFC400] font-syncopate text-[10px] tracking-[0.5em] font-bold mb-4 block uppercase">SECTOR_ANALYSIS</span>
             <h2 className="font-syncopate text-4xl md:text-7xl font-bold uppercase tracking-tighter text-white">PLATFORM DOMINATION</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <PlatformDominationCard 
              platform="TWITCH" 
              icon={<Twitch size={48} />} 
              stats="1.2M" 
              growth="+18%" 
              engagement="12.4%" 
            />
            <PlatformDominationCard 
              platform="TWITTER" 
              icon={<Twitter size={48} />} 
              stats="450K" 
              growth="+24%" 
              engagement="8.2%" 
            />
            <PlatformDominationCard 
              platform="INSTAGRAM" 
              icon={<Instagram size={48} />} 
              stats="620K" 
              growth="+12%" 
              engagement="15.1%" 
            />
            <PlatformDominationCard 
              platform="YOUTUBE" 
              icon={<Youtube size={48} />} 
              stats="180K" 
              growth="+30%" 
              engagement="10.8%" 
            />
          </div>
        </div>
      </section>

      {/* 🧠 SECTION 3: CREATOR PROGRAM */}
      <section className="py-32 md:py-60 px-6 bg-[#081B3A] border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFC400]/5 rounded-full blur-[100px] -z-10" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div>
              <span className="text-[#FFC400] font-syncopate text-[10px] tracking-[0.5em] font-bold mb-6 block uppercase">RECRUITMENT_PHASE</span>
              <h2 className="font-syncopate text-4xl md:text-8xl font-bold uppercase tracking-tighter text-white leading-[0.85]">
                BECOME <br /> THE MEDIA <br /> <span className="text-[#FFC400]">WEAPON.</span>
              </h2>
            </div>
            <p className="text-slate-400 font-inter text-2xl font-light leading-relaxed max-w-xl uppercase tracking-wide">
              We don't just sponsor creators. We integrate elite storytellers into the GEEKAY competitive matrix. Access world-class production, strategic growth data, and global exposure.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative group p-1 bg-gradient-to-br from-[#FFC400] to-transparent"
          >
             <div className="bg-[#040E1E] p-12 md:p-20 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-[#FFC400] rounded-full flex items-center justify-center mb-12 shadow-[0_0_30px_rgba(255,196,0,0.3)] animate-pulse">
                   <Target size={32} className="text-black" />
                </div>
                <h3 className="font-syncopate text-2xl font-bold text-white uppercase mb-8 tracking-tight">OPERATIVE REGISTRATION OPEN</h3>
                <p className="text-slate-500 font-syncopate text-[10px] tracking-[0.2em] uppercase mb-12 leading-loose">
                  CURRENTLY ACCEPTING APPLICATIONS FOR <br /> 2026 CONTENT ROSTER IN MENA & GLOBAL.
                </p>
                <ArenaButton className="w-full h-24 text-xl">ENTER CREATOR PROGRAM</ArenaButton>
             </div>
          </motion.div>
        </div>
      </section>

      {/* 🏆 SECTION 4: THE ECOSYSTEM (REDESIGNED) */}
      <section className="py-32 md:py-60 px-6 bg-black relative overflow-hidden">
        {/* Decorative Grid and Tactical Elements */}
        <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-1.5 bg-[#FFC400]/20 animate-pulse" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-32">
             <div className="inline-flex items-center gap-4 mb-8">
                <div className="h-[1px] w-12 bg-[#FFC400]/40" />
                <span className="text-[#FFC400] font-syncopate text-[11px] tracking-[0.6em] font-bold uppercase">NETWORK_TOPOLOGY</span>
                <div className="h-[1px] w-12 bg-[#FFC400]/40" />
             </div>
             <h2 className="font-syncopate text-5xl md:text-[120px] font-black uppercase tracking-tighter text-white leading-none">
                THE <br className="md:hidden" /> <span className="text-[#FFC400]">ECOSYSTEM</span>
             </h2>
             <p className="mt-8 text-slate-500 font-syncopate text-[10px] tracking-[0.4em] uppercase font-bold max-w-xl mx-auto leading-relaxed">
               INTEGRATED COMMAND STRUCTURE ACROSS ALL PRIMARY MEDIA SECTORS.
             </p>
          </div>

          <div className="relative">
             {/* Graph Background HUD */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none overflow-visible hidden lg:block">
                <div className="absolute top-0 left-0 border-l border-t border-[#FFC400]/20 w-32 h-32" />
                <div className="absolute bottom-0 right-0 border-r border-b border-[#FFC400]/20 w-32 h-32" />
                
                {/* Coordinates labels */}
                <div className="absolute top-4 left-4 font-mono text-[8px] text-[#FFC400]/40 uppercase">LAT: 25.0719° N // LONG: 55.1311° E</div>
                <div className="absolute bottom-4 right-4 font-mono text-[8px] text-[#FFC400]/40 uppercase">ENCRYPT_LEVEL: 09 // SECTOR: DELTA</div>
             </div>

             <EcosystemGraph />
          </div>
          
          <div className="mt-40 grid grid-cols-1 md:grid-cols-4 gap-8">
             {[
               { icon: <Globe size={20} />, label: "GEOGRAPHIC REACH", val: "GLOBAL" },
               { icon: <Cpu size={20} />, label: "API UPTIME", val: "99.9%" },
               { icon: <RefreshCw size={20} />, label: "DATA REFRESH", val: "REAL-TIME" },
               { icon: <Shield size={20} />, label: "CORE SECURITY", val: "VERIFIED" },
             ].map((stat, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.1 }}
                 className="p-8 border border-slate-900 bg-[#081B3A]/20 backdrop-blur-sm group hover:border-[#FFC400]/40 transition-all"
               >
                 <div className="text-[#FFC400]/50 group-hover:text-[#FFC400] mb-6 transition-colors">
                   {stat.icon}
                 </div>
                 <div className="font-syncopate text-[8px] text-slate-600 tracking-widest uppercase mb-2 font-bold">{stat.label}</div>
                 <div className="font-syncopate text-2xl font-black text-white">{stat.val}</div>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* 🚀 FINAL CTA SECTION */}
      <section className="py-40 md:py-60 px-6 bg-[#FFC400] text-black relative overflow-hidden flex flex-col items-center justify-center text-center">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
          <h2 className="font-syncopate text-[30vw] font-black tracking-tighter uppercase whitespace-nowrap">CONNECTED</h2>
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <h2 className="font-syncopate text-5xl md:text-[120px] font-black leading-[0.8] tracking-tighter uppercase mb-16">
            CHAMPION <br /> THE CONVERSATION.
          </h2>
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
             <button className="bg-black text-[#FFC400] px-16 py-8 font-syncopate text-sm font-black tracking-[0.5em] uppercase hover:bg-slate-900 transition-all skew-x-[-15deg]">
               <span className="block skew-x-[15deg] flex items-center gap-4">FOLLOW_GLOBAL <Twitter size={18} /></span>
             </button>
             <button className="bg-black text-[#FFC400] px-16 py-8 font-syncopate text-sm font-black tracking-[0.5em] uppercase hover:bg-slate-900 transition-all skew-x-[-15deg]">
               <span className="block skew-x-[15deg] flex items-center gap-4">JOIN_DISCORD <MessageCircle size={18} /></span>
             </button>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default Socials;
