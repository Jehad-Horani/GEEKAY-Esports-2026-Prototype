
import React from 'react';
import { motion } from 'framer-motion';

interface ArenaButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
}

const ArenaButton: React.FC<ArenaButtonProps> = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  className = '',
  icon
}) => {
  const baseStyles = "relative px-10 py-5 font-syncopate text-[10px] font-bold tracking-[0.3em] uppercase overflow-hidden transition-all duration-300 flex items-center justify-center gap-3 group skew-x-[-15deg]";
  
  const variants = {
    primary: "bg-[#FFC400] text-black hover:bg-yellow-400 border border-[#FFC400]",
    outline: "border border-slate-700 text-white hover:border-[#FFC400] hover:text-[#FFC400] bg-transparent",
    ghost: "text-slate-400 hover:text-white"
  };

  return (
    <motion.button 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2 skew-x-[15deg]">
        {children}
        {icon}
      </span>
      {variant === 'primary' && (
        <motion.div 
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent z-0"
        />
      )}
      {variant === 'outline' && (
        <motion.div 
          className="absolute inset-0 bg-[#FFC400]/0 group-hover:bg-[#FFC400]/5 transition-colors"
        />
      )}
    </motion.button>
  );
};

export default ArenaButton;
