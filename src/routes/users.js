import {Router} from "express"
import {createUser, deleteUser, getUser, getUsers, patchUser, updateUser} from "../controllers/users.js";

const usersRoutes = Router()

const BASE_URL = '/users'

usersRoutes.get(BASE_URL, getUsers)
usersRoutes.post(BASE_URL, createUser)

usersRoutes.get(`${BASE_URL}/:id`, getUser)
usersRoutes.put(`${BASE_URL}/:id`, updateUser)
usersRoutes.patch(`${BASE_URL}/:id`, patchUser)
usersRoutes.delete(`${BASE_URL}/:id`, deleteUser)

export default usersRoutes