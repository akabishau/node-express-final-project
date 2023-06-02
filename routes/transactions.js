const express = require('express')
const router = express.Router()

const {
    createTransaction,
    getAllTransactions,
    getSingleTransaction,
    updateTransaction,
    deleteTransaction
} = require('../controllers/transactions')

router.route('/').get(getAllTransactions).post(createTransaction)
router.route('/:id').get(getSingleTransaction).patch(updateTransaction).delete(deleteTransaction)

module.exports = router