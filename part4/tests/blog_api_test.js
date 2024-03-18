const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)


const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  }

]



beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  const blogsArray = blogObjects.map((blog) => blog.save())
  await Promise.all(blogsArray)
  
})


test('4.8 Blog List Tests', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  assert.strictEqual(response.body.length, initialBlogs.length)

})


test('4.9 Blog List Tests, step 2', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  response.body.forEach(blog => {
    assert('id' in blog)
    assert(!('_id' in blog))
  })

})

test('4.10 Blog List Tests, step 3', async () => {
  const newBlog = {
    title: 'Testing Blog',
    author: 'Testing Author',
    url: 'https://testingfullstack.com/',
    likes: 3
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  assert.strictEqual((await Blog.find()).length, initialBlogs.length + 1)
})

test('4.11 Blog List Tests, step 4', async () => {
  const newBlog = {
    title: 'Testing Blog',
    author: 'Testing Author',
    url: 'https://testingfullstack.com/',
  }
  const savedBlogs = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  assert(savedBlogs.body.likes === 0)
})

test('4.12 Blog List Tests, step 5', async () => {
  const noUrlBlog = {
    title: 'no url',
    author: 'my url is missing!',
    likes: 2
  }
  const noTitleBlog = {
    author: 'my title is missing!',
    url: 'https://testingfullstack.com/',
    likes: 3
  }
  await api
    .post('/api/blogs')
    .send(noUrlBlog)
    .expect(400)
  await api
    .post('/api/blogs')
    .send(noTitleBlog)
    .expect(400)

})

test('4.13 Blog List Expansions, step 1', async () => {

  let allBlogs = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  await api
    .delete(`/api/blogs/${allBlogs.body[0].id}`)
    .expect(204)

  allBlogs = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(allBlogs.body.length, initialBlogs.length - 1)

})

test('4.14 Blog List Expansions, step 2', async () => {
  let allBlogs = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  const updatedBlog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: initialBlogs[0].url,
    likes: initialBlogs[0].likes + 1
  }
  await api
    .put(`/api/blogs/${allBlogs.body[0].id}`)
    .send(updatedBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  allBlogs = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)


  assert.strictEqual(allBlogs.body[0].title, updatedBlog.title)
  assert.strictEqual(allBlogs.body[0].author, updatedBlog.author)
  assert.strictEqual(allBlogs.body[0].likes, updatedBlog.likes)
  assert.strictEqual(allBlogs.body[0].url, updatedBlog.url)


})




after(async () => {
  await mongoose.connection.close()
})