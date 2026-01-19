const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth.middleware')
const role = require('../middlewares/role.middleware')
const controller = require('../controllers/branch.controller')

router.post(
    '/add',
    auth,
    role(['ADMIN']),
    controller.createBranch
)

router.get('/', controller.getBranches)

module.exports = router
