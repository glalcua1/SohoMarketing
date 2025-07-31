/**
 * Problem Agitation Section for Hospitality Marketing Platform
 * 
 * Features:
 * - Ogilvy-inspired problem-agitation approach
 * - Pain point visualization with red X icons
 * - Minimal Reality Check sections with monospace typography
 * - Smooth scroll animations
 * - Emotional and rational appeal
 * - Hospitality-specific challenges
 * - Progressive revelation design
 */

'use client';

import React from 'react';
import { X, DollarSign, Clock, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useScrollAnimation, useStaggerAnimation } from '@/components/animations/useGSAP';
import { trackEvent } from '@/lib/utils';

/**
 * Pain point data structure - Enhanced for Ogilvy principles
 */
interface PainPoint {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  impact: string;
  stats?: {
    value: string;
    label: string;
  };
  urgency?: string;
}

/**
 * Pain points specific to hotel marketing challenges
 * Enhanced with Ogilvy principles: specific numbers, emotional triggers, urgency
 */
const painPoints: PainPoint[] = [
  {
    id: 'scroll-brainrot',
    icon: <Clock className="w-6 h-6" />,
    title: 'Stop Wasting 60+ Hours Monthly on Manual Search',
    description: 'Your marketing team is drowning in endless creator research',
    impact: `73% of hotels abandon creator campaigns due to time complexity. That's 6-figure revenue losses every peak season.`,
    urgency: 'Every day you wait, competitors book your ideal creators'
  },
  {
    id: 'expensive-agencies',
    icon: <DollarSign className="w-6 h-6" />,
    title: 'End the $120K+ Annual Agency Trap',
    description: 'Cut bloated retainers that deliver generic, non-hospitality results',
    impact: 'Agencies charge luxury hotel rates but treat you like a generic lifestyle brand. Your ROI suffers.',
    urgency: 'Your CFO is questioning every marketing dollar'
  },
  {
    id: 'email-chaos',
    icon: <Mail className="w-6 h-6" />,
    title: 'Escape the 5% Response Rate Nightmare',
    description: 'Cold outreach is killing your campaign timeline',
    impact: 'Manual outreach takes 3-4 weeks with 95% of creators never responding. Peak seasons pass you by.',
    urgency: `Summer bookings don't wait for slow outreach`
  },
  {
    id: 'outdated-databases',
    icon: <X className="w-6 h-6" />,
    title: 'Ditch the 80% Dead Database Problem',
    description: 'Outdated creator lists are sabotaging your campaigns before they start',
    impact: 'Most databases are creator graveyards—inactive profiles, wrong niches, inflated follower counts.',
    urgency: 'Authentic creators are being snatched by competitors'
  }
];

/**
 * Props for ProblemSection component
 */
interface ProblemSectionProps {
  /** Custom class name */
  className?: string;
}

/**
 * Individual pain point component with animation
 */
interface PainPointCardProps {
  painPoint: PainPoint;
  index: number;
}

const PainPointCard: React.FC<PainPointCardProps> = ({ painPoint, index }) => {
  const cardAnimation = useScrollAnimation({
    duration: 0.8,
    delay: index * 0.15,
    transform: { opacity: 1, y: 0, scale: 1 }
  });

  /**
   * Handle pain point click for analytics
   */
  const handleClick = () => {
    trackEvent({
      name: 'pain_point_interaction',
      category: 'user_interaction',
      properties: {
        pain_point: painPoint.id,
        title: painPoint.title,
        section: 'problem_agitation'
      }
    });
  };

  return (
    <div
      ref={cardAnimation.ref as any}
      onClick={handleClick}
      className="relative group cursor-pointer h-full"
      data-testid={`pain-point-${painPoint.id}`}
    >
      {/* Main Card - Professional Glass Design */}
      <div className="h-full bg-white/95 backdrop-blur-sm rounded-2xl p-8 
                      shadow-professional border border-red-100/50
                      hover:shadow-professional-lg hover:border-red-200/70
                      transition-all duration-500 group-hover:-translate-y-2
                      hover:bg-white/98 relative overflow-hidden">
        
        {/* Gradient Background Accent */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 via-transparent to-red-50/30 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Header with Stats */}
        <div className="relative z-10 mb-6">
          {/* Statistics Display */}
          {painPoint.stats && (
            <div className="flex justify-end mb-4">
              <div className="text-right">
                <div className="text-3xl font-display font-bold text-red-600 leading-none">
                  {painPoint.stats.value}
                </div>
                <div className="text-xs text-gray-500 font-medium mt-1">
                  {painPoint.stats.label}
                </div>
              </div>
            </div>
          )}
          
          {/* Title - Ogilvy Style */}
          <h3 className="text-xl lg:text-2xl font-display font-bold text-gray-900 mb-3 
                         leading-tight group-hover:text-red-700 transition-colors duration-300">
            {painPoint.title}
          </h3>
          
          {/* Description */}
          <p className="text-gray-600 font-medium text-lg leading-relaxed">
            {painPoint.description}
          </p>
        </div>

        {/* Reality Check - Minimal Design */}
        <div className="relative z-10 mb-6">
          <div className="pl-4">
            <div className="text-xs font-mono font-semibold text-red-600 mb-2 uppercase tracking-wider">
              Reality Check
            </div>
            <p className="text-sm text-gray-600 leading-relaxed font-normal italic">
              {painPoint.impact}
            </p>
          </div>
        </div>

        {/* Urgency Indicator - Ogilvy Scarcity Principle */}
        {painPoint.urgency && (
          <div className="relative z-10">
            <div className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r 
                            from-red-500/10 to-orange-500/10 rounded-xl border border-red-200/50">
              <Clock className="w-4 h-4 text-red-600" />
              <p className="text-sm font-semibold text-red-700">
                {painPoint.urgency}
              </p>
            </div>
          </div>
        )}

        {/* Professional Hover Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/5 via-transparent to-red-600/5 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        {/* Subtle Border Glow on Hover */}
        <div className="absolute inset-0 rounded-2xl border-2 border-red-400/20 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </div>
  );
};

