
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Share2, Twitter, Facebook, Link as LinkIcon } from 'lucide-react';
import { MOCK_NEWS } from '../constants';
import ArenaButton from '../components/ui/ArenaButton';

const NewsDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = MOCK_NEWS.find(n => n.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-[#081B3A] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-syncopate text-4xl font-bold text-white mb-8">INTEL NOT FOUND</h1>
          <Link to="/news">
            <ArenaButton>RETURN TO FEED</ArenaButton>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#081B3A] pt-32 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <Link to="/news" className="inline-flex items-center gap-2 text-slate-500 hover:text-[#FFC400] font-syncopate text-[10px] tracking-widest transition-colors mb-12 group">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          BACK TO INTEL FEED
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <span className="bg-[#FFC400] text-black px-3 py-1 font-syncopate text-[10px] font-black tracking-widest uppercase mb-6 inline-block skew-x-[-15deg]">
            <span className="block skew-x-[15deg]">{article.category}</span>
          </span>
          <h1 className="font-syncopate text-4xl md:text-6xl font-bold text-white uppercase leading-tight mb-8">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-8 text-slate-500 font-syncopate text-[10px] tracking-widest border-y border-slate-800 py-6">
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-[#FFC400]" />
              {article.date}
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-[#FFC400]" />
              {article.readTime}
            </div>
            <div className="flex items-center gap-4 ml-auto">
              <span className="text-slate-600">SHARE:</span>
              <Twitter size={16} className="hover:text-white cursor-pointer transition-colors" />
              <Facebook size={16} className="hover:text-white cursor-pointer transition-colors" />
              <LinkIcon size={16} className="hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative aspect-video mb-16 overflow-hidden border border-slate-800"
        >
          <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#081B3A] via-transparent to-transparent opacity-40" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="prose prose-invert max-w-none"
        >
          <div className="text-slate-300 text-lg leading-relaxed space-y-8 font-light">
            <p className="text-xl text-white font-medium border-l-4 border-[#FFC400] pl-6 italic">
              {article.excerpt}
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <h2 className="font-syncopate text-2xl font-bold text-white uppercase mt-16 mb-8">STRATEGIC ANALYSIS</h2>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
            <img 
              src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200&h=600" 
              alt="Tactical Map" 
              className="w-full border border-slate-800 my-12"
            />
            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.
            </p>
          </div>
        </motion.div>

        <div className="mt-20 pt-12 border-t border-slate-800">
          <h3 className="font-syncopate text-xl font-bold text-white uppercase mb-8">NEXT BRIEFING</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {MOCK_NEWS.filter(n => n.id !== article.id).slice(0, 2).map(item => (
              <Link key={item.id} to={`/news/${item.slug}`} className="group block bg-slate-900/50 border border-slate-800 p-6 hover:border-[#FFC400]/30 transition-all">
                <span className="text-[#FFC400] font-syncopate text-[8px] font-bold tracking-widest mb-2 block">{item.category}</span>
                <h4 className="font-syncopate text-sm font-bold text-white uppercase group-hover:text-[#FFC400] transition-colors line-clamp-1">{item.title}</h4>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
