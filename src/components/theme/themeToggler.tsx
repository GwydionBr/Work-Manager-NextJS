"use client";

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';

export default function ThemeToggler() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensures the component is mounted to avoid hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Avoid rendering until mounted

  return (
    <Button
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={`px-4 py-2 rounded-lg ${theme === 'dark' ? "bg-yellow-300 text-black" : "text-white bg-black"} transition-all duration-300`}
    >
      {theme === 'dark' ? <LightModeIcon/> : <DarkModeIcon/>}
    </Button>
  );
}
