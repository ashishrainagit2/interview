// q1. Connection to mangoose

mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => console.log('DB connected'))
  .catch((err) => console.error(err))

// Write a simple node mangoose API call to get data

const express = require('express')
const mongoose = require('mongoose')

const app = express()

// 1) connect
mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => console.log('DB connected'))
  .catch((err) => console.error(err))

// 2) schema + model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
})

const User = mongoose.model('User', userSchema)

// 3) GET API — fetch all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find() // get data from MongoDB
    res.json(users)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// optional: get one by id
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ error: 'Not found' })
    res.json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.listen(3000, () => console.log('Server on 3000'))