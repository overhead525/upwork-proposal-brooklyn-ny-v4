import * as mongoose from "mongoose";
import { formElements } from "../../../data/formElements";
import { forms } from "../../../data/forms";
import { NextApiRequest, NextApiResponse } from "next";
import { FormElementLoader, FormLoader, UserLoader } from "./loaders";
import { users } from "../../../data/users";

import { S3 } from "@aws-sdk/client-s3";

/**
 * TODO: Add some authorization to this route, just for Devs
 */

export default async function (req: NextApiRequest, res: NextApiResponse) {
  // Drop any documents already inside of the test-database
  await mongoose.connection.collection("formElements").deleteMany({});
  await mongoose.connection.collection("forms").deleteMany({});
  await mongoose.connection.collection("users").deleteMany({});

  // Create Loader Objects from Classes
  const FELoader = new FormElementLoader(formElements);
  const FLoader = new FormLoader(forms);
  const S3Client = new S3({ region: "us-east-1" });
  const ULoader = new UserLoader(users, S3Client, FLoader);

  // Load formElements into the 'formElements' collection and get a returned array
  // consisting of their ObjectIDs
  FELoader.loadFormElements();

  await setTimeout(() => {
    // Create forms from those returned ObjectIDs and store them in the 'forms'
    // collection, returning an array of their ObjectIDs
    FLoader.loadForms();
  }, 1000);

  // Finally, create users who possess these forms, referenced by their ObjectIDs,
  // also making sure to give them urls to their media files
  await setTimeout(async () => {
    await ULoader.loadUsers();
  }, 1000);

  res.send({ content: "Completed what you asked" });
}
