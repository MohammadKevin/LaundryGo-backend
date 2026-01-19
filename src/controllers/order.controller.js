const orderService = require('../services/order.service')

exports.createOrder = async (req, res) => {
    try {
        const order = await orderService.createOrder({
            userId: req.user.id,
            ...req.body
        })

        res.json({
            message: 'Order berhasil dibuat',
            order
        })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}
