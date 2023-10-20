import { gql } from "graphql-tag";

export const typeDefs = gql`
  #Types
  type User {
    id: String!
    token: String!
    name: String!
    email: String!
    image: String!
    premium: Boolean
    provider: String!
    notificationsOnAppVerification: Boolean
    notificationsOnAppRating: Boolean
    notificationsByEmailVerification: Boolean
    notificationsByEmailRating: Boolean
    createdAt: String!
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
    verificationSubmitted: Boolean
    rating: Float
    numRatings: Int
    latitude: Float!
    longitude: Float!
    country: String!
    region: String!
    city: String!
    numViews: Int
    createdAt: String!
    updatedAt: String
    ratings: [Rating]!
    views: [View]!
  }

  type DecorationImage {
    id: String!
    url: String!
    decorationId: String!
  }

  type Rating {
    id: String!
    rating: Int!
    decorationId: String!
    userId: String!
  }

  type View {
    id: String!
    createdAt: String!
    decorationId: String!
  }

  type Notification {
    id: String!
    title: String!
    body: String!
    unread: Boolean
    createdAt: String!
    userId: String!
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

  #Queries
  type Query {
    getAllUsers: [User]
    getUser(input: GetUserInput!): User!
    getDecoration(input: GetDecorationInput!): Decoration!
  }

  #Mutations
  type Mutation {
    createUser(input: CreateUserInput!): User!
    createDecoration(input: CreateDecorationInput!): Decoration!
  }
`;
