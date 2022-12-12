require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const app = express();

const PORT = process.env.PORT ?? 3000;
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI);
const db = mongoose.connection;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("../client/dist"));

app.get("/", (req, res) => {
  res.json({ msg: "Hello World!" });
});

db.once("open", () =>{
    console.log(`Connected to Mongo: ${MONGO_URI}`);
    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`);
    });
})
