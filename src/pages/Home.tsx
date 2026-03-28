import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Zap, Target, LayoutTemplate, BarChart3 } from 'lucide-react';

export const Home = ({ onOpenChat }: { onOpenChat: () => void }) => {
  const [termsAccepted, setTermsAccepted] = useState(true);

  useEffect(() => {
    const accepted = localStorage.getItem('groverse_terms_accepted');
    if (!accepted) {
      setTermsAccepted(false);
    }
  }, []);

  const acceptTerms = () => {
    localStorage.setItem('groverse_terms_accepted', 'true');
    setTermsAccepted(true);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] text-zinc-900 dark:text-zinc-100 font-sans selection:bg-blue-500/30 overflow-x-hidden pt-20 transition-colors duration-300">
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6 min-h-[90vh] flex flex-col items-center justify-center text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-5xl mx-auto space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-600 dark:text-zinc-300 text-sm font-medium mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Accepting 3 new clients this month
          </div>
          
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-black dark:text-white leading-[1.1]">
            We help brands grow using <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 via-zinc-800 to-zinc-500 dark:from-zinc-200 dark:via-zinc-400 dark:to-zinc-200">AI & Performance Marketing</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto font-light">
            Data-driven ads, compelling content, and high-converting funnels designed to scale your brand predictably and profitably.
          </p>
          
          <div className="pt-8">
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onOpenChat}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-zinc-800 to-black dark:from-zinc-200 dark:to-zinc-400 text-white dark:text-black font-bold text-lg rounded-full overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.1)] dark:shadow-[0_0_40px_rgba(212,212,216,0.2)] hover:shadow-[0_0_60px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_0_60px_rgba(212,212,216,0.4)] transition-all"
            >
              <span className="relative z-10">Talk To AI Growth Consultant</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-black to-zinc-800 dark:from-white dark:to-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          </div>
        </motion.div>

        {/* Floating Mockups */}
        <motion.div 
          className="mt-24 relative w-full max-w-6xl mx-auto h-[400px] sm:h-[600px] perspective-1000"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {/* Main Dashboard */}
          <motion.div 
            animate={{ y: [0, -10, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] sm:w-[70%] aspect-video rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.1)] dark:shadow-[0_0_50px_rgba(0,0,0,0.8)] z-20 group"
          >
            <img src="https://picsum.photos/seed/dashboard/1200/800" alt="Dashboard" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700 cursor-pointer" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#050505] via-transparent to-transparent pointer-events-none" />
          </motion.div>

          {/* Floating Phone 1 */}
          <motion.div 
            animate={{ y: [0, 15, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute left-[5%] sm:left-[10%] top-[20%] w-[25%] sm:w-[20%] aspect-[9/19] rounded-[2rem] overflow-hidden border-4 border-zinc-200 dark:border-zinc-800 shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:shadow-[0_0_30px_rgba(0,0,0,0.6)] z-30 rotate-[-10deg] group"
          >
            <img src="https://picsum.photos/seed/ad1/600/1200" alt="Ad Campaign" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700 cursor-pointer" referrerPolicy="no-referrer" />
          </motion.div>

          {/* Floating Phone 2 */}
          <motion.div 
            animate={{ y: [0, -15, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute right-[5%] sm:right-[10%] top-[10%] w-[25%] sm:w-[20%] aspect-[9/19] rounded-[2rem] overflow-hidden border-4 border-zinc-200 dark:border-zinc-800 shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:shadow-[0_0_30px_rgba(0,0,0,0.6)] z-10 rotate-[10deg] group"
          >
            <img src="https://picsum.photos/seed/ad2/600/1200" alt="Ad Campaign" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700 cursor-pointer" referrerPolicy="no-referrer" />
          </motion.div>

          {/* Small Floating Image 1: Perfume */}
          <motion.div 
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute left-[15%] sm:left-[22%] top-[-5%] sm:top-[5%] w-20 sm:w-28 aspect-square rounded-2xl overflow-hidden border border-black/10 dark:border-white/20 shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(0,0,0,0.5)] z-40 group"
          >
            <img src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=400&q=80" alt="Perfume Brand" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700 cursor-pointer" referrerPolicy="no-referrer" />
          </motion.div>

          {/* Small Floating Image 2: Jewelry */}
          <motion.div 
            animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            className="absolute right-[10%] sm:right-[20%] bottom-[-5%] sm:bottom-[5%] w-24 sm:w-32 aspect-square rounded-full overflow-hidden border border-black/10 dark:border-white/20 shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(0,0,0,0.5)] z-40 group"
          >
            <img src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=400&q=80" alt="Jewelry" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700 cursor-pointer" referrerPolicy="no-referrer" />
          </motion.div>

          {/* Small Floating Image 3: Clothing */}
          <motion.div 
            animate={{ y: [0, -15, 0], rotate: [-5, 0, -5] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
            className="absolute left-[5%] sm:left-[12%] bottom-[0%] sm:bottom-[10%] w-24 sm:w-32 aspect-[3/4] rounded-2xl overflow-hidden border border-black/5 dark:border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(0,0,0,0.5)] z-10 group"
          >
            <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80" alt="Clothing" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700 cursor-pointer" referrerPolicy="no-referrer" />
          </motion.div>

          {/* Small Floating Image 4: Sneaker */}
          <motion.div 
            animate={{ y: [0, 15, 0], rotate: [5, 0, 5] }} transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute right-[15%] sm:right-[25%] top-[0%] sm:top-[10%] w-24 sm:w-32 aspect-[4/3] rounded-2xl overflow-hidden border border-black/5 dark:border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(0,0,0,0.5)] z-0 group"
          >
            <img src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=400&q=80" alt="Sneaker" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700 cursor-pointer" referrerPolicy="no-referrer" />
          </motion.div>
        </motion.div>
      </section>

      {/* SERVICES SECTION */}
      <section className="py-32 px-6 bg-zinc-50 dark:bg-zinc-950 border-y border-black/5 dark:border-white/5 relative overflow-hidden transition-colors duration-300">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-6">Our Growth Arsenal</h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">We don't just run ads. We build end-to-end client acquisition systems.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: <BarChart3 className="w-6 h-6" />, title: "Performance Marketing", desc: "Data-driven Facebook & Google Ads that scale profitably." },
              { icon: <Zap className="w-6 h-6" />, title: "AI Ad Creatives", desc: "Hyper-realistic visuals and copy that convert cold traffic." },
              { icon: <Target className="w-6 h-6" />, title: "Lead Generation Funnels", desc: "Automated systems to capture, nurture, and close leads." },
              { icon: <LayoutTemplate className="w-6 h-6" />, title: "Landing Page Optimization", desc: "High-converting pages built for speed and sales." }
            ].map((service, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -5 }}
                className="p-10 rounded-3xl bg-white dark:bg-white/[0.02] border border-black/5 dark:border-white/5 hover:bg-zinc-50 dark:hover:bg-white/[0.04] transition-all backdrop-blur-sm shadow-sm dark:shadow-none"
              >
                <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 flex items-center justify-center mb-6 border border-black/5 dark:border-white/5 shadow-inner">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-black dark:text-white mb-4">{service.title}</h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-6">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-[10%] w-[80%] h-px bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-500/30 to-transparent" />
            {[
              { step: "01", title: "Deep Analysis", desc: "We audit your current marketing, identify bottlenecks, and map out a custom growth strategy." },
              { step: "02", title: "System Build", desc: "We construct your high-converting funnels, write the copy, and generate AI ad creatives." },
              { step: "03", title: "Launch & Scale", desc: "We deploy performance marketing campaigns and optimize daily to maximize your return on ad spend and drive sustainable growth." }
            ].map((item, i) => (
              <motion.div key={i} whileHover={{ y: -5 }} className="relative z-10 flex flex-col items-center text-center p-6">
                <div className="w-24 h-24 rounded-full bg-white dark:bg-[#050505] border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-3xl font-bold text-zinc-700 dark:text-zinc-300 mb-8 shadow-[0_0_30px_rgba(0,0,0,0.05)] dark:shadow-[0_0_30px_rgba(212,212,216,0.05)]">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold text-black dark:text-white mb-4">{item.title}</h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="py-32 px-6 bg-white dark:bg-[#050505] transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-6">Proven Results</h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">We let the numbers do the talking.</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <motion.div whileHover={{ y: -5 }} className="group relative rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900/50">
              <div className="aspect-video overflow-hidden">
                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Case Study 1" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold">E-Commerce</span>
                  <span className="text-zinc-500 dark:text-zinc-400 text-sm">Apparel Brand</span>
                </div>
                <h3 className="text-2xl font-bold text-black dark:text-white mb-4">Brand Growth 85% in 90 Days</h3>
                <p className="text-zinc-600 dark:text-zinc-400 mb-6">By implementing our AI-driven creative testing and performance marketing funnels, we scaled their monthly recurring revenue by 85% while decreasing CPA by 22%.</p>
                <div className="grid grid-cols-2 gap-4 border-t border-black/10 dark:border-white/10 pt-6">
                  <div>
                    <p className="text-3xl font-bold text-black dark:text-white">85%</p>
                    <p className="text-sm text-zinc-500">Revenue Growth</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-black dark:text-white">-22%</p>
                    <p className="text-sm text-zinc-500">Cost Per Acquisition</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-40 px-6 relative overflow-hidden bg-zinc-50 dark:bg-zinc-950 border-t border-black/5 dark:border-white/5 transition-colors duration-300">
        <div className="absolute inset-0 bg-blue-500/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-10">
          <h2 className="text-5xl md:text-7xl font-bold text-black dark:text-white tracking-tight">Ready to scale?</h2>
          <p className="text-2xl text-zinc-600 dark:text-zinc-400 font-light">Stop leaving money on the table. Let's build your client machine.</p>
          <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onOpenChat}
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-zinc-800 to-black dark:from-zinc-200 dark:to-zinc-400 text-white dark:text-black font-bold text-xl rounded-full shadow-[0_0_40px_rgba(0,0,0,0.1)] dark:shadow-[0_0_40px_rgba(212,212,216,0.2)] hover:shadow-[0_0_60px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_0_60px_rgba(212,212,216,0.4)] transition-all"
          >
            Get Your Growth Plan → Chat Now
          </motion.button>
        </div>
      </section>

      {/* Terms and Conditions Banner */}
      <AnimatePresence>
        {!termsAccepted && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 w-full z-50 p-4 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 px-6"
          >
            <p className="text-sm text-zinc-700 dark:text-zinc-300 text-center sm:text-left">
              By using our website, you agree to our <Link to="/terms" className="text-black dark:text-white underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms & Conditions</Link> and <Link to="/privacy" className="text-black dark:text-white underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</Link>.
            </p>
            <button
              onClick={acceptTerms}
              className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black font-bold rounded-full hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors whitespace-nowrap shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
            >
              I Accept
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
