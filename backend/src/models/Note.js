import mongoose from "mongoose"; // Mongoose allows defining schemas and models

// Note schema defines the structure of each note document in the database
const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },    // Note title (required)
    content: { type: String, required: true },  // Note content (required)
    pinned: { type: Boolean, default: false },  // Optional pinned flag (default: false)
  }, 
  { timestamps: true } // Automatically adds createdAt & updatedAt fields
);

const Note = mongoose.model("Note", noteSchema); // Compile schema into a Mongoose model

export default Note;
