// mockData mock data
import mockData from "./mockData.js"
import {findItemOrError} from "../../utils/validation/validationHelpers.js";
import {validationResult} from "express-validator";

export const getUser = (req, res) => {
    const { params: { id } } = req

    const validation = findItemOrError(mockData, id)

    if (validation.error)
        res.status(validation.status).send({ errors: validation.error })

    const { matchedItem: matchedUser } = validation

    res.status(200).send(matchedUser)
}

export const getUsers = (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() })

    const { filter, value } = req.query

    const filteredUsers = filter
        ? mockData.filter(user =>
            user[filter].toString()?.toLocaleLowerCase().includes(value.toString().toLocaleLowerCase())
        )
        : mockData

    return res.status(200).send(filteredUsers)
}

export const createUser = (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() })

    const newUser = {
        id: mockData.length + 1,                // built in
        name: req.body.name,                    // not nullable
        email: req.body.email,                  // not nullable
        age: req.body.age || null,              // nullable
        address: req.body.address || null,      // nullable
        isActive: true,                         // built in
        role: req.body.role || 'viewer',        // nullable
        joinedDate: new Date().toISOString(),   // built in
    }
    mockData.push(newUser)

    return res.status(201).send(newUser)
}

export const updateUser = (req, res) => {
    const { params: { id } } = req

    // is item exist in dataset
    const validation = findItemOrError(mockData, id)

    if (validation.error)
        return res.status(validation.status).send({ errors: validation.error })

    // general validation
    const errors = validationResult(req)

    if (!errors.isEmpty())
        return res.status(400).send({ errors: errors.array() })

    const { matchedItemIndex: matchedUserIndex } = validation

    mockData[matchedUserIndex] = {
        id,                                                 // built in
        name: req.body.name,                                // not nullable
        email: req.body.email,                              // not nullable
        age: req.body.age || null,                          // nullable
        address: req.body.address || null,                  // nullable
        isActive: req.body.isActive || false,               // nullable
        role: req.body.role || 'viewer',                    // nullable
        joinedDate: mockData[matchedUserIndex].joinedDate   // built in
    }

    return res.status(200).send(mockData[matchedUserIndex])
}

export const patchUser = (req, res) => {
    const { params: { id } } = req

    const validation = findItemOrError(mockData, id)

    if (validation.error)
        return res.status(validation.status).send({ errors: validation.error })

    const errors = validationResult(req)

    if (!errors.isEmpty())
        res.status(400).json({ errors: errors.array() })

    const { matchedItemIndex: matchedUserIndex } = validation

    mockData[matchedUserIndex] = {
        ...mockData[matchedUserIndex],
        ...req.body
    }

    return res.status(200).send(mockData[matchedUserIndex])
}

export const deleteUser = (req, res) => {
    const { params: { id } } = req

    const validation = findItemOrError(mockData, id)

    if (validation.error)
        return res.status(validation.status).send({ errors: validation.error })

    const { matchedItemIndex: matchedUserIndex } = validation

    mockData.splice(matchedUserIndex, 1)

    return res.status(200).send({ msg: 'User successfully deleted.' })
}