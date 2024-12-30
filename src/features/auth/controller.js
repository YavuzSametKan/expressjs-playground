import users from "./mockData.js"
import bcrypt from "bcrypt"
import {findItemOrError} from "../../utils/validation/validationHelpers.js"
import {signToken, verifyToken} from "../../utils/jwt/index.js";

export const login = (req, res) => {
    const { email, password } = req.body

    const validation = findItemOrError(users, email, 'email')
    if (validation.error)
        return res.status(validation.status).json({ msg: validation.error })
    const { matchedItem: matchedUser } = validation

    const isPasswordValid = bcrypt.compareSync(password, matchedUser.password)
    if (!isPasswordValid)
        return res.status(401).json({ msg: 'Invalid credentials.' })

    const token = signToken({
        id: matchedUser.id,
        username: matchedUser.username,
        role: matchedUser.role
    })

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
    })

    return res.status(200).json({ msg: 'Log in successfully.', token })
}

export const register = (req, res) => {
    const { username, email, password, role } = req.body

    const existingUser = users.find(user => user.email === email)
    if (existingUser)
        return res.status(409).json({ msg: 'User already exist.' })

    const hashedPassword = bcrypt.hashSync(password, 12)
    const newUser = {
        id: users.length + 1,
        username,
        email,
        password: hashedPassword,
        role: role || 'user',
        isVerified: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }

    users.push(newUser)
    return res.status(201).json({ msg: 'User registered successfully.', user: newUser })
}

export const logout = (req, res) => {
    res.clearCookie("token")
    return res.status(200).json({ msg: 'Logout successful' })
}

export const getLoggedInUserDetails = (req, res) => {
    try {
        const token = req.cookies.token
        const userPayload = verifyToken(token)
        res.status(200).json({ user: userPayload })
    } catch (error) {
        res.status(401).json({ msg: error.message })
    }
}
