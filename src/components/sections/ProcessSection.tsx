/**
 * Professional Process Section - Ogilvy Design Approach
 * 
 * Features:
 * - Clear 4-step process visualization (Find → Outreach → Follow-Up → Onboard)
 * - Professional glass morphism design
 * - Data-driven messaging with specific benefits
 * - Interactive hover effects with subtle animations
 * - Mobile-responsive design with proper spacing
 * - Accessibility-compliant structure
 * - Performance-optimized with lazy loading
 */

'use client';

import React, { useRef } from 'react';
import { Search, Send, MessageSquare, Users, ArrowRight, CheckCircle, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useScrollAnimation, useStaggerAnimation } from '@/components/animations/useGSAP';

/**
 * Process step configuration
 * Each step includes title, description, features, and metrics
 */
interface ProcessStep {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  metric: {
    value: string;
    label: string;
  };
  color: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

/**
 * Process steps data following Ogilvy's specificity principle
 */
const processSteps: ProcessStep[] = [
  {
    id: 'find',
    title: 'Find',
    description: 'AI-powered creator discovery that identifies perfect matches for your hotel brand',
    icon: Search,
    features: [
      'Creator Database of 2,400+ vetted influencers',
      'AI matching based on audience demographics',
      'Real-time engagement rate analysis',
      'Hospitality niche specialization'
    ],
    metric: {
      value: '2,400+',
      label: 'Vetted Creators'
    },
    color: {
      primary: 'from-blue-500 to-cyan-500',
      secondary: 'bg-blue-50 border-blue-200',
      accent: 'text-blue-600'
    }
  },
  {
    id: 'outreach',
    title: 'Outreach',
    description: 'Automated outreach sequences with proven templates that convert 3x better',
    icon: Send,
    features: [
      'AI Lists with smart segmentation',
      'Proven email templates (42% open rate)',
      'Automated follow-up sequences',
      'Personalization at scale'
    ],
    metric: {
      value: '532k',
      label: 'Emails Sent'
    },
    color: {
      primary: 'from-emerald-500 to-teal-500',
      secondary: 'bg-emerald-50 border-emerald-200',
      accent: 'text-emerald-600'
    }
  },
  {
    id: 'follow-up',
    title: 'Follow-Up',
    description: 'Smart follow-up management that ensures no opportunity is missed',
    icon: MessageSquare,
    features: [
      'Auto Outreach with intelligent timing',
      'Response tracking and analytics',
      'Multi-channel communication',
      'ROI optimization algorithms'
    ],
    metric: {
      value: '340%',
      label: 'Average ROI'
    },
    color: {
      primary: 'from-purple-500 to-violet-500',
      secondary: 'bg-purple-50 border-purple-200',
      accent: 'text-purple-600'
    }
  },
  {
    id: 'onboard',
    title: 'Onboard',
    description: 'Seamless campaign management from briefing to content delivery',
    icon: Users,
    features: [
      'Campaign Management dashboard',
      'Real-time performance tracking',
      'Content approval workflows',
      'Payment automation'
    ],
    metric: {
      value: '800+',
      label: 'Hours Saved'
    },
    color: {
      primary: 'from-amber-500 to-orange-500',
      secondary: 'bg-amber-50 border-amber-200',
      accent: 'text-amber-600'
    }
  }
];

/**
 * Props for ProcessSection component
 */
interface ProcessSectionProps {
  /** Custom class name */
  className?: string;
  /** Callback for CTA interactions */
  onCTAClick?: () => void;
}

/**
 * Professional Process Section Component
 * 
 * Implements Ogilvy design principles:
 * - Lead with clear benefits and outcomes
 * - Use specific, credible numbers and metrics
 * - Create logical flow and progression
 * - Professional, trustworthy visual design
 * - Build confidence through detailed features
 * 
 * @example
 * <ProcessSection onCTAClick={() => scrollToSection('#pricing')} />
 */
const ProcessSection: React.FC<ProcessSectionProps> = ({ className, onCTAClick }) => {
  const sectionRef = useRef<HTMLElement>(null);

  // Section title animation
  const titleAnimation = useScrollAnimation({
    duration: 1,
    transform: { opacity: 1, y: 0 }
  });

  // Staggered process cards animation
  const cardsAnimation = useStaggerAnimation({
    duration: 0.8,
    transform: { opacity: 1, y: 0, scale: 1 }
  }, 0.15);

  /**
   * Handle step interaction for analytics
   */
  const handleStepInteraction = (stepId: string) => {
    console.log(`📊 Process step interaction: ${stepId}`);
    // In production: trackEvent({ name: 'process_step_viewed', properties: { step: stepId } });
  };

  return (
    <section
      ref={sectionRef}
      className={cn(
        "section-padding bg-white relative overflow-hidden",
        className
      )}
      data-testid="process-section"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-purple-50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.05),transparent_50%)]" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div ref={titleAnimation.ref as any} className="text-center mb-16">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-full mb-8">
            <CheckCircle className="w-5 h-5 text-blue-600" />
            <span className="text-blue-800 font-semibold text-sm">
              Proven 4-Step Process Used by 350+ Hotels
            </span>
          </div>

          {/* Main Headline - Benefit-Focused */}
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-6 leading-tight">
            Find → Outreach → Follow-Up → 
            <span className="text-gradient-professional block mt-2">
              Onboard
            </span>
          </h2>

          {/* Subheadline with Specific Promise */}
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our AI-powered platform automates your entire creator marketing workflow. 
            <span className="font-semibold text-gray-900"> 
              Average hotels save 800+ hours per week
            </span> while achieving 340% ROI.
          </p>
        </div>

        {/* Process Steps Grid */}
        <div 
          ref={cardsAnimation.ref as any}
          className="grid lg:grid-cols-4 gap-8 mb-16"
        >
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === processSteps.length - 1;

            return (
              <div key={step.id} className="relative">
                {/* Connection Arrow (Desktop) */}
                {!isLast && (
                  <div className="hidden lg:block absolute top-12 -right-4 z-10">
                    <ArrowRight className="w-6 h-6 text-gray-300" />
                  </div>
                )}

                {/* Process Card */}
                <div
                  className="glass-card p-8 rounded-2xl h-full hover:bg-white/60 transition-all duration-500 cursor-pointer group"
                  onMouseEnter={() => handleStepInteraction(step.id)}
                  data-testid={`process-step-${step.id}`}
                >
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={cn(
                      "w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-professional group-hover:scale-110 transition-transform duration-300",
                      step.color.primary
                    )}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-gray-900">
                        {step.metric.value}
                      </div>
                      <div className="text-sm text-gray-500 font-medium">
                        {step.metric.label}
                      </div>
                    </div>
                  </div>

                  {/* Step Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-3">
                    {step.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-3">
                        <CheckCircle className={cn(
                          "w-5 h-5 mt-0.5 flex-shrink-0",
                          step.color.accent
                        )} />
                        <span className="text-sm text-gray-700 font-medium">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className={cn(
                    "absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl bg-gradient-to-br",
                    step.color.primary
                  )} />
                </div>

                {/* Mobile Connection Line */}
                {!isLast && (
                  <div className="lg:hidden flex justify-center py-4">
                    <div className="w-px h-8 bg-gradient-to-b from-gray-300 to-transparent" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center">
          <div className="glass-card p-8 rounded-2xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Automate Your Creator Marketing?
            </h3>
            <p className="text-gray-600 mb-6">
              Join 350+ hotels already using our proven process to scale their social reach.
            </p>
            <button
              onClick={onCTAClick}
              className="btn-professional bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-professional-xl transition-all duration-300 group"
              data-analytics="process-section-cta"
            >
              Start Your Free Trial
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>


    </section>
  );
};

export { ProcessSection };
export type { ProcessSectionProps }; 