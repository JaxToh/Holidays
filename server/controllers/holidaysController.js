const express = require("express");
const seed = require("./holidays/seed");

const router = express.Router();

router.get("/seed", seed);

module.exports = router;