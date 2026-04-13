'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import ShareButtons from '@/components/ShareButtons';
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

export default function ToolDetail() {
  const params = useParams();
  const router = useRouter();
  const [tool, setTool] = useState<Tool | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [relatedTools, setRelatedTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUrl, setCurrentUrl] = useState('');

  const allTools: Tool[] = (toolsData as any).tools || toolsData;

  useEffect(() => {
    setCurrentUrl(window.location.href);
    const toolId = parseInt(params.id as string);
    const foundTool = allTools.find((t: Tool) => t.id === toolId);
    
    if (foundTool) {
      setTool(foundTool);
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setIsFavorite(favorites.some((fav: Tool) => fav.id === toolId));
      
      const related = allTools
        .filter((t: Tool) => t.category === foundTool.category && t.id !== toolId)
        .slice(0, 4);
      setRelatedTools(related);
    } else {
      router.push('/');
    }
    setLoading(false);
  }, [params.id, router, allTools]);

  const toggleFavorite = () => {
    if (!tool) return;
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    let newFavorites;
    
    if (isFavorite) {
      newFavorites = favorites.filter((fav: Tool) => fav.id !== tool.id);
    } else {
      newFavorites = [...favorites, tool];
    }
    
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
    
    const message = document.createElement('div');
    message.className = 'fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-fade-in-up';
    message.innerHTML = isFavorite ? 'Removed from favorites ❌' : 'Added to favorites ❤️';
    document.body.appendChild(message);
    setTimeout(() => message.remove(), 2000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading tool details...</p>
        </div>
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Tool not found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">The tool you're looking for doesn't exist.</p>
          <Link href="/" className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 inline-block">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="group mb-6 inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Directory</span>
        </button>

        {/* Main Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
          
          {/* Image Section */}
          <div className="relative h-80 md:h-96 w-full bg-gradient-to-r from-purple-600 to-pink-600">
            {!imageError ? (
              <Image
                src={tool.image}
                alt={tool.name}
                fill
                className="object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <span className="text-8xl animate-bounce">🤖</span>
                <p className="text-white mt-4 text-lg">{tool.name}</p>
              </div>
            )}
            
            {/* Favorite Button */}
            <button
              onClick={toggleFavorite}
              className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:scale-110 transition-all duration-300"
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <span className="text-2xl">{isFavorite ? '❤️' : '🤍'}</span>
            </button>
            
            {/* Category Badge */}
            <div className="absolute bottom-4 left-4">
              <span className="px-4 py-2 bg-black/60 backdrop-blur-sm rounded-full text-white text-sm font-semibold">
                {tool.category}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 md:p-8">
            
            {/* Title and Rating */}
            <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                {tool.name}
              </h1>
              <div className="flex items-center space-x-2 bg-yellow-50 dark:bg-yellow-900/30 px-4 py-2 rounded-full">
                <span className="text-yellow-500 text-xl">⭐</span>
                <span className="text-gray-900 dark:text-white font-bold text-lg">{tool.rating}</span>
                <span className="text-gray-500 text-sm">/ 5.0</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {tool.tags?.map((tag, index) => (
                <span
                  key={index}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                    tag === 'Free'
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                      : tag === 'Paid'
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                      : tag === 'Popular'
                      ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
                      : tag === 'Trending'
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                      : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
                  }`}
                >
                  {tag === 'Free' && '🆓 FREE'}
                  {tag === 'Paid' && '💰 PAID'}
                  {tag === 'Popular' && '⭐ POPULAR'}
                  {tag === 'Trending' && '🔥 TRENDING'}
                  {!['Free', 'Paid', 'Popular', 'Trending'].includes(tag) && tag}
                </span>
              ))}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">About this tool</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {tool.description}
              </p>
            </div>

            {/* Features Section */}
            <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                <span>✨</span>
                <span>Key Features</span>
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center space-x-2">✓ AI-powered automation</li>
                <li className="flex items-center space-x-2">✓ User-friendly interface</li>
                <li className="flex items-center space-x-2">✓ Regular updates</li>
                <li className="flex items-center space-x-2">✓ 24/7 support</li>
              </ul>
            </div>

            {/* Visit Button */}
            <a
              href={tool.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-[1.02] group"
            >
              <span>Visit {tool.name} Website</span>
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            {/* Share Buttons */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <ShareButtons 
                toolName={tool.name}
                toolUrl={currentUrl}
                toolDescription={tool.description}
              />
            </div>
          </div>
        </div>

        {/* Related Tools Section */}
        {relatedTools.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                🔗 More {tool.category} Tools
              </h2>
              <Link href="/" className="text-sm text-purple-600 dark:text-purple-400 hover:underline">
                View all →
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedTools.map((relatedTool) => (
                <Link key={relatedTool.id} href={`/tool/${relatedTool.id}`}>
                  <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="relative h-40 w-full bg-gradient-to-r from-purple-400 to-pink-400">
                      <Image
                        src={relatedTool.image}
                        alt={relatedTool.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {relatedTool.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                        {relatedTool.description}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                          {relatedTool.category}
                        </span>
                        <span className="text-yellow-500 text-sm">⭐ {relatedTool.rating}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}