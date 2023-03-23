import rateLimit from 'express-rate-limit'

export const loginLimiter = rateLimit({
    windowMs: 10 * 1000, // 10 seconds
    max: 5, // Limit each IP to 5 requests per `window` (here, per 10 seconds)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})