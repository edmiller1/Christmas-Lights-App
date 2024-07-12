import { gql } from "graphql-tag";

export const typeDefs = gql`
  #Types
  type User {
    id: String!
    stripe_customer_id: String
    stripe_session_id: String
    stripe_subscription_id: String
    name: String!
    email: String!
    imageId: String
    image: String
    premium: Boolean
    token: String!
    isAdmin: Boolean
    notifications_on_app_verification: Boolean
    notifications_on_app_rating: Boolean
    notifications_by_email_verification: Boolean
    notifications_by_email_rating: Boolean
    created_at: String!
    decorations: [Decoration!]
    favourites: [Decoration!]
    history: [Decoration!]
    ratings: [Rating!]
    notifications: [Notification]!
    routes: [Route!]
    subscription: Subscription
  }

  type Subscription {
    stripe_subscription_id: String!
    interval: String!
    status: String!
    plan_id: String!
    current_period_start: Int!
    current_period_end: Int!
    created_at: String!
    updated_at: String!
    user_id: String!
  }

  type Decoration {
    id: String!
    name: String!
    address: String!
    images: [DecorationImage!]!
    verified: Boolean
    verification_submitted: Boolean
    rating: Float
    num_ratings: Int
    latitude: Float!
    longitude: Float!
    country: String!
    region: String!
    city: String!
    num_views: Int
    created_at: String!
    updated_at: String
    ratings: [Rating]!
    views: [View]!
    reports: [Report]
    verification: Verification
    creator_id: String!
  }

  type DecorationImage {
    id: String!
    url: String!
    decoration_id: String!
  }

  type Rating {
    id: String!
    rating: Int!
    decoration_id: String!
    user_id: String!
  }

  type View {
    id: String!
    created_at: String!
    decoration_id: String!
  }

  type Notification {
    id: String!
    title: String!
    body: String!
    unread: Boolean
    created_at: String!
    user_id: String!
  }

  type Report {
    id: String!
    reasons: [String!]!
    additionalInfo: String
    unresolved: Boolean
    created_at: String!
    decoration: Decoration!
    decoration_id: String!
    user_id: String!
  }

  type Verification {
    id: String!
    document: String!
    new: Boolean
    approved: Boolean
    rejected: Boolean
    rejected_reason: String
    archived: Boolean
    decoration: Decoration!
    decoration_id: String!
  }

  type Route {
    id: String!
    name: String!
    decorations: [Decoration!]
    created_at: String!
    user_id: String!
  }

  type SearchedDecorations {
    decorations: [Decoration!]!
    count: Int!
    type: String!
  }

  #input
  input KindeAuthResult {
    id: String!
    name: String!
    email: String!
    photoURL: String
  }

  input SignInInput {
    result: KindeAuthResult!
  }

  input GetUserInput {
    id: String!
  }

  input CreateDecorationInput {
    name: String!
    address: String!
    country: String!
    region: String!
    city: String!
    latitude: Float!
    longitude: Float!
    images: [String!]!
  }

  input GetDecorationInput {
    id: String!
  }

  input ExistingImagesInput {
    id: String!
    url: String!
  }

  input EditDecorationInput {
    id: String!
    name: String!
    address: String!
    newImages: [String]
    deletedImages: [ExistingImagesInput]
    latitude: Float!
    longitude: Float!
    country: String!
    region: String!
    city: String!
  }

  input FavouriteDecorationInput {
    id: String!
  }

  input UnfavouriteDecorationInput {
    id: String!
  }

  input AddViewInput {
    id: String!
    numViews: Int!
  }

  input RateDecorationInput {
    id: String!
    rating: Int!
  }

  input EditRatingInput {
    id: String!
    rating: Int!
  }

  input DeleteRatingInput {
    id: String!
  }

  input ReportDecorationInput {
    id: String!
    reportOptions: [String!]!
    additionalDetails: String
  }

  input SubmitDecorationForVerificationInput {
    id: String!
    document: String!
  }

  input GetVerificationRequestsInput {
    skip: Int!
    take: Int!
  }

  input MutateNotificationInput {
    id: String!
  }

  input EditAvatarInput {
    image: String!
    imageId: String
  }

  input EditNameInput {
    name: String!
  }

  input MutateNotificationSettingsInput {
    setting: Boolean!
    name: String!
  }

  input GetRecommendedDecorationsInput {
    id: String!
    city: String!
  }

  input AddDecorationToHistoryInput {
    id: String!
  }

  input RemoveDecorationFromHistoryInput {
    id: String!
  }

  input DecorationsViaMapInput {
    latitude: String!
    longitude: String!
    skip: Int!
  }

  input CreateRouteInput {
    name: String!
    decorationId: String
  }

  input AddDecorationToRouteInput {
    routeId: String!
    decorationId: String!
  }

  input RemoveDecorationFromRouteInput {
    routeId: String!
    decorationId: String!
  }

  input DeleteRouteInput {
    routeId: String!
  }

  input DecorationsViaSearchInput {
    searchTerm: String!
    skip: Int!
  }

  input SearchInput {
    searchTerm: String!
  }

  input GlobalSearchInput {
    searchTerm: String!
    skip: Int!
  }

  input DeleteDecorationInput {
    decorationId: String!
  }

  #Queries
  type Query {
    # User
    getUser: User!
    getUserNotifications: [Notification]!
    getUnreadNotifications: Int!
    getUserDecorations: User!
    getUserFavourites: User!
    getUserHistory: User!

    #Decoration
    getDecoration(input: GetDecorationInput!): Decoration!
    getRecommendedDecorations(
      input: GetRecommendedDecorationsInput!
    ): [Decoration!]!
    getDecorationsByCity: [Decoration!]!
    getDecorationsByRating: [Decoration!]!
    getDecorationsViaCountry(
      input: DecorationsViaMapInput!
    ): SearchedDecorations!
    getDecorationsViaRegion(
      input: DecorationsViaMapInput!
    ): SearchedDecorations!
    getDecorationsViaCity(input: DecorationsViaMapInput!): SearchedDecorations!
    searchUserFavourites(input: SearchInput!): [Decoration!]!
    searchForDecorations(input: GlobalSearchInput!): SearchedDecorations!

    # Admin Queries
    getVerificationSubmissions: [Decoration]!
    getVerificationRequests: [Verification]!
    getRecentReports: [Report]!
    getVerificationRequestsCount: Int!
    getUnresolvedReportsCount: Int!

    # Subscription
    createSubscriptionSession: String!
    cancelSession: String!
    confirmSession: User!
    cancelSubscription: User!
  }

  #Mutations
  type Mutation {
    # User
    signIn(input: SignInInput!): User!
    editAvatar(input: EditAvatarInput!): User!
    editName(input: EditNameInput!): User!
    mutateNotficationSettings(input: MutateNotificationSettingsInput!): User!
    deleteAccount: String!
    # Decoration
    createDecoration(input: CreateDecorationInput!): Decoration!
    editDecoration(input: EditDecorationInput!): Decoration!
    favouriteDecoration(input: FavouriteDecorationInput!): User!
    unfavouriteDecoration(input: UnfavouriteDecorationInput!): User!
    addView(input: AddViewInput!): Decoration!
    rateDecoration(input: RateDecorationInput!): Decoration!
    editRating(input: EditRatingInput!): User!
    deleteRating(input: DeleteRatingInput!): User!
    reportDecoration(input: ReportDecorationInput!): Decoration!
    submitDecorationForVerification(
      input: SubmitDecorationForVerificationInput!
    ): Decoration!
    addDecorationToHistory(input: AddDecorationToHistoryInput!): User!
    removeDecorationFromHistory(input: RemoveDecorationFromHistoryInput!): User!
    deleteDecoration(input: DeleteDecorationInput!): User!
    # Notification
    markNotificationAsRead(input: MutateNotificationInput!): User!
    markNotificationAsUnread(input: MutateNotificationInput!): User!
    markAllNotificationsAsRead: User!
    deleteAllNotifications: User!
    deleteNotification(input: MutateNotificationInput!): User!
    #Routes
    createRoute(input: CreateRouteInput!): User!
    deleteRoute(input: DeleteRouteInput!): User!
    addDecorationToRoute(input: AddDecorationToRouteInput!): User!
    removeDecorationFromRoute(input: RemoveDecorationFromRouteInput!): User!
  }
`;
