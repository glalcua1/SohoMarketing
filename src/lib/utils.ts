/**
 * Utility Functions for Hospitality Marketing Platform
 * 
 * Comprehensive utilities for:
 * - Class name management with Tailwind
 * - Animation and GSAP helpers
 * - Form validation and data handling
 * - Performance monitoring and debugging
 * - Type guards and data validation
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { gsap } from 'gsap';
import { 
  GSAPAnimationConfig, 
  LeadFormData, 
  FormErrors, 
  DebugConfig, 
  DEFAULT_DEBUG_CONFIG,
  AnalyticsEvent 
} from '@/types';

// =====================================================
// CLASS NAME UTILITIES
// =====================================================

/**
 * Combines and merges Tailwind CSS classes efficiently
 * Prevents class conflicts and ensures proper precedence
 * 
 * @param inputs - Class values to merge
 * @returns Merged class string
 * 
 * @example
 * cn('px-4 py-2', 'bg-blue-500', 'px-6') // 'py-2 bg-blue-500 px-6'
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Conditionally applies classes based on boolean conditions
 * 
 * @param baseClasses - Always applied classes
 * @param conditionalClasses - Object with condition -> classes mapping
 * @returns Merged class string
 * 
 * @example
 * conditionalClasses('btn', { 'btn-primary': isActive, 'btn-disabled': disabled })
 */
export function conditionalClasses(
  baseClasses: string,
  conditionalClasses: Record<string, boolean>
): string {
  const appliedClasses = Object.entries(conditionalClasses)
    .filter(([_, condition]) => condition)
    .map(([className]) => className);
  
  return cn(baseClasses, ...appliedClasses);
}

// =====================================================
// ANIMATION UTILITIES
// =====================================================

/**
 * Creates a GSAP timeline with standard configuration
 * Includes debugging support and performance optimization
 * 
 * @param config - Animation configuration
 * @returns Configured GSAP timeline
 */
export function createGSAPTimeline(config: GSAPAnimationConfig = {}): gsap.core.Timeline {
  const timeline = gsap.timeline({
    defaults: {
      duration: config.duration || 0.8,
      ease: config.ease || "power2.out",
    },
  });

  // Debug: Log timeline creation in development
  if (config.debug && process.env.NODE_ENV === 'development') {
    console.log('🎬 GSAP Timeline created:', {
      duration: config.duration,
      ease: config.ease,
      timestamp: new Date().toISOString(),
    });
  }

  return timeline;
}

/**
 * Animates elements into view with intersection observer
 * Optimized for performance with proper cleanup
 * 
 * @param selector - CSS selector for elements to animate
 * @param animationConfig - GSAP animation configuration
 * @returns Cleanup function
 */
export function animateOnScroll(
  selector: string,
  animationConfig: GSAPAnimationConfig = {}
): () => void {
  const elements = gsap.utils.toArray(selector);
  const animations: gsap.core.Tween[] = [];

  // Set initial state
  gsap.set(elements, {
    opacity: 0,
    y: 30,
    ...animationConfig.transform,
  });

  // Create intersection observer for performance
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const animation = gsap.to(entry.target, {
            opacity: 1,
            y: 0,
            duration: animationConfig.duration || 0.8,
            ease: animationConfig.ease || "power2.out",
            delay: animationConfig.delay || 0,
            ...animationConfig.transform,
          });
          
          animations.push(animation);
          observer.unobserve(entry.target);

          // Debug: Log animation trigger
          if (animationConfig.debug) {
            console.log('🎯 Animation triggered for:', entry.target);
          }
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '-50px',
    }
  );

  // Observe all elements
  elements.forEach((element) => {
    observer.observe(element as Element);
  });

  // Return cleanup function
  return () => {
    observer.disconnect();
    animations.forEach((animation) => animation.kill());
    
    if (animationConfig.debug) {
      console.log('🧹 Cleaned up animations for:', selector);
    }
  };
}

