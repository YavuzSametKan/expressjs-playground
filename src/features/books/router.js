import {Router} from "express"
import {createUser, deleteUser, getUser, getUsers, patchUser, updateUser} from "./controller.js";
import {commonUserValidation, validateGetUsers} from "./validations.js";
import {authenticateToken} from "../../utils/jwt/index.js";

const usersRouter = Router()

const BASE_URL = '/books'

usersRouter.use(authenticateToken)

usersRouter.get(BASE_URL, validateGetUsers, getUsers)
usersRouter.post(BASE_URL, commonUserValidation, createUser)

usersRouter.get(`${BASE_URL}/:id`, getUser)
usersRouter.put(`${BASE_URL}/:id`, commonUserValidation, updateUser)
usersRouter.patch(`${BASE_URL}/:id`, commonUserValidation, patchUser)
usersRouter.delete(`${BASE_URL}/:id`, deleteUser)

export default usersRouter