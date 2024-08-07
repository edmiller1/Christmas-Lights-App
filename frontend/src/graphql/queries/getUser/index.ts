import { gql } from "@apollo/client";

export const GET_USER = gql`
  query getUser {
    getUser {
      id
      name
      email
      imageId
      image
      isAdmin
      premium
      decorations {
        id
        name
        city
        country
        rating
        images {
          id
          url
        }
      }
      ratings {
        id
        rating
        decoration_id
      }
      favourites {
        id
        name
        city
        country
        rating
        latitude
        longitude
        images {
          id
          url
        }
      }
      history {
        id
        name
        city
        country
        rating
        latitude
        longitude
        images {
          id
          url
        }
      }
      notifications_on_app_verification
      notifications_on_app_rating
      notifications_by_email_verification
      notifications_by_email_rating
      routes {
        id
        name
        decorations {
          id
          name
          city
          country
          latitude
          longitude
          rating
          images {
            id
            url
          }
        }
      }
    }
  }
`;
