const paymentService = require("../services/payment.service");

exports.uploadProof = async (req, res) => {
    try {
        const payment = await paymentService.uploadProof({
            orderId: req.params.orderId,
            filename: req.file.filename,
            userId: req.user.id,
        });

        res.json({
            message: "Bukti pembayaran berhasil diupload",
            payment,
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.verifyPayment = async (req, res) => {
    try {
        const payment = await paymentService.verifyPayment({
            paymentId: req.params.paymentId,
            status: req.body.status,
        });

        res.json({
            message: "Pembayaran diverifikasi",
            payment,
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
