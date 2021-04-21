export const FEFormNotFoundError = (formID) =>
  new Error(
    `Could not find form with ID: ${formID}. Valid form needed for creation of new formElement`
  );

export const FEFormPageNotFoundError = (formID, pageNumber) =>
  new Error(
    `Failed to create formElement. Form with ID: ${formID} does not have a page '${pageNumber}'`
  );
