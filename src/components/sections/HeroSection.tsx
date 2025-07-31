/**
 * Professional Hero Section - Ogilvy Design Approach
 * 
 * Features:
 * - Research-driven messaging with clear benefits
 * - Credible social proof and specific metrics
 * - Professional glass morphism effects  
 * - Creator image gallery showcase
 * - Modern Inter typography
 * - Strategic CTA placement
 * - Performance-optimized animations
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Play, Star, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { useScrollAnimation, useParallax } from '@/components/animations/useGSAP';
import { trackEvent } from '@/lib/utils';

/**
 * Creator showcase data with real profile information
 */
interface CreatorProfile {
  id: string;
  name: string;
  followers: string;
  image: string;
  niche: string;
  verified: boolean;
}

const featuredCreators: CreatorProfile[] = [
  {
    id: 'emma',
    name: 'Emma Chen',
    followers: '85K',
    image: '/images/creators/girl-with-pink-hair-holding-smartphone-taking-selfie-restaurant.jpg',
    niche: 'Luxury Travel',
    verified: true
  },
  {
    id: 'marcus',
    name: 'Marcus Rivera', 
    followers: '120K',
    image: '/images/creators/handsome-young-bearded-boyfriend-pink-tshirt-shirt-pointing-finger-left-smiling-with-happy-charm.jpg',
    niche: 'Resort Life',
    verified: true
  },
  {
    id: 'sofia',
    name: 'Sofia Kim',
    followers: '95K',
    image: '/images/creators/portrait-content-creator.jpg',
    niche: 'Hospitality Pro',
    verified: true
  },
  {
    id: 'alex',
    name: 'Alex Chen',
    followers: '156K',
    image: '/images/creators/world-photography-day-celebrated-by-middle-aged-man-taking-photos-with-camera-device.jpg',
    niche: 'Travel Photography',
    verified: true
  },
  {
    id: 'maya',
    name: 'Maya Rodriguez',
    followers: '89K',
    image: '/images/creators/view-3d-male-videographer.jpg',
    niche: 'Video Content',
    verified: true
  },
  {
    id: 'jamie',
    name: 'Jamie Park',
    followers: '112K',
    image: '/images/creators/portrait-young-person-celebrating-world-photography-day-with-camera-device.jpg',
    niche: 'Gen Z Travel',
    verified: true
  }
];



/**
 * Props for HeroSection component
 */
interface HeroSectionProps {
  /** Custom class name */
  className?: string;
  /** Callback for CTA button click */
  onCTAClick?: () => void;
}

/**
 * Professional Hero Section Component
 * 
 * Implements Ogilvy design principles:
 * - Lead with benefits, not features
 * - Use specific, credible numbers
 * - Create emotional connection
 * - Professional, trustworthy design
 * 
 * @example
 * <HeroSection onCTAClick={() => scrollToSection('#pricing')} />
 */
