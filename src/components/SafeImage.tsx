import React, { useState } from 'react';
import { Building, TreePine, Sparkles, Layers } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackGradient?: string;
  iconType?: 'tower' | 'villa' | 'commercial' | 'tree' | 'sparkle';
  title?: string;
  aspectRatioClass?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  fallbackGradient = 'from-neutral-950 via-[#111728] to-neutral-950',
  iconType = 'tower',
  title = '',
  aspectRatioClass = 'aspect-[16/10]',
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const hasValidSrc = Boolean(src && src.trim().length > 0);

  return (
    <div className={`relative overflow-hidden ${aspectRatioClass} bg-[#0A0E18]`}>
      {!hasError && hasValidSrc ? (
        <>
          <img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={`w-full h-full object-cover transition-all duration-700 ${
              isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            } ${className}`}
          />
          {/* Subtle loading shimmer placeholder behind until image decodes */}
          {!isLoaded && (
            <div className="absolute inset-0 bg-[#0A0E18] animate-pulse flex items-center justify-center">
              <div className="h-8 w-8 rounded-full border-2 border-amber-400/30 border-t-amber-400 animate-spin" />
            </div>
          )}
        </>
      ) : (
        /* Styled CSS/SVG Fallback Container (Mandatory zero-broken-image policy) */
        <div className={`w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br ${fallbackGradient} text-center`}>
          <div className="h-14 w-14 rounded-2xl bg-black/40 border border-amber-500/30 backdrop-blur-md flex items-center justify-center text-amber-300 mb-2">
            {iconType === 'tree' && <TreePine className="h-7 w-7" />}
            {iconType === 'sparkle' && <Sparkles className="h-7 w-7" />}
            {iconType === 'commercial' && <Layers className="h-7 w-7" />}
            {iconType === 'tower' && <Building className="h-7 w-7" />}
            {iconType === 'villa' && <Building className="h-7 w-7" />}
          </div>
          {title && (
            <span className="text-xs font-semibold text-white tracking-wide line-clamp-1">
              {title}
            </span>
          )}
          <span className="text-[10px] text-amber-400 font-mono mt-0.5">
            Architectural Render
          </span>
        </div>
      )}
    </div>
  );
};
