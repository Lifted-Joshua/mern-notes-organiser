import express from "express"; // Express library for creating server and routes
import cors from "cors";        // CORS middleware to allow cross-origin requests
import dotenv from "dotenv";    // Load environment variables from .env
import path from "path" 


import notesRoutes from "./routes/notesRoute.js"// Notes router
import { connectDB } from "../config/db.js"; // DB connection function
import ratelimiter from "../middleware/rateLimiter.js"; // Rate limiter middleware


dotenv.config(); // Load .env variables into process.env


const app = express();
const PORT = process.env.PORT || 5001 // Server port fallback
const __dirname = path.resolve();


if(process.env.NODE_ENV !== "production") { //Cors enable if we are on local development
    // Enable CORS for frontend
    app.use(
        cors({
            origin:"http://localhost:5173", //Front-end URL
        })
    );
}



// Middleware flow:
// 1. express.json() parses incoming JSON bodies.
// 2. ratelimiter checks request count for rate limiting.
//    - If allowed → next() → goes to route handler.
//    - If exceeded → sends 429 response, stops request.
// 3. Route handler runs if middleware passes.

app.use(express.json()); // Parse JSON request bodies
app.use(ratelimiter); // Apply custom rate limiter


app.use("/api/notes", notesRoutes);// Forward requests starting with /api/notes to notesRoutes

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}

// Connect to DB first, then start server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on PORT:", PORT);
    });
});




// Example custom middleware (optional):
// app.use((req, res, next) => {
//     console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//     next();
// });