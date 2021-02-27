import { gql } from "apollo-server";

const form = gql`
  enum FormElementType {
    RADIO
    CHECKBOXES
    SHORT_ANSWER
    LONG_ANSWER
    EMAIL
    URL
  }

  type FormElement {
    question: String!
    type: formElementType!
    questionKey: String!
    helperText: String
    choices: [String!]
    draftOf: String
    displayFor: String
  }

  type FormObject {
    title: String!
    pages: [[String!]!]!
  }

  type Form {
    preview: formObject!
    published: formObject!
  }

  extend type Query {
    form(uuid: String!): Form
    forms: [Form]
    formElement(uuid: String!): FormElement
    formElements(uuids: [String!]!): [FormElement]
  }
`;

export default form;
