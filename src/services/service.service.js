const prisma = require("../config/prisma");

exports.createService = async ({ name, price, branchId }) => {
    if (!name || !price || !branchId) {
        throw new Error("Data tidak lengkap");
    }

    return prisma.laundryService.create({
        data: {
            name,
            price: Number(price),
            branchId,
        },
    });
};

exports.getServicesByBranch = async (branchId) => {
    return prisma.laundryService.findMany({
        where: { branchId },
    });
};
