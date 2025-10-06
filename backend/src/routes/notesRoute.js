import express from "express";//// Express library for routing
import { createNote, deleteNote, getAllNotes, getNoteByID, updateNote, pinNote } from "../controllers/notesController.js"; //this brings the functions from notesController.js into notesRoutes.js
//Import controller functions for handling notes

const router = express.Router(); // Create a router instance



// Routes for notes resource
router.get("/", getAllNotes);           // Get all notes (with optional search query)
router.get("/:id", getNoteByID);       // Get a single note by ID
router.post("/", createNote);          // Create a new note
router.put("/:id", updateNote);        // Update a note by ID
router.patch("/:id/pin", pinNote);     // Toggle pin/unpin status for a note
router.delete("/:id", deleteNote);     // Delete a note by ID




export default router;