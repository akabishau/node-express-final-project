//const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')


const authenticateUser = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader && !authHeader.startsWith('Bearer')) {
        throw new UnauthenticatedError('Authentication invalid')
    }

    const token = authHeader.split(' ')[1]
    //TODO: does it make sense to make the model to the token validation (the same way it signs the token)
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
            throw new UnauthenticatedError('Authentication invalid')
        } else {
            req.user = { userId: decoded.userId, name: decoded.name }
            next()
        }
    })
}

module.exports = authenticateUser