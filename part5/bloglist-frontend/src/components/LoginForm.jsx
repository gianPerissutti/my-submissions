import loginService from '../services/login'
import { useState } from 'react'

const LoginForm = ({ setUser, setErrorMessage }) => {

  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)



  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      setUser(user)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      ) 

      setUsername('')
      setPassword('')
      setErrorMessage(null)

    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 2000)
      console.log('wrong credentials')
    }

  }


 
return (
  <div>
    <form onSubmit={handleLogin}>
      <div>
        username
        <input type="text" onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        password
        <input type="password" onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type="submit" >login</button>
    </form>
  </div>
)

}


export default LoginForm