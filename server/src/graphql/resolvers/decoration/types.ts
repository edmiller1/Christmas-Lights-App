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

export interface FavouriteDecorationArgs {
  input: {
    id: string;
  };
}

export interface unfavouriteDecorationArgs {
  input: {
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
    id: string;
    rating: number;
  };
}

export interface EditRatingArgs {
  input: {
    id: string;
    rating: number;
  };
}

export interface DeleteRatingArgs {
  input: {
    id: string;
  };
}

export interface ReportDecorationArgs {
  input: {
    id: string;
    reportOptions: string[];
    additionalDetails?: string;
  };
}

export interface SubmitDecorationForVerificationArgs {
  input: {
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
    id: string;
  };
}

export interface removeDecorationFromHistoryArgs {
  input: {
    id: string;
  };
}

export interface DecorationsViaMapArgs {
  input: {
    latitude: string;
    longitude: string;
  };
}

export interface getDecorationsViaSearchArgs {
  input: {
    searchTerm: string;
  };
}

export interface SearchForDecorationsArgs {
  input: {
    searchTerm: string;
    skip: number;
  };
}
