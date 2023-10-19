import { Link } from 'react-router-dom'
import { useState } from 'react'
const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = (e) => {
    console.log('username', username)
    console.log('password', password)
  }
  return (
    <div class="flex flex-col justify-center items-center h-screen w-screen">
      <h1 class="text-6xl text-left font-extrabold p-10">Login</h1>
      <form onSubmit={handleSubmit}>
        <div class="">
          <label>
            <h1 class="text-4xl font-bold mb-4">username</h1>
            <input
              type="text"
              id="username"
              class="box-border h-8 w-44 p-4 border-4"
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label>
            <h1 class="text-4xl font-bold mb-4 mt-4">password</h1>
            <input
              type="password"
              id="password"
              class="box-border h-8 w-44 p-4 border-4"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <div class="justify-center items-center text-center">
            <Link to="/">
              <p class="text-xl font-bold mt-2 underline decoration-[#0acdff]">
                Submit
              </p>
            </Link>
          </div>
        </div>
      </form>
      <div class="justify-center items-center">
        <Link to="/signup">
          <p class="text-l font-bold mt-2 underline decoration-[#0acdff]">
            Sign Up
          </p>
        </Link>
      </div>
    </div>
  )
}
export default Login
