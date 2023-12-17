import { gql } from "graphql-tag";

export const typeDefs = gql`
  #Types
  type User {
    id: String!
    token: String!
    name: String!
    email: String!
    imageId: String
    image: String!
    premium: Boolean
    provider: String!
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

  #input
  input CreateUserInput {
    id: String!
    token: String!
    email: String!
    name: String!
    image: String!
    provider: String!
    createdAt: String!
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

  #Queries
  type Query {
    # App Queries
    getUser(input: GetUserInput!): User!
    getDecoration(input: GetDecorationInput!): Decoration!
    getUserNotifications: [Notification]!
    getUnreadNotifications: Int!
    getRecommendedDecorations(
      input: GetRecommendedDecorationsInput!
    ): [Decoration!]!

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
    createUser(input: CreateUserInput!): User!
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
    # Notification
    markNotificationAsRead(input: MutateNotificationInput!): User!
    markNotificationAsUnread(input: MutateNotificationInput!): User!
    markAllNotificationsAsRead: User!
    deleteAllNotifications: User!
    deleteNotification(input: MutateNotificationInput!): User!
  }
`;
