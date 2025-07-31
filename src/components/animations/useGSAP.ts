/**
 * Custom GSAP Animation Hooks for React
 * 
 * Provides reusable, performant GSAP integrations with:
 * - Automatic cleanup and memory management
 * - Intersection Observer optimization
 * - Development debugging support
 * - TypeScript safety
 * - Responsive animation handling
 */

'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  GSAPAnimationConfig, 
  ParallaxConfig, 
  DEFAULT_ANIMATION_CONFIG 
} from '@/types';
import { devLog, createDebugConfig } from '@/lib/utils';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Hook for basic GSAP animations with automatic cleanup
 * Optimized for component lifecycle and performance
 * 
 * @param config - Animation configuration
 * @returns Ref to attach to animated element and animation controls
 */
export function useGSAPAnimation(config: GSAPAnimationConfig = {}) {
  const elementRef = useRef<HTMLElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const [isReady, setIsReady] = useState(false);

  const mergedConfig = { ...DEFAULT_ANIMATION_CONFIG, ...config };
  const debugConfig = createDebugConfig();

  /**
   * Plays the animation
   */
  const play = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.play();
      devLog('animation', 'Animation played');
    }
  }, []);

  /**
   * Pauses the animation
   */
  const pause = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.pause();
      devLog('animation', 'Animation paused');
    }
  }, []);

  /**
   * Reverses the animation
   */
  const reverse = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.reverse();
      devLog('animation', 'Animation reversed');
    }
  }, []);

  /**
   * Restarts the animation
   */
  const restart = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.restart();
      devLog('animation', 'Animation restarted');
    }
  }, []);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Set initial state
    gsap.set(element, {
      opacity: 0,
      y: 30,
      ...mergedConfig.transform,
    });

    // Create animation - filter out undefined values for strict TypeScript
    const animationProps: any = {
      opacity: 1,
      y: 0,
      ...mergedConfig.transform,
      onComplete: () => {
        setIsReady(true);
        devLog('animation', 'Animation completed for element');
      },
    };

    // Only add properties if they're not undefined
    if (mergedConfig.duration !== undefined) {
      animationProps.duration = mergedConfig.duration;
    }
    if (mergedConfig.ease !== undefined) {
      animationProps.ease = mergedConfig.ease;
    }
    if (mergedConfig.delay !== undefined) {
      animationProps.delay = mergedConfig.delay;
    }

    animationRef.current = gsap.to(element, animationProps);

    // Debug: Log animation creation
    if (debugConfig.enableLogging) {
      devLog('animation', 'GSAP animation created:', {
        element: element.tagName,
        config: mergedConfig,
      });
    }

    // Cleanup function
    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
        animationRef.current = null;
        devLog('animation', 'GSAP animation cleaned up');
      }
    };
  }, [mergedConfig, debugConfig.enableLogging]);

  return {
    ref: elementRef,
    isReady,
    controls: { play, pause, reverse, restart },
  };
}

/**
 * Hook for scroll-triggered animations with Intersection Observer
 * Provides better performance than continuous scroll listening
 * 
 * @param config - Animation configuration with trigger settings
 * @returns Ref and animation state
 */
export function useScrollAnimation(config: GSAPAnimationConfig = {}) {
  const elementRef = useRef<HTMLElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  const mergedConfig = { ...DEFAULT_ANIMATION_CONFIG, ...config };
  const debugConfig = createDebugConfig();

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Set initial state
    gsap.set(element, {
      opacity: 0,
      y: 50,
      scale: 0.9,
      ...mergedConfig.transform,
    });

    // Create intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setIsVisible(true);
            
            // Create and play animation - filter out undefined values
            const scrollAnimationProps: any = {
              opacity: 1,
              y: 0,
              scale: 1,
              ...mergedConfig.transform,
              onComplete: () => {
                setHasAnimated(true);
                devLog('animation', 'Scroll animation completed');
              },
            };

            // Only add properties if they're not undefined
            if (mergedConfig.duration !== undefined) {
              scrollAnimationProps.duration = mergedConfig.duration;
            }
            if (mergedConfig.ease !== undefined) {
              scrollAnimationProps.ease = mergedConfig.ease;
            }
            if (mergedConfig.delay !== undefined) {
              scrollAnimationProps.delay = mergedConfig.delay;
            }

            animationRef.current = gsap.to(element, scrollAnimationProps);

            // Unobserve after first animation to prevent re-triggering
            observerRef.current?.unobserve(element);

            // Debug logging
            if (debugConfig.enableLogging) {
              devLog('animation', 'Scroll animation triggered:', {
                element: element.tagName,
                boundingRect: entry.boundingClientRect,
              });
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '-10% 0px',
      }
    );

    // Start observing
    observerRef.current.observe(element);

    // Cleanup function
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (animationRef.current) {
        animationRef.current.kill();
      }
      devLog('animation', 'Scroll animation observer cleaned up');
    };
  }, [mergedConfig, hasAnimated, debugConfig.enableLogging]);

  return {
    ref: elementRef,
    isVisible,
    hasAnimated,
  };
}

/**
 * Hook for parallax scrolling effects
 * Optimized for performance with requestAnimationFrame
 * 
 * @param config - Parallax configuration
 * @returns Ref for parallax element
 */
export function useParallax(config: ParallaxConfig) {
  const elementRef = useRef<HTMLElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const debugConfig = createDebugConfig();

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Create ScrollTrigger-based parallax
    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const yPercent = (config.speed * progress * 100) || 0;
        
        // Apply transform with hardware acceleration
        gsap.set(element, {
          yPercent,
          ...config.properties,
          force3D: config.performance?.use3d !== false,
        });
      },
      markers: debugConfig.showGSAPMarkers,
    });

    // Debug logging
    if (debugConfig.enableLogging) {
      devLog('animation', 'Parallax effect created:', {
        element: element.tagName,
        speed: config.speed,
        properties: config.properties,
      });
    }

    // Cleanup function
    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        devLog('animation', 'Parallax effect cleaned up');
      }
    };
  }, [config, debugConfig]);

  return { ref: elementRef };
}

