const Holiday = require("../../models/Holiday");

const seed = async (req, res) => {
  const seedHolidays = [
    { name: "World Kindness Day", likes: 9999 },
    { name: "Bathtub Party Day", likes: 10000 },
  ];
  await Holiday.deleteMany({});

  const holidays = await Holiday.insertMany(seedHolidays);

  res.json(holidays);
};

module.exports = seed;
