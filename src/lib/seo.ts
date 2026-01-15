import { Metadata } from 'next';

interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
}

const SITE_NAME = 'Sri Vasavi Engineering College';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://srivasaviengg.ac.in';
const DEFAULT_OG_IMAGE = `${SITE_URL}/vasavi_logo.png`;

/**
 * Generate comprehensive SEO metadata for pages
 */
export function generateSEO({
  title,
  description,
  keywords = [],
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  publishedTime,
  modifiedTime,
  author,
  section,
}: SEOConfig): Metadata {
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
  const canonicalUrl = canonical || SITE_URL;

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: [
      ...keywords,
      'Sri Vasavi Engineering College',
      'SVEC',
      'engineering college',
      'technical education',
      'Tadepalligudem',
      'Andhra Pradesh',
    ].join(', '),
    authors: author ? [{ name: author }] : [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: ogType,
      locale: 'en_IN',
      url: canonicalUrl,
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
      creator: '@SVECTadepalli',
      site: '@SVECTadepalli',
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
      bing: process.env.NEXT_PUBLIC_BING_VERIFICATION,
    },
  };

  // Add article-specific metadata
  if (ogType === 'article' && publishedTime) {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime,
      modifiedTime,
      authors: author ? [author] : undefined,
      section,
    };
  }

  return metadata;
}

/**
 * Generate JSON-LD structured data for organization
 */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Sri Vasavi Engineering College',
    alternateName: 'SVEC',
    url: SITE_URL,
    logo: `${SITE_URL}/vasavi_logo.png`,
    image: `${SITE_URL}/vasavi_logo.png`,
    description: 'Premier engineering college providing quality technical education in Andhra Pradesh, India',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Pedatadepalli',
      addressLocality: 'Tadepalligudem',
      addressRegion: 'Andhra Pradesh',
      postalCode: '534101',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-8818-284111',
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['en', 'hi', 'te'],
    },
    sameAs: [
      'https://www.facebook.com/svectdp',
      'https://twitter.com/SVECTadepalli',
      'https://www.linkedin.com/school/sri-vasavi-engineering-college',
      'https://www.instagram.com/svec_official',
    ],
  };
}

/**
 * Generate JSON-LD structured data for breadcrumbs
 */
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

/**
 * Generate JSON-LD structured data for college course/program
 */
export function getCourseSchema(courseName: string, description: string, duration: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: courseName,
    description,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Sri Vasavi Engineering College',
      sameAs: SITE_URL,
    },
    timeRequired: duration,
    educationalLevel: 'Undergraduate',
    inLanguage: 'en',
  };
}

/**
 * Generate JSON-LD structured data for events
 */
export function getEventSchema(
  name: string,
  description: string,
  startDate: string,
  endDate: string,
  location: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name,
    description,
    startDate,
    endDate,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: location,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Pedatadepalli',
        addressLocality: 'Tadepalligudem',
        addressRegion: 'Andhra Pradesh',
        postalCode: '534101',
        addressCountry: 'IN',
      },
    },
    organizer: {
      '@type': 'EducationalOrganization',
      name: 'Sri Vasavi Engineering College',
      url: SITE_URL,
    },
  };
}

/**
 * Default SEO configuration for the site
 */
export const defaultSEO = generateSEO({
  title: 'Sri Vasavi Engineering College',
  description:
    'Sri Vasavi Engineering College (SVEC) is a premier engineering institution in Tadepalligudem, Andhra Pradesh, offering quality technical education with state-of-the-art facilities and experienced faculty.',
  keywords: [
    'engineering college',
    'SVEC',
    'Tadepalligudem',
    'Andhra Pradesh',
    'technical education',
    'B.Tech',
    'M.Tech',
    'computer science',
    'mechanical engineering',
    'electrical engineering',
    'civil engineering',
    'electronics',
  ],
});
