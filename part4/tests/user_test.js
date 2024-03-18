
const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const api = supertest(app)
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')


describe('User tests', () => {


  beforeEach(async () => {
    await User.deleteMany({})
    const password = 'password'
    const passwordHash = await bcrypt.hash(password, 10)
    const user = new User({ username: 'root', passwordHash, name: 'super' })
    await user.save()
  })

  test('users are returned as json', async () => {
    const response = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, 1)
  })

  test('add user', async () => {

    const newUser = {
      username: 'newUser',
      name: 'newUser',
      passwordHash: 'newUser'
    }
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await User.find({})
    assert.strictEqual(usersAtEnd.length, 2)
    console.log(response.body)
    assert.strictEqual(response.body.username , 'newUser')
    assert.strictEqual(response.body.name , 'newUser')

  })

  test('add user with short password', async () => {

    const newUser = {
      username: 'newUser',
      name: 'newUser',
      passwordHash: 'ne'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

  })

  test('add user with short username', async () => {

    const newUser = {
      username: 'ne',
      name: 'newUser',
      passwordHash: 'newUser'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

  })

})


after(async () => {
  await mongoose.connection.close()
})
