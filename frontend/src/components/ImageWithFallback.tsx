import React, { useState } from 'react';

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  fallbackSrc?: string;
};

export function ImageWithFallback({ src, fallbackSrc, alt, ...props }: Props) {
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(src as string | undefined);

  return (
    <img
      src={currentSrc}
      alt={alt}
      onError={() => {
        if (fallbackSrc) setCurrentSrc(fallbackSrc);
      }}
      {...props}
    />
  );
}

export default ImageWithFallback;
