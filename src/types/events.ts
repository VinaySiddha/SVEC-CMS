export interface Event {
  id: string;
  dept: string;
  title: string;
  category: 'cultural' | 'sports' | 'community';
  date: string;
  description: string;
  proof_url?: string;
  gallery?: string | GalleryItem[]; // Can be JSON string or parsed array
  created_at?: string;
  updated_at?: string;
}

export interface GalleryItem {
  url: string;
  caption?: string;
}
