import { FormElement, Form, User } from "../../../models/index";
import { formElements } from "../../../data/formElements";
import { forms } from "../../../data/forms";
import { NextApiRequest, NextApiResponse } from "next";
import { FormElementLoader, FormLoader } from "./loaders";

/**
 * TODO: Add some authorization to this route, just for Devs
 */

export default async function (req: NextApiRequest, res: NextApiResponse) {
  // Drop any documents already inside of the test-database
  await FormElement.deleteMany({});
  await Form.deleteMany({});
  await User.deleteMany({});

  // Load formElements into the 'formElements' collection and get a returned array
  // consisting of their ObjectIDs
  const FELoader = new FormElementLoader(formElements);
  FELoader.loadFormElements();

  await setTimeout(() => {
    // Create forms from those returned ObjectIDs and store them in the 'forms'
    // collection, returning an array of their ObjectIDs
    const FLoader = new FormLoader(forms);
    FLoader.loadForms();
  }, 3000);

  // Finally, create users who possess these forms, referenced by their ObjectIDs,
  // also making sure to give them urls to their media files

  res.send({ content: "Completed what you asked" });
}
