const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth.middleware')
const role = require('../middlewares/role.middleware')
const upload = require('../middlewares/upload.middleware')
const controller = require('../controllers/payment.controller')

router.post(
    '/:orderId/upload',
    auth,
    upload.single('proof'),
    controller.uploadProof
)

router.patch(
    '/:paymentId/verify',
    auth,
    role(['STAFF']),
    controller.verifyPayment
)

module.exports = router
