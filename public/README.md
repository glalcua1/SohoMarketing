# Public Assets Directory

This directory contains all static assets for the RateGain Soho marketing platform.

## 📁 Folder Structure

```
public/
├── images/
│   ├── heroes/          # Hero section background images
│   ├── hotels/          # Hotel and resort property images
│   ├── creators/        # Creator profile images and avatars
│   ├── icons/           # UI icons and illustrations
│   ├── logos/           # Brand logos and partner logos
│   └── testimonials/    # Testimonial images and screenshots
├── assets/              # Miscellaneous assets (documents, etc.)
└── favicons/           # Favicon and app icons
```

## 🖼️ Image Guidelines

### Heroes (`/images/heroes/`)
- **Purpose**: Full-width background images for hero sections
- **Dimensions**: 1920x1080px or higher
- **Format**: WebP preferred, fallback to JPG
- **Examples**:
  - `hero-beach-resort.webp` - Luxury beach resort view
  - `hero-mountain-lodge.webp` - Mountain lodge landscape
  - `hero-city-hotel.webp` - Urban hotel exterior

### Hotels (`/images/hotels/`)
- **Purpose**: Property showcase images
- **Dimensions**: 1200x800px (3:2 aspect ratio)
- **Format**: WebP with JPG fallback
- **Examples**:
  - `azure-bay-resort.webp` - Sample luxury resort
  - `mountain-peak-lodge.webp` - Mountain hotel
  - `urban-boutique-hotel.webp` - City boutique hotel

### Creators (`/images/creators/`)
- **Purpose**: Creator profile images and content screenshots
- **Dimensions**: 400x400px (square) for profiles
- **Format**: WebP with JPG fallback
- **Examples**:
  - `creator-emma-chen.webp` - Travel influencer
  - `creator-marcus-rivera.webp` - Resort lifestyle creator
  - `creator-sofia-kim.webp` - Hospitality content creator

### Icons (`/images/icons/`)
- **Purpose**: UI icons, illustrations, decorative elements
- **Dimensions**: SVG preferred, or 256x256px PNG
- **Format**: SVG, PNG with transparency
- **Examples**:
  - `check-circle.svg` - Success indicators
  - `hotel-building.svg` - Property type icons
  - `creator-network.svg` - Platform illustrations

### Logos (`/images/logos/`)
- **Purpose**: Brand logos, partner logos, client logos
- **Dimensions**: Vector (SVG) preferred
- **Format**: SVG primary, PNG fallback
- **Examples**:
  - `rategain-soho-logo.svg` - Main brand logo
  - `partner-marriott.svg` - Hotel chain logos
  - `client-testimonial-logos/` - Client brand logos

### Testimonials (`/images/testimonials/`)
- **Purpose**: Customer testimonial images, case study screenshots
- **Dimensions**: 600x400px for testimonial cards
- **Format**: WebP with JPG fallback
- **Examples**:
  - `testimonial-azure-bay.webp` - Hotel testimonial
  - `case-study-mountain-lodge.webp` - Success story image
  - `results-screenshot.webp` - Platform results

## 🔧 Technical Specifications

### Optimization Guidelines
- **WebP Format**: Primary format for all photos
- **Progressive JPEG**: Fallback for browsers without WebP support
- **SVG**: Vector graphics and simple illustrations
- **Compression**: Balance quality vs. file size (80-90% quality for photos)
- **Responsive Images**: Provide multiple sizes (480w, 768w, 1024w, 1920w)

### File Naming Convention
- Use kebab-case: `luxury-beach-resort.webp`
- Include size suffix for responsive: `hero-image-1920w.webp`
- Version numbers if needed: `logo-v2.svg`
- Descriptive names: `creator-profile-emma-chen.webp`

### SEO & Accessibility
- Meaningful file names for SEO
- Alt text will be handled in components
- Consistent naming helps with content management

## 🚀 Usage in Components

### Next.js Image Component
```tsx
import { LazyImage } from '@/components/ui/LazyImage';

<LazyImage
  src="/images/hotels/azure-bay-resort.webp"
  alt="Azure Bay Resort exterior view"
  width={1200}
  height={800}
  priority={false}
/>
```

### Background Images
```tsx
<div className="bg-cover bg-center" 
     style={{ backgroundImage: 'url(/images/heroes/hero-beach-resort.webp)' }}>
```

### Icon Usage
```tsx
<img src="/images/icons/check-circle.svg" 
     alt="Success" 
     className="w-6 h-6" />
```

## 📝 Content Strategy

### Hero Images
Focus on aspirational hospitality experiences:
- Luxury resort exteriors at golden hour
- Stunning natural landscapes with properties
- Modern hotel interiors with great lighting
- Lifestyle shots of guests enjoying amenities

### Creator Images
Authentic creator content that represents:
- Diverse creator demographics
- High-quality content production
- Hospitality and travel focus
- Professional presentation

### Hotel Showcases
Premium property imagery featuring:
- Exterior architecture and landscaping
- Interior design and amenities
- Unique selling points and experiences
- Seasonal variations and different times of day

## 🔄 Asset Management

### Regular Updates
- Replace placeholder images with real content
- Update seasonal content quarterly
- Refresh creator profiles based on campaigns
- Maintain brand consistency across all assets

### Performance Monitoring
- Monitor Core Web Vitals impact
- Use Next.js Image optimization
- Implement lazy loading for non-critical images
- Regular asset audits for unused files

## 📊 Analytics Integration

Track image performance:
- Loading times and user engagement
- Most viewed property images
- Creator profile click-through rates
- Hero image conversion impact

---

*Last updated: December 2024*
*Maintained by: RateGain Soho Development Team* 