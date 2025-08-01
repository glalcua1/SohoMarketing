/**
 * Professional Features Section - Ogilvy Design Approach
 * 
 * Features:
 * - Compelling feature highlighting with clear benefits
 * - AI Creator Matching, Proven Templates, Creator Intelligence showcase
 * - Interactive feature cards with visual demonstrations
 * - Before/after comparisons and social proof
 * - Mobile-responsive design with proper spacing
 * - Performance-optimized animations and interactions
 * - Trust-building through specific capabilities
 */

'use client';

import React, { useRef, useState } from 'react';
import { 
  Brain, 
  FileText, 
  BarChart3, 
  CheckCircle,
  XCircle,
  TrendingUp,
  type LucideIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useScrollAnimation, useStaggerAnimation } from '@/components/animations/useGSAP';

/**
 * Feature configuration interface
 */
interface Feature {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  icon: LucideIcon;
  color: {
    primary: string;
    secondary: string;
    accent: string;
  };
  stats: {
    value: string;
    label: string;
  };
  beforeAfter: {
    before: string;
    after: string;
    improvement: string;
  };
}

/**
 * Main features following Ogilvy's benefit-focused approach
 */
const mainFeatures: Feature[] = [
  {
    id: 'ai-creator-matching',
    title: 'AI Creator Matching',
    description: 'Our AI analyzes 2,400+ creator profiles to find perfect matches for your hotel brand, audience, and budget',
    benefits: [
      'Audience demographic analysis and alignment',
      'Real-time engagement rate monitoring',
      'Hospitality niche specialization scoring',
      'Brand safety and reputation verification',
      'ROI prediction and optimization'
    ],
    icon: Brain,
    color: {
      primary: 'from-blue-500 to-cyan-500',
      secondary: 'bg-blue-50',
      accent: 'text-blue-600'
    },
    stats: {
      value: '95%',
      label: 'Match Accuracy'
    },
    beforeAfter: {
      before: 'Manual research: 40+ hours per campaign',
      after: 'AI matching: Perfect matches in 3 minutes',
      improvement: '800x faster'
    }
  },
  {
    id: 'proven-outreach-templates',
    title: 'Proven Outreach Templates',
    description: 'Battle-tested email templates with 42% open rates, 3x higher than industry average',
    benefits: [
      'Hospitality-optimized messaging',
      'A/B tested subject lines and content',
      'Personalization at scale technology',
      'Multi-language template library',
      'Automated follow-up sequences'
    ],
    icon: FileText,
    color: {
      primary: 'from-emerald-500 to-teal-500',
      secondary: 'bg-emerald-50',
      accent: 'text-emerald-600'
    },
    stats: {
      value: '42%',
      label: 'Open Rate'
    },
    beforeAfter: {
      before: 'Generic outreach: 14% response rate',
      after: 'Proven templates: 42% response rate',
      improvement: '3x better'
    }
  },
  {
    id: 'creator-intelligence',
    title: 'Creator Intelligence',
    description: 'Real-time analytics and insights on creator performance, audience quality, and campaign impact',
    benefits: [
      'Real-time performance tracking',
      'Audience quality scoring system',
      'Engagement authenticity verification',
      'Campaign ROI optimization',
      'Competitive analysis and benchmarking'
    ],
    icon: BarChart3,
    color: {
      primary: 'from-purple-500 to-violet-500',
      secondary: 'bg-purple-50',
      accent: 'text-purple-600'
    },
    stats: {
      value: '340%',
      label: 'Average ROI'
    },
    beforeAfter: {
      before: 'Blind campaigns: Unknown ROI',
      after: 'Data-driven decisions: 340% ROI',
      improvement: 'Full visibility'
    }
  }
];

/**
 * Props for FeaturesSection component
 */
interface FeaturesSectionProps {
  /** Custom class name */
  className?: string;
}

/**
 * Professional Features Section Component
 * 
 * Implements Ogilvy design principles:
 * - Lead with clear, specific benefits
 * - Use credible data and social proof
 * - Create desire through before/after comparisons
 * - Build trust through detailed capabilities
 * - Focus on outcomes, not just features
 * 
 * @example
 * <FeaturesSection />
 */
