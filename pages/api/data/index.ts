// This file will export an apollo route handler for GraphQL
// So you send GraphQL requests to api/data

import { ApolloServer } from "apollo-server-micro";
import { Users } from "../../../lib/apollo/data-sources/Users";
import schemaArray from "../../../lib/apollo/types";
import { UserResolvers } from "../../../lib/apollo/data-sources/Users";
import { db } from "../../../lib/database/mongo-client";

const apolloServer = new ApolloServer({
  typeDefs: schemaArray,
  resolvers: { ...UserResolvers },
  dataSources: () => ({
    users: new Users(db.collection("users")),
  }),
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/data" });
