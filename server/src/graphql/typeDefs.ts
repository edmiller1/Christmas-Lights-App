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
