import * as mongoose from "mongoose";

const filledURL = process.env.MONGO_URL.replace(
  "<variable>",
  process.env.DATABASE_ROOT_PASSWORD
);

mongoose.connect(
  filledURL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () =>
    console.log(
      process.env.DATABASE_ROOT_PASSWORD + "\n" + process.env.MONGO_URL
    )
);

export const db = mongoose.connection;
