import { useEffect } from 'react';
import { Image } from "@nextui-org/react";

interface LightboxProps {
  imageIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function Lightbox({ imageIndex, onClose, onNext, onPrevious }: LightboxProps) {
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleImageClick = (e: React.MouseEvent) => {
    const { left, right } = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX;
    if (clickX < left + (right - left) / 2) {
      onPrevious();
    } else {
      onNext();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        onNext();
      } else if (e.key === 'ArrowLeft') {
        onPrevious();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onNext, onPrevious, onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center gap-5 text-white" onClick={handleOutsideClick}>
      <button className="text-4xl" onClick={onPrevious}>&lt;</button>
      <div onClick={stopPropagation} className="flex justify-center items-center max-w-full max-h-full pt-20">
        <div
          onClick={handleImageClick}
          style={{
            maxHeight: '80vh',
            maxWidth: '80vw',
            position: 'relative',
            width: '100%',
            height: '100%',
          }}
        >
          <Image
            className="object-contain"
            src={`/images/pictures/${imageIndex}-min.JPG`}
            alt="Lightbox Image"
            style={{
              maxHeight: '80vh',
              maxWidth: '80vw',
              width: '100%',
              height: '100%',
            }}
          />
        </div>
      </div>
      <button className="text-4xl" onClick={onNext}>&gt;</button>
      <button className="text-4xl fixed top-20 right-10" onClick={onClose}>X</button>
    </div>
  );
};
