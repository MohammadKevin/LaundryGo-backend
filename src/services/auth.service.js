const prisma = require('../config/prisma')
const jwt = require('jsonwebtoken')
const { hashPassword, comparePassword } = require('../utils/hash')

exports.register = async ({ name, email, password }) => {
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) throw new Error('Email already used')

  const hashed = await hashPassword(password)

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashed,
      role: 'USER'
    }
  })

  return user
}

exports.login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) throw new Error('Invalid credentials')

  const valid = await comparePassword(password, user.password)
  if (!valid) throw new Error('Invalid credentials')

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )

  return { token, user }
}
