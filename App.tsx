
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Twitter, Twitch, Instagram, Youtube, LayoutGrid, Info, Briefcase, Calendar, Users, Home as HomeIcon } from 'lucide-react';

// Pages
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import Teams from './pages/Teams';
import About from './pages/About';
import Careers from './pages/Careers';
import Information from './pages/Information';
import Socials from './pages/Socials';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a') || target.closest('button') || target.closest('.interactive')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <div 
        className={`custom-cursor hidden md:block ${isHovering ? 'cursor-active' : ''}`} 
        style={{ left: `${position.x}px`, top: `${position.y}px` }} 
      />
      <div 
        className="custom-cursor-dot hidden md:block" 
        style={{ left: `${position.x}px`, top: `${position.y}px` }} 
      />
    </>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'SCHEDULE', path: '/schedule' },
    { name: 'TEAMS', path: '/teams' },
    { name: 'ABOUT', path: '/about' },
    { name: 'CAREERS', path: '/careers' },
    { name: 'SOCIALS', path: '/socials' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-12 flex justify-between items-center bg-gradient-to-b from-[#081B3A] to-transparent">
      <Link to="/" className="flex items-center gap-3 group">
        <div className="w-10 h-10 bg-[#FFC400] rounded-none flex items-center justify-center font-syncopate font-bold text-black group-hover:scale-110 transition-transform skew-x-[-10deg]">GK</div>
        <span className="font-syncopate font-bold text-xl tracking-tighter hidden sm:block">GEEKAY <span className="text-[#FFC400]">2026</span></span>
      </Link>

      <div className="hidden lg:flex gap-10 items-center">
        {navLinks.map((link) => (
          <Link 
            key={link.name} 
            to={link.path}
            className={`font-syncopate text-[10px] tracking-[0.25em] font-bold hover:text-[#FFC400] transition-colors relative group ${location.pathname === link.path ? 'text-[#FFC400]' : 'text-slate-400'}`}
          >
            {link.name}
            <span className={`absolute -bottom-2 left-0 h-[2px] bg-[#FFC400] transition-all duration-300 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'}`} />
          </Link>
        ))}
        <a 
          href="https://www.geekay.com/en/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-[#FFC400] text-black px-6 py-2 rounded-none font-syncopate text-[10px] font-bold hover:bg-yellow-400 transition-all skew-x-[-10deg]"
        >
          <span className="skew-x-[10deg] block">SHOP</span>
        </a>
      </div>

      <button className="lg:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-[#081B3A] z-40 flex flex-col p-12 lg:hidden"
          >
             <div className="flex justify-between items-center mb-20">
                <span className="font-syncopate font-bold text-xl tracking-tighter">GEEKAY</span>
                <button onClick={() => setIsOpen(false)}><X size={32} /></button>
             </div>
            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  onClick={() => setIsOpen(false)}
                  className="font-syncopate text-4xl font-bold flex items-center gap-4 hover:text-[#FFC400] transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <a 
                href="https://www.geekay.com/en/" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="font-syncopate text-4xl font-bold flex items-center gap-4 hover:text-[#FFC400] transition-colors"
              >
                SHOP
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col selection:bg-[#FFC400] selection:text-black bg-grid bg-[#081B3A]">
        <div className="fixed inset-0 bg-scanline pointer-events-none z-10 opacity-30"></div>
        <CustomCursor />
        <Navbar />
        <main className="flex-grow pt-24 lg:pt-0 relative z-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/info" element={<Information />} />
            <Route path="/socials" element={<Socials />} />
          </Routes>
        </main>
        <footer className="bg-[#040E1E] border-t border-slate-800 py-20 px-6 md:px-12 relative z-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
            <div className="md:col-span-2">
              <h2 className="font-syncopate text-2xl font-bold mb-8 uppercase tracking-tighter">GEEKAY <span className="text-[#FFC400]">ESPORTS</span></h2>
              <p className="text-slate-500 max-w-sm leading-relaxed text-sm">The dominant force in MENA competitive gaming. Redefining the digital arena through performance and strategy.</p>
              <div className="flex gap-6 mt-10">
                <a href="#" className="hover-glitch text-slate-400 hover:text-[#FFC400] transition-colors"><Twitter size={20} /></a>
                <a href="#" className="hover-glitch text-slate-400 hover:text-[#FFC400] transition-colors"><Twitch size={20} /></a>
                <a href="#" className="hover-glitch text-slate-400 hover:text-[#FFC400] transition-colors"><Instagram size={20} /></a>
                <a href="#" className="hover-glitch text-slate-400 hover:text-[#FFC400] transition-colors"><Youtube size={20} /></a>
              </div>
            </div>
            <div>
              <h3 className="font-syncopate text-[10px] font-bold text-[#FFC400] mb-8 tracking-[0.3em] uppercase">Roster</h3>
              <ul className="space-y-4 text-slate-400 text-sm font-medium">
                <li><Link to="/teams" className="hover:text-white transition-colors">Pro Teams</Link></li>
                <li><Link to="/schedule" className="hover:text-white transition-colors">Tournaments</Link></li>
                <li><Link to="/careers" className="hover:text-white transition-colors">Join Us</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-syncopate text-[10px] font-bold text-[#FFC400] mb-8 tracking-[0.3em] uppercase">Internal</h3>
              <ul className="space-y-4 text-slate-400 text-sm font-medium">
                <li><Link to="/about" className="hover:text-white transition-colors">About Org</Link></li>
                <li><Link to="/info" className="hover:text-white transition-colors">Privacy</Link></li>
                <li><Link to="/info" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between text-slate-600 text-[10px] font-syncopate tracking-widest uppercase">
            <p>&copy; 2026 GEEKAY. ALL RIGHTS RESERVED.</p>
            <p>DESIGNED FOR THE ARENA</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}
