import jwt from "jsonwebtoken"

export const signToken = (payload, expiresIn = '1h') => {
    const secretKey = process.env.JWT_SECRET_KEY
    return jwt.sign(payload, secretKey, { expiresIn })
}

export const verifyToken = (token) => {
    const secretKey = process.env.JWT_SECRET_KEY
    try {
        return jwt.verify(token, secretKey) // Payload returns in case of successful verification
    } catch (error) {
        throw new Error('Invalid or expired token.')
    }
}

export const decodeToken = (token) => {
    return jwt.decode(token)
}

export const authenticateToken = (req, res, next) => {
    const token = req.cookies.token
    console.log(token)

    if (!token)
        return res.status(401).json({ message: "Access denied. No token provided." })

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(403).json({ message: "Invalid token." })
    }
}