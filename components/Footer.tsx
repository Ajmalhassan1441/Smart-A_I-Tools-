'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(2024);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white mt-16 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Column 1 */}
          <div>
            <Link href="/" className="inline-flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">⚡</span>
              </div>
              <span className="text-lg font-bold text-white">AI Tools</span>
            </Link>
            <p className="text-gray-400 text-sm mt-3">
              Discover the best AI tools for productivity and creativity.
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-md font-semibold text-white mb-3">Quick Links</h3>
            <ul className="space-y-1">
              <li><Link href="/" className="text-gray-400 hover:text-purple-400 text-sm">Home</Link></li>
              <li><Link href="/tools" className="text-gray-400 hover:text-purple-400 text-sm">All Tools</Link></li>
              <li><Link href="/categories" className="text-gray-400 hover:text-purple-400 text-sm">Categories</Link></li>
              <li><Link href="/favorites" className="text-gray-400 hover:text-purple-400 text-sm">Favorites</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-purple-400 text-sm">Blog</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-md font-semibold text-white mb-3">Legal</h3>
            <ul className="space-y-1">
              <li><Link href="/privacy" className="text-gray-400 hover:text-purple-400 text-sm">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-purple-400 text-sm">Terms of Service</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-purple-400 text-sm">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="text-center pt-6 mt-6 border-t border-gray-800">
          <p className="text-gray-500 text-xs">© {currentYear} AI Tools Directory. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}