const HeroSection: React.FC<HeroSectionProps> = ({ className, onCTAClick }) => {
  const [currentCreatorIndex, setCurrentCreatorIndex] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Parallax background effect
  const backgroundRef = useParallax({
    selector: '.hero-background',
    speed: -0.5,
    properties: {
      yPercent: -50
    }
  });

  // Main content animations
  const contentAnimation = useScrollAnimation({
    duration: 1.2,
    transform: { opacity: 1, y: 0 }
  });



  // Creator carousel auto-rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCreatorIndex((prev) => 
        (prev + 1) % featuredCreators.length
      );
    }, 3500); // Slightly faster rotation with more creators

    return () => clearInterval(interval);
  }, []);

  // Professional video loading with robust error handling
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let retryCount = 0;
    const maxRetries = 3;
    const retryDelay = 2000; // 2 seconds

    const attemptVideoLoad = async () => {
      try {
        console.log(`🎬 Video load attempt ${retryCount + 1}/${maxRetries}`);
        
        // Reset video state
        video.currentTime = 0;
        
        // Load the video
        video.load();
        
        // Wait for the video to be ready to play
        await new Promise((resolve, reject) => {
          const timeoutId = setTimeout(() => {
            reject(new Error('Video load timeout after 10 seconds'));
          }, 10000);

          const handleCanPlay = () => {
            clearTimeout(timeoutId);
            video.removeEventListener('canplay', handleCanPlay);
            video.removeEventListener('error', handleError);
            resolve(true);
          };

          const handleError = (_e: Event) => {
            clearTimeout(timeoutId);
            video.removeEventListener('canplay', handleCanPlay);
            video.removeEventListener('error', handleError);
            reject(new Error('Video failed to load'));
          };

          video.addEventListener('canplay', handleCanPlay);
          video.addEventListener('error', handleError);
        });

        // Try to play the video
        const playPromise = video.play();
        
        if (playPromise) {
          await playPromise;
          console.log('✅ Video playing successfully');
          setVideoLoaded(true);
          setVideoError(false);
        }

      } catch (error) {
        console.log(`⚠️ Video load attempt ${retryCount + 1} failed:`, error instanceof Error ? error.message : 'Unknown error');
        
        if (retryCount < maxRetries - 1) {
          retryCount++;
          setTimeout(attemptVideoLoad, retryDelay);
        } else {
          console.log('❌ Video loading failed after all retries, using fallback');
          setVideoError(true);
          setVideoLoaded(false);
          
          // Set up user interaction fallback
          const enableVideoOnInteraction = async () => {
            try {
              await video.play();
              console.log('✅ Video enabled after user interaction');
              setVideoLoaded(true);
              setVideoError(false);
              document.removeEventListener('click', enableVideoOnInteraction);
              document.removeEventListener('touchstart', enableVideoOnInteraction);
            } catch (e) {
              console.log('❌ Video failed even after user interaction');
            }
          };
          
          document.addEventListener('click', enableVideoOnInteraction, { once: true });
          document.addEventListener('touchstart', enableVideoOnInteraction, { once: true });
        }
      }
    };

    // Start the loading process
    attemptVideoLoad();

    // Cleanup function
    return () => {
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    };
  }, []);

  /**
   * Handle primary CTA click with analytics
   */
  const handlePrimaryCTA = () => {
    trackEvent({
      name: 'hero_primary_cta_click',
      category: 'conversion',
      properties: {
        section: 'hero',
        cta_type: 'primary',
        message: 'start_free_trial'
      }
    });

    if (onCTAClick) {
      onCTAClick();
    }
  };

  /**
   * Handle demo CTA click
   */
  const handleDemoCTA = () => {
    trackEvent({
      name: 'hero_demo_cta_click', 
      category: 'user_interaction',
      properties: {
        section: 'hero',
        cta_type: 'secondary',
        message: 'watch_demo'
      }
    });

    // In real app, open demo modal or navigate to demo
    console.log('📹 Demo requested');
  };

  /**
   * Handle video error events
   */
  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    const error = video.error;
    
    let errorMessage = 'Unknown error';
    if (error) {
      switch (error.code) {
        case error.MEDIA_ERR_ABORTED:
          errorMessage = 'Video loading aborted';
          break;
        case error.MEDIA_ERR_NETWORK:
          errorMessage = 'Network error while loading video';
          break;
        case error.MEDIA_ERR_DECODE:
          errorMessage = 'Video decode error';
          break;
        case error.MEDIA_ERR_SRC_NOT_SUPPORTED:
          errorMessage = 'Video format not supported';
          break;
      }
    }
    
    console.log('📹 Video error occurred:', errorMessage);
    setVideoError(true);
    setVideoLoaded(false);
  };

  const currentCreator = featuredCreators[currentCreatorIndex];

  return (
    <section
      className={cn(
        "relative min-h-[80vh] py-16 flex items-center justify-center overflow-hidden",
        "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900",
        className
      )}
      data-testid="hero-section"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0" style={{ zIndex: 0 }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          webkit-playsinline="true"
          x5-playsinline="true"
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-1000",
            videoLoaded && !videoError ? "opacity-100" : "opacity-0"
          )}
          style={{ 
            filter: 'brightness(0.6) contrast(1.1) saturate(1.1)',
            transform: 'translateZ(0)', // Hardware acceleration
            backfaceVisibility: 'hidden'
          }}
          data-testid="hero-video-background"
          onLoadedData={() => console.log('📊 Video data loaded')}
          onError={handleVideoError}
          onCanPlay={() => console.log('🎬 Video can play')}
          onPlay={() => console.log('▶️ Video playing')}
          onPause={() => console.log('⏸️ Video paused')}
          onStalled={() => console.log('⏹️ Video stalled')}
          onWaiting={() => console.log('⏳ Video waiting')}
          onTimeUpdate={() => {
            // Ensure video keeps playing if it gets stuck
            const video = videoRef.current;
            if (video && video.paused && !videoError) {
              video.play().catch(() => {
                // Silent fail - user interaction needed
              });
            }
          }}
        >
          {/* Optimized source order - MP4 first as it's more widely supported */}
          <source src="/0_Abstract_Background_3840x2160.mp4" type="video/mp4" />
          <source src="/0_Abstract_Background_3840x2160.mov" type="video/quicktime" />
          Your browser does not support the video tag.
        </video>
        
        {/* Enhanced Video Loading Indicator */}
        {!videoLoaded && !videoError && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="glass-dark rounded-xl p-6 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto mb-3"></div>
              <div className="text-white text-sm font-medium">Loading video background...</div>
              <div className="text-white/60 text-xs mt-1">This may take a moment</div>
            </div>
          </div>
        )}
        
        {/* Video Error State */}
        {videoError && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="glass-dark rounded-xl p-6 text-center max-w-sm">
              <div className="text-red-400 text-sm font-medium mb-2">
                📹 Video unavailable
              </div>
              <div className="text-white/80 text-xs mb-3">
                Using gradient background instead
              </div>
              <button 
                onClick={() => {
                  setVideoError(false);
                  setVideoLoaded(false);
                  // The useEffect will automatically retry
                }}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs text-white transition-colors"
              >
                🔄 Retry
              </button>
            </div>
          </div>
        )}
        
        {/* Video Overlay for Content Readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-purple-900/40 to-slate-900/60" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Animated Background (Fallback) */}
      <div 
        ref={backgroundRef.ref as any}
        className={cn(
          "absolute inset-0 z-0 transition-opacity duration-1000",
          videoLoaded && !videoError ? "opacity-10" : "opacity-40"
        )}
        data-testid="hero-background-fallback"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-blue-800/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.2),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(120,119,198,0.1),transparent_50%)]" />
      </div>

      {/* Glass Container */}
      <div className="container mx-auto px-6 lg:px-8 relative z-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content - Ogilvy-Style Messaging */}
          <div ref={contentAnimation.ref as any} className="space-professional-lg">
            
            {/* Trust Badge */}
            <div className="glass-card inline-flex items-center gap-3 px-6 py-3 rounded-full mb-8">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-100 font-medium">
                Trusted by 350+ Hotels Worldwide
              </span>
              <div className="flex -space-x-1 ml-2">
                {featuredCreators.slice(0, 3).map((creator, i) => (
                  <div 
                    key={i}
                    className="w-6 h-6 rounded-full border-2 border-white/30 overflow-hidden"
                    title={creator.name}
                  >
                    <img 
                      src={creator.image}
                      alt={creator.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                <div className="w-6 h-6 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">+</span>
                </div>
              </div>
            </div>

            {/* Headline - Benefit-Focused */}
            <h1 className="text-5xl lg:text-7xl font-display font-bold text-white leading-[1.1] mb-8">
              Stop Scrolling.
              <br />
              <span className="text-gradient-professional">
                Start Scaling.
              </span>
            </h1>

            {/* Subheadline - Specific Promise */}
            <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed mb-8 max-w-lg">
              Get <span className="font-semibold text-white">2,400+ vetted creators</span> to 
              promote your hotel while you focus on guests. 
              <span className="text-emerald-300 font-semibold"> 
                Average 340% ROI in 90 days.
              </span>
            </p>

            {/* Key Benefits List */}
            <div className="space-y-4 mb-10">
              {[
                'AI finds perfect creator matches in minutes',
                'Automated outreach & follow-up sequences', 
                'Turn-key campaign management & reporting'
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="glass rounded-full p-1">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="text-gray-300 font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button
                variant="primary"
                size="xl"
                onClick={handlePrimaryCTA}
                rightIcon={<ArrowRight className="w-5 h-5" />}
                className="btn-professional shadow-professional-xl text-lg px-8 py-4"
                data-analytics="hero-primary-cta"
              >
                Start Free 14-Day Trial
              </Button>
              
              <Button
                variant="outline"
                size="xl"
                onClick={handleDemoCTA}
                leftIcon={<Play className="w-5 h-5" />}
                className="glass-card text-white border-white/30 hover:bg-white/10 px-8 py-4"
                data-analytics="hero-demo-cta"
              >
                Watch 3-Min Demo
              </Button>
            </div>


          </div>

          {/* Right Content - Creator Showcase */}
          <div className="relative">
            
            {/* Main Creator Card */}
            <div className="glass-card p-8 rounded-2xl max-w-md mx-auto">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Featured Creator
                </h3>
                <p className="text-gray-400">
                  Real partnerships, real results
                </p>
              </div>

              {/* Creator Profile */}
              <div className="creator-image-frame mb-6">
                <img
                  src={currentCreator?.image || '/images/creators/portrait-content-creator.jpg'}
                  alt={`${currentCreator?.name || 'Creator'} - ${currentCreator?.niche || 'Content'} creator`}
                  className="w-full h-64 object-cover rounded-xl transition-all duration-500"
                  loading="eager"
                />
                {/* Image Overlay for Better Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl pointer-events-none" />
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <h4 className="text-xl font-bold text-white">
                    {currentCreator?.name || 'Creator'}
                  </h4>
                  {currentCreator?.verified && (
                    <CheckCircle className="w-5 h-5 text-blue-400" />
                  )}
                </div>
                
                <p className="text-gray-400 mb-3">
                  {currentCreator?.followers || '0'} followers • {currentCreator?.niche || 'Content'}
                </p>

                <div className="glass inline-flex items-center gap-2 px-4 py-2 rounded-full">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-white font-medium">
                    4.9 Partnership Rating
                  </span>
                </div>
              </div>
            </div>

            {/* Clean Auto-Running Creator Display - No Navigation Controls */}

            {/* Floating Stats */}
            <div className="absolute top-4 -left-4 glass-dark p-4 rounded-xl">
              <div className="text-emerald-400 text-sm font-semibold">
                ↗ 340% ROI
              </div>
              <div className="text-white text-xs">
                Average Campaign
              </div>
            </div>

            <div className="absolute bottom-4 -right-4 glass-dark p-4 rounded-xl">
              <div className="text-blue-400 text-sm font-semibold">
                2.4M+ Views
              </div>
              <div className="text-white text-xs">
                Last 30 Days
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/5 to-transparent" />


    </section>
  );
};

export { HeroSection };
export type { HeroSectionProps }; 