import { gql } from "apollo-server-micro";

const user = gql`
  type MediaElementDataTuple {
    canononicalName: String!
    url: String!
  }

  type MediaElementType {
    mediaType: String!
    data: [MediaElementDataTuple!]!
  }

  type User {
    forms: [String!]
    media: [MediaElementType!]
  }
`;

export default user;
