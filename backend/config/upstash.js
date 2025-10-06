// upstash.js: Configures a rate limiter to prevent server overload from excessive requests
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from '@upstash/redis';
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env

// Create a rate limiter: allows 100 requests per 60 seconds per key
const rateLimit = new Ratelimit({
    redis: Redis.fromEnv(), // Use Redis connection from environment variables
    limiter: Ratelimit.slidingWindow(100, "60 s"), 
});

export default rateLimit; // Export the rate limiter to use in middleware
