import { FormElement, Form, User } from "../../../models/index";
import { FormElementDoc } from "../../../models/types";
import { formElements } from "../../../data/formElements";
import { NextApiRequest, NextApiResponse } from "next";
import { Document } from "mongoose";

/**
 * TODO: Add some authorization to this route, just for Devs
 */

interface StoredFormElement extends FormElementDoc, Document {}

class FormElementLoader {
  private formElements: FormElementDoc[] = [];

  constructor(formElements: FormElementDoc[]) {
    this.formElements = formElements;
  }

  public loadFormElements() {
    this.formElements.forEach((formElement) => {
      FormElement.create(formElement, async (err, doc: StoredFormElement) => {
        if (err) throw err;
        if (doc.displayFor) {
          FormElement.find(
            { questionKey: doc.questionKey },
            async (err, result: StoredFormElement[]) => {
              result[0].draftOf = result[1].id;
              await result[0].save();
              result[1].displayFor = result[0].id;
              await result[1].save();
            }
          );
        }
      });
    });
  }
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  // Drop any documents already inside of the test-database
  await FormElement.deleteMany({});
  await Form.deleteMany({});
  await User.deleteMany({});

  // Load formElements into the 'formElements' collection and get a returned array
  // consisting of their ObjectIDs
  const FELoader = new FormElementLoader(formElements);
  FELoader.loadFormElements();

  // Create forms from those returned ObjectIDs and store them in the 'forms'
  // collection, returning an array of their ObjectIDs

  // Finally, create users who possess these forms, referenced by their ObjectIDs,
  // also making sure to give them urls to their media files

  res.send({ content: "Completed what you asked" });
}
