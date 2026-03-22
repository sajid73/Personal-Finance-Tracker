import ratelimiter from "../config/upstash.js"

const rateLimiter = async(req, res, next) => {
    try {
        // will update with userid or ip address
        const {success} = await ratelimiter.limit("my-rate-limit");

        if(!success) {
            return res.status(429).json({
                message: "Too many requests, please try again later.",
            })
        }

        next();
    } catch (error) {
        console.log("Rate limit error: ", error);
        next(error)
    }
}

export default rateLimiter