import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface PortfolioProfile {
  id: string;
  name: string;
  title: string;
  tagline: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  avatar_url: string;
  updated_at: string;
}

export interface PortfolioPhoto {
  id: string;
  image_url: string;
  title: string;
  caption: string;
  category: string;
  display_order: number;
  created_at: string;
}
