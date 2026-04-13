'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);

    // Scroll effect
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) {
    return (
      <header className="fixed top-4 left-0 right-0 mx-auto w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] lg:w-[calc(100%-4rem)] xl:w-[calc(100%-6rem)] max-w-7xl z-50 bg-white dark:bg-gray-900 shadow-xl py-4 rounded-2xl">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-xl"></div>
              <span className="text-xl font-bold">AI Tools</span>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header
      className={`fixed top-4 left-0 right-0 mx-auto w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] lg:w-[calc(100%-4rem)] xl:w-[calc(100%-6rem)] max-w-7xl z-50 transition-all duration-500 rounded-2xl sm:rounded-3xl ${
        scrolled
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-2xl py-2'
          : 'bg-white dark:bg-gray-900 shadow-xl py-4'
      }`}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="group relative flex items-center space-x-2">
            <div className="relative w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-500">
              <span className="text-white text-xl">⚡</span>
            </div>
            <span className="text-xl font-bold bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              AI Tools
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink href="/" active={pathname === '/'}>🏠 Home</NavLink>
            <NavLink href="/tools" active={pathname === '/tools'}>🛠️ Tools</NavLink>
            <NavLink href="/categories" active={pathname === '/categories'}>📁 Categories</NavLink>
            <NavLink href="/favorites" active={pathname === '/favorites'}>❤️ Favorites</NavLink>
            <NavLink href="/compare" active={pathname === '/compare'}>📊 Compare</NavLink>
            <NavLink href="/blog" active={pathname === '/blog'}>📝 Blog</NavLink>
          </div>

          {/* Right Section - Only Mobile Menu Button */}
          <div className="flex items-center space-x-3">
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden relative w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 flex items-center justify-center hover:scale-105"
            >
              <div className="space-y-1.5">
                <span className={`block w-5 h-0.5 bg-gray-600 dark:bg-gray-300 rounded-full transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block w-5 h-0.5 bg-gray-600 dark:bg-gray-300 rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-5 h-0.5 bg-gray-600 dark:bg-gray-300 rounded-full transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
            <div className="flex flex-col space-y-2">
              <MobileNavLink href="/" onClick={() => setIsMenuOpen(false)}>🏠 Home</MobileNavLink>
              <MobileNavLink href="/tools" onClick={() => setIsMenuOpen(false)}>🛠️ Tools</MobileNavLink>
              <MobileNavLink href="/categories" onClick={() => setIsMenuOpen(false)}>📁 Categories</MobileNavLink>
              <MobileNavLink href="/favorites" onClick={() => setIsMenuOpen(false)}>❤️ Favorites</MobileNavLink>
              <MobileNavLink href="/compare" onClick={() => setIsMenuOpen(false)}>📊 Compare</MobileNavLink>
              <MobileNavLink href="/blog" onClick={() => setIsMenuOpen(false)}>📝 Blog</MobileNavLink>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

// Navigation Link Component
function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
        active
          ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30'
          : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800'
      }`}
    >
      {children}
    </Link>
  );
}

// Mobile Navigation Link
function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
    >
      {children}
    </Link>
  );
}