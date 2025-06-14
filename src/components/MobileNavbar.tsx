// "use client";
// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import ThemeToggle from './ThemeToggle';
// import { useTheme } from 'next-themes';
// import { CiMenuFries } from 'react-icons/ci';
// import { GoHome } from 'react-icons/go';
// import { GrProjects } from 'react-icons/gr';
// import { TfiLayoutAccordionList } from 'react-icons/tfi';
// import { IoIosContact } from 'react-icons/io';

// export default function MobileNavbar() {
//   const [open, setOpen] = useState(false);
//   const { theme, systemTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);

//   // Wait until theme loads
//   useEffect(() => setMounted(true), []);
//   const currentTheme = theme === 'system' ? systemTheme : theme;

//   const links = [
//     { href: '/', label: 'Home', icon: GoHome },
//     { href: '/projects', label: 'Projects', icon: GrProjects },
//     { href: '/resume', label: 'Resume', icon: TfiLayoutAccordionList },
//     { href: '/contact', label: 'Contact', icon: IoIosContact },
//   ];

//   // Base pill styling
//   const baseClasses =
//     'flex items-center justify-center p-4 rounded-full transition-transform duration-200 ease-in-out hover:scale-105';

//   // Liquid glass background base for pills
//   const pillBgBase =
//     mounted && currentTheme === 'light'
//       ? 'bg-white/70 shadow-inner shadow-white/20'
//       : 'bg-white/20 dark:bg-gray-900/30 shadow-inner';
//   // Show border only when menu is open
//   const pillBorder =
//     open
//       ? mounted && currentTheme === 'light'
//         ? 'border border-white/80'
//         : 'border border-white/30 dark:border-gray-700'
//       : '';
//   // Complete pill classes
//   const pillBg = `${pillBgBase} ${pillBorder}`.trim();

//   // Container for all pills (with conditional border)
//   const containerBgBase =
//     mounted && currentTheme === 'light'
//       ? 'bg-white/70 shadow-inner shadow-white/20'
//       : 'bg-white/20 dark:bg-gray-900/30 shadow-inner';
//   const containerBorder =
//     open
//       ? mounted && currentTheme === 'light'
//         ? 'border border-white/80'
//         : 'border border-white/30 dark:border-gray-700'
//       : '';
//     // Dynamic container padding: more when open, compact when closed
//   const containerPadding = 'p-2';
//   // const containerPadding = open ? 'p-3 gap-4' : 'p-2';
//   // Container for all pills (with conditional border)
//   const containerClasses =
//     `fixed bottom-5 right-5 z-50 flex flex-col items-center ${containerPadding} backdrop-blur-2xl ${
//       containerBgBase
//     } ${containerBorder} rounded-full`;

//   return (
//     <div className={`${containerClasses} md:hidden glass`}>
//       {/* Expanded links */}
//       {open && (
//         <>
//           {links.map(({ href, label, icon: Icon }) => (
//             <Link
//               key={href}
//               href={href}
//               className={`${baseClasses} ${pillBg} glass mb-6`}
//               aria-label={label}
//               onClick={() => setOpen(false)}
//             >
//               <Icon
//                 className={`w-6 h-6 ${
//                   mounted && currentTheme === 'light' ? 'text-black' : 'text-white'
//                 }`}
//                 aria-hidden="true"
//               />
//             </Link>
//           ))}
//           {/* Theme toggle pill */}
//           <div className={`${baseClasses} ${pillBg} glass mb-6`}>
//             <ThemeToggle />
//           </div>
//         </>
//       )}

//       {/* Always-visible toggle button */}
//       <button
//         type="button"
//         className={`${baseClasses} ${pillBg} glass`}
//         onClick={() => setOpen((o) => !o)}
//         aria-label={open ? 'Close menu' : 'Open menu'}
//       >
//         <CiMenuFries
//           className={`w-6 h-6 transform ${open ? 'rotate-90' : 'rotate-0'} ${
//             mounted && currentTheme === 'light' ? 'text-black' : 'text-white'
//           }`}
//         />
//       </button>
//     </div>
//   );
// }







'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FiMenu } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import { ScrollSmoother } from 'gsap/dist/ScrollSmoother';

// ScrollTo configuration interface
interface ScrollToConfig {
  offsetY?: number;
  duration?: number;
  ease?: string;
}

// Extend ScrollSmoother with scrollTo signature
interface ScrollSmootherWithScrollTo {
  scrollTo: (target: string, config: ScrollToConfig) => void;
}

const navLinks = [
  { id: 'home',     label: 'Home' },
  { id: 'showcase',    label: 'Showcase' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact',  label: 'Contact' },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => setIsOpen(open => !open);

  const handleLinkClick = (targetId: string) => {
    setIsOpen(false);

    const smoother = ScrollSmoother.get() as unknown as ScrollSmootherWithScrollTo;
    if (!smoother) return;

    const navEl = document.querySelector<HTMLElement>('nav');
    const offsetY = navEl?.offsetHeight ?? 0;

    smoother.scrollTo(`#${targetId}`, {
      offsetY: -offsetY,
      duration: 1,
      ease: 'power2.inOut',
    });
  };

  return (
    <>
      {/* Hamburger Toggle - always on top */}
      <button
        onClick={toggleMenu}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        className="fixed top-4 right-4 p-2 z-50 bg-white/20 dark:bg-black/20 backdrop-blur-md rounded-md"
      >
        {!isOpen && (
          <FiMenu className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Menu Overlay via Portal */}
      {mounted && isOpen && createPortal(
        <div className="fixed inset-0 h-screen z-40 overflow-hidden bg-white/20 dark:bg-black/20 flex flex-col items-center justify-center space-y-8">
          <button
            onClick={toggleMenu}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            className="fixed top-4 right-4 p-2 z-50 bg-white/20 dark:bg-black/20 backdrop-blur-md rounded-md"
          >
            { isOpen && (
              <IoMdClose className="w-6 h-6 text-white" />
            )}
          </button>
          {navLinks.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => handleLinkClick(id)}
              className="text-white text-2xl font-medium hover:text-gray-300 transition-colors"
            >
              {label}
            </button>
          ))}
        </div>,
        document.body
      )}
    </>
  );
}
