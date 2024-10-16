const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const noteModel = require('../models/note'); 

//middleware to protect note and authentication routes
exports.verifytoken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "Authorization token is required" });
        }
        // Verify the token
        const decoded = jwt.verify(token, process.env.JwtSecret);
        const userId = decoded.id;

        // Attach user ID to the request object for further use in the controller
        req.userId = userId;

        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Invalid token" });
    }
};

// Middleware to verify note ownership for just the update delete and update the pinned status routes
exports.verifyOwnership = async (req, res, next) => {
    try {
        const { id } = req.params; 
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: "Authorization token is required" });
        }
        // Verify the token
        const decoded = jwt.verify(token, process.env.JwtSecret);
        const userId = decoded.id;
        // Check if the note exists and if the user is the owner
        const note = await noteModel.findById(id);
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        if (note.userID !== userId) {
            return res.status(403).json({ message: "You do not have permission to access this note"});
        }

        // Attach user ID to the request object for further use in the controller
        req.userId = userId;

        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Invalid token" });
    }
};
