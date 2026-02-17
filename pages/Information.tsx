
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Mail, Phone, MapPin } from 'lucide-react';

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-800 py-6">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left hover:text-yellow-500 transition-colors"
      >
        <span className="font-syncopate text-sm font-bold tracking-wide uppercase">{question}</span>
        {isOpen ? <Minus size={20} className="text-yellow-500" /> : <Plus size={20} />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pt-6 text-slate-400 leading-relaxed text-sm">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Information = () => {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-24">
           <span className="font-syncopate text-yellow-500 text-[10px] tracking-widest font-bold mb-4 block uppercase">INTEL</span>
           <h1 className="font-syncopate text-5xl md:text-7xl font-bold">RESOURCES & FAQ</h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
          <div className="lg:col-span-2 space-y-4">
             <h2 className="font-syncopate text-xl font-bold mb-12">FREQUENTLY ASKED</h2>
             <FAQItem 
                question="How can I join the GEEKAY Academy?" 
                answer="Our academy trials take place quarterly. Keep an eye on our social media channels for the announcement of the 'Ascension Program' registration dates." 
             />
             <FAQItem 
                question="Where can I buy official team jersey?" 
                answer="Official merchandise is exclusively available through our web shop at shop.geekay.gg. We ship globally with local distribution hubs in Dubai and London." 
             />
             <FAQItem 
                question="Are you open to new brand partnerships?" 
                answer="Absolutely. We seek innovative brands that want to authentically engage with the gaming community. Contact our partnership desk at partnerships@geekay.gg." 
             />
             <FAQItem 
                question="What is the 2026 Arena Vision?" 
                answer="The 2026 vision focuses on creating integrated digital-physical fan experiences, utilizing Web3 and VR technology to bring fans closer to the action than ever before." 
             />
          </div>

          <div className="space-y-12">
             <div className="bg-slate-900 border border-slate-800 p-12">
                <h3 className="font-syncopate text-lg font-bold mb-8">CONTACT US</h3>
                <div className="space-y-8">
                   <div className="flex gap-4">
                      <Mail className="text-yellow-500" size={24} />
                      <div>
                         <span className="text-[10px] font-syncopate text-slate-500 block uppercase">Email</span>
                         <span className="font-bold text-sm">hello@geekay.gg</span>
                      </div>
                   </div>
                   <div className="flex gap-4">
                      <Phone className="text-yellow-500" size={24} />
                      <div>
                         <span className="text-[10px] font-syncopate text-slate-500 block uppercase">Phone</span>
                         <span className="font-bold text-sm">+971 4 000 0000</span>
                      </div>
                   </div>
                   <div className="flex gap-4">
                      <MapPin className="text-yellow-500" size={24} />
                      <div>
                         <span className="text-[10px] font-syncopate text-slate-500 block uppercase">HQ</span>
                         <span className="font-bold text-sm leading-relaxed">Media City, Building 4 <br /> Dubai, United Arab Emirates</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;
