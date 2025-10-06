import Note from "../models/Note.js";// Represents the notes collection in MongoDB

// Controller to get all notes (supports optional search query)
export async function getAllNotes(req, res) {
    try {
        const notes = await Note.find().sort({createdAt: -1}); // Get all notes sorted by newest
        const searchTerm = req.query.search;
        if(!searchTerm) {
            res.status(200).json(notes); 
        } else {
            // Search for notes where title or content matches the search term (case-insensitive)
            const query = {
                $or: [
                    {title: {$regex: searchTerm, $options: "i"}},
                    {content: {$regex: searchTerm, $options: "i"}}
                ]
            }
            const notesBySearch = await Note.find(query).sort({createdAt: -1});
            res.status(200).json(notesBySearch);
        }
        
    } catch (error) {
        console.error("Error in getAllNotes Controller", error);
        res.status(500).json({message:"Internal Server error"})
    }
}

// Controller to get a single note by ID
export async function getNoteByID(req,res) {
    try {
        const note = await Note.findById(req.params.id)
        if(!note) {
            return res.status(404).json({message:"Note not found! "});
        }
        res.json(note);
    } catch (error) {
        console.error("Error in getNoteById Controller", error);//Logs error in console
        res.status(500).json({message:"Internal Server error"})//json error message 
    }
}

// Controller to create a new note
export async function createNote(req, res) {
    try {
        const {title,content} = req.body; // Get data from client request
        const note = new Note({title:title, content:content});
        const savedNote = await note.save();
        res.status(201).json(savedNote)// Return the saved note
    } catch (error) {
        console.error("Error in createNotes Controller", error);
        res.status(500).json({message:"Internal Server error"})
    }
}

// Controller to update an existing note
export async function updateNote(req, res) {
    try {
        const {title, content} = req.body; // New data from client
        const updateNote = await Note.findByIdAndUpdate(
            req.params.id, // Note ID from URL
            {title, content}, // Fields to update
            { new: true } // Return updated document
        ); 

        if(!updateNote) {
            return res.status(404).json({message:"Note not found"});
        } 

        res.status(200).json(updateNote);
    } catch (error) {
        console.error("Error in updateNotes Controller", error);
        res.status(500).json({message:"Internal server error"})
    }
}

// Controller to toggle pin/unpin a note
export async function pinNote(req, res) {
    try {
        const note = await Note.findById(req.params.id)
        note.pinned = !note.pinned; // Toggle pinned status
        const savedNote = await note.save();
        res.status(200).json(savedNote);
    } catch(error) {
        console.log("Error saving and updating note pinned value", error);
        res.status(500).json({message:"Internal Server error"});
    }
}

// Controller to delete a note by ID
export async function deleteNote (req, res) {
    try {
        const noteToDelete = await Note.findByIdAndDelete(req.params.id);

        if(!noteToDelete) {
            return res.status(404).json({message: "Note not found"});
        }

        res.status(200).json({message: "Note deleted successfully"})    
    } catch (error) {
        console.error("Error in deleteNotes controller", error);
        res.status(500).json({message: "Internal server error"})
    }
}