// Program Intention: Handle the signup of the user
// Input/Output: Handle the username and password of the user
// Run Intention: Run with the entire website

// Import files and dependencies here
import { Link } from 'react-router-dom'
import { useState } from 'react'
const Signup = () => {
  // Variables used in the page to handle the username and password
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // Handle the submit of the username and password, currently just console logs them
  const handleSubmit = (e) => {
    console.log('username', username)
    console.log('password', password)
  }

  // Signup Page
  return (
    <div class="flex flex-col justify-center items-center h-screen w-screen">
      {/* Handle the form of signup*/}
      <h1 class="text-6xl text-left font-extrabold p-10">Signup</h1>
      <form onSubmit={handleSubmit}>
        <div class="">
          {/* Handle the username input*/}
          <label>
            <h1 class="text-4xl font-bold mb-4">username</h1>
            <input
              type="text"
              id="username"
              class="box-border h-8 w-44 p-4 border-4"
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          {/* Handle the password input*/}
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
            {/* Handle the submit button, which currently just returns to home page*/}
            <Link to="/">
              <p class="text-xl font-bold mt-2 underline decoration-[#0acdff]">
                Submit
              </p>
            </Link>
          </div>
        </div>
      </form>
      <div class="justify-center items-center">
        {/* Handle the login button, if user already has an account, which currently just returns to login page*/}
        <Link to="/login">
          <p class="text-l font-bold mt-2 underline decoration-[#0acdff]">
            Login
          </p>
        </Link>
      </div>
    </div>
  )
}
export default Signup
