const express = require("express");
const router = express.Router();
const User = require("../models/User");

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({});

    if (users.length > 0) {
      return res.status(200).json({
        message: "Students found.",
        count: users.length,
        students: users,
      });
    }

    res.status(404).json({
      message: "No students found.",
      count: 0,
      students: [],
    });
  } catch (err) {
    res.status(500).json({ message: `Error getting students: ${err.message}` });
  }
});

// GET specific user
router.get("/:userId", async (req, res) => {
  try {
    const userId = Number(req.params.userId);
    const user = await User.findOne({ id: userId });

    if (user) {
      return res.status(200).json({ message: "Student found.", student: user });
    }

    res.status(404).json({ message: "No student found.", student: null });
  } catch (err) {
    res.status(500).json({ message: `Error getting student: ${err.message}` });
  }
});

// POST new user
router.post("/", async (req, res) => {
  try {
    const existingStudent = await User.findOne({ id: req.body.id });
    if (existingStudent) {
      return res
        .status(400)
        .json({ message: "Student with this ID already exists." });
    }
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res
      .status(201)
      .json({ message: "Student added successfully.", student: savedUser });
  } catch (err) {
    res.status(400).json({ message: `Error saving student: ${err.message}` });
  }
});

// DELETE user
router.delete("/:userId", (req, res) => {
  const userId = Number(req.params.userId);

  User.deleteOne({ id: userId })
    .then((result) => {
      if (result.deletedCount > 0) {
        res.status(200).json({ message: "Student deleted successfully." });
      } else {
        res.status(404).json({ message: "Student not found." });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: `Error deleting student: ${err.message}` });
    });
});

// PATCH update fields
router.patch("/:userId", (req, res) => {
  User.updateOne({ id: Number(req.params.userId) }, { $set: req.body })
    .then((result) => {
      if (result.modifiedCount > 0) {
        res.status(200).json({ message: "Student updated successfully." });
      } else if (result.matchedCount > 0) {
        res
          .status(200)
          .json({ message: "Student found, but no fields were updated." });
      } else {
        res.status(404).json({ message: "Student not found." });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: `Error updating student: ${err.message}` });
    });
});

// PUT replace user
router.put("/:userId", (req, res) => {
  User.replaceOne({ id: Number(req.params.userId) }, req.body)
    .then((result) => {
      if (result.matchedCount === 0) {
        return res.status(404).json({ message: "Student not found." });
      }
      if (result.modifiedCount === 0) {
        return res
          .status(200)
          .json({ message: "Student found, but data was identical." });
      }
      res.status(200).json({ message: "Student replaced successfully." });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: `Error replacing student: ${err.message}` });
    });
});

module.exports = router;
