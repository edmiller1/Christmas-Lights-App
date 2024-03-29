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

export interface Step {
  distance: number;
  driving_side: string;
  duration: number;
  geometry: any;
  maneuver: Maneuver;
  mode: string;
  name: string;
  weight: number;
}

export interface Maneuver {
  bearing_after: number;
  bearing_before: number;
  instruction: string;
  location: number[];
  type: string;
}

export interface KindeUser {
  id: string | null;
  given_name: string | null;
  family_name: string | null;
  email: string | null;
  picture: string | null;
}
