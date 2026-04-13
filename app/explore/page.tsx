'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import ToolCard from '@/components/ToolCard';
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

export default function ExplorePage() {
  const [favorites, setFavorites] = useState<Tool[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const toggleFavorite = (tool: Tool) => {
    setFavorites((prev: Tool[]) => {
      const exists = prev.some((fav: Tool) => fav.id === tool.id);
      let newFavorites;
      if (exists) {
        newFavorites = prev.filter((fav: Tool) => fav.id !== tool.id);
      } else {
        newFavorites = [...prev, tool];
      }
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  let filteredTools = allTools;
  if (searchTerm) {
    filteredTools = filteredTools.filter(tool =>
      tool.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  if (selectedCategory !== 'All') {
    filteredTools = filteredTools.filter(tool => tool.category === selectedCategory);
  }

  const categories = ['All', ...new Set(allTools.map(t => t.category))];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Explore <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">AI Tools</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover the best AI tools for your needs. Start exploring now!
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search AI tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-5 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Tools Grid */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTools.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                isFavorite={favorites.some(fav => fav.id === tool.id)}
                onFavoriteToggle={() => toggleFavorite(tool)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">No tools found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search</p>
          </div>
        )}
      </div>
    </div>
  );
}