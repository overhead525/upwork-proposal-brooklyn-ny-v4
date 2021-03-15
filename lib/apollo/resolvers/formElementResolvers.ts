export const FormElementResolvers = {
  Query: {
    getFormElement: async (
      _source,
      { formElementID },
      { dataSources: { formElements } }
    ) => {
      return await formElements.getFormElement(formElementID);
    },
  },
};
