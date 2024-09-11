import {Image} from "@nextui-org/react";

interface PortfolioImageProps {
  imageCount: number;
  alt: string;
  clickHandler: (imageIndex: number) => void;
}

export default function PortfolioImage({ imageCount, alt, clickHandler }: PortfolioImageProps) {
  const baseClasses = "rounded-md transition-transform transition-opacity duration-500 ease-in-out";
  const hoverClasses = "hover:scale-110";

  return (
      <Image 
      src={`/images/pictures/${imageCount}-min.JPG`} 
      alt={alt} 
      shadow="md"
      width={300} 
      height={300}
      className={`${baseClasses} ${hoverClasses}`}
      onClick={clickHandler.bind(null, imageCount)}
      />
  );
}