'use client';

interface FilterButtonsProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedPrice: string;
  onPriceChange: (price: string) => void;
}

const categories = [
  { name: 'All', icon: '🎯', color: 'from-gray-500 to-gray-600' },
  { name: 'Writing', icon: '✍️', color: 'from-blue-500 to-blue-600' },
  { name: 'Image', icon: '🎨', color: 'from-purple-500 to-purple-600' },
  { name: 'Video', icon: '🎬', color: 'from-red-500 to-red-600' },
  { name: 'Coding', icon: '💻', color: 'from-green-500 to-green-600' },
  { name: 'Audio', icon: '🎵', color: 'from-pink-500 to-pink-600' },
  { name: 'Design', icon: '🎨', color: 'from-indigo-500 to-indigo-600' },
  { name: 'Productivity', icon: '⚡', color: 'from-yellow-500 to-yellow-600' },
  { name: 'Education', icon: '📚', color: 'from-teal-500 to-teal-600' },
  { name: 'Research', icon: '🔬', color: 'from-cyan-500 to-cyan-600' },
];

const priceFilters = [
  { name: 'All', icon: '💰', color: 'from-gray-500 to-gray-600' },
  { name: 'Free', icon: '🆓', color: 'from-green-500 to-green-600' },
  { name: 'Paid', icon: '💎', color: 'from-blue-500 to-blue-600' },
  { name: 'Free trial', icon: '🎁', color: 'from-purple-500 to-purple-600' },
];

export default function FilterButtons({ 
  selectedCategory, 
  onCategoryChange,
  selectedPrice,
  onPriceChange 
}: FilterButtonsProps) {
  return (
    <div className="space-y-6">
      {/* Category Filters */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center space-x-2">
          <span>📁</span>
          <span>Categories</span>
        </h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => onCategoryChange(category.name)}
              className={`group relative px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === category.name
                  ? `bg-linear-to-r ${category.color} text-white shadow-lg`
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <span className="flex items-center space-x-1">
                <span className="text-base">{category.icon}</span>
                <span>{category.name}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Filters - New */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center space-x-2">
          <span>🏷️</span>
          <span>Pricing</span>
        </h3>
        <div className="flex flex-wrap gap-2">
          {priceFilters.map((price) => (
            <button
              key={price.name}
              onClick={() => onPriceChange(price.name)}
              className={`group relative px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 transform hover:scale-105 ${
                selectedPrice === price.name
                  ? `bg-linear-to-r ${price.color} text-white shadow-lg`
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <span className="flex items-center space-x-1">
                <span className="text-base">{price.icon}</span>
                <span>{price.name}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}