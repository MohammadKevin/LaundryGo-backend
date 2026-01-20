const prisma = require('../config/prisma')

exports.uploadProof = async ({ orderId, filename, userId }) => {
    const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: { payment: true }
    })

    if (!order) throw new Error('Order tidak ditemukan')
    if (order.userId !== userId)
        throw new Error('Bukan order milik kamu')

    if (!order.payment)
        throw new Error('Order ini bukan QRIS')

    return prisma.payment.update({
        where: { orderId },
        data: {
            proof: filename,
            status: 'MENUNGGU_KONFIRMASI'
        }
    })
}

exports.verifyPayment = async ({ paymentId, status }) => {
    if (!['DITERIMA', 'DITOLAK'].includes(status)) {
        throw new Error('Status tidak valid')
    }

    const payment = await prisma.payment.update({
        where: { id: paymentId },
        data: { status },
        include: { order: true }
    })

    if (status === 'DITERIMA') {
        await prisma.order.update({
            where: { id: payment.orderId },
            data: {
                status: 'MENUNGGU_ANTRIAN'
            }
        })
    }

    if (status === 'DITOLAK') {
        await prisma.order.update({
            where: { id: payment.orderId },
            data: {
                status: 'MENUNGGU_PEMBAYARAN'
            }
        })
    }

    return payment
}