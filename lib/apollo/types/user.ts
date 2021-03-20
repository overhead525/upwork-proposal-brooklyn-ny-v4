import { gql } from "apollo-server-micro";

const user = gql`
  "A tuple containing information on a media object stored in another database."
  type MediaElementDataTuple {
    "'canononicalName' is the file name the user sees."
    canononicalName: String!

    "The url of the raw S3 object."
    url: String!
  }

  "A 'MediaElement' is a representative of the media file from S3."
  type MediaElementType {
    "The type of media e.g. mp3, mov, jpeg, png."
    mediaType: String!

    "An array of data pointing to the S3 raw media object."
    data: [MediaElementDataTuple!]!
  }

  "Registered user of this application"
  type User {
    "A unique string representing the user's display name across the application"
    username: String!

    "An array of UUIDs that represent all of the forms that belong to this user."
    forms: [String!]

    "An array containing all of the data pointing to the user's media files."
    media: [MediaElementType!]
  }

  extend type Query {
    """
    A query for fetching the user's data from the database
    """
    getUser(username: String!): User
  }

  extend type Mutation {
    """
    A mutation for creating a new user based on their chosen username
    """
    createUser(userID: String!): User

    "A mutation for updating the user's data within the database"
    updateUser(userID: String!): User

    "A mutation for deleting a user based on their username, which is unique"
    deleteUser(userID: String!): Boolean
  }
`;

export default user;
