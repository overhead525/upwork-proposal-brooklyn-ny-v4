import { FormElement, FormObject } from "../../../../../models/interfaces";
import { Form } from "../../../../../models";
import { NextApiRequest, NextApiResponse } from "next";

import { db } from "../../../../../lib/database/mongo-client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body);

  const numUsers = await db.collection("users").countDocuments();
  const userDataString = `There are ${numUsers} users in the "users" collection`;

  res.send(`performed request\n${userDataString}`);
};
