// This file will export an apollo route handler for GraphQL
// So you send GraphQL requests to api/data

import { ApolloServer } from "apollo-server-micro";
import { Users } from "../../../lib/apollo/data-sources/Users";
import schemaArray from "../../../lib/apollo/types";
import { FormResolvers } from "../../../lib/apollo/resolvers/formResolvers";
import { UserResolvers } from "../../../lib/apollo/resolvers/userResolvers";
import { db } from "../../../lib/database/mongo-client";
import { Forms } from "../../../lib/apollo/data-sources/Forms";
import { FormElements } from "../../../lib/apollo/data-sources/FormElements";
import { FormElementResolvers } from "../../../lib/apollo/resolvers/formElementResolvers";

const apolloServer = new ApolloServer({
  typeDefs: schemaArray,
  resolvers: { ...UserResolvers /*...FormResolvers, ...FormElementResolvers*/ },
  dataSources: () => ({
    users: new Users(db.collection("users")),
    // forms: new Forms(db.collection("forms")),
    // formElements: new FormElements(db.collection("formElements")),
  }),
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/data" });
