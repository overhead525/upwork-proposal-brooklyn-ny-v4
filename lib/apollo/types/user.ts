import { gql } from "apollo-server";

const user = gql`
  type MediaElementDataTuple {
    canononicalName: String!
    url: String!
  }

  type MediaElementType {
    mediaType: String!
    data: [mediaElementDataTuple!]!
  }

  type User {
    forms: [String!]
    media: [MediaElementType!]
  }
`;

export default user;
