const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')


const register = async (req, res) => {
    try {
        const user = await User.create({...req.body}) // hashing pswd using mongoose pre method
        const token = user.createJWT()
        res.status(StatusCodes.CREATED).json({
            user: {name: user.name}, token
        })
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'failed',
            msg: err.message
        })
    }
}

module.exports = { register }