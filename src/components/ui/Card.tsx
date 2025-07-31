/**
 * Card Component for Hospitality Marketing Platform
 * 
 * Features:
 * - Multiple variants (default, gradient, elevated, bordered)
 * - Hover animations and interactions
 * - Flexible content areas (header, body, footer)
 * - Accessibility support
 * - TypeScript safety
 * - Responsive design
 */

'use client';

import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { useHoverAnimation } from '@/components/animations/useGSAP';
import { BaseComponentProps } from '@/types';

/**
 * Card variant styles using CVA for consistent theming
 * Supports the purple-blue gradient design system
 */
const cardVariants = cva(
  // Base styles for all cards
  [
    "rounded-xl overflow-hidden transition-all duration-300",
    "focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2"
  ],
  {
    variants: {
      variant: {
        // Default white card with subtle shadow
        default: [
          "bg-white border border-gray-100 shadow-card",
          "hover:shadow-card-hover hover:border-gray-200"
        ],
        // Gradient background card for featured content
        gradient: [
          "bg-gradient-to-br from-secondary-50 to-primary-50",
          "border border-secondary-100 shadow-md",
          "hover:shadow-lg hover:from-secondary-100 hover:to-primary-100"
        ],
        // Elevated card with stronger shadow
        elevated: [
          "bg-white shadow-luxury border-0",
          "hover:shadow-xl hover:-translate-y-1"
        ],
        // Glass morphism effect
        glass: [
          "bg-white/80 backdrop-blur-sm border border-white/20",
          "shadow-lg hover:bg-white/90 hover:shadow-xl"
        ],
        // Bordered card with no shadow
        bordered: [
          "bg-white border-2 border-gray-200",
          "hover:border-primary-300 hover:bg-gray-50"
        ]
      },
      size: {
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
        xl: "p-10"
      },
      interactive: {
        true: "cursor-pointer transform hover:scale-[1.02]",
        false: "cursor-default"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      interactive: false
    }
  }
);

/**
 * Card component props interface
 */
export interface CardProps
  extends BaseComponentProps,
    VariantProps<typeof cardVariants> {
  /** Enable hover animations */
  enableAnimation?: boolean;
  /** Click handler for interactive cards */
  onClick?: () => void;
  /** Custom header content */
  header?: React.ReactNode;
  /** Custom footer content */
  footer?: React.ReactNode;
  /** Loading state */
  loading?: boolean;
}

/**
 * Card header sub-component props
 */
interface CardHeaderProps extends BaseComponentProps {
  /** Header title */
  title?: string;
  /** Header subtitle */
  subtitle?: string;
  /** Action buttons or elements */
  actions?: React.ReactNode;
}

/**
 * Card content sub-component props
 */
interface CardContentProps extends BaseComponentProps {
  /** Content padding override */
  noPadding?: boolean;
}

/**
 * Card footer sub-component props
 */
interface CardFooterProps extends BaseComponentProps {
  /** Justify content alignment */
  justify?: 'start' | 'center' | 'end' | 'between';
}

/**
 * Loading skeleton component for card loading state
 */
const CardSkeleton: React.FC = () => (
  <div className="animate-pulse space-y-4" data-testid="card-skeleton">
    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    <div className="space-y-2">
      <div className="h-3 bg-gray-200 rounded"></div>
      <div className="h-3 bg-gray-200 rounded w-5/6"></div>
      <div className="h-3 bg-gray-200 rounded w-4/6"></div>
    </div>
    <div className="h-8 bg-gray-200 rounded w-1/4"></div>
  </div>
);

/**
 * Card Header Component
 * 
 * @example
 * <CardHeader 
 *   title="Hotel Analytics" 
 *   subtitle="Real-time performance metrics"
 *   actions={<Button size="sm">View Details</Button>}
 * />
 */
const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, title, subtitle, actions, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-start justify-between space-y-1.5 pb-4 border-b border-gray-100",
        className
      )}
      data-testid="card-header"
      {...props}
    >
      <div className="space-y-1 flex-1">
        {title && (
          <h3 className="font-display font-semibold text-lg text-gray-900 leading-tight">
            {title}
          </h3>
        )}
        {subtitle && (
          <p className="text-sm text-gray-600 leading-relaxed">
            {subtitle}
          </p>
        )}
        {children}
      </div>
      {actions && (
        <div className="flex-shrink-0 ml-4">
          {actions}
        </div>
      )}
    </div>
  )
);

