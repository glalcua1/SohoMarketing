/**
 * Button Component for Hospitality Marketing Platform
 * 
 * Features:
 * - Multiple variants (primary, secondary, ghost, outline)
 * - Different sizes (sm, md, lg, xl)
 * - Loading and disabled states
 * - GSAP hover animations
 * - Accessibility compliance
 * - TypeScript safety with proper prop types
 */

'use client';

import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';
import { useHoverAnimation } from '@/components/animations/useGSAP';

/**
 * Button variant styles using CVA for type-safe variant management
 * Supports the purple-blue gradient design system
 */
const buttonVariants = cva(
  // Base styles applied to all buttons
  [
    "inline-flex items-center justify-center gap-2 rounded-lg font-semibold",
    "transition-all duration-300 focus-visible:outline-none focus-visible:ring-2",
    "focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    "relative overflow-hidden group cursor-pointer"
  ],
  {
    variants: {
      variant: {
        // Primary gradient button for main CTAs
        primary: [
          "bg-gradient-to-r from-secondary-600 to-primary-600 text-white",
          "hover:from-secondary-700 hover:to-primary-700",
          "focus-visible:ring-primary-500 shadow-lg hover:shadow-xl",
          "before:absolute before:inset-0 before:bg-gradient-to-r",
          "before:from-white/20 before:to-transparent before:opacity-0",
          "before:transition-opacity before:duration-300 hover:before:opacity-100"
        ],
        // Secondary button with coral accent
        secondary: [
          "bg-accent-500 text-white hover:bg-accent-600",
          "focus-visible:ring-accent-400 shadow-md hover:shadow-lg"
        ],
        // Outline button for secondary actions
        outline: [
          "border-2 border-primary-300 text-primary-700 bg-white",
          "hover:bg-primary-50 hover:border-primary-400",
          "focus-visible:ring-primary-400"
        ],
        // Ghost button for subtle actions
        ghost: [
          "text-primary-600 hover:bg-primary-50",
          "focus-visible:ring-primary-400"
        ],
        // Link-style button
        link: [
          "text-primary-600 underline-offset-4 hover:underline",
          "focus-visible:ring-primary-400"
        ]
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
        xl: "h-14 px-8 text-lg"
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false
    }
  }
);

/**
 * Button component props interface
 * Extends HTML button attributes with custom variants
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render as child component (using Radix Slot) */
  asChild?: boolean;
  /** Loading state with spinner */
  loading?: boolean;
  /** Icon to display before text */
  leftIcon?: React.ReactNode;
  /** Icon to display after text */
  rightIcon?: React.ReactNode;
  /** Enable GSAP hover animations */
  enableAnimation?: boolean;
  /** Custom data attributes for analytics */
  'data-analytics'?: string;
}

/**
 * Loading spinner component for button loading state
 */
const LoadingSpinner: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={cn("animate-spin h-4 w-4", className)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    data-testid="loading-spinner"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

/**
 * Button component with comprehensive features for hospitality marketing platform
 * 
 * @example Basic usage
 * <Button variant="primary" size="lg" onClick={handleClick}>
 *   Launch Campaign
 * </Button>
 * 
 * @example With loading state
 * <Button loading disabled>
 *   Processing...
 * </Button>
 * 
 * @example With icons
 * <Button leftIcon={<RocketIcon />} rightIcon={<ArrowIcon />}>
 *   Get Started
 * </Button>
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant,
    size,
    fullWidth,
    asChild = false,
    loading = false,
    leftIcon,
    rightIcon,
    enableAnimation = true,
    children,
    disabled,
    onClick,
    'data-analytics': analyticsId,
    ...props
  }, ref) => {
    // GSAP hover animation hook
    const hoverAnimation = useHoverAnimation(
      { transform: { scale: 1.02, y: -2 } },
      { transform: { scale: 1, y: 0 } }
    );

    // Use Slot for asChild functionality (allows rendering as different elements)
    const Comp = asChild ? Slot : "button";

    // Determine if button should be disabled
    const isDisabled = disabled || loading;

    /**
     * Handle button click with analytics tracking
     */
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      // Track analytics event if specified
      if (analyticsId && !isDisabled) {
        // trackEvent would be implemented in a real application
        console.log('Button clicked:', analyticsId);
      }

      // Call the provided onClick handler if not disabled
      if (!isDisabled && onClick) {
        onClick(event);
      }
    };

    /**
     * Combine animation ref with component ref
     */
    const combinedRef = enableAnimation ? hoverAnimation.ref as React.RefObject<HTMLButtonElement> : ref;
    const animationHandlers = enableAnimation && !isDisabled 
      ? {
          onMouseEnter: hoverAnimation.onMouseEnter,
          onMouseLeave: hoverAnimation.onMouseLeave,
        }
      : {};

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={combinedRef}
        disabled={isDisabled}
        onClick={handleClick}
        data-analytics={analyticsId}
        data-testid={(props as any)['data-testid'] || 'button'}
        {...animationHandlers}
        {...props}
      >
        {/* Loading state content */}
        {loading && (
          <>
            <LoadingSpinner />
            <span className="sr-only">Loading...</span>
          </>
        )}

        {/* Regular content */}
        {!loading && (
          <>
            {leftIcon && (
              <span className="inline-flex items-center" data-testid="left-icon">
                {leftIcon}
              </span>
            )}
            
            {children && (
              <span className="inline-flex items-center">
                {children}
              </span>
            )}
            
            {rightIcon && (
              <span className="inline-flex items-center" data-testid="right-icon">
                {rightIcon}
              </span>
            )}
          </>
        )}

        {/* Accessibility improvements */}
        {loading && <span className="sr-only">Loading, please wait</span>}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants }; 