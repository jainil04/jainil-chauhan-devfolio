// "use client";
// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import ThemeToggle from './ThemeToggle';
// import { useTheme } from 'next-themes';

// export default function DesktopNavbar() {
//   const { theme, systemTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);

//   // Ensure theme is loaded before rendering
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const currentTheme = theme === 'system' ? systemTheme : theme;

//   const links = [
//     { href: '/', label: 'Home' },
//     { href: '/projects', label: 'Projects' },
//     { href: '/resume', label: 'Resume' },
//     { href: '/contact', label: 'Contact' },
//   ];

//   // Base classes for pill links with hover shine
//   const baseClasses =
//     'group relative inline-flex items-center px-6 py-3 rounded-full backdrop-blur-lg overflow-hidden shadow-md transition-transform hover:scale-105';

//   // Dynamic background: white in light mode, frosted glass otherwise
//   const linkBgClasses =
//     mounted && currentTheme === 'light'
//       ? 'bg-white'
//       : 'bg-white/20 dark:bg-gray-800/30';

//   return (
//     <nav className="hidden md:flex sticky top-0 z-10 w-full px-6 h-16 items-center justify-between bg-transparent backdrop-blur-md">
//       {/* Desktop links */}
//       <ul className="hidden md:flex space-x-4">
//         {links.map(({ href, label }) => (
//           <li key={href}>
//             <Link href={href} className={`${baseClasses} ${linkBgClasses} ${mounted && currentTheme === 'light' ? 'glass' : ''}`}>
//               <span
//                 aria-hidden="true"
//                 className={`absolute inset-0 border ${mounted && currentTheme === 'light' ? 'glass' : 'border-white/30'} rounded-full`}
//               />
//               <span
//                 aria-hidden="true"
//                 className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent w-8 h-full -translate-x-full skew-x-[-20deg] opacity-0 group-hover:opacity-100 group-hover:animate-border-shine pointer-events-none"
//               />
//               <span className={`relative font-medium ${mounted && currentTheme === 'light' ? 'text-black' : 'text-white'}`}>
//                 {label}
//               </span>
//             </Link>
//           </li>
//         ))}
//       </ul>

//       {/* Theme toggle button */}
//       <div className="flex top-1 right-5 fixed z-50 glass p-4 rounded-full">
//         <ThemeToggle />
//       </div>
//     </nav>
//   );
// }


'use client';

import Link from 'next/link';
import { ScrollSmoother } from 'gsap/dist/ScrollSmoother';

// 1) Define just the bits of the instance you need:
interface ScrollToConfig {
  offsetY?: number;
  duration?: number;
  ease?: string;
}

interface ScrollSmootherWithScrollTo {
  scrollTo: (target: string, config: ScrollToConfig) => void;
}

const navLinks = [
  { id: 'home',     label: 'Home' },
  { id: 'showcase',    label: 'Showcase' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact',  label: 'Contact' },
];

export default function DesktopNavbar() {
  const handleClick = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();

    // 2) Tell TS “this is a smoother that has scrollTo(...)”
    const smoother = ScrollSmoother.get() as unknown as ScrollSmootherWithScrollTo;
    if (!smoother) return;

    // 3) Measure your nav’s height at runtime
    const navEl = document.querySelector<HTMLElement>('nav');
    const offsetY = navEl?.offsetHeight ?? 0;

    // 4) Call scrollTo with a typed config object
    smoother.scrollTo(`#${targetId}`, {
      offsetY,
      duration: 1,
      ease: 'power2.out',
    });
  };

  return (
    <nav className="hidden md:block fixed top-0 left-0 w-full h-16 bg-transparent z-50">
      <ul className="flex items-center space-x-6 px-6 py-4">
        {navLinks.map(({ id, label }) => (
          <li key={id}>
            <Link
              href={`#${id}`}
              onClick={e => handleClick(e, id)}
              className="list-none m-4 text-gray-800 dark:text-gray-200 font-medium hover:text-blue-500 transition-colors duration-200"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
