export const FormElementResolvers = {
  Query: {
    getFormElement: async (
      _source,
      { formElementID },
      { dataSources: { formElements } }
    ) => {
      try {
        return await formElements.getFormElement({ formElementID });
      } catch (error) {
        return error;
      }
    },
  },
  Mutation: {
    createFormElement: async (
      _source,
      {
        question,
        type,
        questionKey,
        helperText,
        choices,
        draftOf = undefined,
        displayFor = undefined,
      },
      { dataSources: { formElements } }
    ) => {
      try {
        const formElement = {
          question,
          type,
          questionKey,
          helperText,
          choices,
        };
        if (draftOf) Object.assign(formElement, { draftOf });
        else Object.assign(formElement, { displayFor });
        return await formElements.createFormElement({ formElement });
      } catch (error) {
        return error;
      }
    },
    deleteFormElement: async (
      _source,
      { formElementID },
      { dataSources: { formElements } }
    ) => {
      try {
        return await formElements.deleteFormElement({ formElementID });
      } catch (error) {
        return error;
      }
    },
    updateFormElement: async (
      _source,
      {
        formElementID,
        question = undefined,
        type = undefined,
        questionKey = undefined,
        helperText = undefined,
        choices = undefined,
        draftOf = undefined,
        displayFor = undefined,
      },
      { dataSources: { formElements } }
    ) => {
      try {
        const alterationObject = {
          question,
          type,
          questionKey,
          helperText,
          choices,
          draftOf,
          displayFor,
        };
        Object.entries(alterationObject).forEach((pair) => {
          if (!pair[1]) delete alterationObject[pair[0].toString()];
        });
        return await formElements.updateFormElement({
          formElementID,
          alterationObject,
        });
      } catch (error) {
        return error;
      }
    },
  },
};
