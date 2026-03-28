import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export const AnimatedLogo = ({ className = "w-10 h-10" }: { className?: string }) => (
  <motion.div 
    className={cn("relative flex items-center justify-center", className)}
    whileHover={{ scale: 1.05 }}
  >
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]">
      <defs>
        <linearGradient id="silverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="30%" stopColor="#e4e4e7" />
          <stop offset="50%" stopColor="#a1a1aa" />
          <stop offset="70%" stopColor="#d4d4d8" />
          <stop offset="100%" stopColor="#71717a" />
        </linearGradient>
      </defs>
      {/* Outer G-like circle */}
      <motion.path
        d="M 50 15 A 35 35 0 1 0 85 50 L 60 50"
        fill="none"
        stroke="url(#silverGrad)"
        strokeWidth="14"
        strokeLinecap="square"
        initial={{ pathLength: 0, opacity: 0.8 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
      />
      {/* Inner V shape */}
      <motion.path
        d="M 22 22 L 50 85 L 78 22"
        fill="none"
        stroke="url(#silverGrad)"
        strokeWidth="14"
        strokeLinecap="square"
        strokeLinejoin="miter"
        initial={{ pathLength: 0, opacity: 0.8 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 4, ease: "easeInOut", delay: 1, repeat: Infinity, repeatType: "reverse" }}
      />
    </svg>
  </motion.div>
);

export const GroverseText = () => (
  <span className="text-xl font-bold tracking-[0.2em] text-zinc-100 flex items-center">
    GROVERSE
  </span>
);
