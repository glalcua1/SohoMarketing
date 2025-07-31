/**
 * TypeScript Type Definitions for Hospitality Marketing Platform
 * 
 * Provides comprehensive type safety for:
 * - Component props and state
 * - Animation configurations
 * - Business data models
 * - API responses and form data
 * - GSAP animation parameters
 */

import { ReactNode, HTMLAttributes } from 'react';

// =====================================================
// COMPONENT PROP TYPES
// =====================================================

/**
 * Base component props that all components extend
 */
export interface BaseComponentProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  className?: string;
  'data-testid'?: string;
}

/**
 * Props for sections with parallax animations
 */
export interface ParallaxSectionProps extends BaseComponentProps {
  /** Unique identifier for GSAP targeting */
  sectionId: string;
  /** Background variant for theming */
  variant?: 'light' | 'dark' | 'gradient';
  /** Enable/disable parallax animations */
  enableParallax?: boolean;
  /** Custom animation configuration */
  animationConfig?: GSAPAnimationConfig;
}

/**
 * Props for CTA (Call to Action) components
 */
export interface CTAProps extends BaseComponentProps {
  /** Primary action text */
  primaryText: string;
  /** Secondary descriptive text */
  secondaryText?: string;
  /** Button text */
  buttonText: string;
  /** Button click handler */
  onButtonClick: () => void;
  /** Button variant */
  buttonVariant?: 'primary' | 'secondary';
  /** Show urgency indicator */
  showUrgency?: boolean;
  /** Urgency message */
  urgencyText?: string;
}

// =====================================================
// ANIMATION & GSAP TYPES
// =====================================================

/**
 * GSAP Animation configuration with debugging support
 */
export interface GSAPAnimationConfig {
  /** Animation duration in seconds */
  duration?: number;
  /** Animation delay in seconds */
  delay?: number;
  /** GSAP easing function */
  ease?: string;
  /** Animation trigger configuration */
  trigger?: {
    /** Element selector to trigger animation */
    element: string;
    /** Trigger point (0-1 or pixel value) */
    start?: string | number;
    /** End point for ScrollTrigger */
    end?: string | number;
    /** Scrub animation to scroll */
    scrub?: boolean | number;
    /** Pin element during animation */
    pin?: boolean;
  };
  /** Transform properties */
  transform?: {
    x?: number | string;
    y?: number | string;
    scale?: number;
    rotation?: number;
    opacity?: number;
  };
  /** Enable debugging markers */
  debug?: boolean;
}

/**
 * Parallax animation parameters
 */
export interface ParallaxConfig {
  /** Element selector */
  selector: string;
  /** Parallax speed multiplier (-1 to 1) */
  speed: number;
  /** Animation properties */
  properties: {
    yPercent?: number;
    xPercent?: number;
    rotation?: number;
    scale?: number;
    opacity?: number;
  };
  /** Performance optimization */
  performance?: {
    /** Use transform3d for hardware acceleration */
    use3d?: boolean;
    /** Throttle animation updates */
    throttle?: boolean;
  };
}

// =====================================================
// BUSINESS DATA MODELS
// =====================================================

/**
 * Hotel property information
 */
export interface HotelInfo {
  /** Hotel name */
  name: string;
  /** Property type */
  type: 'luxury' | 'boutique' | 'resort' | 'chain' | 'independent';
  /** Location information */
  location: {
    city: string;
    country: string;
    region?: string;
  };
  /** Target audience */
  targetAudience: string[];
  /** Marketing budget range */
  budgetRange: 'starter' | 'growth' | 'enterprise';
  /** Campaign goals */
  campaignGoals: string[];
}

/**
 * Creator/Influencer profile data
 */
export interface CreatorProfile {
  /** Unique creator ID */
  id: string;
  /** Creator name */
  name: string;
  /** Profile image URL */
  avatar: string;
  /** Social media handles */
  socialMedia: {
    platform: 'instagram' | 'tiktok' | 'youtube' | 'twitter';
    handle: string;
    followers: number;
    engagement: number;
    verified: boolean;
  }[];
  /** Content categories */
  categories: string[];
  /** Location */
  location: string;
  /** Estimated rates */
  rates: {
    post: number;
    story: number;
    reel: number;
    collaboration: number;
  };
  /** Performance metrics */
  metrics: {
    averageViews: number;
    averageLikes: number;
    averageComments: number;
    responseRate: number;
  };
  /** Collaboration history */
  collaborationHistory?: {
    hotelName: string;
    campaignType: string;
    results: {
      views: number;
      engagement: number;
      bookings?: number;
    };
  }[];
}

/**
 * Campaign performance metrics
 */
