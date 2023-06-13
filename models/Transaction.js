const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema(
    {
        transType: {
            type: String,
            enum: ['expense', 'income'],
            required: [true, 'Transaction type is required']
        },
        category: {
            type: String,
            required: [true, 'Category is required']
        },
        amount: {
            type: Number,
            required: [true, 'Amount is required']
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: [true, 'Valid UserID is required']
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Transaction', TransactionSchema)