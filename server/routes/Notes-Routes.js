const express=require('express');
const router=express.Router();
const { getAllnotes, createNote ,updatePinnedStatus,updateNote,deleteNote} = require("../controllers/notes");
const { verifyOwnership,verifytoken } = require('../middleware/authMiddleware');
//routes for note operations
router.get("/allnotes",verifytoken, getAllnotes);
router.post("/createnote",verifytoken,createNote);
router.patch('/update/:id', verifyOwnership,updateNote);
router.delete('/delete/:id', verifyOwnership,deleteNote);
router.patch('/pinned/:id/', verifyOwnership,updatePinnedStatus);

module.exports=router;