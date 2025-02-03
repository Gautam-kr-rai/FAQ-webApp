import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.UPSTASH_REDIS_URL) {
  throw new Error("Missing UPSTASH_REDIS_URL in environment variables");
}

export const redis = new Redis(process.env.UPSTASH_REDIS_URL, {
  retryStrategy: (times) => Math.min(times * 50, 2000), // Retry with backoff
  reconnectOnError: (err) => {
    console.error("Redis Error:", err);
    return true;
  },
});

// Handle connection errors
redis.on("error", (err) => {
  console.error("Redis Connection Error:", err);
});