/**
 * Main Problem Section Component
 * 
 * Addresses pain points before presenting solution following Ogilvy methodology
 * 
 * @example
 * <ProblemSection />
 */
const ProblemSection: React.FC<ProblemSectionProps> = ({ className }) => {
  // Animation for the main headline
  const headlineAnimation = useScrollAnimation({
    duration: 1.0,
    transform: { opacity: 1, y: 0 }
  });

  // Staggered animation for pain points grid
  const gridAnimation = useStaggerAnimation({
    duration: 0.8,
    transform: { opacity: 1, y: 0 }
  }, 0.2);

  // Animation for the transition badge
  const badgeAnimation = useScrollAnimation({
    duration: 0.8,
    delay: 0.6,
    transform: { opacity: 1, scale: 1 }
  });

  return (
    <section
      className={cn(
        "section-padding bg-white relative overflow-hidden",
        className
      )}
      data-testid="problem-section"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-orange-100" />
      </div>

      <div className="container-custom relative z-10">
        {/* Main Headline */}
        <div className="text-center mb-16">
          <h2
            ref={headlineAnimation.ref as any}
            className="text-4xl lg:text-5xl xl:text-6xl font-display font-bold 
                       text-gray-900 mb-6 leading-tight"
            data-testid="problem-headline"
          >
            Your hunt for quality creators
            <br />
            <span className="text-red-600">ends here...</span>
          </h2>
          
          <p
            ref={headlineAnimation.ref as any}
            className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
            data-testid="problem-description"
          >
            Stop the endless cycle of frustration. These hospitality marketing 
            challenges are costing you <span className="font-bold text-red-600">millions in lost revenue</span> 
            every single peak season. <br/>
            <span className="font-semibold text-gray-800 mt-2 block">
              {"Here's exactly what's bleeding your marketing budget dry:"}
            </span>
          </p>
        </div>

        {/* Pain Points Grid - Enhanced Layout */}
        <div
          ref={gridAnimation.ref as any}
          className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8 mb-20"
          data-testid="pain-points-grid"
        >
          {painPoints.map((painPoint, index) => (
            <PainPointCard
              key={painPoint.id}
              painPoint={painPoint}
              index={index}
            />
          ))}
        </div>

        {/* Transition to Solution */}
        <div className="text-center">
          <div
            ref={badgeAnimation.ref as any}
            className="inline-flex items-center gap-3 px-8 py-4 
                       bg-gradient-to-r from-green-500 to-emerald-500 
                       rounded-full text-white font-bold text-lg shadow-lg
                       hover:from-green-600 hover:to-emerald-600 
                       transition-all duration-300 cursor-pointer
                       transform hover:scale-105"
            data-testid="easy-mode-badge"
            onClick={() => {
              trackEvent({
                name: 'easy_mode_click',
                category: 'user_interaction',
                properties: {
                  section: 'problem_to_solution',
                  action: 'transition_click'
                }
              });
            }}
          >
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-sm">✓</span>
            </div>
            <span>Easy Mode</span>
          </div>
          
          <p className="mt-4 text-gray-600 text-lg">
            There&apos;s a better way. Let us show you how...
          </p>
        </div>
      </div>
    </section>
  );
};

export { ProblemSection };
export type { ProblemSectionProps }; 