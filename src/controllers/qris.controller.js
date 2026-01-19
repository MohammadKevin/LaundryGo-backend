const prisma = require('../config/prisma')

exports.createQris = async (req, res) => {
  try {
    const { branchId } = req.body
    const image = req.file.filename

    const qris = await prisma.qris.create({
      data: {
        branchId,
        image
      }
    })

    res.json({
      message: 'QRIS berhasil ditambahkan',
      qris
    })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

exports.getQrisByBranch = async (req, res) => {
  const { branchId } = req.params

  const qris = await prisma.qris.findUnique({
    where: { branchId }
  })

  res.json(qris)
}
