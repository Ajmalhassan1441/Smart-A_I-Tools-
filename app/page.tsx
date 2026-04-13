'use client';

import { useState, useEffect, useRef } from 'react';
import Hero from '@/components/Hero';
import ToolCard from '@/components/ToolCard';
import FilterButtons from '@/components/FilterButtons';
import TrendingTools from '@/components/TrendingTools';
import VoiceSearch from '@/components/VoiceSearch';
import Newsletter from '@/components/Newsletter';
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

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');
  const [favorites, setFavorites] = useState<Tool[]>([]);
  const [filteredTools, setFilteredTools] = useState<Tool[]>(allTools);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [voiceSearchActive, setVoiceSearchActive] = useState(false);
  const [voiceQuery, setVoiceQuery] = useState('');
  const [suggestedTools, setSuggestedTools] = useState<Tool[]>([]);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Filter tools based on search, category and price
  useEffect(() => {
    if (isVoiceMode) return;
    
    let filtered = allTools;

    if (searchTerm) {
      filtered = filtered.filter((tool: Tool) =>
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter((tool: Tool) => tool.category === selectedCategory);
    }

    if (selectedPrice !== 'All') {
      filtered = filtered.filter((tool: Tool) => 
        tool.tags && tool.tags.includes(selectedPrice)
      );
    }

    setFilteredTools(filtered);
  }, [searchTerm, selectedCategory, selectedPrice, isVoiceMode]);

  // Show scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFavorite = (tool: Tool) => {
    setFavorites((prev: Tool[]) => {
      const exists = prev.some((fav: Tool) => fav.id === tool.id);
      if (exists) {
        return prev.filter((fav: Tool) => fav.id !== tool.id);
      } else {
        return [...prev, tool];
      }
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleVoiceSearch = (query: string, suggested: Tool[]) => {
    setVoiceQuery(query);
    setVoiceSearchActive(true);
    setIsVoiceMode(true);
    setSuggestedTools(suggested);
    setSelectedCategory('All');
    setSelectedPrice('All');
    setSearchTerm(query);
    setFilteredTools(suggested);
    
    if (searchInputRef.current) {
      searchInputRef.current.value = query;
    }
    
    const message = document.createElement('div');
    message.className = 'fixed top-24 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-fade-in-up';
    message.innerHTML = `🎤 "${query}" - Found ${suggested.length} relevant AI tools`;
    document.body.appendChild(message);
    setTimeout(() => message.remove(), 4000);
  };

  const clearVoiceSearch = () => {
    setVoiceSearchActive(false);
    setIsVoiceMode(false);
    setVoiceQuery('');
    setSearchTerm('');
    setSuggestedTools([]);
    setFilteredTools(allTools);
    setSelectedCategory('All');
    setSelectedPrice('All');
    
    if (searchInputRef.current) {
      searchInputRef.current.value = '';
    }
  };

  const categories = ['All', ...new Set(allTools.map((t: Tool) => t.category))];
  const toolsCount = filteredTools.length;
  
  const freeToolsCount = allTools.filter((t: Tool) => t.tags?.includes('Free')).length;
  const paidToolsCount = allTools.filter((t: Tool) => t.tags?.includes('Paid')).length;
  const trialToolsCount = allTools.filter((t: Tool) => t.tags?.includes('Free trial')).length;

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      
      <Hero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Stats Bar */}
        <div className="flex flex-wrap justify-between items-center mb-8 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">📊</span>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Tools</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{allTools.length}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🆓</span>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Free Tools</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{freeToolsCount}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-2xl">💎</span>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Paid Tools</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{paidToolsCount}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🎁</span>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Free Trial</p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{trialToolsCount}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-2xl">❤️</span>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Favorites</p>
              <p className="text-2xl font-bold text-rose-600 dark:text-rose-400">{favorites.length}</p>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mb-8">
          <Newsletter />
        </div>

        {/* Search Section with Voice */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="🔍 Search AI tools by name or description..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setVoiceSearchActive(false);
                setIsVoiceMode(false);
              }}
              className="w-full pl-10 pr-24 py-4 text-gray-900 dark:text-white bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 shadow-lg hover:shadow-xl"
            />
            
            <div className="absolute inset-y-0 right-2 flex items-center">
              <VoiceSearch tools={allTools} onSearchResult={handleVoiceSearch} />
            </div>
            
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-16 pr-3 flex items-center"
              >
                <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          
          {voiceSearchActive && (
            <div className="text-center mt-3">
              <span className="inline-flex items-center space-x-2 px-4 py-2 bg-linear-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full text-sm">
                <span className="text-purple-500">🎤</span>
                <span className="text-gray-700 dark:text-gray-300">Voice Search: "{voiceQuery}"</span>
                <button onClick={clearVoiceSearch} className="ml-2 text-gray-500 hover:text-gray-700">
                  ✕
                </button>
              </span>
            </div>
          )}
        </div>

        {/* Trending Tools Section */}
        {!isVoiceMode && (
          <TrendingTools 
            tools={allTools}
            favorites={favorites}
            onFavoriteToggle={toggleFavorite}
          />
        )}

        {/* Dynamic Recommended Section for Voice Search */}
        {isVoiceMode && suggestedTools.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                🎤 Recommended for "{voiceQuery}"
              </h2>
              <button onClick={clearVoiceSearch} className="text-sm text-gray-500 hover:text-purple-500">
                Clear ✕
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {suggestedTools.slice(0, 4).map((tool: Tool, idx: number) => (
                <div key={tool.id} className="animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <ToolCard
                    tool={tool}
                    isFavorite={favorites.some((fav: Tool) => fav.id === tool.id)}
                    onFavoriteToggle={() => toggleFavorite(tool)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category and Price Filters */}
        <div className="mb-8">
          <FilterButtons
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedPrice={selectedPrice}
            onPriceChange={setSelectedPrice}
          />
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Found {toolsCount} tools
            {selectedPrice !== 'All' && ` • ${selectedPrice} only`}
            {selectedCategory !== 'All' && ` • ${selectedCategory} category`}
          </p>
        </div>

        {/* Tools Grid */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTools.map((tool: Tool, index: number) => (
              <div
                key={tool.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <ToolCard
                  tool={tool}
                  isFavorite={favorites.some((fav: Tool) => fav.id === tool.id)}
                  onFavoriteToggle={() => toggleFavorite(tool)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              No tools found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search, category, or price filter
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setSelectedPrice('All');
                setVoiceSearchActive(false);
                setIsVoiceMode(false);
                setFilteredTools(allTools);
                if (searchInputRef.current) {
                  searchInputRef.current.value = '';
                }
              }}
              className="px-6 py-3 bg-linear-to-r from-purple-500 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-linear-to-r from-purple-500 to-pink-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50 animate-bounce-slow"
          aria-label="Scroll to top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  );
}