const FeaturesSection: React.FC<FeaturesSectionProps> = ({ className }) => {
  const [activeFeature, setActiveFeature] = useState<string>(mainFeatures[0]?.id || 'ai-matching');
  const sectionRef = useRef<HTMLElement>(null);

  // Section title animation
  const titleAnimation = useScrollAnimation({
    duration: 1,
    transform: { opacity: 1, y: 0 }
  });

  // Staggered feature cards animation
  const featuresAnimation = useStaggerAnimation({
    duration: 0.8,
    transform: { opacity: 1, y: 0, scale: 1 }
  }, 0.2);

  /**
   * Handle feature interaction for analytics and state
   */
  const handleFeatureInteraction = (featureId: string) => {
    setActiveFeature(featureId);
    console.log(`🎯 Feature interaction: ${featureId}`);
    // In production: trackEvent({ name: 'feature_viewed', properties: { feature: featureId } });
  };

  return (
    <section
      ref={sectionRef}
      className={cn(
        "section-padding bg-white relative overflow-hidden",
        className
      )}
      data-testid="features-section"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-transparent to-blue-50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(34,197,94,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(59,130,246,0.05),transparent_50%)]" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div ref={titleAnimation.ref as any} className="text-center mb-16">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 rounded-full mb-8">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <span className="text-emerald-800 font-semibold text-sm">
              Proven by 350+ Hotels Worldwide
            </span>
          </div>

          {/* Main Headline */}
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-6 leading-tight">
            We vetted millions of creators
            <span className="text-gradient-professional block mt-2">
              so you don't have to
            </span>
          </h2>

          {/* Subheadline */}
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Three game-changing capabilities that separate us from generic databases. 
            <span className="font-semibold text-gray-900">
              Each feature is designed specifically for hospitality marketing
            </span> and backed by real results.
          </p>
        </div>

        {/* Main Features Grid */}
        <div 
          ref={featuresAnimation.ref as any}
          className="grid lg:grid-cols-3 gap-8 mb-20"
        >
          {mainFeatures.map((feature) => {
            const Icon = feature.icon;
            const isActive = feature.id === activeFeature;

            return (
              <div
                key={feature.id}
                className={cn(
                  "glass-card p-8 rounded-2xl transition-all duration-500 cursor-pointer group h-full",
                  isActive 
                    ? "bg-white/80 border-2 border-blue-200 shadow-professional-lg" 
                    : "hover:bg-white/60"
                )}
                onClick={() => handleFeatureInteraction(feature.id)}
                onMouseEnter={() => handleFeatureInteraction(feature.id)}
                data-testid={`feature-${feature.id}`}
              >
                {/* Feature Header */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={cn(
                      "w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-professional group-hover:scale-110 transition-transform duration-300",
                      feature.color.primary
                    )}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Feature Stat */}
                    <div className="text-right">
                      <div className="text-3xl font-bold text-gray-900">
                        {feature.stats.value}
                      </div>
                      <div className="text-sm text-gray-500 font-medium">
                        {feature.stats.label}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Benefits List */}
                <div className="space-y-3 mb-6">
                  {feature.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className={cn(
                        "w-5 h-5 mt-0.5 flex-shrink-0",
                        feature.color.accent
                      )} />
                      <span className="text-sm text-gray-700 font-medium">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Before/After Comparison */}
                <div className={cn(
                  "p-4 rounded-xl border-l-4 transition-all duration-300",
                  feature.color.secondary,
                  isActive ? "border-l-blue-500" : "border-l-gray-300"
                )}>
                  <div className="text-xs text-gray-500 mb-2 uppercase tracking-wide font-semibold">
                    Before vs After
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2 text-red-600">
                      <XCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{feature.beforeAfter.before}</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-600">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{feature.beforeAfter.after}</span>
                    </div>
                    <div className="flex items-center gap-2 font-semibold text-gray-900">
                      <TrendingUp className="w-4 h-4 flex-shrink-0 text-blue-600" />
                      <span>{feature.beforeAfter.improvement}</span>
                    </div>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className={cn(
                  "absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl bg-gradient-to-br",
                  feature.color.primary
                )} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export { FeaturesSection };
export type { FeaturesSectionProps }; 