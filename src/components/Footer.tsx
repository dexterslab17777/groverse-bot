import { Link } from 'react-router-dom';

export const Footer = () => (
  <footer className="py-12 px-6 border-t border-black/5 dark:border-white/5 bg-white dark:bg-[#050505] text-zinc-500 text-sm transition-colors duration-300">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-3">
        <span className="font-bold text-zinc-800 dark:text-zinc-300 tracking-widest">GROVERSE</span>
        <span>© 2026. All rights reserved.</span>
      </div>
      <div className="flex flex-wrap gap-6">
        <Link to="/privacy" className="hover:text-black dark:hover:text-white transition-colors">Privacy Policy</Link>
        <Link to="/terms" className="hover:text-black dark:hover:text-white transition-colors">Terms & Conditions</Link>
        <Link to="/payment" className="hover:text-black dark:hover:text-white transition-colors">Payment Policy</Link>
        <Link to="/contact" className="hover:text-black dark:hover:text-white transition-colors">Contact</Link>
      </div>
    </div>
  </footer>
);
