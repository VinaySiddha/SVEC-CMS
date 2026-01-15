// Department Images Optimization - Code Examples & Templates

/**
 * PATTERN 1: Gallery Images with Error Handling
 * Used in: CSE.tsx, CST.tsx, ECE.tsx, etc.
 */

// BEFORE (Unoptimized)
const GalleryBefore = () => {
  const galleryImages = ['url1.jpg', 'url2.jpg', 'url3.jpg'];
  
  return (
    <div className="grid grid-cols-2 gap-4">
      {galleryImages.map((imageUrl: string, i: number) => (
        <img
          key={i}
          src={imageUrl}
          alt={`Gallery Image ${i + 1}`}
          className="w-full rounded-lg shadow-md object-cover"
          style={{ height: '300px', width: '400px' }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
      ))}
    </div>
  );
};

// AFTER (Optimized with Next.js Image)
import Image from 'next/image';

const GalleryAfter = () => {
  const galleryImages = ['url1.jpg', 'url2.jpg', 'url3.jpg'];
  
  return (
    <div className="grid grid-cols-2 gap-4">
      {galleryImages.map((imageUrl: string, i: number) => (
        <Image
          key={i}
          src={imageUrl}
          alt={`Gallery Image ${i + 1}`}
          width={400}
          height={300}
          quality={85}
          className="rounded-lg shadow-md"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
      ))}
    </div>
  );
};

/**
 * PATTERN 2: Department Library Image
 * Used in: CSE.tsx, CST.tsx, MBA.tsx, etc.
 */

// BEFORE (Unoptimized)
const LibraryBefore = ({ libraryData }: any) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-8">
      <div className="md:w-1/2">
        {libraryData.image_url && (
          <img
            src={libraryData.image_url}
            alt="Department Library"
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        )}
      </div>
    </div>
  );
};

// AFTER (Optimized with Next.js Image)
const LibraryAfter = ({ libraryData }: any) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-8">
      <div className="md:w-1/2">
        {libraryData.image_url && (
          <Image
            src={libraryData.image_url}
            alt="Department Library"
            width={500}
            height={400}
            quality={85}
            className="rounded-lg shadow-md"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}
      </div>
    </div>
  );
};

/**
 * PATTERN 3: Multi-image Grid (Used in EEE with 50+ images)
 * Best for: Responsive gallery displays
 */

// BEFORE (Unoptimized)
const GridBefore = ({ images }: any) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {images.map((item: any, index: number) => (
        <img 
          key={index} 
          src={item.url} 
          alt={item.title}
          className="rounded-lg shadow-md w-full h-auto object-cover"
        />
      ))}
    </div>
  );
};

// AFTER (Optimized with Next.js Image)
const GridAfter = ({ images }: any) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {images.map((item: any, index: number) => (
        <Image
          key={index}
          src={item.url}
          alt={item.title}
          width={400}
          height={300}
          quality={85}
          className="rounded-lg shadow-md"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      ))}
    </div>
  );
};

/**
 * PATTERN 4: Priority Images (Above-the-fold)
 * Used for: First gallery image, hero section, important images
 */

// AFTER (With priority for faster loading)
const PriorityImageAfter = ({ imageUrl }: any) => {
  return (
    <Image
      src={imageUrl}
      alt="Featured Image"
      width={800}
      height={600}
      priority={true}  // ← Load immediately (don't lazy load)
      quality={90}     // ← Higher quality for important images
      sizes="100vw"
    />
  );
};

/**
 * PATTERN 5: Lazy Loading (Below-the-fold)
 * Used for: Gallery images after first fold, secondary images
 */

// AFTER (With lazy loading)
const LazyImageAfter = ({ imageUrl }: any) => {
  return (
    <Image
      src={imageUrl}
      alt="Gallery Image"
      width={400}
      height={300}
      loading="lazy"    // ← Don't load until needed
      quality={80}      // ← Lower quality for secondary images
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    />
  );
};

