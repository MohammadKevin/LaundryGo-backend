const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth.middleware')
const controller = require('../controllers/order.controller')

router.post(
    '/',
    auth,
    controller.createOrder
)

module.exports = router
