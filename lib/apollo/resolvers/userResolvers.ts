export const UserResolvers = {
  Query: {
    getUser: async (_source, { userID }, { dataSources: { users } }) =>
      await users.getUser(userID),
    getUserFormsAll: async (_source, { userID }, { dataSources: { users } }) =>
      await users.getUserFormsAll(userID),
    getUserMediaAll: async (_source, { userID }, { dataSources: { users } }) =>
      await users.getUserMediaAll(userID),
  },
  Mutation: {
    createUser: async (_source, { username }, { dataSources: { users } }) =>
      await users.createUser(username),
    deleteUser: async (_source, { username }, { dataSources: { users } }) =>
      await users.deleteUser(username),
  },
};
