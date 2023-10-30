export interface CreateDecorationArgs {
  input: {
    name: string;
    address: string;
    country: string;
    region: string;
    city: string;
    latitude: number;
    longitude: number;
    images: string[];
  };
}

export interface GetDecorationArgs {
  input: {
    id: string;
  };
}

export interface EditDecorationArgs {
  input: {
    id: string;
    name: string;
    address: string;
    newImages?: string[];
    deletedImages?: { id: string; url: string }[];
    latitude: number;
    longitude: number;
    country: string;
    region: string;
    city: string;
  };
}
