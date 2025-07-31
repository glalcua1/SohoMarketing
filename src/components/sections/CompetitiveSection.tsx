/**
 * Professional Competitive Section - Ogilvy Design Approach
 * 
 * Features:
 * - Clear competitive positioning against generic databases
 * - Visual comparison tables and differentiators
 * - Quality-focused messaging with hospitality specialization
 * - Trust-building through specific advantages
 * - Professional design with compelling visuals
 * - Mobile-responsive comparison layouts
 * - Performance-optimized animations
 */

'use client';

import React, { useRef } from 'react';
import { 
  X, 
  CheckCircle, 
  Hotel, 
  Bot, 
  Shield, 
  TrendingUp,
  AlertTriangle,
  Star,
  Users,
  Award,
  type LucideIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useScrollAnimation, useStaggerAnimation } from '@/components/animations/useGSAP';

/**
 * Comparison point interface
 */
interface ComparisonPoint {
  id: string;
  category: string;
  feature: string;
  generic: {
    status: 'no' | 'limited' | 'poor';
    description: string;
  };
  hospitality: {
    status: 'yes' | 'excellent' | 'premium';
    description: string;
  };
}

/**
 * Key differentiator interface
 */
interface KeyDifferentiator {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  benefits: string[];
  metric: {
    value: string;
    label: string;
  };
  color: {
    primary: string;
    background: string;
    text: string;
  };
}

/**
 * Comparison data highlighting key differences
 */
const comparisonPoints: ComparisonPoint[] = [
  {
    id: 'creator-quality',
    category: 'Creator Quality',
    feature: 'Vetting Process',
    generic: {
      status: 'poor',
      description: 'API-scraped profiles, no verification'
    },
    hospitality: {
      status: 'excellent',
      description: 'Hand-vetted, hospitality-focused creators'
    }
  },
  {
    id: 'audience-relevance',
    category: 'Audience Targeting',
    feature: 'Travel Audience',
    generic: {
      status: 'limited',
      description: 'Generic demographics, mixed interests'
    },
    hospitality: {
      status: 'premium',
      description: '95% travel-focused audiences verified'
    }
  },
  {
    id: 'brand-safety',
    category: 'Brand Safety',
    feature: 'Content Monitoring',
    generic: {
      status: 'no',
      description: 'No brand safety protocols'
    },
    hospitality: {
      status: 'excellent',
      description: 'Continuous brand safety monitoring'
    }
  },
  {
    id: 'automation',
    category: 'Automation',
    feature: 'Campaign Management',
    generic: {
      status: 'limited',
      description: 'Basic contact information only'
    },
    hospitality: {
      status: 'premium',
      description: 'Full workflow automation end-to-end'
    }
  },
  {
    id: 'support',
    category: 'Support',
    feature: 'Industry Expertise',
    generic: {
      status: 'no',
      description: 'Generic customer support'
    },
    hospitality: {
      status: 'excellent',
      description: 'Dedicated hospitality marketing experts'
    }
  },
  {
    id: 'results',
    category: 'Results',
    feature: 'ROI Tracking',
    generic: {
      status: 'no',
      description: 'No performance tracking'
    },
    hospitality: {
      status: 'premium',
      description: 'Detailed ROI analytics & optimization'
    }
  }
];

/**
 * Key differentiators that set us apart
 */
