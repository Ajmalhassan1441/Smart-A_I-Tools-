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

export default function CompareMidjourneyVsDalle() {
  const [midjourney, setMidjourney] = useState<Tool | null>(null);
  const [dalle, setDalle] = useState<Tool | null>(null);

  useEffect(() => {
    const mj = allTools.find(t => t.name === 'Midjourney');
    const dl = allTools.find(t => t.name === 'DALL-E 3');
    setMidjourney(mj || null);
    setDalle(dl || null);
  }, []);

  if (!midjourney || !dalle) return <div className="pt-32 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Midjourney vs DALL-E 3
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Which AI image generator is better?
          </p>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-purple-500">Home</Link>
          <span>/</span>
          <span className="text-purple-600">Midjourney vs DALL-E</span>
        </div>

        <ToolComparison tool1={midjourney} tool2={dalle} />

        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Other Comparisons</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/compare/chatgpt-vs-gemini" className="p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-lg transition">
              🤖 ChatGPT vs Gemini
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