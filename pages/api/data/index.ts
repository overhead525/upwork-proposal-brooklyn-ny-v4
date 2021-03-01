// This file will export an apollo route handler for GraphQL
// So you send GraphQL requests to api/data

import { ApolloServer } from "apollo-server-micro";
import schemaArray from "../../../lib/apollo/types";

const apolloServer = new ApolloServer({ typeDefs: schemaArray });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/data" });
