import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare } from 'lucide-react';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Chatbot } from './components/Chatbot';

import { Home } from './pages/Home';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { Payment } from './pages/Payment';
import { Contact } from './pages/Contact';

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    // Force remove dark mode from the main landing page
    document.documentElement.classList.remove('dark');
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-[#050505] text-zinc-900 dark:text-zinc-100 font-sans selection:bg-blue-500/30 transition-colors duration-300">
        <Navbar onOpenChat={() => setIsChatOpen(true)} />
        
        <main>
          <Routes>
            <Route path="/" element={<Home onOpenChat={() => setIsChatOpen(true)} />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <Footer />

        <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

        {/* Floating Chat Button */}
        <AnimatePresence>
          {!isChatOpen && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setIsChatOpen(true)}
              className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-zinc-800 to-black dark:from-zinc-200 dark:to-zinc-400 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.3)] dark:shadow-[0_0_30px_rgba(212,212,216,0.3)] hover:shadow-[0_0_40px_rgba(0,0,0,0.5)] dark:hover:shadow-[0_0_40px_rgba(212,212,216,0.5)] z-40 transition-shadow"
            >
              <MessageSquare className="w-6 h-6 text-white dark:text-black" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
}
