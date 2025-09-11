export interface Hackathon {
  id: string;
  dept: string;
  title: string;
  level: 'Internal' | 'State' | 'National' | 'International';
  position: string;
  date: string;
  proof_url?: string;
  winners?: string | Winner[]; // Can be JSON string or parsed array
  created_at?: string;
  updated_at?: string;
}

export interface Winner {
  name: string;
  role?: string;
  photo_url?: string;
}
