'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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

interface ToolCardProps {
  tool: Tool;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
}

// Default placeholder images for fallback
const defaultImages = {
  Writing: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop',
  Image: 'https://images.unsplash.com/photo-1547954575-855750c57bd3?w=400&h=300&fit=crop',
  Video: 'https://images.unsplash.com/photo-1536240476400-bc1b11db6e70?w=400&h=300&fit=crop',
  Coding: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
  Audio: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=300&fit=crop',
  Design: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
  Productivity: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=300&fit=crop',
  default: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop'
};

export default function ToolCard({ tool, isFavorite, onFavoriteToggle }: ToolCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imgSrc, setImgSrc] = useState(tool.image);

  const handleImageError = () => {
    if (!imageError) {
      setImageError(true);
      // Try category-specific default image
      const defaultImg = defaultImages[tool.category as keyof typeof defaultImages] || defaultImages.default;
      setImgSrc(defaultImg);
    }
  };

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      {/* Image Section */}
      <Link href={`/tool/${tool.id}`}>
        <div className="relative h-48 w-full overflow-hidden bg-linear-to-br from-purple-500 to-pink-600">
          <Image
            src={imgSrc}
            alt={tool.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            onError={handleImageError}
            unoptimized={imageError}
          />
          
          {/* Tags Overlay */}
          <div className="absolute top-3 left-3 flex gap-2">
            {tool.tags?.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className={`px-2.5 py-1 text-xs font-bold rounded-full shadow-lg ${
                  tag === 'Free'
                    ? 'bg-green-500 text-white'
                    : tag === 'Paid'
                    ? 'bg-blue-500 text-white'
                    : tag === 'Popular'
                    ? 'bg-orange-500 text-white'
                    : 'bg-purple-500 text-white'
                }`}
              >
                {tag === 'Free' && '🆓 FREE'}
                {tag === 'Paid' && '💰 PAID'}
                {tag === 'Popular' && '⭐ POPULAR'}
                {!['Free', 'Paid', 'Popular'].includes(tag) && tag}
              </span>
            ))}
          </div>

          {/* Rating Badge */}
          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center space-x-1">
            <span className="text-yellow-400 text-sm">⭐</span>
            <span className="text-white text-sm font-bold">{tool.rating}</span>
          </div>
        </div>
      </Link>

      {/* Content Section */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <Link href={`/tool/${tool.id}`}>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300 line-clamp-1">
              {tool.name}
            </h3>
          </Link>
          
          <button
            onClick={onFavoriteToggle}
            className="text-2xl hover:scale-125 transition-transform duration-300 focus:outline-none"
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2 leading-relaxed">
          {tool.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-semibold rounded-full">
            <span className="mr-1">📁</span>
            {tool.category}
          </span>
          
          <div className="flex items-center space-x-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(tool.rating)
                      ? 'text-yellow-400'
                      : i < tool.rating
                      ? 'text-yellow-400 opacity-50'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">({tool.rating})</span>
          </div>
        </div>

        {/* Visit Button */}
        <a
          href={tool.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-full px-4 py-2.5 bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 group"
        >
          <span>Visit Tool</span>
          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
}