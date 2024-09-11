import React from 'react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full p-8 bg-black text-white border-t border-gray-500 mt-16">
      <div className="container mx-auto flex justify-center items-center relative">
        <p className="text-sm">
          © {new Date().getFullYear()} Gwydion Braunsdorf. Alle Rechte vorbehalten.
        </p>
        <a 
          href="https://github.com/GwydionBr" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="absolute right-0"
        >
          <Image src="/images/icons/github.png" alt="Github-Logo" width={40} height={40} />
        </a>
      </div>
    </footer>
  );
}
