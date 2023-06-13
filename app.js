require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()


app.use(express.json())

// extra packages
const helmet = require('helmet')
app.use(helmet())

const cors = require('cors')
app.use(cors())

const xss = require('xss-clean')
app.use(xss())

const rateLimiter = require('express-rate-limit')
app.set('trust proxy', 1) // to deploy on heroku (render.com ?)
app.use(rateLimiter({ windowMs: 15 * 60 * 1000, max: 100 })) // each IP 100 request per 15 minutes



// routes
app.get('/', (req, res) => {
  res.send('transactions api')
});

const authRouter = require('./routes/auth')
app.use('/api/v1/auth', authRouter)

const authenticateUser = require('./middleware/authentication')
const transactionsRouter = require('./routes/transactions')
app.use('/api/v1/transactions', authenticateUser, transactionsRouter)

// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

// server and db connection
const port = process.env.PORT || 3000
const connectDB = require('./db/connect')
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error)
  }
};

start()
