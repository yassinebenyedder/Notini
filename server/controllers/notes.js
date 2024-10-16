const noteModel = require("../models/note");
const userModel = require("../models/user");
const mongoose = require('mongoose');

// Get all notes for a specific user, sorted by pinned and date
exports.getAllnotes = async (req, res) => {
    try {
        const userId = req.userId;
        // Find notes by userID and sort by pinned first, then by date (newest first)
        const notes = await noteModel.find({ userID: userId }).sort({ pinned: -1, createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
// Create a new note
exports.createNote = async (req, res) => {
    try {
        const { title, content,tags ,pinned} = req.body;
        const userID = req.userId
        // Validate the required fields
        if (title.length > 40) {
            return res.status(400).json({ message: "title is too long" });
        }else if (!content) {
            return res.status(401).json({ message: "Content are required" });
        }
        // Create the new note with the userID from the token
        const newNote = new noteModel({
            title,
            content,
            pinned: pinned,
            tags: tags,
            userID
        });
        // Save the note
        await newNote.save();
        res.status(201).json({ message: "Note created successfully", note: newNote });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Update note fields
exports.updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        // Check if updates are provided
        if (!Object.keys(updates).length) {
            return res.status(400).json({ message: "No update fields provided" });
        } else if (updates.title.length > 40 || updates.content.length<1) {
            return res.status(400).json({ message: "Title too long or content missing" });
        }
        // Find the note by ID and update the fields
        const updatedNote = await noteModel.findByIdAndUpdate(
            id,
            { $set: updates }, // Use $set to update only provided fields
            { new: true, runValidators: true } // Return the updated document and run schema validations
        );
        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json({ message: "Note updated successfully", note: updatedNote });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Delete a note by ID
exports.deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        // Find the note by ID and delete it
        const deletedNote = await noteModel.findByIdAndDelete(id);
        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json({ message: "Note deleted successfully", note: deletedNote });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Update pinned status of a note
exports.updatePinnedStatus = async (req, res) => {
    try {
        const { id } = req.params; 
        const { pinned } = req.body; 
        if (typeof pinned !== "boolean") {
            return res.status(400).json({ message: "Invalid pinned status. Must be true or false." });
        }
        // Find the note by ID and update the pinned status
        const updatedNote = await noteModel.findByIdAndUpdate(
            id, 
            { pinned: pinned }, 
            { new: true } // Return the updated document
        );
        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json({ message: "Pinned status updated", note: updatedNote });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