/**
 * PATTERN 6: External Images (srivasaviengg.ac.in domain)
 * Requirement: Add to next.config.js remotePatterns
 */

// Add this to next.config.js:
/*
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'srivasaviengg.ac.in',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};
*/

// Then use like normal:
const ExternalImageAfter = () => {
  const externalUrl = 'https://srivasaviengg.ac.in/images/departments/eee/lab.jpg';
  
  return (
    <Image
      src={externalUrl}
      alt="EEE Lab"
      width={600}
      height={400}
      quality={85}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    />
  );
};

/**
 * PATTERN 7: Dynamic Image with Fallback
 * Used for: Database images that might be missing
 */

// AFTER (With fallback handling)
const DynamicImageWithFallback = ({ imageUrl, fallbackUrl }: any) => {
  const [imageFailed, setImageFailed] = React.useState(false);
  
  return (
    <Image
      src={imageFailed ? fallbackUrl : imageUrl}
      alt="Department Photo"
      width={400}
      height={300}
      quality={85}
      onError={() => setImageFailed(true)}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    />
  );
};

/**
 * PATTERN 8: Full-page Fill Image (using fill prop)
 * Best for: Background images, hero sections where size varies
 */

// AFTER (Using fill for flexible sizing)
const FillImageAfter = ({ imageUrl }: any) => {
  return (
    <div className="relative w-full h-[300px]">
      <Image
        src={imageUrl}
        alt="Department Hero"
        fill
        quality={85}
        className="object-cover"
      />
    </div>
  );
};

/**
 * PATTERN 9: Responsive Images by Breakpoint
 * Used for: Different image sizes on mobile/tablet/desktop
 */

// AFTER (Truly responsive)
const ResponsiveImageAfter = ({ imageUrl }: any) => {
  return (
    <Image
      src={imageUrl}
      alt="Department Image"
      width={1200}
      height={600}
      quality={85}
      // Load appropriate size based on device width
      sizes="
        (max-width: 480px) 480px,
        (max-width: 768px) 768px,
        (max-width: 1024px) 1024px,
        1200px
      "
      className="w-full h-auto"
    />
  );
};

/**
 * PATTERN 10: Conditional Rendering with Image
 * Used for: Show image only if available, hide fallback
 */

// AFTER (Conditional with optimization)
const ConditionalImageAfter = ({ imageUrl }: any) => {
  return (
    <>
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="Department Photo"
          width={400}
          height={300}
          quality={85}
          className="rounded-lg shadow-md"
        />
      ) : (
        <div className="w-full h-[300px] bg-gray-200 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Image not available</p>
        </div>
      )}
    </>
  );
};

/**
 * BEST PRACTICES SUMMARY
 */

/*
1. ALWAYS include width and height props
2. Use quality={85} as default (80-90 recommended)
3. Add sizes for responsive loading
4. Use priority={true} only for above-fold images
5. Use loading="lazy" for below-fold images
6. Handle onError gracefully
7. Use className instead of inline styles
8. Test on mobile with slow 4G throttling
9. Monitor image load times in DevTools
10. Use WebP/AVIF when possible (Next.js handles automatically)

QUALITY SETTINGS:
- Hero/Important: quality={90}
- Primary Gallery: quality={85}
- Secondary: quality={80}
- Thumbnails: quality={75}

WIDTH/HEIGHT COMBOS:
- Full: 800x600
- Half: 400x300
- Small: 200x150
- 16:9: width x (width * 9/16)
- 4:3: width x (width * 3/4)
*/

export {
  GalleryAfter,
  LibraryAfter,
  GridAfter,
  PriorityImageAfter,
  LazyImageAfter,
  ExternalImageAfter,
  DynamicImageWithFallback,
  FillImageAfter,
  ResponsiveImageAfter,
  ConditionalImageAfter,
};
