require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const morgan = require("morgan");
const holidaysController = require("./controllers/holidaysController");

const app = express();
const PORT = process.env.PORT ?? 3000;
const MONGO_URI = process.env.MONGO_URI;

console.log("Mongo_URI", MONGO_URI);
mongoose.set("debug", true);
mongoose.set("runValidators", true);
mongoose.set("strictQuery", false);
mongoose.connect(MONGO_URI);

app.set("trust proxy", 1);
app.use(
  session({
    secret: process.env.SECRET, //"keyboard cat",
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true },
  })
);
app.use(express.json()); //? req.body
app.use(morgan("dev"));
app.use(express.static("../client/dist"));

app.use("/api/holidays", holidaysController);

app.get("/api/", (req, res) => {
  res.json({ msg: "Hello World!" });
});

//* login - (sessions not JWT)
app.post("/api/sessions", (req, res) => {
  if (req.body.password === "123") {
    req.session.login = "simon"; //? store something in session
    res.json({ msg: "ok" });
  } else {
    res.status(401).json({ error: "Not Ok" });
  }
});

app.delete("/api/sessions", (req, res) => {
  req.session.destroy(() => {
    res.json({ msg: "Logout success" });
  });
});

const checkLogin = (req, res, next) => {
  if (req.session.login !== "simon") {
    //? matches login -> check
    res.status(401).json({ msg: "Cannot see" });
  } else {
    next();
  }
};

app.get("/api/secret", [checkLogin], (req, res) => {
  res.json({ msg: "Need more milo" });
});

app.get("/api/secret2", [checkLogin], (req, res) => {
  res.json({ msg: "Need more snacks" });
});

app.get("*", (req, res) =>
  res.sendFile(path.resolve("../client/dist", "index.html"))
);

mongoose.connection.once("open", () => {
  console.log("connected to mongoose...");
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
});
