const express = require('express')
const cors = require('cors')

const authRoutes = require('./routes/auth.routes')
const branchRoutes = require('./routes/branch.routes')
const serviceRoutes = require('./routes/service.routes')
const orderRoutes = require('./routes/order.routes')


const app = express()
app.use(cors())
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/branch', branchRoutes)
app.use('/services', serviceRoutes)
app.use('/orders', orderRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'LaundryGo API running' })
})

module.exports = app
