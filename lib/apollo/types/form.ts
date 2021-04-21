import { gql } from "apollo-server-micro";

const form = gql`
  """
  A 'FormElementType' refers to the currently supported types of questions
  a user can choose from when creating their form.
  """
  enum FormElementType {
    RADIO
    CHECKBOXES
    SHORT_ANSWER
    LONG_ANSWER
    EMAIL
    URL
  }

  """
  'Form Elements' are the basic building blocks of forms in this software.
  You combine Form Elements to create forms. Think of them as questions.
  """
  type FormElement {
    question: String!
    type: String!
    questionKey: String!
    helperText: String
    choices: [String!]
    draftOf: String
    displayFor: String
  }

  """
  OptionalFormElements were introduced to provide as part of a solution to allow
  developers to mutate nested parts of a database entry using a GraphQL route
  """
  type OptionalFormElement {
    question: String
    type: FormElementType
    questionKey: String
    helperText: String
    choices: [String!]
    draftOf: String
    displayFor: String
  }

  """
  A 'Form Object' is an agnostic object that represents a form in the application.
  They are the direct result of combining Form Elements together.
  """
  type FormObject {
    title: String!
    pages: [[String!]!]!
  }

  """
  A 'Form' is a first-class citizen in this application. It's name is self-explanatory.
  """
  type Form {
    "The 'preview' property is a Form Object which holds changes the user hasn't decided to publish yet."
    preview: FormObject!

    "The 'published' property is a Form Object that is presented when the user shares his/her form with the Internet."
    published: FormObject!
  }

  extend type Query {
    "Retrieves a specific Form based on its UUID."
    getForm(formID: String!): Form!

    "Retrieves a specific FormElement based on its UUID."
    getFormElement(formElementID: String!): FormElement
  }

  extend type Mutation {
    """
    A mutation for creating a new preview form element inside of the database.
    """
    createPreviewFormElement(
      formID: String!
      pageNumber: Int!
      pageContent: [String!]
      question: String!
      type: FormElementType!
      questionKey: String!
      helperText: String
      choices: [String!]
      draftOf: String
    ): FormElement

    """
    To use this mutation, pass an array of formElementIDs for the pageContent argument. To indicate which position
    you want the new FormElement to be in, use an empty string ""

    For example:

    pageContent: ["6ajskf082kjf", "6ksokdnsks9d", "", "6ldkf0a02klkdj"]
    The new formElement will be placed in position 2 (starting from zero index)
    """
    createPublishedFormElement(
      formID: String!
      pageNumber: Int!
      pageContent: [String!]!
      question: String!
      type: FormElementType!
      questionKey: String!
      helperText: String
      choices: [String!]
      displayFor: String
    ): FormElement

    """
    A mutation for creating a new form in the database
    """
    createForm(
      username: String!
      previewTitle: String!
      previewPages: [[String!]!]!
      publishedTitle: String!
      publishedPages: [[String!]!]!
    ): Form

    """
    A mutation for deleting formElements from the database by their ObjectID from MongoDB
    """
    deleteFormElement(
      formID: String!
      formStatus: String!
      pageNumber: Int!
      formElementID: String!
    ): Boolean!

    """
    A mutation for deleting forms from the database by their ObjectID from MongoDB
    """
    deleteForm(username: String!, formID: String!): Boolean!

    """
    A mutation for updating formElements, but only the property you need to specifically update.
    """
    updateFormElement(
      formElementID: String!
      question: String
      type: FormElementType
      questionKey: String
      helperText: String
      choices: [String!]
      draftOf: String
      displayFor: String
    ): FormElement

    """
    A mutation for updating forms, but only the property/properties you need to update.
    """
    updateForm(
      formID: String!
      previewTitle: String
      previewPages: [[String!]!]
      publishedTitle: String
      publishedPages: [[String!]!]
    ): Form
  }
`;

export default form;
