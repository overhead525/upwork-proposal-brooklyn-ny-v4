export const FormResolvers = {
  Query: {
    getForm: async (_source, { formID }, { dataSources: { forms } }) => {
      await forms.getForm(formID);
    },
  },
};
