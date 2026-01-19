const prisma = require('../config/prisma')

exports.createBranch = async ({ name, address, phone }) => {
    if (!name || !address || !phone) {
        throw new Error('Data tidak lengkap')
    }

    return prisma.branch.create({
        data: {
        name,
        address,
        phone
        }
    })
}

exports.getBranches = async () => {
    return prisma.branch.findMany()
}