const express = require("express");
const router = express.Router();
const Habit = require("../models/Habit");

// Add new habit
router.post("/", async (req, res) => {
  try {
    const { userId, name } = req.body;
    const habit = new Habit({ userId, name });
    await habit.save();
    console.log("✅ New habit added:", habit.name);
    res.status(201).json(habit);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add habit" });
  }
});

// Get all habits
router.get("/", async (req, res) => {
  try {
    const habits = await Habit.find();
    res.json(habits);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch habits" });
  }
});

// Update habit progress (mark done today)
router.put("/:id/progress", async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) return res.status(404).json({ error: "Habit not found" });
    habit.logs.push(new Date());
    await habit.save();
    res.json(habit);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update progress" });
  }
});

// Edit habit name
router.put("/:id", async (req, res) => {
  try {
    const habit = await Habit.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    res.json(habit);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to edit habit" });
  }
});

// Delete habit
router.delete("/:id", async (req, res) => {
  try {
    await Habit.findByIdAndDelete(req.params.id);
    res.json({ message: "Habit deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete habit" });
  }
});

// Get habit streak
router.get("/:id/streak", async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) return res.status(404).json({ error: "Habit not found" });
    res.json({ streak: habit.logs.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get streak" });
  }
});

module.exports = router;
