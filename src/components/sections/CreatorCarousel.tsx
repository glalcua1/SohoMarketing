/**
 * Cinematic Creator Content Carousel
 * 
 * Features:
 * - Smooth continuous auto-flow animation showcasing all creators
 * - Advanced 3D perspective effects with cinematic lighting
 * - Dynamic stage lighting system with spotlights and ambient glow
 * - Professional 3D hover effects and transforms
 * - Seamless infinite loop with all creators visible
 * - Responsive design for all screen sizes
 * - Creator verification badges and engagement metrics
 * - GPU-accelerated animations for smooth 60fps performance
 * - Cinematic depth and spacing for immersive experience
 * - Pure auto-flow - no manual controls for clean UX
 */

'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Play, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/components/animations/useGSAP';
import { trackEvent } from '@/lib/utils';

/**
 * Creator content data structure
 */
interface CreatorContent {
  id: string;
  creator: {
    name: string;
    username: string;
    image: string;
    verified: boolean;
    followers: string;
  };
  content: {
    type: 'video' | 'image' | 'carousel';
    thumbnail: string;
    description: string;
    duration?: string;
  };
  engagement: {
    views: string;
    likes: string;
    comments: string;
    shares: string;
  };
  category: string;
  featured?: boolean;
}

/**
 * Creator content showcase data
 */
const creatorContent: CreatorContent[] = [
  {
    id: 'emma-luxury-suite',
    creator: {
      name: 'Emma Chen',
      username: '@emmachen',
      image: '/images/creators/girl-with-pink-hair-holding-smartphone-taking-selfie-restaurant.jpg',
      verified: true,
      followers: '85K'
    },
    content: {
      type: 'video',
      thumbnail: '/images/creators/girl-with-pink-hair-holding-smartphone-taking-selfie-restaurant.jpg',
      description: 'Luxury suite tour at Azure Bay Resort 🏨✨',
      duration: '0:45'
    },
    engagement: {
      views: '2.1M',
      likes: '156K',
      comments: '2.3K',
      shares: '892'
    },
    category: 'Hotel Review',
    featured: true
  },
  {
    id: 'marcus-pool-vibes',
    creator: {
      name: 'Marcus Rivera',
      username: '@marcusrivera',
      image: '/images/creators/handsome-young-bearded-boyfriend-pink-tshirt-shirt-pointing-finger-left-smiling-with-happy-charm.jpg',
      verified: true,
      followers: '120K'
    },
    content: {
      type: 'carousel',
      thumbnail: '/images/creators/handsome-young-bearded-boyfriend-pink-tshirt-shirt-pointing-finger-left-smiling-with-happy-charm.jpg',
      description: 'Pool day vibes at Mountain Peak Lodge 🏔️💙'
    },
    engagement: {
      views: '890K',
      likes: '67K',
      comments: '1.2K',
      shares: '445'
    },
    category: 'Lifestyle'
  },
  {
    id: 'sofia-content-creator',
    creator: {
      name: 'Sofia Kim',
      username: '@sofiakim',
      image: '/images/creators/portrait-content-creator.jpg',
      verified: true,
      followers: '95K'
    },
    content: {
      type: 'video',
      thumbnail: '/images/creators/portrait-content-creator.jpg',
      description: 'Fine dining experience review 🍽️⭐',
      duration: '1:23'
    },
    engagement: {
      views: '1.5M',
      likes: '98K',
      comments: '3.1K',
      shares: '567'
    },
    category: 'Food & Dining',
    featured: true
  },
  {
    id: 'alex-photographer',
    creator: {
      name: 'Alex Chen',
      username: '@alexchen',
      image: '/images/creators/world-photography-day-celebrated-by-middle-aged-man-taking-photos-with-camera-device.jpg',
      verified: true,
      followers: '156K'
    },
    content: {
      type: 'image',
      thumbnail: '/images/creators/world-photography-day-celebrated-by-middle-aged-man-taking-photos-with-camera-device.jpg',
      description: '5 luxury travel photography tips for hotels 📸🌅'
    },
    engagement: {
      views: '756K',
      likes: '42K',
      comments: '890',
      shares: '234'
    },
    category: 'Photography'
  },
  {
    id: 'maya-videographer',
    creator: {
      name: 'Maya Rodriguez',
      username: '@mayavideos',
      image: '/images/creators/view-3d-male-videographer.jpg',
      verified: true,
      followers: '89K'
    },
    content: {
      type: 'video',
      thumbnail: '/images/creators/view-3d-male-videographer.jpg',
      description: 'Behind-the-scenes hotel content creation 🎬🏨',
      duration: '2:15'
    },
    engagement: {
      views: '1.2M',
      likes: '87K',
      comments: '1.8K',
      shares: '423'
    },
    category: 'Videography'
  },
  {
    id: 'young-creator',
    creator: {
      name: 'Jamie Park',
      username: '@jamiepark',
      image: '/images/creators/portrait-young-person-celebrating-world-photography-day-with-camera-device.jpg',
      verified: true,
      followers: '112K'
    },
    content: {
      type: 'carousel',
      thumbnail: '/images/creators/portrait-young-person-celebrating-world-photography-day-with-camera-device.jpg',
      description: 'Gen Z hotel experience guide 📱✨'
    },
    engagement: {
      views: '987K',
      likes: '73K',
      comments: '2.1K',
      shares: '567'
    },
    category: 'Lifestyle',
    featured: true
  },
  {
    id: 'event-creator',
    creator: {
      name: 'David Chang',
      username: '@davidchangeats',
      image: '/images/creators/people-taking-part-high-protocol-event.jpg',
      verified: true,
      followers: '203K'
    },
    content: {
      type: 'video',
      thumbnail: '/images/creators/people-taking-part-high-protocol-event.jpg',
      description: 'Luxury event coverage at Grand Palazzo 🍾🎭',
      duration: '1:45'
    },
    engagement: {
      views: '1.8M',
      likes: '124K',
      comments: '3.5K',
      shares: '892'
    },
    category: 'Events',
    featured: true
  },
  {
    id: 'female-creator-2',
    creator: {
      name: 'Isabella Martinez',
      username: '@bellahospitality',
      image: '/images/creators/3862289.jpg',
      verified: true,
      followers: '178K'
    },
    content: {
      type: 'carousel',
      thumbnail: '/images/creators/3862289.jpg',
      description: 'Spa & wellness retreat showcase 🧘‍♀️💆‍♀️'
    },
    engagement: {
      views: '1.3M',
      likes: '95K',
      comments: '2.8K',
      shares: '634'
    },
    category: 'Wellness'
  }
];

