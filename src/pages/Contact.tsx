import { motion } from 'motion/react';
import { Mail, Instagram, MapPin } from 'lucide-react';

export const Contact = () => (
  <div className="min-h-screen bg-white dark:bg-[#050505] text-zinc-700 dark:text-zinc-300 pt-32 pb-20 px-6 transition-colors duration-300">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-6">Get In Touch</h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400">Ready to scale? Reach out to us directly.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.a 
          href="mailto:teamgroverse@gmail.com"
          whileHover={{ y: -5 }}
          className="flex flex-col items-center p-8 bg-zinc-50 dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-2xl hover:bg-zinc-100 dark:hover:bg-white/[0.04] transition-colors"
        >
          <Mail className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
          <h3 className="text-lg font-bold text-black dark:text-white mb-2">Email Us</h3>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">teamgroverse@gmail.com</p>
        </motion.a>
        
        <motion.a 
          href="https://instagram.com/Groverse.co"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ y: -5 }}
          className="flex flex-col items-center p-8 bg-zinc-50 dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-2xl hover:bg-zinc-100 dark:hover:bg-white/[0.04] transition-colors"
        >
          <Instagram className="w-8 h-8 text-pink-600 dark:text-pink-400 mb-4" />
          <h3 className="text-lg font-bold text-black dark:text-white mb-2">Instagram</h3>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">@Groverse.co</p>
        </motion.a>
        
        <motion.div 
          whileHover={{ y: -5 }}
          className="flex flex-col items-center p-8 bg-zinc-50 dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-2xl hover:bg-zinc-100 dark:hover:bg-white/[0.04] transition-colors text-center"
        >
          <MapPin className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mb-4" />
          <h3 className="text-lg font-bold text-black dark:text-white mb-2">Location</h3>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">Currently located in<br/>Madhya Pradesh</p>
        </motion.div>
      </div>
    </div>
  </div>
);
