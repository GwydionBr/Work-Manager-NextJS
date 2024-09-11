"use client";

import { useState } from 'react';
import PortfolioImage from '@/components/anja/portfolio_image';
import Lightbox from '@/components/anja/lightbox';
import { Image } from '@nextui-org/react';

export default function Anja() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handleImageClick = (imageIndex: number) => {
    setSelectedImage(imageIndex);
  };

  const images = [
    [1, 2, 3, 4, 5, 6, 7, 8],
    [9, 10, 11, 12, 13, 14, 15, 16],
    [17, 18, 19, 20, 21, 22, 23, 24],
    [25, 26, 27, 28, 29, 30, 31, 32],
  ];

  return (
    <div>
      <div className={`${selectedImage !== null ? 'blur-sm' : ''} transition-filter duration-300`}>
        <header className="flex flex-col justify-center items-center">
          <h1 className="text-2xl p-12 font-bold">Anja Ananda Hofer</h1>
          <nav className="flex gap-4 p-2">
            <a target="_blank" href="https://www.instagram.com/anja_ananda/">
              <Image src="/images/icons/instagram.png" alt="Instagram" width={40} height={40} />
            </a> 
          </nav>
        </header>

        <h2 className="text-center text-2xl py-10 font-semibold">MY PORTFOLIO</h2>
        <div className="grid grid-cols-4 p-8">
          {images.map((row) => (
            <div className="flex flex-col gap-10 items-center" key={row[0]}>
              {row.map((imageCount) => (
                <PortfolioImage key={imageCount} imageCount={imageCount} clickHandler={handleImageClick} alt="Anja's portfolio image" />
              ))}
            </div>
          ))}
        </div>
      </div>
      {selectedImage !== null && (
        <Lightbox
          imageIndex={selectedImage}
          onClose={() => setSelectedImage(null)}
          onNext={() => setSelectedImage((prev) => ((prev ?? -1) === images.flat().length - 1 ? 0 : (prev ?? -1) + 1))}
          onPrevious={() => setSelectedImage((prev) => ((prev ?? images.flat().length) === 0 ? images.flat().length - 1 : (prev ?? images.flat().length) - 1))}
        />
      )}
    </div>
  );
}
