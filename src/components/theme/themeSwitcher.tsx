"use client"; 

import { useState, useEffect } from 'react';
import { BsMoon, BsSun } from 'react-icons/bs'; // Mond- und Sonnen-Icons
import { useTheme } from 'next-themes'; // Für Darkmode-Switching

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme(); // Zugriff auf das aktuelle Theme und Möglichkeit, es zu ändern
  const [mounted, setMounted] = useState(false); // Zustand, um zu prüfen, ob der Client geladen ist

  // Sicherstellen, dass der Code erst auf dem Client ausgeführt wird
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Wenn nicht gemountet, wird nichts gerendert

  const isDarkMode = theme === 'dark'; // Zustand für Darkmode

  return (
    <div className="flex items-center">
      <div
        className={`relative w-14 h-8 bg-gray-200 dark:bg-gray-700 rounded-full p-1 cursor-pointer transition-all duration-300`}
        onClick={() => setTheme(isDarkMode ? 'light' : 'dark')} // Wechsel zwischen Light und Dark
      >
        {/* Animierter Schalter */}
        <div
          className={`absolute top-1 bottom-1 left-1 transition-transform duration-300 ease-in-out 
            ${isDarkMode ? 'translate-x-6' : 'translate-x-0'} w-6 h-6 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center`}
        >
          {/* Icons abhängig vom Modus */}
          {isDarkMode ? <BsMoon className="text-yellow-500" /> : <BsSun className="text-yellow-400" />}
        </div>
      </div>
    </div>
  );
}
