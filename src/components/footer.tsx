import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="dark w-full p-8 bg-background text-foreground mt-16">
      <div className="container mx-auto flex justify-between items-center relative">
        <div className="flex flex-col gap-4 text-sm">
          <Link href="/impressum">
            Impressum
          </Link>
          <Link href="/datenschutz">
            Datenschutz
          </Link>
        </div>
        <p className="text-sm">
          © {new Date().getFullYear()} Gwydion Braunsdorf. Alle Rechte vorbehalten.
        </p>
        <a 
          href="https://github.com/GwydionBr" 
          target="_blank" 
          rel="noopener noreferrer" 
        >
          <Image src="/images/icons/github.png" alt="Github-Logo" width={40} height={40} />
        </a>
      </div>
    </footer>
  );
}
