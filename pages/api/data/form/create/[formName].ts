import { FormElement, FormObject } from "../../../../../models/interfaces";
import { Form } from "../../../../../models";
import { NextApiRequest, NextApiResponse } from "next";

import { db } from "../../../../../lib/database/mongo-client";

import { FormDoc } from "../../../../../models/types";

const nullFormElement: FormElement = {
  question: null,
  type: null,
  questionKey: null,
  helperText: null,
  choices: [null],
};

const nullFormObject: FormObject = {
  title: null,
  pages: [[nullFormElement]],
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body);

  const numUsers = await db.collection("users").countDocuments();
  console.log(`There are ${numUsers} users in the "users" collection`);

  res.send("performed request");
};
