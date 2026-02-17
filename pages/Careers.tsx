
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, ChevronRight, Search, Zap, Target, Shield, Globe, TrendingUp, Cpu, Award, ZapOff, Trophy, Users, DollarSign, Activity, Play } from 'lucide-react';
import { MOCK_JOBS } from '../constants';
import ArenaButton from '../components/ui/ArenaButton';
import { Link } from 'react-router-dom';

const BenefitCard = ({ icon, title, index }: { icon: React.ReactNode, title: string, index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ y: -10, borderColor: 'rgba(255, 196, 0, 0.5)', boxShadow: '0 0 30px rgba(255, 196, 0, 0.1)' }}
    className="p-10 bg-[#0A254D]/20 border border-slate-800/50 relative group transition-all duration-500 flex flex-col items-center text-center justify-center min-h-[220px]"
  >
    <div className="text-[#FFC400] mb-6 group-hover:scale-110 transition-transform duration-500">
      {icon}
    </div>
    <h3 className="font-syncopate text-[10px] md:text-xs font-bold text-white tracking-[0.3em] uppercase leading-relaxed">
      {title}
    </h3>
    <div className="absolute top-0 right-0 p-4 font-syncopate text-[8px] text-slate-800 group-hover:text-[#FFC400]/20 transition-colors">
      GK_0{index + 1}
    </div>
  </motion.div>
);

