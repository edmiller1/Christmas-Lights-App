import { gql } from "graphql-tag";

export const typeDefs = gql`
  #Types
  type User {
    id: String!
    stripe_customer_id: String
    name: String!
    email: String!
    imageId: String
    image: String
    premium: Boolean
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
    current_perios_start: Int!
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
    userId: String!
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
    userId: String
    id: String!
  }

  input ExistingImagesInput {
    id: String!
    url: String!
  }

  input EditDecorationInput {
    userId: String!
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
    userId: String!
    id: String!
  }

  input UnfavouriteDecorationInput {
    userId: String!
    id: String!
  }

  input AddViewInput {
    id: String!
    numViews: Int!
  }

  input RateDecorationInput {
    userId: String!
    id: String!
    rating: Int!
  }

  input EditRatingInput {
    userId: String!
    id: String!
    rating: Int!
  }

  input DeleteRatingInput {
    userId: String!
    id: String!
  }

  input ReportDecorationInput {
    userId: String!
    id: String!
    reportOptions: [String!]!
    additionalDetails: String
  }

  input SubmitDecorationForVerificationInput {
    userId: String!
    id: String!
    document: String!
  }

  input GetVerificationRequestsInput {
    skip: Int!
    take: Int!
  }

  input MutateNotificationInput {
    userId: String!
    id: String!
  }

  input EditAvatarInput {
    userId: String!
    image: String!
    imageId: String
  }

  input EditNameInput {
    userId: String!
    name: String!
  }

  input MutateNotificationSettingsInput {
    userId: String!
    setting: Boolean!
    name: String!
  }

  input MutateAllNotificationsInput {
    userId: String!
  }

  input GetRecommendedDecorationsInput {
    id: String!
    city: String!
  }

  input AddDecorationToHistoryInput {
    userId: String!
    id: String!
  }

  input RemoveDecorationFromHistoryInput {
    userId: String!
    id: String!
  }

  input DecorationsViaMapInput {
    latitude: String!
    longitude: String!
    skip: Int!
  }

  input CreateRouteInput {
    userId: String!
    name: String!
    decorationId: String
  }

  input AddDecorationToRouteInput {
    userId: String!
    routeId: String!
    decorationId: String!
  }

  input RemoveDecorationFromRouteInput {
    userId: String!
    routeId: String!
    decorationId: String!
  }

  input DeleteRouteInput {
    userId: String!
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

  input GetUserNotificationsInput {
    userId: String!
  }

  type SearchedDecorations {
    decorations: [Decoration!]!
    count: Int!
    type: String!
  }
  #Queries
  type Query {
    # App Queries
    getUser(input: GetUserInput!): User!
    getDecoration(input: GetDecorationInput!): Decoration!
    getUserNotifications(input: GetUserNotificationsInput!): [Notification]!
    getUnreadNotifications(input: GetUserNotificationsInput!): Int!
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
  }

  #Mutations
  type Mutation {
    # User
    signIn(input: SignInInput!): User!
    editAvatar(input: EditAvatarInput!): User!
    editName(input: EditNameInput!): User!
    mutateNotficationSettings(input: MutateNotificationSettingsInput!): User!
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
    # Notification
    markNotificationAsRead(input: MutateNotificationInput!): User!
    markNotificationAsUnread(input: MutateNotificationInput!): User!
    markAllNotificationsAsRead(input: MutateAllNotificationsInput!): User!
    deleteAllNotifications(input: MutateAllNotificationsInput!): User!
    deleteNotification(input: MutateNotificationInput!): User!
    #Routes
    createRoute(input: CreateRouteInput!): User!
    deleteRoute(input: DeleteRouteInput!): User!
    addDecorationToRoute(input: AddDecorationToRouteInput!): User!
    removeDecorationFromRoute(input: RemoveDecorationFromRouteInput!): User!
  }
`;
