const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors/index')

const register = async (req, res) => {
    try {
        const user = await User.create({...req.body}) // hashing pswd using mongoose pre method
        // TODO: is it necessary to generate token during the registration
        const token = user.createJWT()
        res.status(StatusCodes.CREATED).json({
            status: 'Success',
            msg: 'New user has been created',
            user: {name: user.name} , token
        })
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'failed',
            msg: err.message
        })
    }
}


const login = async (req, res) => {

    const { email, password } = req.body
    if (!email || !password) {
        throw new BadRequestError('Both Email and Password are required')
    }

    const user = await User.findOne({ email })
    console.log(user)
    if (!user) {
        throw new UnauthenticatedError(`Couldn't find Email`)
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Incorrect Password')
    }

    const token = user.createJWT()

    res.status(StatusCodes.OK).json({
        status: 'Success',
        user: { name: user.name },
        token
    })
}

module.exports = { register, login }