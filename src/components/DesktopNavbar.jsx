"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { useTheme } from 'next-themes';

export default function DesktopNavbar() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure theme is loaded before rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === 'system' ? systemTheme : theme;

  const links = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/resume', label: 'Resume' },
    { href: '/contact', label: 'Contact' },
  ];

  // Base classes for pill links with hover shine
  const baseClasses =
    'group relative inline-flex items-center px-6 py-3 rounded-full backdrop-blur-lg overflow-hidden shadow-md transition-transform hover:scale-105';

  // Dynamic background: white in light mode, frosted glass otherwise
  const linkBgClasses =
    mounted && currentTheme === 'light'
      ? 'bg-white'
      : 'bg-white/20 dark:bg-gray-800/30';

  return (
    <nav className="hidden md:flex sticky top-0 z-10 w-full px-6 h-16 items-center justify-between bg-transparent backdrop-blur-md">
      {/* Desktop links */}
      <ul className="hidden md:flex space-x-4">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link href={href} className={`${baseClasses} ${linkBgClasses}`}>
              <span
                aria-hidden="true"
                className={`absolute inset-0 border ${mounted && currentTheme === 'light' ? 'border-gray-300' : 'border-white/30'} rounded-full`}
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent w-8 h-full -translate-x-full skew-x-[-20deg] opacity-0 group-hover:opacity-100 group-hover:animate-border-shine pointer-events-none"
              />
              <span className={`relative font-medium ${mounted && currentTheme === 'light' ? 'text-black' : 'text-white'}`}>
                {label}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Theme toggle button */}
      <div className="flex top-4 right-5 fixed z-50">
        <ThemeToggle />
      </div>
    </nav>
  );
}
