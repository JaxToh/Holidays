const express = require("express");
const Holiday = require("../models/Holiday");
const seed = require("./holidays/seed");

const router = express.Router();

router.get("/seed", seed);

router.get("/", async (req, res) => {
  //? return [ list of holidays]
  try {
    const holidays = await Holiday.find().exec();
    res.json(holidays);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/", async (req, res) => {
  try {
    const holiday = await Holiday.create(req.body);
    res.status(201).json(holiday);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const holiday = await Holiday.findById(id);
    res.json(holiday);
  } catch (error) {
    res.status(500).json({ error });
  }
});

//? update => locate the item  => change it
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const holiday = await Holiday.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(holiday);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const holiday = await Holiday.findByIdAndDelete(id);
    res.json(holiday);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
