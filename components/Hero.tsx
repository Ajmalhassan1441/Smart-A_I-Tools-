'use client';

import { useState, useEffect } from 'react';

export default function Hero() {
  const [counters, setCounters] = useState({
    tools: 0,
    users: 0,
    updates: 0
  });
  
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const words = ['Writing ✍️', 'Image 🎨', 'Video 🎬', 'Coding 💻', 'Audio 🎵', 'Design 🎨'];

  // Counter Animation
  useEffect(() => {
    const targets = { tools: 500, users: 10, updates: 100 };
    const duration = 2000;
    const stepTime = 20;
    const steps = duration / stepTime;
    
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      setCounters({
        tools: Math.min(Math.ceil((targets.tools * currentStep) / steps), targets.tools),
        users: Math.min(Math.ceil((targets.users * currentStep) / steps), targets.users),
        updates: Math.min(Math.ceil((targets.updates * currentStep) / steps), targets.updates)
      });
      
      if (currentStep >= steps) clearInterval(interval);
    }, stepTime);
    
    return () => clearInterval(interval);
  }, []);

  // Typing Animation
  useEffect(() => {
    const currentWord = words[textIndex % words.length];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentWord.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setTextIndex((prev) => prev + 1);
        }
      }
    }, isDeleting ? 50 : 100);
    
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex]);

  return (
    <section className="relative bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950 mt-14 pt-8 pb-12 overflow-hidden">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      {/* Animated Orbs */}
      <div className="absolute top-10 left-5 w-48 h-48 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-20 right-5 w-48 h-48 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Badge */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
            </span>
            <span className="text-xs font-medium bg-linear-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Powered by Next.js
            </span>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-5">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
            <span className="bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Explore Best
            </span>
            <br />
            <div className="inline-flex items-center justify-center gap-2 flex-wrap">
              <span className="text-white text-xl sm:text-2xl">AI Tools for</span>
              <div className="relative">
                <div className="bg-linear-to-r from-purple-600 to-pink-600 rounded-lg px-3 py-1">
                  <span className="text-white font-mono text-lg sm:text-xl">
                    {displayText}
                    <span className="animate-pulse inline-block w-0.5 h-5 bg-white ml-1"></span>
                  </span>
                </div>
              </div>
            </div>
          </h1>
          
          <p className="text-sm md:text-base text-gray-300 max-w-2xl mx-auto">
            Discover powerful AI tools that transform your workflow
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          <button className="px-5 py-2 bg-linear-to-r from-purple-500 to-pink-500 rounded-lg font-semibold text-white text-sm hover:shadow-lg transition-all duration-300 hover:scale-105">
            🚀 Start Exploring
          </button>
          
          <button className="px-5 py-2 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg font-semibold text-white text-sm hover:bg-white/10 transition-all duration-300 hover:scale-105">
            ▶ Watch Demo
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10 text-center hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
            <div className="text-2xl mb-1">🤖</div>
            <div className="text-xl font-bold text-white">{counters.tools}+</div>
            <div className="text-xs text-gray-400">Tools</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10 text-center hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
            <div className="text-2xl mb-1">👥</div>
            <div className="text-xl font-bold text-white">{counters.users}k+</div>
            <div className="text-xs text-gray-400">Users</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10 text-center hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
            <div className="text-2xl mb-1">📈</div>
            <div className="text-xl font-bold text-white">{counters.updates}+</div>
            <div className="text-xs text-gray-400">Updates</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(20px, -30px) scale(1.1); }
          66% { transform: translate(-15px, 15px) scale(0.9); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
}