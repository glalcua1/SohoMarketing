/**
 * Root Layout for Hospitality Marketing Platform
 * 
 * Features:
 * - Next.js 14 App Directory structure
 * - SEO-optimized metadata
 * - Google Fonts integration
 * - Analytics setup with Vercel Analytics
 * - Global CSS and providers
 * - Accessibility and performance optimizations
 */

import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { cn } from '@/lib/utils';
import Footer from '@/components/layout/Footer';
import '@/styles/globals.css';

/**
 * SEO Metadata Configuration
 * Optimized for hospitality marketing and creator collaboration
 */
export const metadata: Metadata = {
  title: {
    default: 'RateGain Soho - Hotel Creator Marketing on Auto-pilot',
    template: '%s | RateGain Soho',
  },
  description: 'Transform your hotel\'s social reach with AI-powered creator marketing. Find and outreach viral creators in hospitality. Join 350+ hotels generating 42M+ views.',
  keywords: [
    'hotel marketing',
    'influencer marketing',
    'creator marketing',
    'hospitality marketing',
    'social media marketing',
    'hotel influencers',
    'travel creators',
    'hospitality automation',
    'AI marketing',
    'creator outreach'
  ],
  authors: [{ name: 'RateGain Soho Team' }],
  creator: 'RateGain Soho',
  publisher: 'RateGain Soho',
  
  // Open Graph metadata for social sharing
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rategain.com/soho',
    siteName: 'RateGain Soho',
    title: 'RateGain Soho - Hotel Creator Marketing on Auto-pilot',
    description: 'Transform your hotel\'s social reach with AI-powered creator marketing. Join 350+ hotels generating 42M+ views.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'RateGain Soho - Hotel Creator Marketing Platform',
      },
    ],
  },
  
  // Twitter Card metadata
  twitter: {
    card: 'summary_large_image',
    title: 'RateGain Soho - Hotel Creator Marketing on Auto-pilot',
    description: 'Transform your hotel\'s social reach with AI-powered creator marketing.',
    images: ['/twitter-image.jpg'],
    creator: '@rategain',
  },
  
  // Additional metadata
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Verification tags for search engines
  verification: {
    google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
  
  // Alternate language versions
  alternates: {
    canonical: 'https://rategain.com/soho',
    languages: {
      'en-US': 'https://rategain.com/soho',
      // 'es': 'https://rategain.com/soho/es',
      // 'fr': 'https://rategain.com/soho/fr',
    },
  },
  
  // Category for app stores
  category: 'business',
  
  // Additional metadata
  other: {
    'price:amount': '97',
    'price:currency': 'USD',
  },
};

/**
 * Viewport Configuration
 * Optimized for responsive design and performance
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f0f23' },
  ],
  colorScheme: 'light dark',
};

/**
 * Root Layout Props
 */
interface RootLayoutProps {
  children: React.ReactNode;
}



/**
 * Global Providers Component
 * Wraps the application with necessary context providers
 */
interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  // In a real application, you might have theme providers,
  // authentication context, etc. here
  return (
    <>
      {children}
    </>
  );
};

/**
 * Root Layout Component
 * 
 * Features:
 * - Font optimization with Google Fonts
 * - SEO-friendly HTML structure
 * - Analytics integration
 * - Performance monitoring
 * - Accessibility improvements
 * 
 * @param children - Page content to render
 */
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html 
      lang="en" 
      className="scroll-smooth"
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://vercel.live" />
        <link rel="dns-prefetch" href="https://vitals.vercel-analytics.com" />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Additional meta tags for performance */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-TileColor" content="#6366f1" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Structured data for rich snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
                      '@type': 'SoftwareApplication',
        name: 'RateGain Soho',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description: 'AI-powered creator marketing platform for hotels and hospitality businesses.',
        offers: {
          '@type': 'Offer',
          price: '97',
          priceCurrency: 'USD',
          description: 'Monthly subscription with 70% early bird discount',
        },
        provider: {
          '@type': 'Organization',
          name: 'RateGain Soho',
          url: 'https://rategain.com/soho',
        },
            }),
          }}
        />
      </head>
      
      <body
        className={cn(
          // Base font families
          "font-body antialiased",
          // Performance optimizations
          "gpu-accelerated",
          // Debug mode in development
          process.env.NODE_ENV === 'development' ? "debug-mode" : ""
        )}
        suppressHydrationWarning
      >
        <Providers>
          {/* Skip to content link for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only fixed top-4 left-4 z-50 
                       bg-primary-600 text-white px-4 py-2 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Skip to main content
          </a>

          {/* Main application content */}
          <main id="main-content" className="min-h-screen">
            {children}
          </main>

          {/* Professional Footer */}
          <Footer />



          {/* Analytics integration */}
          <Analytics />

          {/* Additional scripts for production */}
          {process.env.NODE_ENV === 'production' && (
            <>
              {/* Google Analytics or other analytics scripts would go here */}
              {/* Example: */}
              {/* <Script src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID" /> */}
            </>
          )}
        </Providers>

        {/* No-script fallback */}
        <noscript>
          <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
            <div className="text-center max-w-md p-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                JavaScript Required
              </h1>
              <p className="text-gray-600">
                RateGain Soho requires JavaScript to function properly. 
                Please enable JavaScript in your browser to access the full experience.
              </p>
            </div>
          </div>
        </noscript>
      </body>
    </html>
  );
} 