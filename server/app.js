const express = require("express");
const app = express();
const userRouter = require("./routes/userRoutes");
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.use("/api/v1/user", userRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode | 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

module.exports = app;