const keyDifferentiators: KeyDifferentiator[] = [
  {
    id: 'hospitality-focus',
    title: 'Hospitality Focus',
    description: 'Built specifically for hotels, resorts, and hospitality brands',
    icon: Hotel,
    benefits: [
      'Travel-focused creator database',
      'Hotel-specific campaign templates',
      'Industry compliance standards',
      'Hospitality marketing expertise'
    ],
    metric: {
      value: '100%',
      label: 'Hospitality Specialized'
    },
    color: {
      primary: 'from-blue-500 to-cyan-500',
      background: 'bg-blue-50',
      text: 'text-blue-700'
    }
  },
  {
    id: 'ai-automation',
    title: 'AI Automation',
    description: 'Advanced AI handles the entire workflow from discovery to payment',
    icon: Bot,
    benefits: [
      'Intelligent creator matching',
      'Automated outreach sequences',
      'Smart follow-up management',
      'ROI optimization algorithms'
    ],
    metric: {
      value: '800+',
      label: 'Hours Saved Weekly'
    },
    color: {
      primary: 'from-emerald-500 to-teal-500',
      background: 'bg-emerald-50',
      text: 'text-emerald-700'
    }
  },
  {
    id: 'quality-assurance',
    title: 'Quality Assurance',
    description: 'Every creator is hand-vetted with continuous quality monitoring',
    icon: Shield,
    benefits: [
      'Manual verification process',
      'Engagement authenticity checks',
      'Brand safety monitoring',
      'Performance tracking'
    ],
    metric: {
      value: '2,400+',
      label: 'Vetted Creators'
    },
    color: {
      primary: 'from-purple-500 to-violet-500',
      background: 'bg-purple-50',
      text: 'text-purple-700'
    }
  },
  {
    id: 'proven-results',
    title: 'Proven Results',
    description: 'Measurable outcomes with 340% average ROI for hotel clients',
    icon: TrendingUp,
    benefits: [
      'Verified success metrics',
      'Case study documentation',
      'Performance benchmarking',
      'Continuous optimization'
    ],
    metric: {
      value: '340%',
      label: 'Average ROI'
    },
    color: {
      primary: 'from-amber-500 to-orange-500',
      background: 'bg-amber-50',
      text: 'text-amber-700'
    }
  }
];

/**
 * Props for CompetitiveSection component
 */
interface CompetitiveSectionProps {
  /** Custom class name */
  className?: string;
  /** Callback for CTA interactions */
  onCTAClick?: () => void;
}

/**
 * Professional Competitive Section Component
 * 
 * Implements Ogilvy design principles:
 * - Clear positioning against competition
 * - Specific, credible advantages
 * - Focus on quality over quantity
 * - Build trust through transparency
 * - Emphasize unique value proposition
 * 
 * @example
 * <CompetitiveSection onCTAClick={() => scrollToSection('#pricing')} />
 */
