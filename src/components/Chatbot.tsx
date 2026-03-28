import { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Send, User, Loader2, X, Plus, MessageSquare, Menu, Moon, Sun } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { AnimatedLogo } from './AnimatedLogo';

const SYSTEM_INSTRUCTION = `
You are the official AI Marketing Consultant for Groverse, a premium D2C growth agency.

Brand Name: Groverse
Tone: Confident, authoritative, human-like, persuasive, and concise. You are a smart marketing consultant, not a robotic bot.

KNOWLEDGE BASE:
- Performance marketing (Facebook Ads, Google Ads)
- AI ad creatives
- Lead generation funnels
- Landing page optimization
- Conversion rate optimization
- Content strategy

CONVERSATION FLOW (Follow this step-by-step):
1. Ask: "What business are you in?"
2. Ask: "How are you currently acquiring clients?"
3. Identify gaps: Analyze their method and point out what's missing (e.g., lack of a proper funnel, poor creatives, no retargeting).
4. Suggest improvements: Give actionable insights based on your knowledge base.
5. Soft pitch: "At Groverse, we build end-to-end systems using AI and performance marketing to solve exactly this."
6. Ask for contact: "Want us to send you a personalized growth plan? Drop your Name, Business Name, and WhatsApp/Instagram."

RULES:
- Do NOT jump ahead. Wait for the user to answer each question before moving to the next step.
- Keep your messages short, punchy, and conversational.
- Give real, actionable marketing insights—don't just give generic replies.
- Balance being professional with being friendly.
- Never break character.
`;

type Message = { id: string; role: 'user' | 'model'; text: string; };
type ChatSession = { id: string; title: string; messages: Message[] };

