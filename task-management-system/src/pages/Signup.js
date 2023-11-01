// Program Intention: Handle the signup of the user
// Input/Output: Handle the email and password of the user
// Run Intention: Run with the entire website

// Import files and dependencies here
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Signup = () => {
  // Variables used in the page to handle the email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle the submit of the email and password, currently just console logs them
  const handleSubmit = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      window.location.href = '/';
    } catch (error) {
      console.log(error);
    }
  };

  // Signup Page
  return (
    <div class="flex flex-col justify-center items-center h-screen w-screen">
      {/* Handle the form of signup*/}
      <h1 class="text-6xl text-left font-extrabold p-10">Signup</h1>
      <div class="">
        {/* Handle the email input*/}
        <label>
          <h1 class="text-4xl font-bold mb-4">email</h1>
          <input
            type="text"
            id="email"
            class="box-border h-8 w-44 p-4 border-4"
            onChange={(e) => setEmail(e.target.value)}
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
          <button
            onClick={handleSubmit}
            class="text-xl font-bold mt-2 underline decoration-[#0acdff]">
            Submit
          </button>
        </div>
      </div>
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