CardHeader.displayName = "CardHeader";

/**
 * Card Content Component
 * 
 * @example
 * <CardContent>
 *   <p>Your content goes here...</p>
 * </CardContent>
 */
const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, noPadding = false, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex-1",
        !noPadding && "py-4",
        className
      )}
      data-testid="card-content"
      {...props}
    >
      {children}
    </div>
  )
);

CardContent.displayName = "CardContent";

/**
 * Card Footer Component
 * 
 * @example
 * <CardFooter justify="between">
 *   <Button variant="outline">Cancel</Button>
 *   <Button>Save Changes</Button>
 * </CardFooter>
 */
const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, justify = 'start', children, ...props }, ref) => {
    const justifyClasses = {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between'
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-3 pt-4 border-t border-gray-100",
          justifyClasses[justify],
          className
        )}
        data-testid="card-footer"
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = "CardFooter";

/**
 * Main Card Component with comprehensive features
 * 
 * @example Basic usage
 * <Card variant="default" size="md">
 *   <CardHeader title="Campaign Results" subtitle="Last 30 days" />
 *   <CardContent>
 *     <MetricsDisplay />
 *   </CardContent>
 *   <CardFooter>
 *     <Button>View Full Report</Button>
 *   </CardFooter>
 * </Card>
 * 
 * @example Interactive card
 * <Card 
 *   variant="gradient" 
 *   interactive 
 *   onClick={() => navigate('/details')}
 *   enableAnimation
 * >
 *   <CardContent>
 *     <FeaturePreview />
 *   </CardContent>
 * </Card>
 */
const Card = forwardRef<HTMLDivElement, CardProps>(
  ({
    className,
    variant,
    size,
    interactive,
    enableAnimation = true,
    onClick,
    header,
    footer,
    loading = false,
    children,
    ...props
  }, ref) => {
    // GSAP hover animation hook
    const hoverAnimation = useHoverAnimation(
      { transform: { scale: 1.02, y: -3 } },
      { transform: { scale: 1, y: 0 } }
    );

    // Determine if card should be interactive
    const isInteractive = interactive || !!onClick;

    /**
     * Handle card click events
     */
    const handleClick = () => {
      if (onClick && !loading) {
        onClick();
      }
    };

    /**
     * Handle keyboard events for accessibility
     */
    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (isInteractive && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        handleClick();
      }
    };

    /**
     * Combine animation ref with component ref
     */
    const combinedRef = enableAnimation && isInteractive ? hoverAnimation.ref as React.RefObject<HTMLDivElement> : ref;
    const animationHandlers = enableAnimation && isInteractive && !loading
      ? {
          onMouseEnter: hoverAnimation.onMouseEnter,
          onMouseLeave: hoverAnimation.onMouseLeave,
        }
      : {};

    return (
      <div
        ref={combinedRef}
        className={cn(
          cardVariants({ variant, size, interactive: isInteractive, className })
        )}
        onClick={isInteractive ? handleClick : undefined}
        onKeyDown={isInteractive ? handleKeyDown : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        role={isInteractive ? "button" : undefined}
        aria-pressed={isInteractive ? false : undefined}
        data-testid="card"
        {...animationHandlers}
        {...props}
      >
        {/* Loading state */}
        {loading && <CardSkeleton />}

        {/* Regular content */}
        {!loading && (
          <>
            {/* Header section */}
            {header}

            {/* Main content */}
            <div className="flex-1">
              {children}
            </div>

            {/* Footer section */}
            {footer}
          </>
        )}

        {/* Accessibility enhancement for screen readers */}
        {isInteractive && (
          <span className="sr-only">
            {loading ? 'Loading content' : 'Click to interact with this card'}
          </span>
        )}
      </div>
    );
  }
);

Card.displayName = "Card";

// Export all components and types
export { Card, CardHeader, CardContent, CardFooter, cardVariants }; 