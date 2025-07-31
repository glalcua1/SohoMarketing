/**
 * Professional Results Section - Ogilvy Design Approach
 * 
 * Features:
 * - Compelling metrics display with visual impact
 * - Data-driven social proof following Ogilvy principles
 * - Interactive number animations on scroll
 * - Professional glass morphism design
 * - Case study highlights and testimonials
 * - Mobile-responsive with proper spacing
 * - Performance-optimized animations
 */

'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Clock, Mail, Eye, TrendingUp, Award, CheckCircle, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useScrollAnimation, useStaggerAnimation } from '@/components/animations/useGSAP';

/**
 * Result metric configuration
 */
interface ResultMetric {
  id: string;
  value: number;
  displayValue: string;
  label: string;
  description: string;
  icon: LucideIcon;
  color: {
    primary: string;
    background: string;
    text: string;
  };
  trend: {
    direction: 'up' | 'down';
    percentage: number;
    period: string;
  };
}

/**
 * Case study data for social proof
 */
interface CaseStudy {
  id: string;
  hotelName: string;
  type: string;
  result: string;
  metric: string;
  quote: string;
  image: string;
}

/**
 * Key results metrics with specific, credible numbers
 */
const resultMetrics: ResultMetric[] = [
  {
    id: 'time-saved',
    value: 800,
    displayValue: '800+',
    label: 'Hours Saved Per Week',
    description: 'Time previously spent on manual creator outreach and management',
    icon: Clock,
    color: {
      primary: 'from-blue-500 to-cyan-500',
      background: 'bg-blue-50',
      text: 'text-blue-700'
    },
    trend: {
      direction: 'up',
      percentage: 156,
      period: 'vs manual process'
    }
  },
  {
    id: 'emails-sent',
    value: 532000,
    displayValue: '532k',
    label: 'Emails Sent',
    description: 'Automated outreach messages delivered with 42% open rate',
    icon: Mail,
    color: {
      primary: 'from-emerald-500 to-teal-500',
      background: 'bg-emerald-50',
      text: 'text-emerald-700'
    },
    trend: {
      direction: 'up',
      percentage: 340,
      period: 'campaign success rate'
    }
  },
  {
    id: 'views-generated',
    value: 42000000,
    displayValue: '42M',
    label: 'Views Generated',
    description: 'Total social media impressions across all hotel campaigns',
    icon: Eye,
    color: {
      primary: 'from-purple-500 to-violet-500',
      background: 'bg-purple-50',
      text: 'text-purple-700'
    },
    trend: {
      direction: 'up',
      percentage: 275,
      period: 'engagement boost'
    }
  }
];

/**
 * Case studies for additional social proof
 */
const caseStudies: CaseStudy[] = [
  {
    id: 'luxury-resort',
    hotelName: 'Luxury Mountain Resort',
    type: 'Mountain Lodge',
    result: '340% ROI',
    metric: 'in 90 days',
    quote: 'Transformed our social presence completely',
    image: '/images/hotels/luxury-villa-with-pool.jpg'
  },
  {
    id: 'boutique-hotel',
    hotelName: 'Boutique City Hotel',
    type: 'Boutique Property',
    result: '2.4M Views',
    metric: 'first campaign',
    quote: 'Exceeded all our expectations',
    image: '/images/hotels/view-luxurious-hotel-interior-space.jpg'
  },
  {
    id: 'resort-chain',
    hotelName: 'International Resort Chain',
    type: 'Resort Portfolio',
    result: '500+ Hours',
    metric: 'saved monthly',
    quote: 'Game-changing automation',
    image: '/images/hotels/rooftop-sunset-city-view.jpg'
  }
];

/**
 * Props for ResultsSection component
 */
interface ResultsSectionProps {
  /** Custom class name */
  className?: string;
  /** Enable number animations */
  enableAnimations?: boolean;
}

/**
 * Animated number counter component
 */
interface AnimatedNumberProps {
  value: number;
  displayValue: string;
  duration?: number;
  enabled?: boolean;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ 
  value, 
  displayValue, 
  duration = 2000, 
  enabled = true 
}) => {
  const [currentValue, setCurrentValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!enabled || hasAnimated) return;

    setHasAnimated(true);
    const steps = 60;
    const increment = value / steps;
    const stepDuration = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCurrentValue(value);
        clearInterval(timer);
      } else {
        setCurrentValue(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [value, duration, enabled, hasAnimated]);

  return (
    <span className="tabular-nums">
      {enabled && currentValue < value 
        ? currentValue.toLocaleString() 
        : displayValue
      }
    </span>
  );
};

