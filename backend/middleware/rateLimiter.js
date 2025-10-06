// rateLimiter.js: Express middleware that applies the rate limiter to incoming requests
import rateLimit from "../config/upstash.js"// Import the configured rate limiter

const ratelimiter = async (req, res, next) => {

    console.log("Query param:", req.query.search);
    console.log("Rate limiter hit. Path:", req.path, "Query:", req.query);

    // Skip rate limiting for search requests
    if(req.query.search !== undefined && req.query.search !== "") { 
        next();
        return;
    }

    try {
        // Check Redis to see how many requests have been made with this key in the last 60s
        // "my-limit-key" is static here; in production, you could use req.ip to limit per user
        const {success, limit, remaining } = await rateLimit.limit("my-limit-key"); 

        console.log("Request count:", limit, "Remaining:", remaining);

        if(!success) { // Stop requests if limit is reached
            return res.status(429).json({message: "Too many requests please try again later"});
        }

        next(); // Continue to route handler if under limit
    } catch (error) {
        console.log("Rate limit error", error);
        next(error);
    }
}

export default ratelimiter;