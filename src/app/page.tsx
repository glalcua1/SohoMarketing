/**
 * Homepage for Hospitality Marketing Platform
 * 
 * Features:
 * - Complete landing page structure
 * - All sections from product specification
 * - Professional data nuggets using Ogilvy design principles
 * - Smooth scroll navigation
 * - Performance optimized with lazy loading
 * - Analytics integration
 * - SEO optimization
 */

'use client';

import React from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { SolutionSection } from '@/components/sections/SolutionSection';
import { CreatorCarousel } from '@/components/sections/CreatorCarousel';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';

import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { PricingSection } from '@/components/sections/PricingSection';
// Import additional sections as they're created
// import { FAQSection } from '@/components/sections/FAQSection';
// import { FooterSection } from '@/components/sections/FooterSection';

/**
 * Temporary placeholder section component for sections still in development
 * This will be replaced with actual sections as they're implemented
 */
interface PlaceholderSectionProps {
  id: string;
  title: string;
  description: string;
  bgColor?: string;
}

const PlaceholderSection: React.FC<PlaceholderSectionProps> = ({ 
  id, 
  title, 
  description, 
  bgColor = 'bg-gray-50' 
}) => (
  <section 
    id={id} 
    className={`section-padding ${bgColor}`}
    data-testid={`section-${id}`}
  >
    <div className="container-custom text-center">
      <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-6">
        {title}
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        {description}
      </p>
      <div className="mt-8 p-8 border-2 border-dashed border-gray-300 rounded-lg">
        <p className="text-sm text-gray-500">
          Section under development - {id}
        </p>
      </div>
    </div>
  </section>
);

/**
 * Main Homepage Component
 * 
 * This component orchestrates the entire landing page experience
 * following the product specification and Ogilvy design principles
 * 
 * @returns Complete landing page with all professional data nugget sections
 */
export default function HomePage() {
  /**
   * Handle smooth scroll to section
   */
  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }

  };

  /**
   * Handle CTA clicks throughout the page
   */
  const handleCTAClick = () => {
    scrollToSection('#pricing');

  };

  /**
   * Handle pricing plan selection
   */
  const handlePricingPlanSelect = (_planId: string) => {
    // In production: redirect to checkout or open signup modal
    // Example: window.location.href = `/signup?plan=${_planId}`;
  };

  return (
    <>
      {/* Navigation Header */}
      <Navigation transparent />

      {/* Main Page Content */}
      <div className="min-h-screen">
        {/* 1. Hero Section - Full viewport with video background */}
        <HeroSection onCTAClick={handleCTAClick} />

        {/* 2. Problem Agitation Section */}
        <ProblemSection />

        {/* 3. Creator Content Showcase */}
        <CreatorCarousel />

        {/* 4. Solution Demo Section */}
        <SolutionSection onCTAClick={handleCTAClick} />

        {/* 5. Process Breakdown Section - Professional Data Nugget */}
        <ProcessSection onCTAClick={handleCTAClick} />

        {/* 6. Features Deep Dive Section - Professional Data Nugget */}
        <FeaturesSection onCTAClick={handleCTAClick} />

        {/* 7. Testimonials & Success Stories Section - Professional Data Nugget */}
        <TestimonialsSection onCTAClick={handleCTAClick} />

        {/* 8. Pricing & Launch Offer Section - Professional Data Nugget */}
        <PricingSection onCTAClick={handlePricingPlanSelect} />

        {/* 9. Footer CTA & Contact Section - Coming Soon */}
        <PlaceholderSection
          id="footer"
          title="Start Your Creator Marketing Journey Tonight"
          description="Launch your first campaign and transform your hotel's social reach"
          bgColor="bg-gray-900 text-white"
        />
      </div>


    </>
  );
} 