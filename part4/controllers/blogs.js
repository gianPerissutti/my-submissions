const blogRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')



blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
 
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)
  if ('likes' in request.body === false) {
    request.body.likes = 0
  }

  if ('title' in request.body === false) {
    return response.status(400).json({ error: 'title is missing' })
  }
  if ('url' in request.body === false) {
    return response.status(400).json({ error: 'url is missing' })
  }


  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  })


  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)

})

blogRouter.delete('/:id', async (request, response) => {

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()

})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    likes: body.likes,
    author: body.author,
    title: body.title,
    url: body.url
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)

})

module.exports = blogRouter