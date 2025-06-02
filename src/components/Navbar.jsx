"use client";
import { useState } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import MenuIcon from '@mui/icons-material/Menu';

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const links = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/resume', label: 'Resume' },
    { href: '/contact', label: 'Contact' },
  ];
  console.log(drawerOpen);
  return (
    <nav className="flex justify-start md:justify-center">
      {/* Drawer hamburger button - mobile only */}
      <div className="hamburger-btn">
        <MenuIcon color="success"
          aria-label="Open menu"
          onClick={() => setDrawerOpen(true)}
        />
      </div>

      {/* Desktop nav */}
      <ul className="hidden md:flex">
        {links.map(({ href, label }) => (
          <li className="list-none" key={href}>
            <Link
              href={href}
              className="no-underline text-blue-600 dark:text-red hover:underline transition-colors duration-200"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
      {/* Drawer overlay and sidebar */}
      {drawerOpen && (
        <>
          {/* Overlay */}
          {/* <div
            className="overlay md:hidden"
            onClick={() => setDrawerOpen(false)}
          /> */}
          {/* Sidebar */}
          <aside className="sidebar"
            style={{ pointerEvents: drawerOpen ? 'auto' : 'none' }}
          >
            <button
              className="self-end mb-8 text-2xl"
              aria-label="Close menu"
              onClick={() => setDrawerOpen(false)}
            >
              &times;
            </button>
            <ul className="sidebar-ul">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="no-underline text-blue-600 dark:text-red hover:underline transition-colors duration-200 text-lg"
                    onClick={() => setDrawerOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </>
      )}
      {/* Place ThemeToggle in the bottom right corner */}
      {/* div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 50 }}> */}
      <div className="fixed bottom-8 right-8 z-50">
        <ThemeToggle />
      </div>
    </nav>
  );
}
