export interface AssociationEvent {
  title: string;
  date: string;
  description: string;
  image_url?: string;
}

export interface Association {
  id: string;
  dept: string;
  name: string;
  role: string;
  description: string;
  proof_url?: string;
  gallery?: string | AssociationEvent[];
  created_at: string;
  updated_at: string;
}
