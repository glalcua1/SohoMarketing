/**
 * Professional Navigation Header with Glass Morphism
 * 
 * Features:
 * - Glass morphism design with backdrop blur
 * - Modern Inter typography
 * - Smooth transitions and micro-interactions
 * - Professional logo integration
 * - Responsive mobile menu with glass effects
 * - Scroll-based background transitions
 * - Login | Sign up authentication buttons
 * - Analytics tracking for all interactions
 */

'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

import { trackEvent } from '@/lib/utils';

/**
 * Navigation link configuration
 */
interface NavLink {
  label: string;
  href: string;
  section: string;
}

const navigationLinks: NavLink[] = [
  { label: 'Features', href: '#features', section: 'features' },
  { label: 'How It Works', href: '#solution', section: 'solution' },
  { label: 'Results', href: '#results', section: 'results' },
  { label: 'Pricing', href: '#pricing', section: 'pricing' }
];

/**
 * Props for Navigation component
 */
interface NavigationProps {
  /** Whether navigation should start transparent */
  transparent?: boolean;
  /** Custom class name */
  className?: string;
}

/**
 * Professional Navigation Component
 * 
 * Implements modern glass morphism design with professional typography
 * and smooth interactions following current design trends.
 * 
 * @example
 * <Navigation transparent />
 */
const Navigation: React.FC<NavigationProps> = ({ 
  transparent = false, 
  className 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll detection for background transition
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /**
   * Handle navigation link click with smooth scrolling
   */
  const handleNavClick = (href: string, section: string) => {
    trackEvent({
      name: 'navigation_click',
      category: 'user_interaction',
      properties: {
        section,
        href,
        source: 'header'
      }
    });

    // Smooth scroll to section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }

    // Close mobile menu
    setIsMobileMenuOpen(false);
  };

  /**
   * Handle Login button click
   */
  const handleLoginClick = () => {
    trackEvent({
      name: 'nav_login_click',
      category: 'conversion',
      properties: {
        cta_type: 'header',
        action: 'login'
      }
    });

    // TODO: Navigate to login page
    console.log('Navigate to login');
  };

  /**
   * Handle Sign Up button click
   */
  const handleSignUpClick = () => {
    trackEvent({
      name: 'nav_signup_click',
      category: 'conversion',
      properties: {
        cta_type: 'header',
        action: 'signup'
      }
    });

    // Scroll to pricing section for now
    handleNavClick('#pricing', 'pricing');
  };

  /**
   * Toggle mobile menu
   */
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    
    trackEvent({
      name: 'mobile_menu_toggle',
      category: 'user_interaction',
      properties: {
        action: isMobileMenuOpen ? 'close' : 'open'
      }
    });
  };

  const shouldShowBackground = transparent ? isScrolled : true;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          shouldShowBackground 
            ? "bg-slate-900/95 backdrop-blur-xl border-b border-white/20 shadow-lg" 
            : "bg-slate-900/80 backdrop-blur-sm shadow-md",
          className
        )}
        data-testid="main-navigation"
      >
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 relative">
                <img 
                  src="/images/logos/rategain-soho-logo-white.svg"
                  alt="RateGain Soho"
                  className="w-full h-full object-contain drop-shadow-lg"
                />
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-display font-bold text-white drop-shadow-lg">
                  RateGain Soho
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav 
              className="hidden lg:flex items-center space-x-8"
              role="navigation"
            >
              {navigationLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href, link.section)}
                  className={cn(
                    "text-sm font-medium transition-all duration-300 relative group",
                    "text-white/90 hover:text-white",
                    "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2",
                    "rounded-md px-3 py-2"
                  )}
                  data-testid={`nav-${link.section}`}
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full bg-blue-400"></span>
                </button>
              ))}
            </nav>

            {/* Desktop Auth Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <button
                onClick={handleLoginClick}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300",
                  "text-white/90 hover:text-white hover:bg-white/10",
                  "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2",
                  "border border-white/20 hover:border-white/30"
                )}
                data-analytics="desktop-nav-login"
              >
                Login
              </button>
              <div className="w-px h-4 bg-white/20"></div>
              <Button
                variant="primary"
                size="md"
                onClick={handleSignUpClick}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="btn-professional shadow-professional bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                data-analytics="desktop-nav-signup"
              >
                Sign Up
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className={cn(
                "lg:hidden p-3 rounded-lg transition-all duration-300",
                "bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border border-white/20",
                "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2",
                "shadow-lg drop-shadow-lg"
              )}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              data-testid="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 drop-shadow-sm" />
              ) : (
                <Menu className="w-6 h-6 drop-shadow-sm" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden"
          data-testid="mobile-menu-overlay"
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="absolute top-20 right-0 left-0 mx-4">
            <nav className="bg-slate-900/95 backdrop-blur-xl border border-white/20 rounded-2xl p-6 space-y-4 shadow-2xl">
              
              {/* Mobile Navigation Links */}
              {navigationLinks.map((link, index) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href, link.section)}
                  className={cn(
                    "block w-full text-left px-4 py-3 rounded-lg",
                    "text-white font-medium transition-all duration-300",
                    "hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  )}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  data-testid={`mobile-nav-${link.section}`}
                >
                  {link.label}
                </button>
              ))}

              {/* Mobile Auth Buttons */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <button
                  onClick={handleLoginClick}
                  className={cn(
                    "w-full px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300",
                    "text-white/90 hover:text-white hover:bg-white/10",
                    "focus:outline-none focus:ring-2 focus:ring-blue-400",
                    "border border-white/20 hover:border-white/30"
                  )}
                  data-analytics="mobile-nav-login"
                >
                  Login
                </button>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleSignUpClick}
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                  className="w-full btn-professional bg-gradient-to-r from-blue-600 to-purple-600"
                  data-analytics="mobile-nav-signup"
                >
                  Sign Up Free
                </Button>
              </div>

              {/* Mobile Contact Info */}
              <div className="pt-4 border-t border-white/10 text-center">
                <p className="text-sm text-gray-400 mb-2">
                  Questions? We&apos;re here to help
                </p>
                <a 
                  href="mailto:hello@rategain.com"
                  className="text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors"
                >
                  hello@rategain.com
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Navigation Spacer */}
      <div className="h-20" data-testid="nav-spacer" />
    </>
  );
};

export { Navigation };
export type { NavigationProps }; 