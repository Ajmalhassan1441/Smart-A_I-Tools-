'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ToolComparison from '@/components/ToolComparison';
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

export default function CompareChatGPTvsGemini() {
  const [chatgpt, setChatgpt] = useState<Tool | null>(null);
  const [gemini, setGemini] = useState<Tool | null>(null);

  useEffect(() => {
    const gpt = allTools.find(t => t.name === 'ChatGPT');
    const gem = allTools.find(t => t.name === 'Bard (Gemini)');
    setChatgpt(gpt || null);
    setGemini(gem || null);
  }, []);

  if (!chatgpt || !gemini) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-32 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            ChatGPT vs Google Gemini
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Complete comparison of the top 2 AI chatbots
          </p>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-purple-500">Home</Link>
          <span>/</span>
          <span className="text-purple-600">ChatGPT vs Gemini</span>
        </div>

        {/* Comparison Table */}
        <ToolComparison tool1={chatgpt} tool2={gemini} />

        {/* Quick Links to Other Comparisons */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Other Comparisons</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/compare/midjourney-vs-dall-e" className="p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-lg transition">
              🎨 Midjourney vs DALL-E 3
            </Link>
            <Link href="/compare/jasper-vs-copyai" className="p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-lg transition">
              ✍️ Jasper vs Copy.ai
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}