export interface CampaignMetrics {
  /** Campaign ID */
  campaignId: string;
  /** Hotel information */
  hotel: Pick<HotelInfo, 'name' | 'type'>;
  /** Time period */
  period: {
    start: Date;
    end: Date;
  };
  /** Performance data */
  metrics: {
    /** Total views generated */
    totalViews: number;
    /** Total engagement (likes, comments, shares) */
    totalEngagement: number;
    /** Reach (unique viewers) */
    reach: number;
    /** Website clicks */
    websiteClicks: number;
    /** Booking conversions */
    bookings: number;
    /** Revenue attributed */
    revenue: number;
    /** ROI percentage */
    roi: number;
  };
  /** Creators involved */
  creators: CreatorProfile[];
  /** Campaign status */
  status: 'planning' | 'active' | 'completed' | 'paused';
}

// =====================================================
// FORM & VALIDATION TYPES
// =====================================================

/**
 * Lead capture form data
 */
export interface LeadFormData {
  /** Hotel email address */
  email: string;
  /** Hotel name */
  hotelName: string;
  /** Contact person name */
  contactName: string;
  /** Phone number (optional) */
  phone?: string;
  /** Property type */
  propertyType: HotelInfo['type'];
  /** Marketing goals */
  marketingGoals: string[];
  /** How they heard about us */
  referralSource?: string;
  /** Additional notes */
  notes?: string;
  /** Consent for marketing communications */
  marketingConsent: boolean;
}

/**
 * Form validation errors
 */
export interface FormErrors {
  [key: string]: string | undefined;
}

/**
 * Form submission state
 */
export interface FormState {
  /** Is form currently submitting */
  isSubmitting: boolean;
  /** Validation errors */
  errors: FormErrors;
  /** Submission success state */
  isSuccess: boolean;
  /** Submission error message */
  submitError?: string;
}

// =====================================================
// API & ASYNC TYPES
// =====================================================

/**
 * API Response wrapper
 */
export interface ApiResponse<T = any> {
  /** Response data */
  data: T;
  /** Success status */
  success: boolean;
  /** Error message if failed */
  message?: string;
  /** Additional metadata */
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
}

/**
 * Loading state for async operations
 */
export interface LoadingState {
  /** Is operation in progress */
  isLoading: boolean;
  /** Error message if failed */
  error?: string;
  /** Success message */
  success?: string;
}

// =====================================================
// UTILITY TYPES
// =====================================================

/**
 * Debug configuration for development
 */
export interface DebugConfig {
  /** Enable console logging */
  enableLogging: boolean;
  /** Show performance metrics */
  showPerformance: boolean;
  /** Highlight interactive elements */
  highlightInteractive: boolean;
  /** Show GSAP animation markers */
  showGSAPMarkers: boolean;
  /** Log API requests */
  logApiRequests: boolean;
}

/**
 * Theme configuration
 */
export interface ThemeConfig {
  /** Color mode */
  mode: 'light' | 'dark' | 'auto';
  /** Primary brand colors */
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  /** Typography settings */
  typography: {
    headingFont: string;
    bodyFont: string;
    accentFont: string;
  };
  /** Animation preferences */
  animations: {
    enabled: boolean;
    reducedMotion: boolean;
    duration: 'fast' | 'normal' | 'slow';
  };
}

/**
 * Analytics event tracking
 */
export interface AnalyticsEvent {
  /** Event name */
  name: string;
  /** Event category */
  category: 'user_interaction' | 'form_submission' | 'page_view' | 'conversion';
  /** Event properties */
  properties: Record<string, any>;
  /** Timestamp */
  timestamp: Date;
  /** User session ID */
  sessionId: string;
}

// =====================================================
// EXPORTED TYPE UTILITIES
// =====================================================

/**
 * Extract component props from a component type
 */
export type ComponentProps<T> = T extends React.ComponentType<infer P> ? P : never;

/**
 * Make specific properties optional
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Make specific properties required
 */
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/**
 * Deep partial type for nested objects
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// =====================================================
// DEFAULT CONFIGURATIONS
// =====================================================

/**
 * Default GSAP animation configuration
 */
export const DEFAULT_ANIMATION_CONFIG: GSAPAnimationConfig = {
  duration: 0.8,
  delay: 0,
  ease: "power2.out",
  debug: process.env.NODE_ENV === 'development',
  transform: {
    opacity: 1,
  },
};

/**
 * Default debug configuration
 */
export const DEFAULT_DEBUG_CONFIG: DebugConfig = {
  enableLogging: process.env.NODE_ENV === 'development',
  showPerformance: process.env.NODE_ENV === 'development',
  highlightInteractive: false,
  showGSAPMarkers: process.env.NODE_ENV === 'development',
  logApiRequests: process.env.NODE_ENV === 'development',
}; 