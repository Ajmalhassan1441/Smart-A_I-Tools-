'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DemoPage() {
  const [activeDemo, setActiveDemo] = useState(0);

  const demos = [
    {
      title: "Voice Search Demo",
      description: "Learn how to use voice search to find AI tools quickly",
      icon: "🎤",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      title: "Find AI Tools",
      description: "Browse and filter through 150+ AI tools",
      icon: "🔍",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      title: "Save Favorites",
      description: "Save your favorite tools for easy access",
      icon: "❤️",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      title: "Compare Tools",
      description: "Compare different AI tools side by side",
      icon: "📊",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-6">
            <span className="text-4xl">🎬</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Watch <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Demo</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            See how AI Tools Directory can help you find the perfect AI tools for your needs
          </p>
        </div>

        {/* Demo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {demos.map((demo, index) => (
            <button
              key={index}
              onClick={() => setActiveDemo(index)}
              className={`p-6 rounded-2xl text-center transition-all duration-300 hover:scale-105 ${
                activeDemo === index
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-xl'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-lg'
              }`}
            >
              <div className="text-4xl mb-3">{demo.icon}</div>
              <h3 className="font-semibold mb-1">{demo.title}</h3>
              <p className="text-sm opacity-80">{demo.description}</p>
            </button>
          ))}
        </div>

        {/* Video Player */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="aspect-video bg-gray-900 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-gray-400">Demo video coming soon!</p>
              <p className="text-gray-500 text-sm mt-2">Currently showing placeholder</p>
            </div>
          </div>
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {demos[activeDemo].title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {demos[activeDemo].description}
            </p>
            <div className="mt-4 flex gap-3">
              <Link
                href="/explore"
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all duration-300"
              >
                Start Exploring
              </Link>
              <Link
                href="/"
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
            <div className="text-3xl mb-3">🔍</div>
            <h3 className="font-semibold mb-1">Smart Search</h3>
            <p className="text-sm text-gray-500">Find tools by name, category, or description</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
            <div className="text-3xl mb-3">🎤</div>
            <h3 className="font-semibold mb-1">Voice Search</h3>
            <p className="text-sm text-gray-500">Search using your voice for convenience</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
            <div className="text-3xl mb-3">❤️</div>
            <h3 className="font-semibold mb-1">Save Favorites</h3>
            <p className="text-sm text-gray-500">Bookmark tools you love for later</p>
          </div>
        </div>
      </div>
    </div>
  );
}