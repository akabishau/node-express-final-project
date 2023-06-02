const Transaction = require('../models/Transaction')
const { StatusCodes } = require('http-status-codes')
const { NotFoundError } = require('../errors')


const getAllTransactions = async (req, res) => {
    const transactions = await Transaction.find({ createdBy: req.user.userId }).sort('createdAt')
    res.status(StatusCodes.OK).json({
        status: 'Success',
        count: transactions.length,
        transactions
    })
}


const getSingleTransaction = async (req, res) => {
    // get single transaction for specific user by transaction id
    const { user: { userId }, params: { id: transactionId } } = req //deconstracted version
    const transaction = await Transaction.findOne({ createdBy: userId, _id: transactionId })

    if (!transaction) {
        throw new NotFoundError(`No transaction with id: ${transactionId} found`)
    }

    res.status(StatusCodes.OK).json({
        status: 'Success',
        transaction
    })
}


const createTransaction = async (req, res) => {
    req.body.createdBy = req.user.userId // add user Id to the request's body
    const transaction = await Transaction.create(req.body)
    console.log(req.body)
    console.log(transaction)
    res.status(StatusCodes.CREATED).json({
        status: 'Success',
        msg: `Transaction has been created`,
        transaction
    })
}



const updateTransaction = async (req, res) => {
    // TODO: - add validation based on future model changes - explore mongoos validations
    // for now update everything that come from request's body 
    const { user: { userId }, params: { id: transactionId } } = req

    const transaction = await Transaction.findOneAndUpdate(
        { createdBy: userId, _id: transactionId }, //filter
        req.body,// update 
        { new: true, runValidators: true } // options
    )

    if (!transaction) {
        throw new NotFoundError(`No transaction with id: ${transactionId} found`)
    }

    res.status(StatusCodes.OK).json({
        status: 'Success',
        msg: `Transaction has been updated`,
        transaction
    })
}



const deleteTransaction = async (req, res) => {

    const { user: { userId }, params: { id: transactionId } } = req
    const transaction = await Transaction.findOneAndDelete({ createdBy: userId, _id: transactionId })

    if (!transaction) {
        throw new NotFoundError(`No transaction with id: ${transactionId}`)
    }

    res.status(StatusCodes.OK).json({
        status: 'Success',
        msg: `Transaction with id: ${transactionId} has been removed`
    })
}

module.exports = {
    createTransaction,
    getAllTransactions,
    getSingleTransaction,
    updateTransaction,
    deleteTransaction
}