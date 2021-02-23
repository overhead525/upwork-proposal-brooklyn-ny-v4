import { gql } from "apollo-server";

const root = gql`
  type Query {
    root: String
  }
  type Mutation {
    root: Mutation
  }
`;

export default root;
