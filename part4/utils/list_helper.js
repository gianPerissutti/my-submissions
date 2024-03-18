const lodash = require('lodash')


const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {

  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)

}

const favoriteBlog = (blogs) => {

  const favBlog = blogs.filter(blog => blog.likes === Math.max(...blogs.map(blog => blog.likes)))
  return favBlog[0]
}

const mostBlogs = (blogs) => {

  const authorBlogCount = lodash.countBy(blogs, 'author')
  //console.log('authorBlogCount:', authorBlogCount)
  const authorMostBlogs = lodash.maxBy(lodash.keys(authorBlogCount), (author) => authorBlogCount[author])
  //console.log('authorMostBlogs:', authorMostBlogs)

  return {
    author: authorMostBlogs,
    blogs: authorBlogCount[authorMostBlogs]
  }
}



module.exports =
{
  mostBlogs,
  favoriteBlog,
  dummy,
  totalLikes,
}