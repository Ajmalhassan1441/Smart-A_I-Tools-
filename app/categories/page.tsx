'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import toolsData from '@/data/tools.json';

interface Tool {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
  rating: number;
  trending: boolean;
}

const allTools: Tool[] = (toolsData as any).tools || toolsData;

const categoryIcons: { [key: string]: { icon: string; color: string; gradient: string; bgLight: string } } = {
  'Writing': { icon: '✍️', color: 'text-blue-600', gradient: 'from-blue-500 to-blue-600', bgLight: 'bg-blue-50' },
  'Image': { icon: '🎨', color: 'text-purple-600', gradient: 'from-purple-500 to-purple-600', bgLight: 'bg-purple-50' },
  'Video': { icon: '🎬', color: 'text-red-600', gradient: 'from-red-500 to-red-600', bgLight: 'bg-red-50' },
  'Coding': { icon: '💻', color: 'text-green-600', gradient: 'from-green-500 to-green-600', bgLight: 'bg-green-50' },
  'Audio': { icon: '🎵', color: 'text-pink-600', gradient: 'from-pink-500 to-pink-600', bgLight: 'bg-pink-50' },
  'Design': { icon: '🎨', color: 'text-indigo-600', gradient: 'from-indigo-500 to-indigo-600', bgLight: 'bg-indigo-50' },
  'Productivity': { icon: '⚡', color: 'text-yellow-600', gradient: 'from-yellow-500 to-yellow-600', bgLight: 'bg-yellow-50' },
  'Education': { icon: '📚', color: 'text-teal-600', gradient: 'from-teal-500 to-teal-600', bgLight: 'bg-teal-50' },
  'Research': { icon: '🔬', color: 'text-cyan-600', gradient: 'from-cyan-500 to-cyan-600', bgLight: 'bg-cyan-50' },
};

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Tool[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [animatedCards, setAnimatedCards] = useState<string[]>([]);
  
  // Typing animation states
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const words = [
    'Discover Amazing AI Tools',
    'Find Your Perfect Tool',
    'Explore Categories'
  ];

  // Typing Animation Effect
  useEffect(() => {
    const currentWord = words[textIndex % words.length];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        } else {
          // Pause then start deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(currentWord.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setTextIndex((prev) => prev + 1);
        }
      }
    }, isDeleting ? 80 : 120);
    
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex]);

  useEffect(() => {
    const saved = localStorage.getItem('favorites');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  useEffect(() => {
    const categoriesList = [...new Set(allTools.map(t => t.category))];
    categoriesList.forEach((cat, index) => {
      setTimeout(() => {
        setAnimatedCards(prev => [...prev, cat]);
      }, index * 100);
    });
  }, []);

  const toggleFavorite = (toolId: number) => {
    const newFavorites = favorites.filter(t => t.id !== toolId);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const categories = [...new Set(allTools.map(t => t.category))];
  const categoryTools = selectedCategory ? allTools.filter(t => t.category === selectedCategory) : [];
  const filteredTools = categoryTools.filter(t =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getToolCount = (cat: string) => allTools.filter(t => t.category === cat).length;

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 pt-24 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Typing Animation */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Browse <span className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Categories</span>
          </h1>
          
          {/* Typing Animation Text - No Cursor */}
          <div className="h-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl">
              {displayText}
            </p>
          </div>
        </div>

        {!selectedCategory ? (
          // Categories Grid
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => {
              const config = categoryIcons[category] || { icon: '🔧', color: 'text-gray-600', gradient: 'from-gray-500 to-gray-600', bgLight: 'bg-gray-50' };
              const count = getToolCount(category);
              const isAnimated = animatedCards.includes(category);
              
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  onMouseEnter={() => setHoveredCard(category)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`group text-left transition-all duration-500 hover:scale-105 ${
                    isAnimated ? 'animate-scale-in' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden relative transition-all duration-500 ${
                    hoveredCard === category ? 'shadow-2xl' : ''
                  }`}>
                    <div className={`absolute inset-0 bg-linear-to-r ${config.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                    
                    <div className={`relative transition-transform duration-500 ${hoveredCard === category ? 'translate-y-[-4px]' : ''}`}>
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-16 h-16 bg-linear-to-br ${config.gradient} rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-all duration-500 group-hover:rotate-6`}>
                          {config.icon}
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-yellow-500">⭐</span>
                          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            {(allTools.filter(t => t.category === category).reduce((a, t) => a + t.rating, 0) / count).toFixed(1)}
                          </span>
                        </div>
                      </div>
                      
                      <h2 className={`text-xl font-bold ${config.color} mb-2 group-hover:translate-x-1 transition-transform duration-300`}>
                        {category}
                      </h2>
                      
                      <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                        {count} {count === 1 ? 'tool' : 'tools'} available
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-purple-500 group-hover:translate-x-2 transition-all duration-300 inline-flex items-center">
                          Explore 
                          <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                        <div className="flex -space-x-2">
                          {allTools.filter(t => t.category === category).slice(0, 3).map((t, i) => (
                            <div 
                              key={t.id} 
                              className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-800 overflow-hidden"
                              style={{ animationDelay: `${i * 0.1}s` }}
                            >
                              {t.image && (
                                <Image src={t.image} alt={t.name} width={32} height={32} className="w-full h-full object-cover" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          // Category Detail View
          <div>
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSearchTerm('');
              }}
              className="group mb-6 inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-purple-500 transition-all duration-300 hover:translate-x-[-4px]"
            >
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Categories</span>
            </button>

            {/* Category Header */}
            <div className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 mb-8 text-white">
              <div className="flex items-center space-x-4">
                <div className="text-5xl bg-white/20 rounded-2xl p-4">
                  {categoryIcons[selectedCategory]?.icon || '🔧'}
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold">
                    {selectedCategory}
                  </h2>
                  <p className="text-white/80 mt-1">
                    {getToolCount(selectedCategory)} powerful AI tools in this category
                  </p>
                </div>
              </div>
              
              <div className="relative max-w-md mt-6">
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder={`Search in ${selectedCategory}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 transition-all duration-300 focus:scale-105"
                />
              </div>
            </div>

            {/* Tools Grid */}
            {filteredTools.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTools.map((tool, index) => (
                  <div 
                    key={tool.id} 
                    className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <Link href={`/tool/${tool.id}`}>
                      <div className="relative h-44 w-full overflow-hidden bg-linear-to-r from-indigo-500 to-purple-500">
                        <Image
                          src={tool.image}
                          alt={tool.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"></div>
                        
                        <div className="absolute top-3 right-3">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              toggleFavorite(tool.id);
                            }}
                            className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:scale-110 transition-all duration-300"
                          >
                            <span className={favorites.some(f => f.id === tool.id) ? 'text-red-500' : 'text-gray-400'}>
                              {favorites.some(f => f.id === tool.id) ? '❤️' : '🤍'}
                            </span>
                          </button>
                        </div>
                        
                        <div className="absolute bottom-3 left-3">
                          <span className="px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs">
                            {tool.category}
                          </span>
                        </div>
                      </div>
                    </Link>
                    <div className="p-5">
                      <Link href={`/tool/${tool.id}`}>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-500 transition-colors duration-300 group-hover:translate-x-1 inline-block">
                          {tool.name}
                        </h3>
                      </Link>
                      <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3">
                        {tool.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <span className="text-yellow-400 text-sm">⭐</span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">{tool.rating}</span>
                        </div>
                        <a
                          href={tool.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-500 text-sm font-medium hover:underline group-hover:translate-x-1 transition-transform duration-300"
                        >
                          Visit →
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">🔍</div>
                <p className="text-gray-500">No tools found in {selectedCategory}</p>
                <button 
                  onClick={() => setSearchTerm('')} 
                  className="mt-4 text-indigo-500 hover:text-indigo-600 transition-all duration-300 hover:scale-105 inline-block"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-scale-in {
          animation: scaleIn 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}