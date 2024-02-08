const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const port = 3000;
const mongoose = require("mongoose");

const DBURL = process.env.DB_URL;

mongoose
  .connect(DBURL, {
    writeConcern: { w: "majority" },
  })
  .then((con) => {
    console.log("connected");
  })
  .catch((err) => {
    console.log("Error");
  });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
