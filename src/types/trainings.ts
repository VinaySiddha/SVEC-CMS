export interface Training {
  id: string;
  dept: string;
  title: string;
  provider: string;
  hours: number;
  date_from: string;
  date_to: string;
  certificate_url?: string;
  created_at?: string;
  updated_at?: string;
}
