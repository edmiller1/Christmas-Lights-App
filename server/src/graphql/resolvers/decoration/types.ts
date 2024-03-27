export interface CreateDecorationArgs {
  input: {
    userId: string;
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
    userId: string | undefined;
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

export interface FavouriteDecorationArgs {
  input: {
    userId: string;
    id: string;
  };
}

export interface unfavouriteDecorationArgs {
  input: {
    userId: string;
    id: string;
  };
}

export interface AddViewArgs {
  input: {
    id: string;
    numViews: number;
  };
}

export interface RateDecorationArgs {
  input: {
    userId: string;
    id: string;
    rating: number;
  };
}

export interface EditRatingArgs {
  input: {
    userId: string;
    id: string;
    rating: number;
  };
}

export interface DeleteRatingArgs {
  input: {
    userId: string;
    id: string;
  };
}

export interface ReportDecorationArgs {
  input: {
    userId: string;
    id: string;
    reportOptions: string[];
    additionalDetails?: string;
  };
}

export interface SubmitDecorationForVerificationArgs {
  input: {
    userId: string;
    id: string;
    document: string;
  };
}

export interface GetRecommendedDecorationsArgs {
  input: {
    id: string;
    city: string;
  };
}

export interface AddDecorationToHistoryArgs {
  input: {
    userId: string;
    id: string;
  };
}

export interface removeDecorationFromHistoryArgs {
  input: {
    userId: string;
    id: string;
  };
}

export interface DecorationsViaMapArgs {
  input: {
    latitude: string;
    longitude: string;
    skip: number;
  };
}

export interface getDecorationsViaSearchArgs {
  input: {
    searchTerm: string;
    skip: number;
  };
}

export interface SearchForDecorationsArgs {
  input: {
    searchTerm: string;
    skip: number;
  };
}
