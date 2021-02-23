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
  }

  type FormObject {
    title: String!
    pages: [[FormElement!]!]!
  }

  type Form {
    preview: formObject!
    published: formObject!
  }

  extend type Query {
    forms: [Form]!
  }
`;

export default form;