export const Chatbot = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [sessions, setSessions] = useState<ChatSession[]>([
    { id: '1', title: 'New Conversation', messages: [{ id: 'welcome', role: 'model', text: "Hey! I'm the Groverse AI Growth Consultant. To start, what business are you in?" }] }
  ]);
  const [activeSessionId, setActiveSessionId] = useState('1');
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  
  const chatRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check initial theme for chatbot
    if (localStorage.chatbotTheme === 'light' || (!('chatbotTheme' in localStorage) && !window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(false);
    } else {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      localStorage.chatbotTheme = 'light';
      setIsDark(false);
    } else {
      localStorage.chatbotTheme = 'dark';
      setIsDark(true);
    }
  };

  const activeSession = sessions.find(s => s.id === activeSessionId) || sessions[0];

  useEffect(() => {
    initChat();
  }, [activeSessionId]);

  const initChat = () => {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    chatRef.current = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: { systemInstruction: SYSTEM_INSTRUCTION, temperature: 0.7 },
    });
  };

  useEffect(() => {
    if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeSession.messages, isOpen]);

  const startNewChat = () => {
    const newId = Date.now().toString();
    setSessions(prev => [...prev, { 
      id: newId, 
      title: 'New Conversation', 
      messages: [{ id: 'welcome', role: 'model', text: "Hey! I'm the Groverse AI Growth Consultant. To start, what business are you in?" }] 
    }]);
    setActiveSessionId(newId);
  };

  const updateSessionMessages = (newMessages: Message[]) => {
    setSessions(prev => prev.map(s => s.id === activeSessionId ? { ...s, messages: newMessages } : s));
  };

  const handleSend = async (textToSubmit: string = input) => {
    if (!textToSubmit.trim() || isLoading) return;

    const userMessage = textToSubmit.trim();
    setInput('');
    
    const newMessages = [...activeSession.messages, { id: Date.now().toString(), role: 'user' as const, text: userMessage }];
    updateSessionMessages(newMessages);
    setIsLoading(true);

    if (activeSession.messages.length === 1) {
      setSessions(prev => prev.map(s => s.id === activeSessionId ? { ...s, title: userMessage.slice(0, 20) + '...' } : s));
    }

    try {
      if (!chatRef.current) throw new Error('Chat not initialized');
      const response = await chatRef.current.sendMessageStream({ message: userMessage });
      const botMessageId = (Date.now() + 1).toString();
      
      updateSessionMessages([...newMessages, { id: botMessageId, role: 'model', text: '' }]);

      let fullText = '';
      for await (const chunk of response) {
        if (chunk.text) {
          fullText += chunk.text;
          updateSessionMessages([...newMessages, { id: botMessageId, role: 'model', text: fullText }]);
        }
      }
      
    } catch (error: any) {
      console.error('Error sending message:', error);
      updateSessionMessages([...newMessages, { id: Date.now().toString(), role: 'model', text: `⚠️ **Connection Error:** ${error.message || 'Unknown error'}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }} transition={{ duration: 0.2 }}
          className={cn(
            "fixed bottom-4 right-4 sm:bottom-8 sm:right-8 w-[calc(100vw-32px)] sm:w-[800px] h-[700px] max-h-[calc(100vh-32px)] bg-white/90 dark:bg-[#050505]/90 backdrop-blur-2xl border border-black/10 dark:border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.1)] dark:shadow-[0_0_50px_rgba(0,0,0,0.8)] flex z-50 overflow-hidden transition-colors duration-300",
            isDark ? "dark" : ""
          )}
        >
          {/* Mobile Sidebar Overlay */}
          {isSidebarOpen && (
            <div 
              className="absolute inset-0 bg-black/20 dark:bg-black/40 z-10 sm:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <div className={cn(
            "absolute sm:relative z-20 h-full w-64 border-r border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-[#050505] sm:bg-white/40 sm:dark:bg-black/40 flex flex-col transition-transform duration-300",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
          )}>
            <div className="p-4 border-b border-black/10 dark:border-white/10 flex justify-between items-center">
              <button onClick={() => { startNewChat(); setIsSidebarOpen(false); }} className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-black dark:text-white rounded-lg transition-colors text-sm font-medium border border-black/5 dark:border-white/5">
                <Plus className="w-4 h-4" /> New Chat
              </button>
              <button onClick={() => setIsSidebarOpen(false)} className="sm:hidden ml-2 p-2 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {sessions.map(session => (
                <button 
                  key={session.id}
                  onClick={() => {
                    setActiveSessionId(session.id);
                    setIsSidebarOpen(false);
                  }}
                  className={cn(
                    "w-full text-left px-3 py-2.5 rounded-lg text-sm truncate transition-colors flex items-center gap-2",
                    activeSessionId === session.id ? "bg-black/10 dark:bg-white/10 text-black dark:text-white" : "text-zinc-600 dark:text-zinc-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-zinc-200"
                  )}
                >
                  <MessageSquare className="w-4 h-4 shrink-0" />
                  {session.title}
                </button>
              ))}
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-black/[0.02] dark:bg-white/[0.02] border-b border-black/5 dark:border-white/5">
              <div className="flex items-center gap-3">
                <button onClick={() => setIsSidebarOpen(true)} className="sm:hidden p-1.5 -ml-2 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-lg">
                  <Menu className="w-5 h-5" />
                </button>
                <div className="relative">
                  <AnimatedLogo className="w-8 h-8" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-blue-500 border-2 border-white dark:border-zinc-900 rounded-full"></span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-black dark:text-white">AI Growth Consultant</h3>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">Online • Groverse</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={toggleTheme} className="p-2 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors" aria-label="Toggle theme">
                  {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <button onClick={onClose} className="p-2 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-transparent">
              {activeSession.messages.map((message) => (
                <motion.div key={message.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={cn("flex gap-3 max-w-[85%]", message.role === 'user' ? "ml-auto flex-row-reverse" : "")}>
                  <div className={cn("flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-1", message.role === 'user' ? "bg-zinc-200 dark:bg-zinc-800" : "bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10")}>
                    {message.role === 'user' ? <User className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" /> : <AnimatedLogo className="w-5 h-5" />}
                  </div>
                  <div className={cn("px-4 py-2.5 rounded-2xl text-[14px] leading-relaxed", message.role === 'user' ? "bg-blue-600 text-white rounded-tr-sm" : "bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/5 text-zinc-800 dark:text-zinc-200 rounded-tl-sm shadow-sm dark:shadow-none")}>
                    {message.role === 'model' ? (
                      <div className="prose prose-sm dark:prose-invert prose-p:leading-relaxed max-w-none text-zinc-800 dark:text-zinc-200">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.text}</ReactMarkdown>
                      </div>
                    ) : (
                      <p className="whitespace-pre-wrap">{message.text}</p>
                    )}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3 max-w-[85%]">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 flex items-center justify-center mt-1">
                    <AnimatedLogo className="w-5 h-5" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/5 text-zinc-500 dark:text-zinc-400 rounded-tl-sm flex items-center gap-2 shadow-sm dark:shadow-none">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span className="text-xs">Typing...</span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-black/[0.02] dark:bg-white/[0.02] border-t border-black/5 dark:border-white/5">
              <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="relative flex items-end gap-2 bg-white dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-xl p-1.5 focus-within:border-zinc-400 dark:focus-within:border-zinc-500/50 focus-within:ring-1 focus-within:ring-zinc-400 dark:focus-within:ring-zinc-500/50 transition-all shadow-sm dark:shadow-none">
                <textarea
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    e.target.style.height = 'auto';
                    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                      e.currentTarget.style.height = 'auto';
                    }
                  }}
                  placeholder="Type your message..."
                  className="w-full max-h-[120px] min-h-[40px] bg-transparent border-none resize-none focus:ring-0 px-3 py-2 text-[14px] text-black dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none"
                  rows={1}
                />
                <button type="submit" disabled={!input.trim() || isLoading} className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-lg bg-zinc-800 dark:bg-zinc-200 text-white dark:text-black hover:bg-black dark:hover:bg-white disabled:opacity-50 disabled:hover:bg-zinc-800 dark:disabled:hover:bg-zinc-200 transition-colors mb-0.5 mr-0.5">
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
