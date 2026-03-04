
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Twitter, Twitch, Instagram, Youtube, LayoutGrid, Info, Briefcase, Calendar, Users, Home as HomeIcon, ChevronDown, ArrowRight } from 'lucide-react';

// Pages
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import Teams from './pages/Teams';
import About from './pages/About';
import Careers from './pages/Careers';
import JobDetail from './pages/JobDetail';
import Information from './pages/Information';
import AdminLayout from './src/admin/AdminLayout';
import AdminDashboard from './src/admin/Dashboard';
import AdminLogin from './src/admin/LoginPage';
import AdminTeams from './src/admin/Teams';
import AdminCreators from './src/admin/Creators';
import AdminSchedule from './src/admin/Schedule';
import AdminGallery from './src/admin/Gallery';
import AdminJobs from './src/admin/Jobs';
import AdminLeadership from './src/admin/Leadership';
import AdminSettings from './src/admin/Settings';
import AdminUsers from './src/admin/Users';
import Socials from './pages/Socials';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';

// Component to handle scroll reset on navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

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

const regions = [
  { name: 'UAE', link: 'https://www.geekay.com/en/', sub: 'Official Store' },
  { name: 'KSA', link: 'https://www.geekay.com/saudi_en/', sub: 'Official Store' },
  { name: 'GLOBAL', link: 'https://www.geekay.com/global/', sub: 'Official Store' },
];

const DesktopShopDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="bg-[#FFC400] text-black px-6 py-2 rounded-none font-syncopate text-[10px] font-bold hover:bg-yellow-400 transition-all skew-x-[-10deg] flex items-center gap-2">
        <span className="skew-x-[10deg] flex items-center gap-1">
          SHOP
          <ChevronDown size={12} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 pt-4 z-50 w-64"
          >
            <div className="bg-[#040E1E]/95 backdrop-blur-md border border-[#FFC400]/20 shadow-[0_20px_40px_rgba(0,0,0,0.6)] p-2">
              <div className="px-4 py-3 border-b border-white/5 mb-2">
                <span className="font-syncopate text-[8px] text-slate-400 tracking-[0.2em] uppercase">Select Region</span>
              </div>
              <div className="flex flex-col gap-1">
                {regions.map((region, i) => (
                  <motion.a
                    key={region.name}
                    href={region.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                    className="group relative flex items-center justify-between px-4 py-3 hover:bg-[#081B3A] transition-colors overflow-hidden"
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#FFC400] transform -translate-x-full group-hover:translate-x-0 transition-transform" />
                    <div className="flex flex-col transform group-hover:translate-x-1 transition-transform duration-300">
                      <span className="font-syncopate text-sm font-bold text-white">{region.name}</span>
                      <span className="font-inter text-[10px] text-slate-500">{region.sub}</span>
                    </div>
                    <ArrowRight size={14} className="text-slate-600 group-hover:text-[#FFC400] transform group-hover:translate-x-1 transition-all duration-300" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MobileShopDropdown = () => {
  const [isShopOpen, setIsShopOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <button 
        onClick={() => setIsShopOpen(!isShopOpen)}
        className="font-syncopate text-4xl font-bold flex items-center justify-between hover:text-[#FFC400] transition-colors w-full text-left"
      >
        SHOP
        <ChevronDown size={24} className={`transition-transform duration-300 ${isShopOpen ? 'rotate-180 text-[#FFC400]' : ''}`} />
      </button>
      <AnimatePresence>
        {isShopOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-4 mt-6 pl-4 border-l-2 border-slate-800">
              <span className="font-syncopate text-[10px] text-slate-500 tracking-[0.2em] uppercase mb-2">Select Region</span>
              {regions.map((region, i) => (
                <motion.a
                  key={region.name}
                  href={region.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between group"
                >
                  <div className="flex flex-col">
                    <span className="font-syncopate text-2xl font-bold text-white group-hover:text-[#FFC400] transition-colors">{region.name}</span>
                    <span className="font-inter text-xs text-slate-500">{region.sub}</span>
                  </div>
                  <ArrowRight size={20} className="text-slate-600 group-hover:text-[#FFC400] transform group-hover:translate-x-2 transition-all" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT', path: '/about' },
    { name: 'TEAMS', path: '/teams' },
    { name: 'SCHEDULE', path: '/schedule' },
    { name: 'MEDIA', path: '/socials' },
    { name: 'CONTACT US', path: '/careers' },
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
        <DesktopShopDropdown />
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
              <MobileShopDropdown />
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
      <ScrollToTop />
      <div className="min-h-screen flex flex-col selection:bg-[#FFC400] selection:text-black bg-grid bg-[#081B3A]">
        <div className="fixed inset-0 bg-scanline pointer-events-none z-10 opacity-30"></div>
        <CustomCursor />
        <Navbar />
        <main className="flex-grow pt-24 relative z-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:slug" element={<NewsDetail />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/careers/:slug" element={<JobDetail />} />
            <Route path="/info" element={<Information />} />
            <Route path="/socials" element={<Socials />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="leadership" element={<AdminLeadership />} />
              <Route path="teams" element={<AdminTeams />} />
              <Route path="creators" element={<AdminCreators />} />
              <Route path="schedule" element={<AdminSchedule />} />
              <Route path="gallery" element={<AdminGallery />} />
              <Route path="jobs" element={<AdminJobs />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="users" element={<AdminUsers />} />
            </Route>
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
