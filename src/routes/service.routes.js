const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth.middleware')
const role = require('../middlewares/role.middleware')
const controller = require('../controllers/service.controller')

router.post(
    '/',
    auth,
    role(['ADMIN']),
    controller.createService
)

router.get(
    '/branch/:branchId',
    controller.getServicesByBranch
)

module.exports = router