const CompetitiveSection: React.FC<CompetitiveSectionProps> = ({ className, onCTAClick }) => {
  const sectionRef = useRef<HTMLElement>(null);

  // Section title animation
  const titleAnimation = useScrollAnimation({
    duration: 1,
    transform: { opacity: 1, y: 0 }
  });

  // Comparison table animation
  const comparisonAnimation = useScrollAnimation({
    duration: 0.8,
    transform: { opacity: 1, y: 0 }
  });

  // Staggered differentiators animation
  const differentiatorsAnimation = useStaggerAnimation({
    duration: 0.6,
    transform: { opacity: 1, y: 0, scale: 1 }
  }, 0.15);

  /**
   * Get status icon for comparison points
   */
  const getStatusIcon = (status: string, isOurs: boolean) => {
    if (isOurs) {
      return <CheckCircle className="w-5 h-5 text-emerald-600" />;
    } else {
      switch (status) {
        case 'no':
          return <X className="w-5 h-5 text-red-500" />;
        case 'limited':
          return <AlertTriangle className="w-5 h-5 text-amber-500" />;
        case 'poor':
          return <X className="w-5 h-5 text-red-500" />;
        default:
          return <X className="w-5 h-5 text-red-500" />;
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      className={cn(
        "section-padding bg-gray-50 relative overflow-hidden",
        className
      )}
      data-testid="competitive-section"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-transparent to-blue-50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(75,85,99,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(59,130,246,0.05),transparent_50%)]" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div ref={titleAnimation.ref as any} className="text-center mb-16">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-50 to-blue-50 border border-red-200 rounded-full mb-8">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span className="text-red-800 font-semibold text-sm">
              Warning: Not All Creator Databases Are Equal
            </span>
          </div>

          {/* Main Headline */}
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-6 leading-tight">
            Not another irrelevant
            <span className="text-gradient-professional block mt-2">
              API-scraped database
            </span>
          </h2>

          {/* Subheadline */}
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            While others provide generic lists of random influencers, we deliver 
            <span className="font-semibold text-gray-900"> quality creators, hospitality focus, AI automation, made for hotels.</span>
          </p>
        </div>

        {/* Comparison Table */}
        <div ref={comparisonAnimation.ref as any} className="mb-20">
          <div className="glass-card rounded-2xl overflow-hidden max-w-5xl mx-auto">
            {/* Table Header */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <h3 className="text-lg font-bold mb-2">Feature</h3>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <X className="w-5 h-5 text-red-400" />
                    <h3 className="text-lg font-bold">Generic Databases</h3>
                  </div>
                  <p className="text-gray-400 text-sm">API-scraped, unvetted</p>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-lg font-bold">HospitalityReach</h3>
                  </div>
                  <p className="text-gray-400 text-sm">Hospitality-specialized</p>
                </div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {comparisonPoints.map((point, index) => (
                <div 
                  key={point.id} 
                  className={cn(
                    "grid grid-cols-3 gap-6 p-6 items-center",
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  )}
                  data-testid={`comparison-${point.id}`}
                >
                  {/* Feature */}
                  <div>
                    <div className="text-sm text-gray-500 font-medium mb-1">
                      {point.category}
                    </div>
                    <div className="font-semibold text-gray-900">
                      {point.feature}
                    </div>
                  </div>

                  {/* Generic Database */}
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      {getStatusIcon(point.generic.status, false)}
                    </div>
                    <p className="text-sm text-gray-600">
                      {point.generic.description}
                    </p>
                  </div>

                  {/* Our Solution */}
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      {getStatusIcon(point.hospitality.status, true)}
                    </div>
                    <p className="text-sm text-gray-900 font-medium">
                      {point.hospitality.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Differentiators */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              What Makes Us Different
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Four key advantages that deliver real results for hospitality brands
            </p>
          </div>

          <div 
            ref={differentiatorsAnimation.ref as any}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {keyDifferentiators.map((differentiator) => {
              const Icon = differentiator.icon;
              
              return (
                <div
                  key={differentiator.id}
                  className="glass-card p-6 rounded-2xl hover:bg-white/60 transition-all duration-500 group"
                  data-testid={`differentiator-${differentiator.id}`}
                >
                  {/* Icon & Metric */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={cn(
                      "w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center group-hover:scale-110 transition-transform duration-300",
                      differentiator.color.primary
                    )}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        {differentiator.metric.value}
                      </div>
                      <div className="text-xs text-gray-500 font-medium">
                        {differentiator.metric.label}
                      </div>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    {differentiator.title}
                  </h4>
                  
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {differentiator.description}
                  </p>

                  {/* Benefits */}
                  <div className="space-y-2">
                    {differentiator.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className={cn(
                          "w-4 h-4 mt-0.5 flex-shrink-0",
                          differentiator.color.text
                        )} />
                        <span className="text-xs text-gray-700">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Trust Section */}
        <div className="text-center">
          <div className="glass-card p-8 rounded-2xl max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              {/* Trust Metrics */}
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="font-bold text-gray-900">4.9/5 Rating</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  <span className="font-bold text-gray-900">350+ Hotels</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Award className="w-5 h-5 text-emerald-500" />
                  <span className="font-bold text-gray-900">340% Avg ROI</span>
                </div>
              </div>

              {/* CTA Content */}
              <div className="md:col-span-2">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Experience the Difference Quality Makes
                </h3>
                <p className="text-gray-600 mb-6">
                  See why 350+ hotels choose our specialized platform over generic databases
                </p>
                <button
                  onClick={onCTAClick}
                  className="btn-professional bg-gradient-to-r from-gray-900 to-gray-700 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-professional-xl transition-all duration-300"
                  data-analytics="competitive-section-cta"
                >
                  Start Free Trial - See the Quality
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>


    </section>
  );
};

export { CompetitiveSection };
export type { CompetitiveSectionProps }; 