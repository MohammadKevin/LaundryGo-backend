const serviceService = require('../services/service.service')

exports.createService = async (req, res) => {
    try {
        const service = await serviceService.createService(req.body)
        res.json({
            message: 'Service berhasil dibuat',
            service
        })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.getServicesByBranch = async (req, res) => {
    const { branchId } = req.params
    const services = await serviceService.getServicesByBranch(branchId)
    res.json(services)
}
