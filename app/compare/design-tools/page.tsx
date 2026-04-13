'use client';

import { useState, useEffect } from 'react';
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

export default function CompareDesignTools() {
  const [tools, setTools] = useState<Tool[]>([]);

  useEffect(() => {
    const designTools = allTools.filter(t => t.category === 'Design').slice(0, 6);
    setTools(designTools);
  }, []);

  if (tools.length === 0) return <div className="pt-32 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🎨 Best AI Design Tools Comparison
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Compare top AI design and prototyping tools
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl">
            <thead className="bg-linear-to-r from-purple-600 to-pink-600 text-white">
              <tr>
                <th className="p-4 text-left">Feature</th>
                {tools.map(tool => (
                  <th key={tool.id} className="p-4 text-center">{tool.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-4 font-semibold">Rating</td>
                {tools.map(tool => (
                  <td key={tool.id} className="p-4 text-center">⭐ {tool.rating}/5</td>
                ))}
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                <td className="p-4 font-semibold">Free Version</td>
                {tools.map(tool => (
                  <td key={tool.id} className="p-4 text-center">
                    {tool.tags?.includes('Free') ? '✅ Yes' : '❌ No'}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold">Visit</td>
                {tools.map(tool => (
                  <td key={tool.id} className="p-4 text-center">
                    <a href={tool.link} target="_blank" className="text-purple-600 hover:underline">Visit →</a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}