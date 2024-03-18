const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')


usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1, id: 1 })

  response.json(users)

})

usersRouter.post('/', async (request, response) => {

  const body = request.body
  const saltRounds = 10



  if (body.passwordHash.length < 3) {
    return response.status(400).json({ error: 'password is too short' })
  }
  if (body.username.length < 3) {
    return response.status(400).json({ error: 'username is too short' })
  }

  const passwordHashGen = await bcrypt.hash(body.passwordHash, saltRounds)
  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash: passwordHashGen,
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)



})


module.exports = usersRouter