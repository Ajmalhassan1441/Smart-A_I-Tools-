'use client';

import { useState, useEffect } from 'react';
import ToolCard from './ToolCard';

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

interface TrendingToolsProps {
  tools: Tool[];
  favorites: Tool[];
  onFavoriteToggle: (tool: Tool) => void;
}

export default function TrendingTools({ tools, favorites, onFavoriteToggle }: TrendingToolsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const trendingTools = tools.filter(tool => tool.trending);

  if (trendingTools.length === 0) return null;

  // Auto-rotate trending tools every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.ceil(trendingTools.length / 4));
    }, 5000);
    return () => clearInterval(interval);
  }, [trendingTools.length]);

  const visibleTools = trendingTools.slice(currentIndex * 4, (currentIndex + 1) * 4);

  return (
    <section className="mb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div className="flex items-center space-x-3 mb-4 sm:mb-0">
          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-r from-red-500 to-orange-500 rounded-full blur-lg animate-pulse"></div>
            <div className="relative text-4xl">🔥</div>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Trending Tools
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Most popular AI tools right now</p>
          </div>
        </div>
        
        {/* Indicators */}
        <div className="flex space-x-2">
          {[...Array(Math.ceil(trendingTools.length / 4))].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === idx
                  ? 'w-8 bg-linear-to-r from-red-500 to-orange-500'
                  : 'w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Trending Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {visibleTools.map((tool, idx) => (
          <div
            key={tool.id}
            className="animate-fade-in-up"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <div className="relative">
              {/* Trending Badge */}
              <div className="absolute -top-2 -left-2 z-10">
                <div className="bg-linear-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center space-x-1 shadow-lg">
                  <span>🔥</span>
                  <span>#{idx + 1 + currentIndex * 4}</span>
                </div>
              </div>
              <ToolCard
                tool={tool}
                isFavorite={favorites.some(fav => fav.id === tool.id)}
                onFavoriteToggle={() => onFavoriteToggle(tool)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-8">
        <button
          onClick={() => document.getElementById('all-tools')?.scrollIntoView({ behavior: 'smooth' })}
          className="inline-flex items-center space-x-2 px-6 py-3 bg-linear-to-r from-red-500 to-orange-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          <span>View All Trending Tools</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </section>
  );
}