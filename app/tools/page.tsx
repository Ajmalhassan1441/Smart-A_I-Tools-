'use client';

import { useState, useEffect, useRef } from 'react';
import ToolCard from '@/components/ToolCard';
import FilterButtons from '@/components/FilterButtons';
import VoiceSearch from '@/components/VoiceSearch';
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

export default function ToolsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');
  const [favorites, setFavorites] = useState<Tool[]>([]);
  const [filteredTools, setFilteredTools] = useState<Tool[]>(allTools);
  const [voiceSearchActive, setVoiceSearchActive] = useState(false);
  const [voiceQuery, setVoiceQuery] = useState('');
  const [suggestedTools, setSuggestedTools] = useState<Tool[]>([]);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

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

  const totalTools = allTools.length;
  const toolsCount = filteredTools.length;
  const freeToolsCount = allTools.filter((t: Tool) => t.tags?.includes('Free')).length;
  const paidToolsCount = allTools.filter((t: Tool) => t.tags?.includes('Paid')).length;
  const trialToolsCount = allTools.filter((t: Tool) => t.tags?.includes('Free trial')).length;

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            All AI Tools
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Browse our complete collection of <span className="font-bold text-purple-600 dark:text-purple-400">{totalTools}</span> AI tools
          </p>
        </div>

        {/* Stats Bar */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl px-4 py-2">
            <span className="text-green-600 dark:text-green-400">🆓 Free: {freeToolsCount}</span>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl px-4 py-2">
            <span className="text-blue-600 dark:text-blue-400">💎 Paid: {paidToolsCount}</span>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl px-4 py-2">
            <span className="text-purple-600 dark:text-purple-400">🎁 Trial: {trialToolsCount}</span>
          </div>
        </div>

        {/* Search Bar with Voice Search */}
        <div className="max-w-md mx-auto mb-6">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="🔍 Search tools by name or description..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setVoiceSearchActive(false);
                setIsVoiceMode(false);
              }}
              className="w-full pl-10 pr-14 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <VoiceSearch tools={allTools} onSearchResult={handleVoiceSearch} />
            </div>
          </div>
        </div>

        {/* Voice Search Active Indicator */}
        {voiceSearchActive && (
          <div className="text-center mb-4">
            <span className="inline-flex items-center space-x-2 px-4 py-2 bg-linear-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full text-sm">
              <span className="text-purple-500">🎤</span>
              <span className="text-gray-700 dark:text-gray-300">Voice Search: "{voiceQuery}"</span>
              <button onClick={clearVoiceSearch} className="ml-2 text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </span>
          </div>
        )}

        {/* Filters */}
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

        {/* Dynamic Recommended Section for Voice Search */}
        {isVoiceMode && suggestedTools.length > 0 ? (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                🎤 Recommended for "{voiceQuery}"
              </h2>
              <button onClick={clearVoiceSearch} className="text-sm text-gray-500 hover:text-purple-500">
                Clear ✕
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {suggestedTools.slice(0, 8).map((tool: Tool, idx: number) => (
                <div key={tool.id} className="animate-fade-in-up" style={{ animationDelay: `${idx * 0.05}s` }}>
                  <ToolCard
                    tool={tool}
                    isFavorite={favorites.some((fav: Tool) => fav.id === tool.id)}
                    onFavoriteToggle={() => toggleFavorite(tool)}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Tools Grid */
          filteredTools.length > 0 ? (
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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No tools found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
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
                className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}