const Careers = () => {
  return (
    <div className="bg-[#081B3A] min-h-screen overflow-x-hidden selection:bg-[#FFC400] selection:text-black">
      
      {/* 🎬 SECTION 1: ULTIMATE HERO (POWERFUL RECRUITMENT MANIFESTO) */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Visuals Layer */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 20, ease: "easeOut" }}
            className="w-full h-full"
          >
            <video autoPlay muted loop playsInline className="w-full h-full object-cover grayscale brightness-[0.2] opacity-40">
              <source src="https://assets.mixkit.co/videos/preview/mixkit-electronic-sports-players-shaking-hands-4467-large.mp4" type="video/mp4" />
            </video>
          </motion.div>
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#081B3A] via-[#081B3A]/80 to-[#081B3A]/40 z-10" />
          <div className="absolute inset-0 bg-grid opacity-10 z-10" />
          
          {/* Ghost Typography */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <h2 
              className="font-syncopate text-[30vw] font-black text-transparent select-none opacity-[0.02] tracking-tighter"
              style={{ WebkitTextStroke: '2px white' }}
            >
              RECRUIT
            </h2>
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-20 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.div 
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="w-[1px] h-20 bg-[#FFC400] mx-auto mb-10 origin-top"
            />

            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="font-syncopate text-[#FFC400] text-[10px] md:text-xs font-bold mb-10 block uppercase tracking-[0.8em]"
            >
              MISSION_PROTOCOL_GK_2026
            </motion.span>
            
            {/* Sequential Typography */}
            <div className="flex flex-col gap-2 mb-12 items-center">
              <motion.span 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="font-syncopate text-white text-3xl md:text-6xl font-black uppercase tracking-tight"
              >
                BUILD THE NEXT ERA.
              </motion.span>
              
              <div className="relative inline-block mt-4">
                <motion.h1 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 1.5, ease: "circOut" }}
                  className="font-syncopate text-white text-6xl md:text-[140px] font-black leading-[0.85] tracking-tighter uppercase"
                >
                  JOIN THE <span className="text-[#FFC400] drop-shadow-[0_0_50px_rgba(255,196,0,0.4)]">ELITE.</span>
                </motion.h1>
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.5, delay: 2, ease: "circOut" }}
                  className="absolute -bottom-4 left-0 right-0 h-2 bg-[#FFC400] origin-left shadow-[0_0_20px_rgba(255,196,0,0.5)]"
                />
              </div>
            </div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.6, y: 0 }}
              transition={{ duration: 1, delay: 2.5 }}
              className="text-white font-syncopate text-xs md:text-xl mb-16 font-light leading-loose max-w-3xl mx-auto tracking-[0.2em]"
            >
              WE DON’T HIRE EMPLOYEES. <br className="hidden md:block" />
              WE RECRUIT ARCHITECTS OF <span className="text-white font-bold opacity-100 underline decoration-[#FFC400]/50 underline-offset-8">DOMINANCE.</span>
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3 }}
              className="flex flex-col sm:flex-row gap-8 justify-center items-center"
            >
              <ArenaButton className="h-20 min-w-[280px]">JOIN THE ARENA</ArenaButton>
              <ArenaButton variant="outline" className="h-20 min-w-[280px]">VIEW OPEN ROLES</ArenaButton>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#FFC400] to-transparent" />
        </motion.div>
      </section>

      {/* 🧠 SECTION 2: MISSION & VISION */}
      <section className="py-32 md:py-60 px-6 bg-[#040E1E] relative border-y border-white/5">
        <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-40 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="h-[2px] w-12 bg-[#FFC400]" />
              <span className="text-[#FFC400] font-syncopate text-[10px] tracking-[0.5em] font-bold uppercase">MISSION</span>
            </div>
            <h2 className="font-syncopate text-4xl md:text-6xl font-bold text-white uppercase tracking-tighter leading-tight">
              WE ENGINEER SYSTEMS <br /> 
              THAT <span className="text-[#FFC400]">OUTLAST</span> SEASONS.
            </h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="h-[2px] bg-[#FFC400]/20"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8 lg:mt-32"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="h-[2px] w-12 bg-[#FFC400]" />
              <span className="text-[#FFC400] font-syncopate text-[10px] tracking-[0.5em] font-bold uppercase">VISION</span>
            </div>
            <h2 className="font-syncopate text-4xl md:text-6xl font-bold text-white uppercase tracking-tighter leading-tight">
              THE MOST DISCIPLINED <br />
              <span className="text-[#FFC400]">ECOSYSTEM</span> IN MENA.
            </h2>
            <p className="text-slate-500 font-inter text-lg leading-relaxed font-light uppercase tracking-wide">
              OUR SCOPE IS GLOBAL. OUR EXECUTION IS ABSOLUTE.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 👥 SECTION 3: TEAM IMAGE (MANIFESTO) */}
      <section className="relative h-[60vh] min-h-[500px] w-full flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2000" 
          alt="GEEKAY Team" 
          className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.3]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#040E1E] via-transparent to-[#040E1E]" />
        
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="font-syncopate text-4xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none">
              THIS ISN’T A TEAM.<br />
              IT’S A <span className="text-[#FFC400]">STANDARD.</span>
            </h2>
            <p className="text-slate-300 font-syncopate text-[10px] tracking-[0.3em] uppercase max-w-xl mx-auto opacity-80 font-bold">
              Every member is selected for discipline, intelligence, and hunger.
            </p>
            <ArenaButton variant="outline" className="min-w-[250px]">MEET THE STAFF</ArenaButton>
          </motion.div>
        </div>
      </section>

      {/* 🏛 SECTION 4: STAFF BENEFITS */}
      <section className="py-32 md:py-48 px-6 bg-[#040E1E]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24">
            <div>
              <span className="text-[#FFC400] font-syncopate text-[10px] tracking-[0.6em] font-bold mb-4 block uppercase">STAFF_PROTOCOL</span>
              <h2 className="font-syncopate text-4xl md:text-7xl font-bold uppercase tracking-tighter text-white">WHY JOIN GEEKAY?</h2>
            </div>
            <div className="h-[2px] hidden lg:block flex-grow mx-16 bg-slate-800" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <BenefitCard icon={<Trophy size={40} />} title="Performance Bonuses" index={0} />
            <BenefitCard icon={<Globe size={40} />} title="Global Exposure" index={1} />
            <BenefitCard icon={<Users size={40} />} title="Elite Network" index={2} />
            <BenefitCard icon={<DollarSign size={40} />} title="Competitive Comp" index={3} />
            <BenefitCard icon={<Activity size={40} />} title="High-Perf Culture" index={4} />
            <BenefitCard icon={<TrendingUp size={40} />} title="Career Acceleration" index={5} />
          </div>
        </div>
      </section>

      {/* 🧩 SECTION 5: WORK ENVIRONMENT (REFINED COMMAND CENTER) */}
      <section className="py-32 md:py-60 px-6 bg-[#081B3A] overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32 items-center">
          <div className="lg:col-span-7 relative group aspect-video lg:aspect-square overflow-hidden border border-slate-800 bg-[#040E1E] shadow-[0_0_100px_rgba(0,0,0,0.5)]">
            {/* High-Tech Tactical Command Image */}
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 1.5 }}
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200" 
              className="w-full h-full object-cover grayscale brightness-[0.7] group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000"
              alt="Command Center"
            />
            {/* HUD Overlay Visuals */}
            <div className="absolute top-8 left-8 flex flex-col gap-2">
              <div className="h-1 w-12 bg-[#FFC400]" />
              <span className="font-syncopate text-[8px] text-[#FFC400] font-bold">OPERATIONAL_FEED_01</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#040E1E] via-transparent to-transparent opacity-60" />
          </div>

          <div className="lg:col-span-5 space-y-12">
            <div>
              <span className="text-[#FFC400] font-syncopate text-[10px] tracking-[0.5em] font-bold mb-6 block uppercase">THE_ENVIRONMENT</span>
              <h2 className="font-syncopate text-4xl md:text-6xl font-bold uppercase tracking-tighter text-white leading-none">COMMAND <br /> CENTER</h2>
              <p className="text-slate-400 font-inter text-xl font-light leading-relaxed mt-10">
                We operate like a championship roster. Precision isn't a goal, it's our minimum standard. Every operative is given the tools to dictate the future.
              </p>
            </div>

            <ul className="space-y-8">
              {[
                { title: 'PRECISION', sub: 'Zero-waste operational efficiency.' },
                { title: 'ACCOUNTABILITY', sub: 'Radical transparency at every level.' },
                { title: 'INTENSITY', sub: 'High-pressure performance scenarios.' },
                { title: 'SUPPORT', sub: 'World-class wellness and mental health.' }
              ].map((item, i) => (
                <motion.li 
                  key={i} 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col gap-2 group cursor-default"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-[1px] w-8 bg-[#FFC400] group-hover:w-16 transition-all duration-300" />
                    <span className="font-syncopate text-sm font-bold text-white group-hover:text-[#FFC400] transition-colors tracking-widest">{item.title}</span>
                  </div>
                  <p className="text-slate-500 text-[10px] pl-12 font-light uppercase tracking-[0.3em] group-hover:text-slate-300 transition-colors">{item.sub}</p>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 🎯 SECTION 6: OPEN ROLES (REDESIGNED FOR PRESTIGE) */}
      <section className="py-32 md:py-60 px-6 bg-[#040E1E] border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12">
            <div>
              <span className="text-[#FFC400] font-syncopate text-[10px] tracking-[0.6em] font-bold mb-4 block uppercase">ACTIVE_RECRUITMENT</span>
              <h2 className="font-syncopate text-4xl md:text-8xl font-bold uppercase tracking-tighter text-white">OPEN ROLES</h2>
            </div>
            
            <div className="relative w-full md:w-[450px]">
              <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-[#FFC400]" size={20} />
              <input 
                type="text" 
                placeholder="FILTER_BY_OPERATIONAL_UNIT..." 
                className="w-full bg-[#081B3A] border border-slate-800 py-8 pl-18 pr-8 text-white font-syncopate text-[10px] tracking-[0.4em] focus:outline-none focus:border-[#FFC400] transition-all skew-x-[-10deg] placeholder:text-slate-600" 
              />
            </div>
          </div>

          <div className="space-y-4">
            {MOCK_JOBS.map((job) => (
              <motion.div 
                key={job.id}
                whileHover={{ x: 15, borderColor: 'rgba(255, 196, 0, 0.4)', backgroundColor: 'rgba(255, 196, 0, 0.02)' }}
                className="bg-[#0A254D]/10 border border-slate-800 p-10 md:p-16 flex flex-col lg:flex-row lg:items-center justify-between gap-10 group relative transition-all duration-500 overflow-hidden"
              >
                {/* Visual HUD Accents */}
                <div className="absolute top-0 left-0 w-2 h-0 bg-[#FFC400] group-hover:h-full transition-all duration-500" />
                <div className="absolute top-4 right-8 font-syncopate text-[8px] text-slate-800 group-hover:text-[#FFC400]/20 transition-colors uppercase font-bold">GK_UNIT_PENDING</div>

                <div className="relative z-10 flex-grow">
                  <div className="flex items-center gap-6 mb-8">
                    <span className="bg-[#FFC400] text-black px-6 py-2 font-syncopate text-[10px] font-black tracking-[0.3em] uppercase skew-x-[-15deg]">
                      <span className="block skew-x-[15deg]">{job.department}</span>
                    </span>
                    <div className="h-[1px] w-12 bg-slate-800" />
                    <div className="flex gap-8 text-slate-500">
                      <span className="flex items-center gap-3 font-syncopate text-[10px] font-bold tracking-[0.3em] uppercase transition-colors group-hover:text-white"><MapPin size={14} className="text-[#FFC400]" /> {job.location}</span>
                      <span className="flex items-center gap-3 font-syncopate text-[10px] font-bold tracking-[0.3em] uppercase transition-colors group-hover:text-white"><Briefcase size={14} className="text-[#FFC400]" /> {job.type}</span>
                    </div>
                  </div>
                  
                  <h3 className="font-syncopate text-4xl md:text-5xl font-bold text-white uppercase tracking-tighter group-hover:text-[#FFC400] transition-colors leading-none">
                    {job.title}
                  </h3>
                </div>

                <div className="relative z-10">
                  <ArenaButton icon={<ChevronRight className="group-hover:translate-x-3 transition-transform" size={20} />} className="min-w-[260px] h-20 shadow-[0_0_20px_rgba(0,0,0,0.3)] group-hover:shadow-[0_0_40px_rgba(255,196,0,0.2)]">
                    APPLY_PROTOCOL
                  </ArenaButton>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🚀 SECTION 7: OPEN APPLICATION CTA (FINAL STRIKE) */}
      <section className="bg-[#FFC400] py-40 md:py-60 px-6 text-black relative overflow-hidden flex flex-col items-center justify-center text-center">
        {/* Animated Background Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
          <h2 className="font-syncopate text-[25vw] font-black tracking-tighter uppercase whitespace-nowrap">JOIN_US</h2>
        </div>

        <div className="max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-syncopate text-5xl md:text-[120px] font-black mb-12 leading-[0.85] tracking-tighter uppercase">
              DON'T SEE <br /> YOUR ROLE? <br />
              <span className="text-white drop-shadow-2xl">CREATE IT.</span>
            </h2>
            <p className="font-syncopate text-xs md:text-xl font-bold tracking-[0.5em] uppercase mb-20 opacity-90 max-w-3xl mx-auto leading-relaxed">
              IF YOU ARE THE TOP 0.1% IN YOUR FIELD, WE HAVE A SEAT FOR YOU. <br /> SUBMIT YOUR PROFILE FOR COMMAND REVIEW.
            </p>
            
            <button className="bg-black text-[#FFC400] px-24 py-10 font-syncopate text-sm font-black tracking-[0.6em] uppercase hover:bg-slate-900 transition-all duration-500 shadow-[0_40px_80px_rgba(0,0,0,0.3)] skew-x-[-15deg]">
              <span className="block skew-x-[15deg]">SUBMIT_PROFILE</span>
            </button>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Careers;
