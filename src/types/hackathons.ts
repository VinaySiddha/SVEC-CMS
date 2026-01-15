export interface Hackathon {
  id: number;
  dept: string;
  academic_year: string;
  brochure_url?: string;
  winners_url?: string;
  gallery?: string; // Comma-separated string of image URLs
  created_at?: string;
  updated_at?: string;
}

export interface GalleryItem {
  url: string;
  caption?: string;
  type?: 'image' | 'video';
}

// Legacy interface for backward compatibility
export interface LegacyHackathon {
  id: string;
  dept: string;
  title: string;
  level: 'Internal' | 'State' | 'National' | 'International';
  position: string;
  date: string;
  proof_url?: string;
  winners?: string | Winner[];
  created_at?: string;
  updated_at?: string;
}

export interface Winner {
  name: string;
  role?: string;
  photo_url?: string;
}
