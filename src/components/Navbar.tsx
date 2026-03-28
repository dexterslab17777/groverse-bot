import { Link } from 'react-router-dom';
import { AnimatedLogo, GroverseText } from './AnimatedLogo';

export const Navbar = ({ onOpenChat }: { onOpenChat: () => void }) => {
  return (
    <nav className="fixed top-0 w-full z-40 bg-white/80 backdrop-blur-md border-b border-black/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <AnimatedLogo className="w-10 h-10" />
          <GroverseText />
        </Link>
        <div className="flex items-center gap-4 sm:gap-6">
          <Link to="/contact" className="text-sm font-medium text-zinc-600 hover:text-black transition-colors hidden sm:block">
            Contact Us
          </Link>
          <button onClick={onOpenChat} className="text-sm font-medium px-4 py-2 bg-black/5 hover:bg-black/10 rounded-full text-black transition-colors">
            Client Login
          </button>
        </div>
      </div>
    </nav>
  );
};
