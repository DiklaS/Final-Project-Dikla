const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("./utils/loggingMiddleware");
const cors = require("cors");
const apiRouter = require("./routes/api");
const config = require("config");
const initialData = require("./initialData/initialData");

const app = express();

app.use(cors());
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/initialData", express.static(path.join(__dirname, "initialData")));
initialData();
app.use("/api", apiRouter);
app.use((req, res, next) => {
  res.status(404).json({ err: "page not found" });
});

module.exports = app;
