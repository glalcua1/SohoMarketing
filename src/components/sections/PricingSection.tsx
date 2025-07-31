/**
 * Professional Pricing Section - Ogilvy Design Approach
 * 
 * Features:
 * - Compelling launch offer with 70% lifetime discount
 * - Urgency and scarcity through limited beta access
 * - Clear value proposition and feature breakdown
 * - Social proof integration and risk reduction
 * - Professional pricing cards with visual hierarchy
 * - Mobile-responsive design with proper spacing
 * - Trust-building through guarantees and testimonials
 */

'use client';

import React, { useRef, useState, useEffect } from 'react';
import { 
  CheckCircle, 
  ArrowRight, 
  Clock, 
  Shield,
  Star,
  Users,
  Gift
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useScrollAnimation, useStaggerAnimation } from '@/components/animations/useGSAP';

/**
 * Pricing plan interface
 */
interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  billingPeriod: string;
  description: string;
  features: string[];
  guarantees: string[];
  popular: boolean;
  color: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

/**
 * Pricing plans with launch offer
 */
const pricingPlans: PricingPlan[] = [
  {
    id: 'professional',
    name: 'Professional',
    originalPrice: 299,
    discountedPrice: 89,
    discount: 70,
    billingPeriod: 'per month',
    description: 'Perfect for single properties and boutique hotels',
    features: [
      'Up to 50 creator campaigns per month',
      'AI creator matching and recommendations',
      'Proven outreach templates library',
      'Basic campaign management',
      'Email support',
      'Performance analytics dashboard'
    ],
    guarantees: [
      '14-day free trial',
      '30-day money-back guarantee',
      'Cancel anytime'
    ],
    popular: false,
    color: {
      primary: 'from-blue-500 to-cyan-500',
      secondary: 'bg-blue-50',
      accent: 'text-blue-600'
    }
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    badge: 'Most Popular',
    originalPrice: 699,
    discountedPrice: 209,
    discount: 70,
    billingPeriod: 'per month',
    description: 'Ideal for hotel chains and resort portfolios',
    features: [
      'Unlimited creator campaigns',
      'Advanced AI matching with custom filters',
      'Complete automation suite',
      'Multi-property management',
      'Dedicated account manager',
      'Priority support & training',
      'Custom integrations',
      'Advanced analytics & reporting'
    ],
    guarantees: [
      '14-day free trial',
      '60-day money-back guarantee',
      'White-glove onboarding'
    ],
    popular: true,
    color: {
      primary: 'from-purple-500 to-violet-500',
      secondary: 'bg-purple-50',
      accent: 'text-purple-600'
    }
  }
];

/**
 * Props for PricingSection component
 */
interface PricingSectionProps {
  /** Custom class name */
  className?: string;
  /** Callback for CTA interactions */
  onCTAClick?: (planId: string) => void;
}

/**
 * Countdown timer component for urgency
 */
