// Program Intention: Handle the login of the user
// Input/Output: Handle the email and password of the user
// Run Intention: Run with the entire website

// Import files and dependencies here
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  // Variables used in the page to handle the email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle the submit of the email and password, currently just console logs them
  const handleSubmit = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = '/';
    } catch (error) {
      console.log(error);
    }
  };

  // Login Page
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      {/* Handle the form of login*/}
      <h1 className="text-6xl text-left font-extrabold p-10">Login</h1>
      <div className="">
        <label>
          <h1 className="text-4xl font-bold mb-4">email</h1>
          {/* Handle the email input*/}
          <input
            type="text"
            id="email"
            className="box-border h-8 w-44 p-4 border-4"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        {/* Handle the password input*/}
        <label>
          <h1 className="text-4xl font-bold mb-4 mt-4">password</h1>
          <input
            type="password"
            id="password"
            className="box-border h-8 w-44 p-4 border-4"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div className="justify-center items-center text-center">
          {/* Handle the submit button, which currently just returns to home page*/}
          <button
            onClick={handleSubmit}
            className="text-xl font-bold mt-2 underline decoration-[#0acdff]">
            Submit
          </button>
        </div>
      </div>
      <div className="justify-center items-center">
        {/* Handle the sign up button, if user does not have an account, which currently just returns to sign up page*/}
        <Link to="/signup">
          <p className="text-l font-bold mt-2 underline decoration-[#0acdff]">
            Sign Up
          </p>
        </Link>
      </div>
    </div>
  );
};
export default Login;
