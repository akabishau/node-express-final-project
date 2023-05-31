const Transaction = require('../models/Transaction')
const { StatusCodes } = require('http-status-codes')

const createTransaction = async (req, res) => {
    req.body.createdBy = req.user.userId
    const transaction = await Transaction.create(req.body)
    res.status(StatusCodes.CREATED).json( { transaction })
}


module.exports = {
    createTransaction
}