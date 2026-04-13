'use client';

import Link from 'next/link';
import { useState } from 'react';

// Sample blog posts
const blogPosts = [
  {
    id: 1,
    slug: 'top-10-free-ai-writing-tools',
    title: 'Top 10 Free AI Writing Tools in 2024',
    excerpt: 'Discover the best free AI writing assistants for content creation, blogging, and more.',
    category: 'Writing',
    date: '2024-04-05',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=400&fit=crop'
  },
  {
    id: 2,
    slug: 'chatgpt-vs-gemini-vs-claude',
    title: 'ChatGPT vs Gemini vs Claude: Which is Best?',
    excerpt: 'Complete comparison of the top 3 AI chatbots - features, pricing, and performance.',
    category: 'Comparison',
    date: '2024-04-04',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop'
  },
  {
    id: 3,
    slug: 'best-ai-image-generators',
    title: 'Best AI Image Generators for 2024',
    excerpt: 'Compare Midjourney, DALL-E 3, Stable Diffusion and more.',
    category: 'Image',
    date: '2024-04-03',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1547954575-855750c57bd3?w=600&h=400&fit=crop'
  },
  {
    id: 4,
    slug: 'ai-video-editing-tools-guide',
    title: 'Complete Guide to AI Video Editing Tools',
    excerpt: 'Everything you need to know about AI video editing software.',
    category: 'Video',
    date: '2024-04-02',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1536240476400-bc1b11db6e70?w=600&h=400&fit=crop'
  }
];

export default function BlogPage() {
  const [search, setSearch] = useState('');
  
  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase()) ||
    post.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            AI Tools <span className="bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Blog</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Latest insights, comparisons, and guides about AI tools
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
          />
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredPosts.map((post, index) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <div className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-purple-500 text-white text-xs rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-3 text-sm text-gray-500 mb-2">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-500 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}