/**
 * Professional Results Section Component
 * 
 * Implements Ogilvy design principles:
 * - Lead with specific, credible numbers
 * - Use social proof and case studies
 * - Create emotional impact through visuals
 * - Build trust through transparency
 * - Focus on measurable outcomes
 * 
 * @example
 * <ResultsSection enableAnimations={true} />
 */
const ResultsSection: React.FC<ResultsSectionProps> = ({ 
  className, 
  enableAnimations = true 
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Section title animation
  const titleAnimation = useScrollAnimation({
    duration: 1,
    transform: { opacity: 1, y: 0 }
  });

  // Staggered metrics animation
  const metricsAnimation = useStaggerAnimation({
    duration: 0.8,
    transform: { opacity: 1, y: 0, scale: 1 }
  }, 0.2);

  // Case studies animation
  const studiesAnimation = useStaggerAnimation({
    duration: 0.6,
    transform: { opacity: 1, y: 0 }
  }, 0.15);

  // Intersection observer for number animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          console.log('📊 Results section visible - starting animations');
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className={cn(
        "section-padding bg-gradient-to-br from-primary-50 via-white to-secondary-50 relative overflow-hidden",
        className
      )}
      data-testid="results-section"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.1),transparent_50%)]" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div ref={titleAnimation.ref as any} className="text-center mb-16">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 rounded-full mb-8">
            <Award className="w-5 h-5 text-emerald-600" />
            <span className="text-emerald-800 font-semibold text-sm">
              Verified Results from Real Hotels
            </span>
          </div>

          {/* Main Headline */}
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-6 leading-tight">
            Results That 
            <span className="text-gradient-success block mt-2">
              Speak Volumes
            </span>
          </h2>

          {/* Subheadline */}
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Real metrics from hotels using our platform. 
            <span className="font-semibold text-gray-900">
              These aren't projections – they're actual results
            </span> achieved by properties just like yours.
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div 
          ref={metricsAnimation.ref as any}
          className="grid md:grid-cols-3 gap-8 mb-20"
        >
          {resultMetrics.map((metric) => {
            const Icon = metric.icon;
            
            return (
              <div
                key={metric.id}
                className="glass-card p-8 rounded-2xl text-center hover:bg-white/60 transition-all duration-500 group"
                data-testid={`metric-${metric.id}`}
              >
                {/* Icon */}
                <div className={cn(
                  "w-16 h-16 rounded-2xl bg-gradient-to-br mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300",
                  metric.color.primary
                )}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Metric Value */}
                <div className="mb-4">
                  <div className="text-5xl font-bold text-gray-900 mb-2">
                    <AnimatedNumber 
                      value={metric.value}
                      displayValue={metric.displayValue}
                      enabled={enableAnimations && isVisible}
                    />
                  </div>
                  <div className="text-lg font-semibold text-gray-700 mb-2">
                    {metric.label}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {metric.description}
                  </p>
                </div>

                {/* Trend Indicator */}
                <div className={cn(
                  "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold",
                  metric.color.background,
                  metric.color.text
                )}>
                  <TrendingUp className="w-4 h-4" />
                  <span>{metric.trend.percentage}% {metric.trend.period}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Case Studies */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Success Stories from Leading Hotels
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See how hotels across different segments achieve measurable results
            </p>
          </div>

          <div 
            ref={studiesAnimation.ref as any}
            className="grid lg:grid-cols-3 gap-8"
          >
            {caseStudies.map((study) => (
              <div
                key={study.id}
                className="glass-card rounded-2xl overflow-hidden hover:bg-white/60 transition-all duration-500 group"
                data-testid={`case-study-${study.id}`}
              >
                {/* Hotel Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={study.image}
                    alt={`${study.hotelName} - Success Story`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  
                  {/* Result Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                    <div className="text-lg font-bold text-gray-900">{study.result}</div>
                    <div className="text-xs text-gray-600">{study.metric}</div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <h4 className="text-xl font-bold text-gray-900 mb-1">
                      {study.hotelName}
                    </h4>
                    <p className="text-gray-600 text-sm">{study.type}</p>
                  </div>

                  <blockquote className="text-gray-700 italic mb-4">
                    "{study.quote}"
                  </blockquote>

                  <div className="flex items-center gap-2 text-sm text-emerald-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="font-semibold">Verified Result</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Statistics */}
        <div className="glass-card p-8 rounded-2xl text-center">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">350+</div>
              <div className="text-gray-600 font-medium">Hotels Served</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">42%</div>
              <div className="text-gray-600 font-medium">Email Open Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">2,400+</div>
              <div className="text-gray-600 font-medium">Vetted Creators</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">90 Days</div>
              <div className="text-gray-600 font-medium">Average ROI Time</div>
            </div>
          </div>
        </div>
      </div>


    </section>
  );
};

export { ResultsSection };
export type { ResultsSectionProps }; 