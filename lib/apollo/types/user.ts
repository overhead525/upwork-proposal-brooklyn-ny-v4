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
    "An array of UUIDs that represent all of the forms that belong to this user."
    forms: [String!]

    "An array containing all of the data pointing to the user's media files."
    media: [MediaElementType!]
  }

  extend type Query {
    "Retrieves a list of UUIDs representing all of the forms that belong to the current user."
    getFormUUIDs: [String!]

    "Retrieves data on a single media file and its location."
    getSingleMedia: MediaElementType

    "Retrieves data on all media files that belong to the current user."
    getMultipleMedia: [MediaElementType!]
  }
`;

export default user;
