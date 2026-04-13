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

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Tool[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [animatedCards, setAnimatedCards] = useState<number[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    // Animate cards one by one on load
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      const favs = JSON.parse(savedFavorites);
      favs.forEach((_: any, index: number) => {
        setTimeout(() => {
          setAnimatedCards(prev => [...prev, index]);
        }, index * 100);
      });
    }
  }, [favorites.length]);

  const toggleFavorite = (toolId: number) => {
    const newFavorites = favorites.filter(t => t.id !== toolId);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  let filteredFavorites = favorites;
  if (searchTerm) {
    filteredFavorites = filteredFavorites.filter(tool =>
      tool.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  if (selectedCategory !== 'All') {
    filteredFavorites = filteredFavorites.filter(tool => tool.category === selectedCategory);
  }

  const categories = ['All', ...new Set(favorites.map(t => t.category))];

  return (
    <div className="min-h-screen bg-linear-to-br from-rose-50 via-pink-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 pt-24 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            My <span className="bg-linear-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">Favorites</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Your personal collection of beloved AI tools
          </p>
        </div>

        {favorites.length === 0 ? (
          // Empty State with Animation
          <div className="text-center py-20 animate-fade-in">
            <div className="text-9xl mb-6 opacity-50 animate-bounce-slow">🤍</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              No favorites yet
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              Start exploring and save your favorite AI tools
            </p>
            <Link
              href="/"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-linear-to-r from-rose-500 to-pink-500 text-white rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <span>Browse Tools</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        ) : (
          <>
            {/* Stats Cards with Animation */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-5 text-center border border-rose-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-slide-up">
                <div className="text-3xl mb-2 animate-pulse-slow">❤️</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{favorites.length}</div>
                <div className="text-sm text-gray-500">Saved Tools</div>
              </div>
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-5 text-center border border-rose-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <div className="text-3xl mb-2">⭐</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {(favorites.reduce((a, t) => a + t.rating, 0) / favorites.length).toFixed(1)}
                </div>
                <div className="text-sm text-gray-500">Avg Rating</div>
              </div>
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-5 text-center border border-rose-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="text-3xl mb-2">🏆</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {favorites.reduce((a, t) => a + (t.trending ? 1 : 0), 0)}
                </div>
                <div className="text-sm text-gray-500">Trending Tools</div>
              </div>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search favorites..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-rose-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 focus:scale-105"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-5 py-3 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-rose-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500 transition-all duration-300 hover:scale-105"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Favorites Grid with Staggered Animation */}
            {filteredFavorites.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFavorites.map((tool, index) => (
                  <div 
                    key={tool.id} 
                    className={`group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                      animatedCards.includes(index) ? 'animate-scale-in' : 'opacity-0'
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onMouseEnter={() => setHoveredCard(tool.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <Link href={`/tool/${tool.id}`}>
                      <div className="relative h-44 w-full overflow-hidden bg-linear-to-r from-rose-500 to-pink-500">
                        <Image
                          src={tool.image}
                          alt={tool.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                        <div className={`absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500`}></div>
                        
                        {/* Remove from Favorites Button */}
                        <div className="absolute top-3 right-3">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              toggleFavorite(tool.id);
                            }}
                            className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:scale-110 transition-all duration-300"
                          >
                            <span className="text-red-500 text-xl">❤️</span>
                          </button>
                        </div>
                        
                        {/* Category Badge */}
                        <div className="absolute bottom-3 left-3">
                          <span className="px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs">
                            {tool.category}
                          </span>
                        </div>
                      </div>
                    </Link>
                    <div className="p-5">
                      <Link href={`/tool/${tool.id}`}>
                        <h3 className={`text-lg font-bold text-gray-900 dark:text-white mb-2 transition-all duration-300 ${
                          hoveredCard === tool.id ? 'text-rose-500 translate-x-1' : 'group-hover:text-rose-500'
                        }`}>
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
                          className="text-rose-500 text-sm font-medium hover:underline hover:translate-x-1 transition-all duration-300"
                        >
                          Visit →
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 animate-fade-in">
                <div className="text-5xl mb-4 animate-bounce-slow">🔍</div>
                <p className="text-gray-500">No matching favorites found</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                  }}
                  className="mt-4 text-rose-500 hover:text-rose-600 transition-all duration-300 hover:scale-105 inline-block"
                >
                  Clear filters
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
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
        
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        .animate-slide-up {
          animation: slideUp 0.5s ease-out forwards;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        
        .animate-scale-in {
          animation: scaleIn 0.4s ease-out forwards;
        }
        
        .animate-bounce-slow {
          animation: bounce 2s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}