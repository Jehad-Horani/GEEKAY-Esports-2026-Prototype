
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronRight, Calendar, Clock, Filter, ArrowRight } from 'lucide-react';
import { MOCK_NEWS } from '../constants';
import { NewsItem } from '../types';
import ArenaButton from '../components/ui/ArenaButton';
import { Link } from 'react-router-dom';

const News = () => {
  const [filter, setFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['ALL', 'ANNOUNCEMENT', 'ROSTER', 'TOURNAMENT', 'COMMUNITY', 'PARTNERSHIP'];

  const filteredNews = MOCK_NEWS.filter(item => {
    const matchesFilter = filter === 'ALL' || item.category === filter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const featuredNews = filteredNews[0];
  const remainingNews = filteredNews.slice(1);

  return (
    <div className="min-h-screen bg-[#081B3A] pt-32 pb-20 px-6 md:px-12 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[#FFC400]/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Hero Header */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-[2px] bg-[#FFC400]" />
            <span className="font-syncopate text-[#FFC400] text-xs tracking-[0.5em] font-bold uppercase">COMMAND_FEED // INTEL</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-syncopate text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none mb-8"
          >
            NEWS & <span className="text-[#FFC400]">ANNOUNCEMENTS</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl text-lg md:text-xl text-slate-300 font-light leading-relaxed"
          >
            Official updates, roster moves, tournament intel, and strategic briefings from the GEEKAY command center.
          </motion.p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-16 pb-8 border-b border-slate-800">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 font-syncopate text-[10px] font-bold tracking-widest transition-all skew-x-[-15deg] border
                  ${filter === cat 
                    ? 'bg-[#FFC400] text-black border-[#FFC400]' 
                    : 'bg-transparent text-slate-400 border-slate-800 hover:border-slate-600'}`}
              >
                <span className="block skew-x-[15deg]">{cat}</span>
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#FFC400] transition-colors" size={18} />
            <input
              type="text"
              placeholder="SEARCH INTEL..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-800 py-4 pl-12 pr-6 font-syncopate text-[10px] text-white tracking-widest focus:outline-none focus:border-[#FFC400] transition-all"
            />
          </div>
        </div>

        {/* News Feed */}
        {filteredNews.length > 0 ? (
          <div className="space-y-16">
            {/* Featured Story */}
            {featuredNews && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative grid grid-cols-1 lg:grid-cols-12 bg-[#0A1A31] border border-slate-800 hover:border-[#FFC400]/50 transition-all duration-500 overflow-hidden"
              >
                <div className="lg:col-span-7 relative aspect-video lg:aspect-auto overflow-hidden">
                  <img 
                    src={featuredNews.image} 
                    alt={featuredNews.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0A1A31] via-transparent to-transparent" />
                  <div className="absolute top-8 left-8">
                    <span className="bg-[#FFC400] text-black px-4 py-1 font-syncopate text-[10px] font-black tracking-widest skew-x-[-15deg]">
                      <span className="block skew-x-[15deg]">FEATURED_INTEL</span>
                    </span>
                  </div>
                </div>
                
                <div className="lg:col-span-5 p-10 md:p-16 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-[#FFC400] font-syncopate text-[10px] font-bold tracking-widest">{featuredNews.category}</span>
                    <div className="w-1 h-1 bg-slate-700 rounded-full" />
                    <span className="text-slate-500 font-syncopate text-[10px] tracking-widest">{featuredNews.date}</span>
                  </div>
                  
                  <h2 className="font-syncopate text-3xl md:text-5xl font-bold text-white mb-8 leading-tight group-hover:text-[#FFC400] transition-colors">
                    {featuredNews.title}
                  </h2>
                  
                  <p className="text-slate-400 text-lg mb-10 font-light leading-relaxed">
                    {featuredNews.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-6">
                    <ArenaButton icon={<ArrowRight size={18} />}>
                      READ FULL BRIEFING
                    </ArenaButton>
                    <div className="flex items-center gap-2 text-slate-500 font-syncopate text-[9px] tracking-widest">
                      <Clock size={12} />
                      {featuredNews.readTime}
                    </div>
                  </div>
                </div>

                {/* Corner Accents */}
                <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-[#FFC400]/20 group-hover:border-[#FFC400]/50 transition-colors" />
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-[#FFC400]/20 group-hover:border-[#FFC400]/50 transition-colors" />
              </motion.div>
            )}

            {/* Grid Feed */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {remainingNews.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-[#0A1A31]/40 border border-slate-800 hover:border-[#FFC400]/30 transition-all duration-500 flex flex-col"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-[#081B3A]/40 group-hover:bg-transparent transition-colors" />
                      <div className="absolute top-4 left-4">
                        <span className="bg-slate-900/80 text-[#FFC400] px-3 py-1 border border-[#FFC400]/30 font-syncopate text-[8px] font-bold tracking-widest">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-8 flex-grow flex flex-col">
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-slate-500 font-syncopate text-[8px] tracking-widest">{item.date}</span>
                        <span className="text-slate-600 font-syncopate text-[8px] tracking-widest">{item.readTime}</span>
                      </div>
                      
                      <h3 className="font-syncopate text-xl font-bold text-white mb-6 leading-tight group-hover:text-[#FFC400] transition-colors flex-grow">
                        {item.title}
                      </h3>
                      
                      <p className="text-slate-500 text-sm mb-8 font-light line-clamp-2">
                        {item.excerpt}
                      </p>
                      
                      <button className="flex items-center gap-3 text-[#FFC400] font-syncopate text-[9px] font-black tracking-[0.3em] uppercase group/btn">
                        READ UPDATE 
                        <ArrowRight size={14} className="group-hover/btn:translate-x-2 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Load More */}
            <div className="flex justify-center pt-12">
              <ArenaButton variant="outline" className="min-w-[200px]">
                LOAD MORE INTEL
              </ArenaButton>
            </div>
          </div>
        ) : (
          <div className="py-40 text-center">
            <Search className="mx-auto text-slate-800 mb-8" size={64} />
            <h3 className="font-syncopate text-2xl font-bold text-slate-600 uppercase tracking-widest">NO INTEL FOUND</h3>
            <p className="text-slate-700 mt-4 uppercase text-[10px] tracking-widest">ADJUST FILTERS OR SEARCH PARAMETERS</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
