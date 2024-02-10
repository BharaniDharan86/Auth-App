const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const port = 3000;
const mongoose = require("mongoose");

const DBURL = process.env.DB_URL;

mongoose
  .connect(DBURL)
  .then((con) => {
    console.log("connected");
  })
  .catch((err) => {
    console.log("Error");
    console.log(err);
  });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
