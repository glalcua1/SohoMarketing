/**
 * Lazy Loading Image Component for Hospitality Marketing Platform
 * 
 * Features:
 * - Intersection Observer for performance
 * - Loading and error states
 * - Responsive image optimization
 * - Blur placeholder effect
 * - Automatic WebP/AVIF format selection
 * - Accessibility compliance
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

/**
 * Props for LazyImage component
 */
interface LazyImageProps {
  /** Image source URL */
  src: string;
  /** Alternative text for accessibility */
  alt: string;
  /** Image width */
  width?: number;
  /** Image height */
  height?: number;
  /** CSS classes */
  className?: string;
  /** Priority loading (for above-fold images) */
  priority?: boolean;
  /** Fill container */
  fill?: boolean;
  /** Object fit style */
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  /** Sizes for responsive images */
  sizes?: string;
  /** Placeholder image URL */
  placeholder?: string;
  /** Custom loading component */
  loadingComponent?: React.ReactNode;
  /** Custom error component */
  errorComponent?: React.ReactNode;
  /** Callback when image loads */
  onLoad?: () => void;
  /** Callback when image fails to load */
  onError?: () => void;
  /** Enable lazy loading (default: true) */
  lazy?: boolean;
}

/**
 * Default loading skeleton component
 */
const DefaultLoadingSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div
    className={cn(
      "animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]",
      "rounded-lg flex items-center justify-center",
      className
    )}
    data-testid="image-loading-skeleton"
  >
    <div className="text-gray-400">
      <svg
        className="w-8 h-8"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  </div>
);

/**
 * Default error component
 */
const DefaultErrorComponent: React.FC<{ className?: string; onRetry?: () => void }> = ({ 
  className, 
  onRetry 
}) => (
  <div
    className={cn(
      "bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg",
      "flex flex-col items-center justify-center text-gray-500 p-4",
      className
    )}
    data-testid="image-error-state"
  >
    <svg
      className="w-8 h-8 mb-2"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
      />
    </svg>
    <span className="text-sm text-center mb-2">Failed to load image</span>
    {onRetry && (
      <button
        onClick={onRetry}
        className="text-xs text-primary-600 hover:text-primary-700 underline"
      >
        Try again
      </button>
    )}
  </div>
);

/**
 * Custom hook for intersection observer
 */
const useIntersectionObserver = (
  elementRef: React.RefObject<Element>,
  { threshold = 0.1, root = null, rootMargin = '50px' } = {}
): boolean => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting) {
          setIsIntersecting(true);
          observer.unobserve(element);
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [elementRef, threshold, root, rootMargin]);

  return isIntersecting;
};

/**
 * Lazy Loading Image Component
 * 
 * Optimized for performance with intersection observer and Next.js Image
 * 
 * @example Basic usage
 * <LazyImage
 *   src="/hotel-image.jpg"
 *   alt="Luxury beach resort"
 *   width={800}
 *   height={600}
 * />
 * 
 * @example Responsive with lazy loading
 * <LazyImage
 *   src="/hero-background.jpg"
 *   alt="Resort view"
 *   fill
 *   sizes="(max-width: 768px) 100vw, 50vw"
 *   objectFit="cover"
 * />
 * 
 * @example Priority loading for above-fold content
 * <LazyImage
 *   src="/hero-image.jpg"
 *   alt="Main hero image"
 *   priority
 *   lazy={false}
 *   width={1200}
 *   height={800}
 * />
 */
const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  fill = false,
  objectFit = 'cover',
  sizes,
  placeholder,
  loadingComponent,
  errorComponent,
  onLoad,
  onError,
  lazy = true,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Use intersection observer for lazy loading
  const isInView = useIntersectionObserver(containerRef);
  const shouldLoad = !lazy || priority || isInView;

  /**
   * Handle successful image load
   */
  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
    onLoad?.();

    // Debug logging in development
    if (process.env.NODE_ENV === 'development') {
      console.log('🖼️ [Image] Loaded successfully:', src);
    }
  };

  /**
   * Handle image load error
   */
  const handleError = () => {
    setHasError(true);
    setIsLoaded(false);
    onError?.();

    // Debug logging in development
    if (process.env.NODE_ENV === 'development') {
      console.error('🚨 [Image] Failed to load:', src);
    }
  };

  /**
   * Retry loading image
   */
  const handleRetry = () => {
    if (retryCount < 3) {
      setHasError(false);
      setRetryCount(prev => prev + 1);
      
      // Force reload by updating src with cache buster
      const img = new window.Image();
      img.onload = handleLoad;
      img.onerror = handleError;
      img.src = `${src}?retry=${retryCount + 1}`;
    }
  };

  /**
   * Get container classes based on state
   */
  const containerClasses = cn(
    "relative overflow-hidden",
    !fill && width && height && `w-[${width}px] h-[${height}px]`,
    fill && "w-full h-full",
    className
  );

  /**
   * Get image classes with transition effects
   */
  const imageClasses = cn(
    "transition-opacity duration-300",
    isLoaded ? "opacity-100" : "opacity-0"
  );

  return (
    <div
      ref={containerRef}
      className={containerClasses}
      data-testid="lazy-image-container"
      {...props}
    >
      {/* Loading State */}
      {!isLoaded && !hasError && shouldLoad && (
        <div className="absolute inset-0 z-10">
          {loadingComponent || (
            <DefaultLoadingSkeleton className="w-full h-full" />
          )}
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 z-10">
          {errorComponent || (
            <DefaultErrorComponent 
              className="w-full h-full" 
              {...(retryCount < 3 && { onRetry: handleRetry })}
            />
          )}
        </div>
      )}

      {/* Actual Image */}
      {shouldLoad && !hasError && (
        <Image
          src={src}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          fill={fill}
          sizes={sizes}
          priority={priority}
          quality={90}
          className={imageClasses}
          style={fill ? { objectFit } : undefined}
          onLoad={handleLoad}
          onError={handleError}
          placeholder={placeholder ? 'blur' : 'empty'}
          blurDataURL={placeholder}
          data-testid="lazy-image"
        />
      )}

      {/* Intersection Observer Target for Lazy Loading */}
      {lazy && !priority && !isInView && (
        <div 
          className="absolute inset-0 bg-gray-200"
          data-testid="lazy-loading-placeholder"
        />
      )}
    </div>
  );
};

export { LazyImage };
export type { LazyImageProps }; 