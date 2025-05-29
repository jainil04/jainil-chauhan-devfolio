'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();

  // only mark as “mounted” on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  // don’t render the toggle until we know the client theme
  if (!mounted) {
    return null;
  }

  const current = theme === 'system' ? systemTheme : theme;

  return (
    <button
      className="bg-transparent border-0"
      onClick={() => setTheme(current === 'dark' ? 'light' : 'dark')}
    >
      {current === 'dark' ? (
        <FaSun
          className="
          h-[1.5rem] w-[1.5rem] text-yellow-500
        "
        />
      ) : (
        <FaMoon
          className="
          h-[1.5rem] w-[1.5rem]
        "
        />
      )}
    </button>
  );
}
