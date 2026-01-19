const branchService = require('../services/branch.service')

exports.createBranch = async (req, res) => {
try {
    const branch = await branchService.createBranch(req.body)
    res.json({
        message: 'Cabang berhasil dibuat',
        branch
    })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.getBranches = async (req, res) => {
    const branches = await branchService.getBranches()
    res.json(branches)
}
