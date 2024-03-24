import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'


const Notification = ({ message, className }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={`${className}`}>
      {message}
    </div>
  )
}



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  let newTitle = ''
  let newAuthor = ''
  let newUrl = ''

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
      const loggedUserJSON = window.localStorage.getItem('loggedUser')

      if (loggedUserJSON) {
        setUser(JSON.parse(loggedUserJSON))
      
        blogService.setToken(JSON.parse(loggedUserJSON).token)
        console.log(JSON.parse(loggedUserJSON).token)
      }
    }

    )
  }, [])



  const loginForm = () => {
    return (
  
      <LoginForm setUser={setUser} setErrorMessage={setErrorMessage}/>

    )
  }
  const logoutEvent = () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
    console.log('logout')
  }
  const addNewBlogEvent = () => {
    console.log('addNewBlogEvent')
    const blog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    blogService.addBlog(blog).then(returnedBlog => {
    
      setBlogs(blogs.concat(returnedBlog))
      newTitle = ''
      newAuthor = ''
      newUrl = ''

    })
    
    console.log(blog)
  }

  const blogForm = () => {
    return (

      <div>
        <h2>blogs</h2>
        <span>{user.name} logged in </span>
        <button onClick={() => logoutEvent()}>logout</button>
        <h2>create new</h2>
        <form onSubmit={addNewBlogEvent}>
          <div>
            <span>title:</span>
            <input type="text" onChange={({ target }) => newTitle = target.value} />
            <p></p>
            <span>author:</span>
            <input type="text" onChange={({ target }) => newAuthor = target.value} />
            <p></p>
            <span>url:</span>
            <input type="text" onChange={({ target }) => newUrl = target.value} />
            <p></p>
            <button type="submit">Subir</button>
          </div>
        </form>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>

    )
  }

  return (
    <div>
      <Notification message={errorMessage} className='error' />
      <Notification message={successMessage} className='success' />
      {user === null && loginForm()}
      {user !== null && blogForm()}
    </div>

  )
}


export default App
