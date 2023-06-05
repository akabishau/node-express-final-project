const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema(
    {
        transType: {
            type: String,
            enum: ['expense', 'income', 'transfer'],
            required: [true, 'Transaction type is required']
        },
        category: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: [true, 'Amount is required']
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Transaction', TransactionSchema)