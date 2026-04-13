'use client';

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

interface ComparisonProps {
  tool1: Tool;
  tool2: Tool;
}

export default function ToolComparison({ tool1, tool2 }: ComparisonProps) {
  const features = [
    { name: 'Free Version', getValue: (t: Tool) => t.tags?.includes('Free') ? '✅ Yes' : '❌ No' },
    { name: 'Paid Version', getValue: (t: Tool) => t.tags?.includes('Paid') ? '✅ Yes' : '❌ No' },
    { name: 'Free Trial', getValue: (t: Tool) => t.tags?.includes('Free trial') ? '✅ Yes' : '❌ No' },
    { name: 'Rating', getValue: (t: Tool) => `${t.rating} / 5.0` },
    { name: 'Trending', getValue: (t: Tool) => t.trending ? '🔥 Trending' : 'Normal' },
    { name: 'Category', getValue: (t: Tool) => t.category },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-3 bg-linear-to-r from-purple-600 to-pink-600 text-white">
        <div className="p-4 text-center font-bold">Feature</div>
        <div className="p-4 text-center font-bold border-l border-white/20">{tool1.name}</div>
        <div className="p-4 text-center font-bold border-l border-white/20">{tool2.name}</div>
      </div>

      {/* Comparison Rows */}
      {features.map((feature, idx) => (
        <div key={idx} className={`grid grid-cols-3 ${idx % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900/50' : ''}`}>
          <div className="p-4 text-gray-700 dark:text-gray-300 font-medium">{feature.name}</div>
          <div className="p-4 text-gray-600 dark:text-gray-400 border-l border-gray-200 dark:border-gray-700">
            {feature.getValue(tool1)}
          </div>
          <div className="p-4 text-gray-600 dark:text-gray-400 border-l border-gray-200 dark:border-gray-700">
            {feature.getValue(tool2)}
          </div>
        </div>
      ))}

      {/* Verdict */}
      <div className="p-6 bg-linear-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
        <h3 className="font-bold text-lg mb-2">🏆 Verdict</h3>
        <p className="text-gray-700 dark:text-gray-300">
          {tool1.rating > tool2.rating 
            ? `${tool1.name} has higher rating (${tool1.rating} vs ${tool2.rating})`
            : tool2.rating > tool1.rating
            ? `${tool2.name} has higher rating (${tool2.rating} vs ${tool1.rating})`
            : `Both tools have same rating (${tool1.rating})`}
        </p>
        <div className="flex gap-4 mt-4">
          <a href={tool1.link} target="_blank" className="flex-1 text-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            Visit {tool1.name}
          </a>
          <a href={tool2.link} target="_blank" className="flex-1 text-center px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700">
            Visit {tool2.name}
          </a>
        </div>
      </div>
    </div>
  );
}