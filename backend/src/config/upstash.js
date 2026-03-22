import { Redis } from '@upstash/redis';
import { Ratelimit } from "@upstash/ratelimit"

import "dotenv/config"

const rateLimiter = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, "60 s"), // 100 request per 60 seconds
})

export default rateLimiter;