/**
 * Props for CreatorCarousel component
 */
interface CreatorCarouselProps {
  /** Custom class name */
  className?: string;
  /** Animation duration for complete cycle in seconds */
  animationDuration?: number;
  /** Animation pause on hover */
  pauseOnHover?: boolean;
}

/**
 * Individual creator content card component
 */
interface ContentCardProps {
  content: CreatorContent;
  index?: number;
}

const ContentCard: React.FC<ContentCardProps> = ({ content, index = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);

  /**
   * Handle content card click
   */
  const handleClick = () => {
    trackEvent({
      name: 'creator_content_click',
      category: 'user_interaction',
      properties: {
        creator_name: content.creator.name,
        content_type: content.content.type,
        content_id: content.id,
        category: content.category
      }
    });
  };

  // Professional flowing transform - subtle 3D perspective
  const getTransform = () => {
    if (isHovered) {
      return 'rotateY(0deg) rotateX(-2deg) scale(1.05) translateZ(20px)';
    } else {
      // Subtle stagger effect based on index for depth
      const rotateY = -2 + (index % 3) * 2; // Slight rotation variance
      return `rotateY(${rotateY}deg) rotateX(1deg) scale(1) translateZ(0px)`;
    }
  };

  return (
    <div
      className={cn(
        "relative flex-shrink-0 w-80 h-72 cursor-pointer group",
        "transition-all duration-700 ease-out transform-gpu",
        "hover:z-30 z-20"
      )}
      style={{
        transformStyle: 'preserve-3d',
        transform: getTransform(),
        filter: isHovered ? 'brightness(1.1) contrast(1.1)' : 'brightness(1)',
        boxShadow: isHovered
          ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(59, 130, 246, 0.3)' 
          : '0 15px 35px -5px rgba(0, 0, 0, 0.3)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      data-testid={`content-card-${content.id}`}
    >
      {/* Cinematic Frame Container */}
      <div className="relative w-full h-full rounded-xl overflow-hidden 
                      bg-black shadow-2xl border border-gray-800/50">
        
        {/* Main Content Image/Video */}
        <div className="absolute inset-2 rounded-lg overflow-hidden">
          <img
            src={content.creator.image}
            alt={`${content.creator.name} content`}
            className="w-full h-full object-cover transition-transform duration-700
                       group-hover:scale-105"
          />
          
          {/* Cinematic Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
          
          {/* Play Button for Videos */}
          {content.content.type === 'video' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full 
                              flex items-center justify-center border border-white/30
                              group-hover:scale-110 transition-transform duration-300">
                <Play className="w-6 h-6 text-white ml-1" />
              </div>
            </div>
          )}
        </div>

        {/* Clean Creator Info - Bottom Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="backdrop-blur-md bg-black/30 rounded-lg p-3 border border-white/10">
            <div className="flex items-center gap-3">
              {/* Creator Avatar */}
              <div className="w-8 h-8 rounded-full overflow-hidden border border-white/30">
                <img
                  src={content.creator.image}
                  alt={content.creator.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Creator Name & Stats */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-white font-semibold text-sm">{content.creator.name}</h4>
                  {content.creator.verified && (
                    <CheckCircle className="w-3 h-3 text-blue-400" />
                  )}
                </div>
              </div>
              
              {/* Single Key Metric */}
              <div className="text-right">
                <div className="text-white text-xs font-bold">{content.engagement.views}</div>
                <div className="text-white/60 text-xs">views</div>
              </div>
            </div>
          </div>
        </div>

        {/* Cinematic Reflection Effect */}
        <div className="absolute -bottom-1 left-2 right-2 h-4 
                        bg-gradient-to-b from-black/20 to-transparent 
                        transform scale-y-[-1] opacity-30 blur-sm" />
      </div>

      {/* Cinematic Glow Effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br 
                      from-blue-500/20 via-purple-500/10 to-pink-500/20 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500 
                      blur-xl -z-10" />
    </div>
  );
};

/**
 * Creator Content Carousel Component
 * 
 * Professional showcase of creator content with smooth continuous flow animation
 * 
 * @example
 * <CreatorCarousel animationDuration={30} pauseOnHover={true} />
 */
const CreatorCarousel: React.FC<CreatorCarouselProps> = ({ 
  className, 
  animationDuration = 30,
  pauseOnHover = true
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Section animation
  const sectionAnimation = useScrollAnimation({
    duration: 1.0,
    transform: { opacity: 1, y: 0 }
  });

  // Create duplicated content for seamless infinite loop
  const allContent = [...creatorContent, ...creatorContent];

  /**
   * Handle mouse enter/leave for pause functionality
   */
  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) {
      setIsPaused(true);
    }
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) {
      setIsPaused(false);
    }
  }, [pauseOnHover]);

  return (
    <section
      className={cn(
        "section-padding bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden",
        className
      )}
      data-testid="creator-carousel-section"
    >
      {/* Cinematic Background */}
      <div className="absolute inset-0">
        {/* Ambient lighting */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-full blur-3xl" />
        
        {/* Theater-style gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/30" />
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div ref={sectionAnimation.ref as any} className="text-center mb-20">
          <h2 className="text-4xl lg:text-6xl font-display font-bold text-white mb-6">
            Real Creators.
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Real Results.
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            See how leading hospitality creators are already using our platform 
            to create <span className="font-semibold text-white">authentic, engaging content</span> that drives bookings.
          </p>
        </div>

        {/* Enhanced Cinematic Stage - Continuous Flow */}
        <div 
          className="relative min-h-[500px] mb-16 overflow-hidden" 
          style={{ perspective: '1500px' }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Cinematic Floor with Reflection */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/10 via-gray-900/5 to-transparent"
            style={{ 
              transform: 'rotateX(75deg) translateZ(-50px)',
              transformStyle: 'preserve-3d',
              transformOrigin: 'bottom'
            }}
          />
          
          {/* Cinematic Lighting - Top */}
          <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-full h-32 bg-gradient-to-b from-white/5 via-blue-500/5 to-transparent blur-xl" />
          
          {/* Continuous Flow Container */}
          <div
            ref={carouselRef}
            className="flex items-center gap-8 py-16"
            style={{ 
              perspective: '1500px',
              transformStyle: 'preserve-3d',
              width: `${(creatorContent.length * 2) * 400}px`, // Double width for seamless loop
              animation: isPaused ? 'none' : `slideFlow ${animationDuration}s linear infinite`,
            }}
            data-testid="carousel-container"
          >
            {allContent.map((content, index) => (
              <div
                key={`${content.id}-${Math.floor(index / creatorContent.length)}`}
                className="flex-shrink-0"
              >
                <ContentCard
                  content={content}
                  index={index}
                />
              </div>
            ))}
          </div>
          
          {/* Fade-out edges for seamless effect */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent z-40 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-900 via-slate-900/80 to-transparent z-40 pointer-events-none" />
          
          {/* Enhanced Cinematic Lighting System */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-16 bg-gradient-to-r from-transparent via-white/8 to-transparent blur-lg" />
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-24 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent" />
          
          {/* Side Rim Lighting */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-8 h-64 bg-gradient-to-r from-blue-500/10 to-transparent blur-md" />
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-8 h-64 bg-gradient-to-l from-purple-500/10 to-transparent blur-md" />
          
          {/* Spotlight Effects */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-white/3 via-blue-500/2 to-transparent blur-2xl opacity-50 rounded-full" />
        </div>

        {/* Flowing Animation Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3 px-6 py-3 rounded-full glass-card">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-white/70 text-sm font-medium">Live Creator Showcase</span>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </div>

        {/* Stats - Cinematic Style */}
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          <div className="text-center group">
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2 group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
              5.2M+
            </div>
            <div className="text-gray-400 font-medium">Total Views Generated</div>
          </div>
          <div className="text-center group">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
              340%
            </div>
            <div className="text-gray-400 font-medium">Average ROI Increase</div>
          </div>
          <div className="text-center group">
            <div className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent mb-2 group-hover:from-purple-400 group-hover:to-blue-400 transition-all duration-300">
              2,800+
            </div>
            <div className="text-gray-400 font-medium">Active Creator Partnerships</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { CreatorCarousel };
export type { CreatorCarouselProps }; 