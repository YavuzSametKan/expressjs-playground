import {Router} from 'express'
import {getLoggedInUserDetails, login, logout, register} from "./controller.js"
import {validateLogin, validateRegister} from "./validations.js"

const authRouter = Router()

const BASE_URL = '/auth'

authRouter.post(`${BASE_URL}/login`, validateLogin, login)
authRouter.post(`${BASE_URL}/register`, validateRegister, register)

authRouter.get(`${BASE_URL}/logout`, logout)
authRouter.get(`${BASE_URL}/me`, getLoggedInUserDetails)

export default authRouter