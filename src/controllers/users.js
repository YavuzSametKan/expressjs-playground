// users mock data
import users from "../mockDatas/users.js"
import {findItemById} from "../utils/validationHelpers.js";

export const getUser = (req, res) => {
    const { params: { id } } = req

    const validation = findItemById(users, id)

    if (validation.error)
        res
            .status(validation.status)
            .send(validation.error)

    const { matchedItem: matchedUser } = validation

    res
        .status(200)
        .send(matchedUser)
}

export const getUsers = (req, res) => {
    const { filter, value } = req.query

    const allowedFilters = ['name', 'email', 'age', 'isActive', 'role', 'joinedDate']
    if (filter && !allowedFilters.includes(filter))
        res
            .status(400)
            .send({ error: 'Invalid filter field.' })

    const filteredUsers = filter
        ? users.filter(user =>
            user[filter].toString()?.toLocaleLowerCase().includes(value.toString().toLocaleLowerCase())
        )
        : users

    res.status(200).send(filteredUsers)
}

export const createUser = (req, res) => {
    const newUser = {
        id: users.length + 1,                   // built in
        name: req.body.name,                    // not nullable
        email: req.body.email,                  // not nullable
        age: req.body.age || null,              // nullable
        address: req.body.address || null,      // nullable
        isActive: true,                         // built in
        role: req.body.role || 'viewer',        // nullable
        joinedDate: new Date().toISOString(),   // built in
    }
    users.push(newUser)

    return res
        .status(201)
        .send(newUser)
}

export const updateUser = (req, res) => {
    const { params: { id } } = req

    const validation = findItemById(users, id)

    if (validation.error)
        res
            .status(validation.status)
            .send(validation.error)

    const { matchedItemIndex: matchedUserIndex } = validation

    users[matchedUserIndex] = {
        id,                                                 // built in
        name: req.body.name,                                // not nullable
        email: req.body.email,                              // not nullable
        age: req.body.age || null ,                         // nullable
        address: req.body.address || null,                  // nullable
        isActive: req.body.isActive || false,               // nullable
        role: req.body.role || 'viewer',                    // nullable
        joinedDate: users[matchedUserIndex].joinedDate      // built in
    }

    res
        .status(200)
        .send(users[matchedUserIndex])
}

export const patchUser = (req, res) => {
    const { params: { id } } = req

    const validation = findItemById(users, id)

    if (validation.error)
        res
            .status(validation.status)
            .send(validation.error)

    const { matchedItemIndex: matchedUserIndex } = validation

    users[matchedUserIndex] = {
        ...users[matchedUserIndex],
        ...req.body
    }

    res
        .status(200)
        .send(users[matchedUserIndex])
}

export const deleteUser = (req, res) => {
    const { params: { id } } = req

    const validation = findItemById(users, id)

    if (validation.error)
        return res
            .status(validation.status)
            .send(validation.error)

    const { matchedItemIndex: matchedUserIndex } = validation

    users.splice(matchedUserIndex, 1)

    res
        .status(200)
        .send({ message: 'User successfully deleted.' })
}