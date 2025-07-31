/**
 * Solution Demo Section for Hospitality Marketing Platform
 * 
 * Features:
 * - 3-step process visualization with auto-play functionality
 * - Interactive workflow cards with hover effects
 * - Live preview with creator profile cards (faces properly visible)
 * - Auto-play with progress indicator and manual controls
 * - Staggered animations with GSAP
 * - Performance metrics and social proof
 * - Mobile-optimized design with compact height
 */

'use client';

import React, { useState, useEffect } from 'react';
import { Building2, Search, Bot, ArrowRight, Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { useScrollAnimation } from '@/components/animations/useGSAP';
import { trackEvent, formatNumber } from '@/lib/utils';

/**
 * Solution step data structure
 */
interface SolutionStep {
  id: string;
  number: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string[];
  mockPreview: React.ReactNode;
  metrics?: {
    label: string;
    value: string;
  };
}

// Mock Creator Profile Component removed - using actual creator images instead

/**
 * Solution steps with interactive previews
 */
const solutionSteps: SolutionStep[] = [
  {
    id: 'tell-us-hotel',
    number: 1,
    icon: <Building2 className="w-8 h-8" />,
    title: 'Tell us about your hotel',
    description: 'Simple form interface',
    details: [
      'Describe your property type and style',
      'Target audience and demographics',
      'Campaign goals and budget range',
      'Content preferences and brand guidelines'
    ],
    mockPreview: (
      <div className="bg-gray-50 rounded-lg p-4 space-y-3">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Property Type</label>
          <div className="bg-white rounded border px-3 py-2 text-sm">
            Luxury Beach Resort
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Target Audience</label>
          <div className="bg-white rounded border px-3 py-2 text-sm">
            Affluent couples, 28-45, travel enthusiasts
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Campaign Goals</label>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
              Increase bookings
            </span>
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
              Brand awareness
            </span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'find-matches',
    number: 2,
    icon: <Search className="w-8 h-8" />,
    title: 'Find Creator Matches',
    description: '1,349 matches found • 156,000 profiles scanned',
    details: [
      'AI analyzes millions of creator profiles',
      'Filters by hospitality relevance and engagement',
      'Checks audience demographics alignment',
      'Verifies content quality and authenticity'
    ],
    mockPreview: (
      <div className="space-y-3">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-700">
            {formatNumber(1349)} matches found
          </span>
          <span className="text-xs text-gray-500">
            {formatNumber(156000)} profiles scanned
          </span>
        </div>
        <div className="creator-card mb-3 bg-white rounded-lg p-3 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
              <img 
                src="/images/creators/girl-with-pink-hair-holding-smartphone-taking-selfie-restaurant.jpg"
                alt="Emma Chen - Luxury Travel creator"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gray-900 text-sm">Emma Chen</div>
              <div className="text-xs text-gray-600">Luxury Travel • 45K followers</div>
              <div className="flex items-center mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                <span className="text-xs text-green-600 font-medium">98% match</span>
              </div>
            </div>
          </div>
        </div>
        <div className="creator-card mb-3 bg-white rounded-lg p-3 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
              <img 
                src="/images/creators/handsome-young-bearded-boyfriend-pink-tshirt-shirt-pointing-finger-left-smiling-with-happy-charm.jpg"
                alt="Marcus Rivera - Resort Life creator"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gray-900 text-sm">Marcus Rivera</div>
              <div className="text-xs text-gray-600">Resort Life • 32K followers</div>
              <div className="flex items-center mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                <span className="text-xs text-green-600 font-medium">95% match</span>
              </div>
            </div>
          </div>
        </div>
        <div className="creator-card mb-3 bg-white rounded-lg p-3 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
              <img 
                src="/images/creators/portrait-content-creator.jpg"
                alt="Sofia Kim - Hospitality creator"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gray-900 text-sm">Sofia Kim</div>
              <div className="text-xs text-gray-600">Hospitality • 28K followers</div>
              <div className="flex items-center mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                <span className="text-xs text-green-600 font-medium">92% match</span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center pt-2">
          <span className="text-xs text-gray-500">+ 1,346 more matches</span>
        </div>
      </div>
    ),
    metrics: {
      label: 'Match Quality Score',
      value: '94%'
    }
  },
  {
    id: 'ai-outreach',
    number: 3,
    icon: <Bot className="w-8 h-8" />,
    title: 'AI Agents email them for you',
    description: 'Until they\'re onboard',
    details: [
      'Personalized outreach emails that don\'t sound like ChatGPT',
      'Follow-up sequences with perfect timing',
      'Contract negotiation and rate optimization',
      'Onboarding and campaign management'
    ],
    mockPreview: (
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="border-b border-gray-100 pb-3 mb-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>To:</span>
            <span className="font-medium">emma.chen@email.com</span>
          </div>
          <div className="text-sm font-medium text-gray-900 mt-1">
            Partnership Opportunity - Azure Bay Resort
          </div>
        </div>
        <div className="text-sm text-gray-700 space-y-2">
          <p>Hi Emma,</p>
          <p>
            Given your experience showcasing luxury destinations and your 
            content focus on resort experiences, we believe you'd be a 
            perfect fit for our upcoming campaign.
          </p>
          <p>
            The campaign offers <span className="font-semibold">$500 per post</span> plus 
            a complimentary 3-night stay at our beachfront resort.
          </p>
          <p>Looking forward to working with you!</p>
          <p className="pt-2 text-gray-600">
            <span className="font-medium">Sarah Martinez</span><br />
            Partnership Manager, Azure Bay Resort
          </p>
        </div>
      </div>
    ),
    metrics: {
      label: 'Response Rate',
      value: '73%'
    }
  }
];

/**
 * Props for SolutionSection component
 */
interface SolutionSectionProps {
  /** Custom class name */
  className?: string;
  /** Callback for CTA button click */
  onCTAClick?: () => void;
}

/**
 * Individual solution step component
 */
interface SolutionStepCardProps {
  step: SolutionStep;
  index: number;
  isActive: boolean;
  onStepClick: (stepId: string) => void;
}

const SolutionStepCard: React.FC<SolutionStepCardProps> = ({ 
  step, 
  index, 
  isActive, 
  onStepClick 
}) => {
  const cardAnimation = useScrollAnimation({
    duration: 0.8,
    delay: index * 0.2,
    transform: { opacity: 1, y: 0 }
  });

  const handleClick = () => {
    onStepClick(step.id);
    trackEvent({
      name: 'solution_step_click',
      category: 'user_interaction',
      properties: {
        step_id: step.id,
        step_number: step.number,
        step_title: step.title
      }
    });
  };

  return (
    <div
      ref={cardAnimation.ref as any}
      onClick={handleClick}
      className={cn(
        "cursor-pointer transition-all duration-500 group",
        isActive 
          ? "glass-card border-2 border-blue-400/50 shadow-professional-lg scale-105" 
          : "glass-dark border border-white/20 hover:border-white/40 hover:shadow-professional"
      )}
      data-testid={`solution-step-${step.id}`}
    >
      <div className="p-8">
        {/* Step Number and Icon */}
        <div className="flex items-center space-x-6 mb-6">
          <div className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl transition-all duration-300",
            isActive 
              ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg" 
              : "bg-white/10 text-white group-hover:bg-white/20"
          )}>
            {step.number}
          </div>
          <div className={cn(
            "p-3 rounded-xl transition-all duration-300",
            isActive 
              ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300" 
              : "bg-white/10 text-gray-300 group-hover:bg-white/20 group-hover:text-white"
          )}>
            {step.icon}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h3 className={cn(
            "text-2xl font-bold transition-colors duration-300",
            isActive ? "text-white" : "text-gray-200 group-hover:text-white"
          )}>
            {step.title}
          </h3>
          
          <p className={cn(
            "text-lg font-medium leading-relaxed transition-colors duration-300",
            isActive ? "text-blue-100" : "text-gray-400 group-hover:text-gray-300"
          )}>
            {step.description}
          </p>

          {/* Metrics */}
          {step.metrics && (
            <div className={cn(
              "flex items-center space-x-3 pt-4",
              isActive ? "opacity-100" : "opacity-80"
            )}>
              <div className="w-3 h-3 bg-emerald-400 rounded-full shadow-sm"></div>
              <span className={cn(
                "text-sm font-medium transition-colors duration-300",
                isActive ? "text-emerald-200" : "text-gray-400 group-hover:text-gray-300"
              )}>
                {step.metrics.label}: <span className={cn(
                  "font-bold",
                  isActive ? "text-emerald-300" : "text-emerald-400"
                )}>
                  {step.metrics.value}
                </span>
              </span>
            </div>
          )}

          {/* Active Step Details */}
          {isActive && (
            <div className="mt-6 space-y-3 border-t border-white/20 pt-6">
              {step.details.map((detail, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-blue-100 leading-relaxed">{detail}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Main Solution Section Component
 * 
 * Demonstrates the 3-step solution process with interactive elements
 * 
 * @example
 * <SolutionSection onCTAClick={() => scrollToSection('#pricing')} />
 */
const SolutionSection: React.FC<SolutionSectionProps> = ({ 
  className, 
  onCTAClick 
}) => {
  const [activeStep, setActiveStep] = useState<string>('tell-us-hotel');
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [previewProgress, setPreviewProgress] = useState(0);

  // Find the active step data
  const activeStepData = solutionSteps.find(step => step.id === activeStep);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setPreviewProgress(prev => {
        if (prev >= 100) {
          // Move to next step
          const currentIndex = solutionSteps.findIndex(step => step.id === activeStep);
          const nextIndex = (currentIndex + 1) % solutionSteps.length;
          const nextStep = solutionSteps[nextIndex];
          if (nextStep) {
            setActiveStep(nextStep.id);
          }
          return 0;
        }
        return prev + 2; // 2% every 100ms = 5 seconds total
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isAutoPlay, activeStep]);

  // Reset progress when step changes manually
  useEffect(() => {
    setPreviewProgress(0);
  }, [activeStep]);

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay);
    setPreviewProgress(0);
    trackEvent({
      name: 'solution_autoplay_toggle',
      category: 'user_interaction',
      properties: {
        enabled: !isAutoPlay,
        active_step: activeStep
      }
    });
  };

  // Animations
  const headlineAnimation = useScrollAnimation({
    duration: 1.0,
    transform: { opacity: 1, y: 0 }
  });

  const previewAnimation = useScrollAnimation({
    duration: 0.8,
    delay: 0.4,
    transform: { opacity: 1, x: 0 }
  });

  const ctaAnimation = useScrollAnimation({
    duration: 0.8,
    delay: 0.6,
    transform: { opacity: 1, y: 0 }
  });

  const handleCTAClick = () => {
    trackEvent({
      name: 'solution_cta_click',
      category: 'conversion',
      properties: {
        section: 'solution_demo',
        active_step: activeStep
      }
    });

    if (onCTAClick) {
      onCTAClick();
    }
  };

  return (
    <section
      className={cn(
        "section-padding relative overflow-hidden",
        className
      )}
      data-testid="solution-section"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/traveling-with-off-road-car.jpg"
          alt="Adventure and exploration background"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.3) contrast(1.1) saturate(0.9)' }}
        />
        
        {/* Gradient Overlays for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-slate-900/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-slate-900/50" />
      </div>

      <div className="container-custom relative z-20 w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            ref={headlineAnimation.ref as any}
            className="text-4xl lg:text-5xl xl:text-6xl font-display font-bold 
                       text-white mb-6 leading-[1.1]"
            data-testid="solution-headline"
          >
            Stop Hunting Creators.<br />
            <span className="text-gradient-professional">Start Making Money.</span>
          </h2>
          
          <p
            ref={headlineAnimation.ref as any}
            className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-6 font-medium"
            data-testid="solution-description"
          >
            Transform 3 months of manual work into 
            <span className="text-yellow-400 font-bold"> 15 minutes of AI magic</span>
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-12">
          {/* Steps */}
          <div className="space-y-8">
            <div className="mb-8">
              <h3 className="text-3xl font-display font-bold text-white mb-4">
                Your Journey to Creator Success
              </h3>
              <p className="text-xl text-gray-300 leading-relaxed">
                Three simple steps. Massive results.
              </p>
            </div>
            
            {solutionSteps.map((step, index) => (
              <SolutionStepCard
                key={step.id}
                step={step}
                index={index}
                isActive={activeStep === step.id}
                onStepClick={setActiveStep}
              />
            ))}
          </div>

          {/* Preview Panel */}
          <div className="lg:sticky lg:top-8">
            <div
              ref={previewAnimation.ref as any}
              className="glass-card border border-white/20 shadow-professional-xl rounded-2xl overflow-hidden p-8"
              data-testid="solution-preview"
            >
              <div className="text-center mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-2xl font-bold text-white">
                    Live Preview
                  </h4>
                  <button
                    onClick={toggleAutoPlay}
                    className={cn(
                      "flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300",
                      "glass-dark border border-white/20 hover:border-white/40",
                      isAutoPlay ? "text-green-400" : "text-gray-300 hover:text-white"
                    )}
                  >
                    {isAutoPlay ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                    <span className="text-sm font-medium">
                      {isAutoPlay ? 'Pause' : 'Auto Play'}
                    </span>
                  </button>
                </div>
                
                <p className="text-gray-300 mb-4">
                  See exactly what happens in {activeStepData?.title}
                </p>
                
                {/* Progress indicator for auto-play */}
                {isAutoPlay && (
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-100"
                      style={{ width: `${previewProgress}%` }}
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-4 mb-8 p-4 glass-dark rounded-xl border border-white/10">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white shadow-lg">
                  {activeStepData?.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Step {activeStepData?.number}: {activeStepData?.title}
                  </h3>
                  <p className="text-gray-300">
                    {activeStepData?.description}
                  </p>
                </div>
              </div>

              <div className="glass-dark rounded-xl p-6 mb-8 border border-white/10">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full opacity-80"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full opacity-80"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full opacity-80"></div>
                    <div className="ml-4 text-sm text-gray-400 font-mono">
                      RateGain Soho Platform
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-400 font-medium">Live</span>
                  </div>
                </div>
                
                <div className="min-h-[300px] transition-all duration-500">
                  {activeStepData?.mockPreview}
                </div>
                
                {/* Interactive preview footer */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">
                      Step {activeStepData?.number} of {solutionSteps.length}
                    </span>
                    <div className="flex items-center space-x-2">
                      {solutionSteps.map((step) => (
                        <button
                          key={step.id}
                          onClick={() => setActiveStep(step.id)}
                          className={cn(
                            "w-2 h-2 rounded-full transition-all duration-300",
                            activeStep === step.id 
                              ? "bg-blue-400 scale-125" 
                              : "bg-gray-600 hover:bg-gray-500"
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {activeStepData?.metrics && (
                <div className="glass-card rounded-xl p-6 border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 to-blue-500/10">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white text-lg font-bold">✓</span>
                    </div>
                    <div>
                      <div className="font-semibold text-emerald-100 text-lg">
                        {activeStepData.metrics.label}
                      </div>
                      <div className="text-3xl font-bold text-white">
                        {activeStepData.metrics.value}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div
          ref={ctaAnimation.ref as any}
          className="text-center glass-card p-8 lg:p-12 rounded-2xl border border-white/20"
          data-testid="solution-cta"
        >
          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            Ready to Transform Your Marketing?
          </h3>
          <p className="text-lg lg:text-xl text-gray-300 mb-6 lg:mb-8 max-w-2xl mx-auto">
            Join 350+ hotels already using AI to find perfect creators
          </p>
          
          <Button
            variant="primary"
            size="xl"
            onClick={handleCTAClick}
            rightIcon={<ArrowRight className="w-6 h-6" />}
            data-analytics="solution-demo-cta"
            className="btn-professional shadow-professional-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-xl px-12 py-6"
          >
            Start Your First Campaign Free
          </Button>
          
          <div className="mt-8 flex flex-wrap justify-center items-center gap-6 lg:gap-8 text-gray-300">
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 bg-emerald-400 rounded-full"></div>
              <span className="font-medium text-sm lg:text-base">No Setup Fees</span>
            </span>
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
              <span className="font-medium text-sm lg:text-base">Cancel Anytime</span>
            </span>
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
              <span className="font-bold text-yellow-300 text-sm lg:text-base">70% Off Launch Pricing</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export { SolutionSection };
export type { SolutionSectionProps }; 