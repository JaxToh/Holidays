const mongoose = require("mongoose");

const holidaySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minLength: 3,
    },
    likes: { type: Number, default: 0, min: 0 },
    celebrated: { type: Boolean, default: false },
    description: { type: String, trim: true },
  },
  { timestamps: true }
);

const Holiday = mongoose.model("Holiday", holidaySchema);

module.exports = Holiday;