/**
 * Hook for staggered animations of multiple elements
 * Ideal for animating lists, grids, or sequences
 * 
 * @param config - Animation configuration
 * @param stagger - Stagger timing between elements
 * @returns Ref for container element
 */
export function useStaggerAnimation(
  config: GSAPAnimationConfig = {},
  stagger: number = 0.1
) {
  const containerRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [isReady, setIsReady] = useState(false);

  const mergedConfig = { ...DEFAULT_ANIMATION_CONFIG, ...config };
  const debugConfig = createDebugConfig();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const children = gsap.utils.toArray(container.children);
    if (children.length === 0) return;

    // Set initial state for all children
    gsap.set(children, {
      opacity: 0,
      y: 30,
      scale: 0.9,
      ...mergedConfig.transform,
    });

    // Create staggered timeline
    timelineRef.current = gsap.timeline({
      onComplete: () => {
        setIsReady(true);
        devLog('animation', 'Stagger animation completed');
      },
    });

    // Create stagger animation props - filter out undefined values
    const staggerProps: any = {
      opacity: 1,
      y: 0,
      scale: 1,
      stagger: stagger,
      ...mergedConfig.transform,
    };

    // Only add properties if they're not undefined
    if (mergedConfig.duration !== undefined) {
      staggerProps.duration = mergedConfig.duration;
    }
    if (mergedConfig.ease !== undefined) {
      staggerProps.ease = mergedConfig.ease;
    }

    timelineRef.current.to(children, staggerProps);

    // Debug logging
    if (debugConfig.enableLogging) {
      devLog('animation', 'Stagger animation created:', {
        childCount: children.length,
        stagger,
        config: mergedConfig,
      });
    }

    // Cleanup function
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
        devLog('animation', 'Stagger animation cleaned up');
      }
    };
  }, [mergedConfig, stagger, debugConfig.enableLogging]);

  return {
    ref: containerRef,
    isReady,
  };
}

/**
 * Hook for hover animations with smooth transitions
 * Provides enter and leave animations
 * 
 * @param enterConfig - Animation config for mouse enter
 * @param leaveConfig - Animation config for mouse leave
 * @returns Ref and hover handlers
 */
export function useHoverAnimation(
  enterConfig: GSAPAnimationConfig = {},
  leaveConfig: GSAPAnimationConfig = {}
) {
  const elementRef = useRef<HTMLElement>(null);
  const enterAnimationRef = useRef<gsap.core.Tween | null>(null);
  const leaveAnimationRef = useRef<gsap.core.Tween | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const debugConfig = createDebugConfig();

  const handleMouseEnter = useCallback(() => {
    const element = elementRef.current;
    if (!element) return;

    setIsHovered(true);

    // Kill any existing leave animation
    if (leaveAnimationRef.current) {
      leaveAnimationRef.current.kill();
    }

    // Create enter animation
    enterAnimationRef.current = gsap.to(element, {
      scale: 1.05,
      y: -5,
      duration: 0.3,
      ease: "power2.out",
      ...enterConfig.transform,
    });

    if (debugConfig.enableLogging) {
      devLog('animation', 'Hover enter animation triggered');
    }
  }, [enterConfig, debugConfig.enableLogging]);

  const handleMouseLeave = useCallback(() => {
    const element = elementRef.current;
    if (!element) return;

    setIsHovered(false);

    // Kill any existing enter animation
    if (enterAnimationRef.current) {
      enterAnimationRef.current.kill();
    }

    // Create leave animation
    leaveAnimationRef.current = gsap.to(element, {
      scale: 1,
      y: 0,
      duration: 0.3,
      ease: "power2.out",
      ...leaveConfig.transform,
    });

    if (debugConfig.enableLogging) {
      devLog('animation', 'Hover leave animation triggered');
    }
  }, [leaveConfig, debugConfig.enableLogging]);

  useEffect(() => {
    // Cleanup function
    return () => {
      if (enterAnimationRef.current) {
        enterAnimationRef.current.kill();
      }
      if (leaveAnimationRef.current) {
        leaveAnimationRef.current.kill();
      }
      devLog('animation', 'Hover animations cleaned up');
    };
  }, []);

  return {
    ref: elementRef,
    isHovered,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  };
}

/**
 * Hook for responsive animations that adapt to screen size
 * Automatically adjusts animation parameters based on viewport
 * 
 * @param mobileConfig - Configuration for mobile devices
 * @param desktopConfig - Configuration for desktop devices
 * @returns Animation ref and current config
 */
export function useResponsiveAnimation(
  mobileConfig: GSAPAnimationConfig,
  desktopConfig: GSAPAnimationConfig
) {
  const [isMobile, setIsMobile] = useState(false);
  const [currentConfig, setCurrentConfig] = useState(desktopConfig);

  useEffect(() => {
    const checkViewport = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setCurrentConfig(mobile ? mobileConfig : desktopConfig);
    };

    // Initial check
    checkViewport();

    // Listen for resize events
    window.addEventListener('resize', checkViewport);

    return () => {
      window.removeEventListener('resize', checkViewport);
    };
  }, [mobileConfig, desktopConfig]);

  const animation = useGSAPAnimation(currentConfig);

  return {
    ...animation,
    isMobile,
    currentConfig,
  };
} 