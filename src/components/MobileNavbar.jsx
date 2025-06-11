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
import { motion, AnimatePresence } from 'framer-motion';

export default function MobileNavbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  const currentTheme = theme === 'system' ? systemTheme : theme;

  const links = [
    { href: '/', label: 'Home', icon: GoHome },
    { href: '/projects', label: 'Projects', icon: GrProjects },
    { href: '/resume', label: 'Resume', icon: TfiLayoutAccordionList },
    { href: '/contact', label: 'Contact', icon: IoIosContact },
  ];

  const baseClasses =
    'group relative inline-flex items-center justify-center p-3 rounded-full backdrop-blur-lg overflow-hidden shadow-md transition-transform hover:scale-105';
  const linkBgClasses =
    mounted && currentTheme === 'light' ? 'bg-white' : 'bg-white/20 dark:bg-gray-800/30';
  const borderClasses =
    mounted && currentTheme === 'light' ? 'border-gray-300' : 'border-white/30';

  return (
    <>
      {/* Mobile menu button positioned bottom-right */}
      <button
        type="button"
        className="fixed bottom-4 right-5 z-50 p-2 rounded-full border-2 border-black/20 dark:border-white/30 md:hidden"
        onClick={() => setDrawerOpen((open) => !open)}
        aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
      >
        <CiMenuFries className="w-6 h-6 text-current" />
      </button>

      {/* Transparent overlay capturing clicks */}
      <aside
        className={`fixed inset-0 z-40 ${drawerOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        onClick={() => setDrawerOpen(false)}
      />

      {/* AnimatePresence for smooth open/close */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-16 right-5 z-50 flex flex-col items-end space-y-4 md:hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {links.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`${baseClasses} ${linkBgClasses} border ${borderClasses}`}
                onClick={() => setDrawerOpen(false)}
                aria-label={label}
              >
                <Icon
                  className={`w-6 h-6 ${
                    mounted && currentTheme === 'light' ? 'text-black' : 'text-white'
                  }`}
                  aria-hidden="true"
                />
              </Link>
            ))}

            {/* Optional theme toggle below links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className={`${baseClasses} ${linkBgClasses} border ${borderClasses}`}
            >
              <ThemeToggle />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
