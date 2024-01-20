export interface Decoration {
  id: string;
  name: string;
  address: string;
  images: DecorationImage[];
  verified: boolean;
  verification_submitted: boolean;
  rating: number;
  num_ratings: number;
  latitude: number;
  longitude: number;
  country: string;
  region: string;
  city: string;
  year: string;
  num_views: number;
  created_at: string;
  updated_at: string;
  creator_id: string;
  ratings: Rating[];
  views: View[];
}

export interface DecorationImage {
  id: string;
  url: string;
  decoration_id: string;
}

export interface Rating {
  id: string;
  rating: number;
  decoration_id: string;
  user_id: string;
}

export interface View {
  id: string;
  created_at: string;
  decoration_id: string;
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  unread: boolean;
  created_at: string;
  user_id: string;
}

export interface ViewState {
  latitude: string | number | null;
  longitude: string | number | null;
  zoom: number;
  bearing: number;
  pitch: number;
}

export interface Route {
  id: string;
  name: string;
  decorations: Decoration[];
  created_at: string;
  user_id: string;
}
