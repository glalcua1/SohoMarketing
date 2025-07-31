/**
 * Professional Footer Component
 * 
 * Features:
 * - Ogilvy-inspired design: Clear, direct, credible
 * - Minimal but effective presentation
 * - Strong RateGain Soho branding
 * - Professional contact and legal information
 * - Responsive design for all devices
 */

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

/**
 * Footer component following Ogilvy principles:
 * 1. Clear and direct messaging
 * 2. Professional presentation
 * 3. Focus on credibility and trust
 * 4. Minimal but effective design
 * 5. Strong branding
 */
interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className={cn(
        "relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900",
        "border-t border-slate-700/50",
        className
      )}
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      
      <div className="container mx-auto px-6 lg:px-8">
        <div className="py-8 lg:py-10">
          {/* Main footer content */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            
            {/* Left: Brand and tagline */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
              {/* RateGain Soho Logo */}
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <Image
                    src="/images/logos/rategain-soho-logo-white.svg"
                    alt="RateGain Soho - Hotel Creator Marketing Platform"
                    width={140}
                    height={40}
                    className="h-8 w-auto"
                    priority
                  />
                </div>
              </div>
              
              {/* Ogilvy-inspired tagline: Clear, direct, credible */}
              <div className="border-l border-slate-600 pl-4 lg:pl-6">
                <p className="text-slate-300 text-sm font-medium leading-relaxed">
                  Trusted by 350+ hotels worldwide
                </p>
                <p className="text-slate-400 text-xs mt-1">
                  AI-powered creator marketing that delivers results
                </p>
              </div>
            </div>

            {/* Right: Professional contact and legal */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8 text-sm">
              
              {/* Contact - Professional but accessible */}
              <div className="text-slate-400">
                <span className="text-slate-300 font-medium">Support:</span>{' '}
                <a 
                  href="mailto:support@rategain.com" 
                  className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                  aria-label="Contact support via email"
                >
                  support@rategain.com
                </a>
              </div>
              
              {/* Legal links - Essential only */}
              <div className="flex items-center gap-4 text-slate-400">
                <a 
                  href="/privacy" 
                  className="hover:text-slate-300 transition-colors duration-200"
                  aria-label="Read our privacy policy"
                >
                  Privacy
                </a>
                <span className="text-slate-600">•</span>
                <a 
                  href="/terms" 
                  className="hover:text-slate-300 transition-colors duration-200"
                  aria-label="Read our terms of service"
                >
                  Terms
                </a>
              </div>
            </div>
          </div>

          {/* Bottom: Copyright and trust indicator */}
          <div className="pt-6 mt-6 border-t border-slate-700/50">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 text-xs text-slate-400">
              
              {/* Copyright */}
              <div className="flex items-center gap-2">
                <span>© {currentYear} RateGain Technologies.</span>
                <span className="text-slate-500">All rights reserved.</span>
              </div>
              
              {/* Trust indicator - Ogilvy principle: credibility */}
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" aria-hidden="true" />
                <span className="text-slate-500 font-medium">
                  Enterprise-grade security & compliance
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

/**
 * Export types for TypeScript support
 */
export type { FooterProps };