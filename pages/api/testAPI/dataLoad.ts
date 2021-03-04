import { FormElement, Form, User } from "../../../models/index";

export default async function () {
  // Drop any documents already inside of the test-database
  await FormElement.deleteMany({});
  await Form.deleteMany({});
  await User.deleteMany({});

  // Load formElements into the 'formElements' collection and get a returned array
  // consisting of their ObjectIDs

  // Create forms from those returned ObjectIDs and store them in the 'forms'
  // collection, returning an array of their ObjectIDs

  // Finally, create users who possess these forms, referenced by their ObjectIDs,
  // also making sure to give them urls to their media files
}
