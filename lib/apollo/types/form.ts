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
    type: FormElementType!
    questionKey: String!
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
    getForm(formID: String!): Form

    "Retrieves all of the forms that belong to a specific user. User must be authenticated."
    getForms: [Form]

    "Retrieves a specific FormElement based on its UUID."
    getFormElement(uuid: String!): FormElement

    "Retrieves a list of FormElements based on an array of UUIDs."
    getFormElements(uuids: [String!]!): [FormElement]
  }
`;

export default form;
