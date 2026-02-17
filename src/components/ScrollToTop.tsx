"use client";

import { FaArrowUp } from 'react-icons/fa';
import { ScrollSmoother } from 'gsap/dist/ScrollSmoother';

// Interface for scrollTo options
interface ScrollToConfig {
  duration?: number;
  ease?: string;
  y?: number;
}

// Extend ScrollSmoother type for scrollTo
interface ScrollSmootherWithScrollTo {
  scrollTo: (target: number, config: ScrollToConfig) => void;
}

export default function ScrollToTop() {
  const handleClick = () => {
    const smoother = ScrollSmoother.get() as unknown as ScrollSmootherWithScrollTo;
    if (smoother) {
      // Scroll to top (0px) within the smoother context
      smoother.scrollTo(0, {
        duration: 2.5,
        ease: "power4.inOut",
        y: -250
      });
    }
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Scroll to top"
      className="fixed cursor-pointer bottom-4 right-4 p-3 bg-white/80 dark:bg-black/80 backdrop-blur-md rounded-full shadow-lg hover:bg-opacity-100 transition-all"
    >
      <FaArrowUp className="w-5 h-5 text-gray-900 dark:text-gray-100" />
    </button>
  );
}