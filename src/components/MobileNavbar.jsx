"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { useTheme } from 'next-themes';
import { CiMenuFries } from 'react-icons/ci';
import { GoHome } from 'react-icons/go';
import { GrProjects } from 'react-icons/gr';
import { TfiLayoutAccordionList } from 'react-icons/tfi';
import { IoIosContact } from 'react-icons/io';

export default function MobileNavbar() {
  const [open, setOpen] = useState(false);
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Wait until theme loads
  useEffect(() => setMounted(true), []);
  const currentTheme = theme === 'system' ? systemTheme : theme;

  const links = [
    { href: '/', label: 'Home', icon: GoHome },
    { href: '/projects', label: 'Projects', icon: GrProjects },
    { href: '/resume', label: 'Resume', icon: TfiLayoutAccordionList },
    { href: '/contact', label: 'Contact', icon: IoIosContact },
  ];

  // Base pill styling
  const baseClasses =
    'flex items-center justify-center p-4 rounded-full transition-transform duration-200 ease-in-out hover:scale-105';

  // Liquid glass background base for pills
  const pillBgBase =
    mounted && currentTheme === 'light'
      ? 'bg-white/70 shadow-inner shadow-white/20'
      : 'bg-white/20 dark:bg-gray-900/30 shadow-inner';
  // Show border only when menu is open
  const pillBorder =
    open
      ? mounted && currentTheme === 'light'
        ? 'border border-white/80'
        : 'border border-white/30 dark:border-gray-700'
      : '';
  // Complete pill classes
  const pillBg = `${pillBgBase} ${pillBorder}`.trim();

  // Container for all pills (with conditional border)
  const containerBgBase =
    mounted && currentTheme === 'light'
      ? 'bg-white/70 shadow-inner shadow-white/20'
      : 'bg-white/20 dark:bg-gray-900/30 shadow-inner';
  const containerBorder =
    open
      ? mounted && currentTheme === 'light'
        ? 'border border-white/80'
        : 'border border-white/30 dark:border-gray-700'
      : '';
    // Dynamic container padding: more when open, compact when closed
  const containerPadding = 'p-2';
  // const containerPadding = open ? 'p-3 gap-4' : 'p-2';
  // Container for all pills (with conditional border)
  const containerClasses =
    `fixed bottom-5 right-5 z-50 flex flex-col items-center ${containerPadding} backdrop-blur-2xl ${
      containerBgBase
    } ${containerBorder} rounded-full`;

  return (
    <div className={`${containerClasses} md:hidden glass`}>
      {/* Expanded links */}
      {open && (
        <>
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`${baseClasses} ${pillBg} glass mb-6`}
              aria-label={label}
              onClick={() => setOpen(false)}
            >
              <Icon
                className={`w-6 h-6 ${
                  mounted && currentTheme === 'light' ? 'text-black' : 'text-white'
                }`}
                aria-hidden="true"
              />
            </Link>
          ))}
          {/* Theme toggle pill */}
          <div className={`${baseClasses} ${pillBg} glass mb-6`}>
            <ThemeToggle />
          </div>
        </>
      )}

      {/* Always-visible toggle button */}
      <button
        type="button"
        className={`${baseClasses} ${pillBg} glass`}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close menu' : 'Open menu'}
      >
        <CiMenuFries
          className={`w-6 h-6 transform ${open ? 'rotate-90' : 'rotate-0'} ${
            mounted && currentTheme === 'light' ? 'text-black' : 'text-white'
          }`}
        />
      </button>
    </div>
  );
}
