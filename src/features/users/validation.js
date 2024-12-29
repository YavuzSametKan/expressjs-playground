import {body, param, query} from 'express-validator'

export const validateGetUsers = [
    // Validate the 'filter' query parameter
    query('filter')
        .optional()
        .isIn(['name', 'email', 'age', 'isActive', 'role', 'joinedDate'])
        .withMessage('Invalid filter field. Allowed values are: name, email, age, isActive, role, joinedDate.'),

    // Validate the 'value' query parameter
    query('value')
        .optional()
        .notEmpty()
        .withMessage('Value must be a empty if provided.'),

    // Validate that 'filter' and 'value' are used together
    query(['filter', 'value'])
        .custom((_, { req }) => {
            const { filter, value } = req.query
            // Check if only one of 'filter' or 'value' is provided
            if ((filter && !value) || (value && !filter)) {
                throw new Error('Both filter and value must be provided together.')
            }
            return true // Validation passed
        })
]

export const commonUserValidation = [
    // Validate 'name'
    body('name')
        .if((_, { req }) => req.method === 'PATCH' ? req.body.hasOwnProperty('name') : true) // Check only if 'name' is present in PATCH
        .exists({ checkFalsy: true }) // Required for POST & PUT
        .withMessage('Name is required.')
        .bail()
        .isString()
        .withMessage('Name must be a string.')
        .trim()
        .notEmpty()
        .withMessage('Name cannot be an empty string.'),

    // Validate 'email'
    body('email')
        .if((_, { req }) => req.method === 'PATCH' ? req.body.hasOwnProperty('email') : true) // Check only if 'email' is present in PATCH
        .exists({ checkFalsy: true }) // Required for POST & PUT
        .withMessage('Email is required.')
        .bail()
        .isEmail()
        .withMessage('Email must be a valid email address.')
        .trim()
        .notEmpty()
        .withMessage('Email cannot be an empty string.'),

    // Validate 'age' (optional, must be an integer)
    body('age')
        .optional()
        .isInt({ min: 0, max: 255 }).withMessage('Age must be an integer between [0-255].'),

    // Validate 'address' (optional, must be an object with specific fields)
    body('address')
        .optional()
        .isObject().withMessage('Address must be an object.')
        .custom(address => {
            // Validate nested fields in the 'address' object
            const requiredFields = ['street', 'city', 'state', 'zip']
            for (const field of requiredFields) {
                if (!address[field]) {
                    throw new Error(`Address must contain '${field}'.`)
                }
            }
            return true
        }),

    // Validate 'isActive' field in the body (optional)
    body('isActive')
        .optional()
        .isBoolean()
        .withMessage('isActive must be a boolean.'),

    // Validate 'role' (optional, must be one of the allowed roles)
    body('role')
        .optional()
        .isIn(['viewer', 'admin', 'editor']).withMessage('Role must be one of: viewer, admin, editor.')
]