interface CountdownTimerProps {
  targetDate: Date;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex items-center justify-center gap-4">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="text-center">
          <div className="bg-white rounded-lg p-3 min-w-[60px] shadow-professional">
            <div className="text-2xl font-bold text-gray-900">{value}</div>
            <div className="text-xs text-gray-500 uppercase">{unit}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

/**
 * Professional Pricing Section Component
 * 
 * Implements Ogilvy design principles:
 * - Create urgency through limited-time offers
 * - Use specific savings and value propositions
 * - Reduce risk through guarantees
 * - Build trust through social proof
 * - Focus on outcomes and benefits
 * 
 * @example
 * <PricingSection onCTAClick={(planId) => handleSignup(planId)} />
 */
const PricingSection: React.FC<PricingSectionProps> = ({ className, onCTAClick }) => {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Calculate launch deadline (30 days from now for demo)
  const launchDeadline = new Date();
  launchDeadline.setDate(launchDeadline.getDate() + 30);

  // Section title animation
  const titleAnimation = useScrollAnimation({
    duration: 1,
    transform: { opacity: 1, y: 0 }
  });

  // Pricing cards animation
  const cardsAnimation = useStaggerAnimation({
    duration: 0.8,
    transform: { opacity: 1, y: 0, scale: 1 }
  }, 0.2);

  /**
   * Handle plan selection
   */
  const handlePlanSelect = (planId: string) => {
    console.log(`💳 Plan selected: ${planId}`);
    if (onCTAClick) {
      onCTAClick(planId);
    }
    // In production: trackEvent({ name: 'pricing_plan_selected', properties: { plan: planId } });
  };

  return (
    <section
      ref={sectionRef}
      className={cn(
        "section-padding bg-gradient-to-br from-secondary-50 to-primary-50 relative overflow-hidden",
        className
      )}
      data-testid="pricing-section"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(147,51,234,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(59,130,246,0.1),transparent_50%)]" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div ref={titleAnimation.ref as any} className="text-center mb-16">
          {/* Urgency Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-full mb-8">
            <Clock className="w-5 h-5 text-red-600" />
            <span className="text-red-800 font-semibold text-sm">
              ⚡ Limited Time: First 100 Hotels Only
            </span>
          </div>

          {/* Main Headline */}
          <h2 className="text-4xl lg:text-6xl font-display font-bold text-gray-900 mb-6 leading-tight">
            Don't Miss the
            <span className="text-gradient-professional block mt-2">
              Launch!
            </span>
          </h2>

          {/* Subheadline with Value Proposition */}
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            Be among the first 100 hotels to get 
            <span className="font-bold text-red-600"> lifetime 70% discount + exclusive beta access.</span>
            <br />
            This offer expires when we reach 100 founding members.
          </p>

          {/* Countdown Timer */}
          <div className="mb-8">
            <div className="text-lg font-semibold text-gray-900 mb-4">
              Launch Pricing Ends In:
            </div>
            <CountdownTimer targetDate={launchDeadline} />
          </div>

          {/* Social Proof */}
          <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>73 hotels joined today</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>4.9/5 rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-500" />
              <span>60-day guarantee</span>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div 
          ref={cardsAnimation.ref as any}
          className="grid lg:grid-cols-2 gap-8 mb-20 max-w-4xl mx-auto"
        >
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "glass-card rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 relative",
                plan.popular 
                  ? "border-2 border-purple-200 shadow-professional-xl" 
                  : "border border-gray-200"
              )}
              data-testid={`pricing-plan-${plan.id}`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                    {plan.badge}
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {plan.description}
                  </p>

                  {/* Pricing */}
                  <div className="mb-6">
                    {/* Original Price (Crossed Out) */}
                    <div className="text-gray-500 text-lg line-through mb-2">
                      ${plan.originalPrice} {plan.billingPeriod}
                    </div>
                    
                    {/* Discounted Price */}
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-5xl font-bold text-gray-900">
                        ${plan.discountedPrice}
                      </span>
                      <span className="text-gray-600">
                        {plan.billingPeriod}
                      </span>
                    </div>
                    
                    {/* Discount Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-full text-sm font-semibold mt-4">
                      <Gift className="w-4 h-4" />
                      Save {plan.discount}% - Lifetime Price Lock
                    </div>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className={cn(
                        "w-5 h-5 mt-0.5 flex-shrink-0",
                        plan.color.accent
                      )} />
                      <span className="text-gray-700 font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handlePlanSelect(plan.id)}
                  className={cn(
                    "w-full btn-professional text-white px-8 py-4 rounded-xl font-semibold hover:shadow-professional-xl transition-all duration-300 group mb-6",
                    plan.popular
                      ? "bg-gradient-to-r from-purple-600 to-blue-600"
                      : "bg-gradient-to-r from-gray-800 to-gray-700"
                  )}
                  data-analytics={`pricing-cta-${plan.id}`}
                >
                  Start Free Trial - Lock in 70% Discount
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </button>

                {/* Guarantees */}
                <div className="space-y-2">
                  {plan.guarantees.map((guarantee, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <Shield className="w-4 h-4 text-emerald-500" />
                      <span>{guarantee}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


    </section>
  );
};

export { PricingSection };
export type { PricingSectionProps }; 