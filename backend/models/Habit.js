const mongoose = require("mongoose");

const HabitSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  logs: [{ type: Date }],
});

module.exports = mongoose.model("Habit", HabitSchema);