/**
 * Throttle function for performance optimization
 * Limits function execution frequency
 * 
 * @param func - Function to throttle
 * @param limit - Time limit in milliseconds
 * @returns Throttled function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): T {
  let inThrottle: boolean;
  
  return function(this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  } as T;
}

// =====================================================
// FORM VALIDATION UTILITIES
// =====================================================

/**
 * Validates email address format
 * 
 * @param email - Email string to validate
 * @returns True if valid email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates phone number format (international)
 * 
 * @param phone - Phone number to validate
 * @returns True if valid phone format
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

/**
 * Validates hotel lead form data
 * Returns detailed validation errors for better UX
 * 
 * @param data - Form data to validate
 * @returns Validation errors object
 */
export function validateLeadForm(data: Partial<LeadFormData>): FormErrors {
  const errors: FormErrors = {};

  // Email validation
  if (!data.email) {
    errors.email = 'Hotel email is required';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Hotel name validation
  if (!data.hotelName) {
    errors.hotelName = 'Hotel name is required';
  } else if (data.hotelName.length < 2) {
    errors.hotelName = 'Hotel name must be at least 2 characters';
  }

  // Contact name validation
  if (!data.contactName) {
    errors.contactName = 'Contact name is required';
  } else if (data.contactName.length < 2) {
    errors.contactName = 'Contact name must be at least 2 characters';
  }

  // Phone validation (if provided)
  if (data.phone && !isValidPhone(data.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  // Property type validation
  if (!data.propertyType) {
    errors.propertyType = 'Please select your property type';
  }

  // Marketing goals validation
  if (!data.marketingGoals || data.marketingGoals.length === 0) {
    errors.marketingGoals = 'Please select at least one marketing goal';
  }

  // Marketing consent validation
  if (!data.marketingConsent) {
    errors.marketingConsent = 'Please consent to marketing communications';
  }

  return errors;
}

/**
 * Sanitizes form data for safe processing
 * Removes potentially harmful content and normalizes data
 * 
 * @param data - Raw form data
 * @returns Sanitized form data
 */
export function sanitizeFormData(data: Partial<LeadFormData>): Partial<LeadFormData> {
  const sanitized: Partial<LeadFormData> = {};

  // Sanitize string fields
  if (data.email) sanitized.email = data.email.trim().toLowerCase();
  if (data.hotelName) sanitized.hotelName = data.hotelName.trim();
  if (data.contactName) sanitized.contactName = data.contactName.trim();
  if (data.phone) sanitized.phone = data.phone.replace(/[\s\-\(\)]/g, '');
  if (data.notes) sanitized.notes = data.notes.trim().slice(0, 500); // Limit length

  // Copy other fields as-is
  if (data.propertyType) sanitized.propertyType = data.propertyType;
  if (data.marketingGoals) sanitized.marketingGoals = [...data.marketingGoals];
  if (data.referralSource) sanitized.referralSource = data.referralSource;
  if (typeof data.marketingConsent === 'boolean') {
    sanitized.marketingConsent = data.marketingConsent;
  }

  return sanitized;
}

// =====================================================
// DEBUGGING & DEVELOPMENT UTILITIES
// =====================================================

/**
 * Development logger with categorized output
 * Only logs in development environment
 * 
 * @param category - Log category for filtering
 * @param message - Log message
 * @param data - Additional data to log
 */
export function devLog(
  category: 'animation' | 'form' | 'api' | 'performance' | 'error',
  message: string,
  data?: any
): void {
  if (process.env.NODE_ENV !== 'development') return;

  const emoji = {
    animation: '🎬',
    form: '📝',
    api: '🌐',
    performance: '⚡',
    error: '🚨',
  };

  console.log(`${emoji[category]} [${category.toUpperCase()}] ${message}`, data || '');
}

/**
 * Performance monitoring utility
 * Measures and logs execution time of functions
 * 
 * @param name - Operation name for identification
 * @param operation - Function to measure
 * @returns Result of the operation
 */
export async function measurePerformance<T>(
  name: string,
  operation: () => Promise<T> | T
): Promise<T> {
  const start = performance.now();
  
  try {
    const result = await operation();
    const duration = performance.now() - start;
    
    devLog('performance', `${name} completed in ${duration.toFixed(2)}ms`);
    
    return result;
  } catch (error) {
    const duration = performance.now() - start;
    devLog('error', `${name} failed after ${duration.toFixed(2)}ms`, error);
    throw error;
  }
}

/**
 * Creates a debug configuration based on URL parameters
 * Allows runtime debugging control via query parameters
 * 
 * @returns Debug configuration object
 */
export function createDebugConfig(): DebugConfig {
  if (typeof window === 'undefined') {
    return DEFAULT_DEBUG_CONFIG;
  }

  const params = new URLSearchParams(window.location.search);
  
  return {
    enableLogging: params.get('debug') === 'true' || DEFAULT_DEBUG_CONFIG.enableLogging,
    showPerformance: params.get('perf') === 'true' || DEFAULT_DEBUG_CONFIG.showPerformance,
    highlightInteractive: params.get('highlight') === 'true',
    showGSAPMarkers: params.get('gsap') === 'true' || DEFAULT_DEBUG_CONFIG.showGSAPMarkers,
    logApiRequests: params.get('api') === 'true' || DEFAULT_DEBUG_CONFIG.logApiRequests,
  };
}

// =====================================================
// DATA UTILITIES
// =====================================================

/**
 * Formats numbers with proper separators for display
 * 
 * @param num - Number to format
 * @param locale - Locale for formatting (default: 'en-US')
 * @returns Formatted number string
 */
export function formatNumber(num: number, locale: string = 'en-US'): string {
  return new Intl.NumberFormat(locale).format(num);
}

/**
 * Formats currency values with proper symbols
 * 
 * @param amount - Amount to format
 * @param currency - Currency code (default: 'USD')
 * @param locale - Locale for formatting (default: 'en-US')
 * @returns Formatted currency string
 */
export function formatCurrency(
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Generates a unique session ID for analytics
 * 
 * @returns Unique session identifier
 */
export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Tracks analytics events with proper structure
 * 
 * @param event - Analytics event to track
 */
export function trackEvent(event: Omit<AnalyticsEvent, 'timestamp' | 'sessionId'>): void {
  const fullEvent: AnalyticsEvent = {
    ...event,
    timestamp: new Date(),
    sessionId: generateSessionId(),
  };

  // Log event in development
  devLog('api', 'Analytics event tracked:', fullEvent);

  // In production, send to analytics service
  if (process.env.NODE_ENV === 'production') {
    // TODO: Integrate with actual analytics service
    // Example: gtag('event', event.name, event.properties);
  }
}

/**
 * Safely parses JSON with error handling
 * 
 * @param jsonString - JSON string to parse
 * @param fallback - Fallback value if parsing fails
 * @returns Parsed object or fallback
 */
export function safeJsonParse<T>(jsonString: string, fallback: T): T {
  try {
    return JSON.parse(jsonString) as T;
  } catch (error) {
    devLog('error', 'JSON parsing failed:', error);
    return fallback;
  }
}

/**
 * Creates a delay for testing or animation purposes
 * 
 * @param ms - Milliseconds to delay
 * @returns Promise that resolves after delay
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// =====================================================
// TYPE GUARDS
// =====================================================

/**
 * Type guard to check if a value is a valid email
 * 
 * @param value - Value to check
 * @returns True if value is a valid email string
 */
export function isEmail(value: unknown): value is string {
  return typeof value === 'string' && isValidEmail(value);
}

/**
 * Type guard to check if an object has required form fields
 * 
 * @param obj - Object to check
 * @returns True if object has required lead form fields
 */
export function isValidLeadFormData(obj: any): obj is LeadFormData {
  return (
    obj &&
    typeof obj === 'object' &&
    isEmail(obj.email) &&
    typeof obj.hotelName === 'string' &&
    typeof obj.contactName === 'string' &&
    typeof obj.propertyType === 'string' &&
    Array.isArray(obj.marketingGoals) &&
    typeof obj.marketingConsent === 'boolean'
  );
} 