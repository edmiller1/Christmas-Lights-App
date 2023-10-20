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
