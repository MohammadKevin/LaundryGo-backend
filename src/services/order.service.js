const prisma = require('../config/prisma')

exports.createOrder = async ({
    userId,
    branchId,
    serviceId,
    estimasiBerat,
    paymentMethod
}) => {
    if (!branchId || !serviceId || !estimasiBerat || !paymentMethod) {
        throw new Error('Data tidak lengkap')
    }

    const service = await prisma.laundryService.findUnique({
        where: { id: serviceId }
    })

    if (!service) throw new Error('Service tidak ditemukan')

    const estimasiHarga = service.price * Number(estimasiBerat)

    const order = await prisma.order.create({
        data: {
            userId,
            branchId,
            serviceId,
            estimasiBerat: Number(estimasiBerat),
            totalHarga: estimasiHarga,
            paymentMethod,
            status:
                paymentMethod === 'QRIS'
                    ? 'MENUNGGU_PEMBAYARAN'
                    : 'MENUNGGU_KONFIRMASI'
        }
    })

    if (paymentMethod === 'QRIS') {
        await prisma.payment.create({
            data: {
                orderId: order.id,
                amount: estimasiHarga,
                method: 'QRIS',
                status: 'MENUNGGU_UPLOAD'
            }
        })
    }

    return order
}
