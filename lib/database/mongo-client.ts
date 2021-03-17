import * as mongoose from "mongoose";

const filledURL = process.env.MONGO_URL.replace(
  "<variable>",
  process.env.DATABASE_ROOT_PASSWORD
);

mongoose.connect(filledURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export const db = mongoose.connection;

export const loaderConnection = mongoose.createConnection(filledURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
