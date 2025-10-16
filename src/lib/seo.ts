import { Metadata } from 'next';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  noIndex?: boolean;
}

export function generateSEOMetadata({
  title,
  description,
  keywords = [],
  image = '/vasavi_logo.png',
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  section,
  noIndex = false,
}: SEOProps): Metadata {
  const baseTitle = "Sri Vasavi Engineering College";
  const fullTitle = title ? `${title} | ${baseTitle}` : `${baseTitle} - Excellence in Engineering Education`;
  
  const baseDescription = "Official Content Management System of Sri Vasavi Engineering College, Tadepalligudem. Premier engineering education institution offering quality technical education and fostering innovation.";
  const fullDescription = description || baseDescription;
  
  const baseKeywords = [
    "Sri Vasavi Engineering College",
    "SVEC",
    "Engineering College",
    "Tadepalligudem",
    "Andhra Pradesh",
    "Technical Education"
  ];
  
  const allKeywords = [...baseKeywords, ...keywords];
  
  const metadata: Metadata = {
    title: fullTitle,
    description: fullDescription,
    keywords: allKeywords,
    robots: noIndex ? 'noindex, nofollow' : 'index, follow',
    openGraph: {
      type,
      title: fullTitle,
      description: fullDescription,
      url: url || 'https://srivasaviengg.ac.in',
      siteName: baseTitle,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title || baseTitle,
        },
      ],
      locale: 'en_US',
      ...(type === 'article' && publishedTime && {
        publishedTime,
        modifiedTime,
        authors: author ? [author] : undefined,
        section,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      site: '@svecollege',
      creator: '@svecollege',
      title: fullTitle,
      description: fullDescription,
      images: [image],
    },
    alternates: {
      canonical: url || 'https://srivasaviengg.ac.in',
    },
  };

  return metadata;
}

// Predefined SEO configs for common pages
export const SEOConfigs = {
  home: {
    title: "Home",
    description: "Welcome to Sri Vasavi Engineering College - A premier engineering institution in Tadepalligudem, Andhra Pradesh, offering excellence in technical education.",
    keywords: ["home", "engineering college", "technical education", "SVEC homepage"],
  },
  
  departments: {
    title: "Departments",
    description: "Explore all engineering departments at Sri Vasavi Engineering College including CSE, ECE, Mechanical, Civil, EEE, and specialized programs.",
    keywords: ["departments", "engineering branches", "academic programs", "faculty"],
  },
  
  admissions: {
    title: "Admissions",
    description: "Admission information for undergraduate and postgraduate programs at Sri Vasavi Engineering College. Apply now for engineering courses.",
    keywords: ["admissions", "applications", "engineering entrance", "eligibility", "fees"],
  },
  
  placements: {
    title: "Placements",
    description: "Outstanding placement records at Sri Vasavi Engineering College. Top companies recruit our graduates with excellent salary packages.",
    keywords: ["placements", "campus recruitment", "job opportunities", "career", "companies"],
  },
  
  faculty: {
    title: "Faculty",
    description: "Meet our distinguished faculty members at Sri Vasavi Engineering College. Experienced professors and researchers guiding student success.",
    keywords: ["faculty", "professors", "research", "academic staff", "expertise"],
  },
  
  about: {
    title: "About Us",
    description: "Learn about Sri Vasavi Engineering College's history, mission, vision, and commitment to excellence in engineering education since 1981.",
    keywords: ["about", "history", "mission", "vision", "college information"],
  },
  
  contact: {
    title: "Contact Us",
    description: "Get in touch with Sri Vasavi Engineering College. Find our address, phone numbers, email, and directions to our Tadepalligudem campus.",
    keywords: ["contact", "address", "phone", "email", "location", "directions"],
  },
};

// Department-specific SEO configs
export const DepartmentSEOConfigs = {
  cse: {
    title: "Computer Science & Engineering",
    description: "Department of Computer Science & Engineering at SVEC offering cutting-edge programs in software development, algorithms, and emerging technologies.",
    keywords: ["computer science", "software engineering", "programming", "algorithms", "technology"],
  },
  
  "cse-ai": {
    title: "CSE - Artificial Intelligence",
    description: "Specialized CSE-AI department focusing on Artificial Intelligence, Machine Learning, and Data Science applications at Sri Vasavi Engineering College.",
    keywords: ["artificial intelligence", "machine learning", "data science", "AI", "ML"],
  },
  
  ece: {
    title: "Electronics & Communication Engineering",
    description: "Department of Electronics & Communication Engineering covering VLSI, Embedded Systems, and Communication Technologies at SVEC.",
    keywords: ["electronics", "communication", "VLSI", "embedded systems", "telecommunications"],
  },
  
  mech: {
    title: "Mechanical Engineering",
    description: "Department of Mechanical Engineering focusing on Design, Manufacturing, and Thermal Engineering at Sri Vasavi Engineering College.",
    keywords: ["mechanical engineering", "design", "manufacturing", "thermal", "automobiles"],
  },
  
  civil: {
    title: "Civil Engineering",
    description: "Department of Civil Engineering covering Structural, Environmental, and Transportation Engineering at SVEC Tadepalligudem.",
    keywords: ["civil engineering", "construction", "structural", "environmental", "transportation"],
  },
  
  eee: {
    title: "Electrical & Electronics Engineering",
    description: "Department of Electrical & Electronics Engineering specializing in Power Systems and Control Engineering at Sri Vasavi Engineering College.",
    keywords: ["electrical engineering", "power systems", "control", "automation", "electronics"],
  },
  
  mba: {
    title: "Master of Business Administration",
    description: "MBA program at Sri Vasavi Engineering College focusing on Management, Leadership, and Business Strategy for engineering professionals.",
    keywords: ["MBA", "business administration", "management", "leadership", "strategy"],
  },
};