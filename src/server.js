require('dotenv').config()
const app = require('./app')

const PORT = process.env.PORT || 2026

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
