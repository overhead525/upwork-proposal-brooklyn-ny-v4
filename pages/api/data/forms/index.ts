import { NextApiRequest, NextApiResponse } from "next";

import { db } from "../../../../lib/database/mongo-client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const forms = await db.collection("forms").countDocuments();
  res.send(forms);
};
