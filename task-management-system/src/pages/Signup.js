// Program Intention: Handle the signup of the user
// Input/Output: Handle the email and password of the user
// Run Intention: Run with the entire website

// Import files and dependencies here
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { auth, db } from '../firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  // Variables used in the page to handle the email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle the submit of the email and password, currently just console logs them
  const handleSubmit = async () => {
    let error = null;
    let result = null;

    try {
      const results = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userRef = doc(db, 'users', results.user.uid);
      let userEmail = results.user.email;
      result = await setDoc(userRef, {
        email: userEmail,
        projects: {},
        tasks: {},
      })
        .then(() => {
          window.location.href = '/';
        })
        .catch((e) => {
          console.error('Error writing document: ', e);
        });
    } catch (error) {
      if (error.code === 'auth/weak-password') {
        toast('Password must be at least 6 characters long!', {
          pauseOnHover: false,
          type: 'error',
        });
      } else if (error.code === 'auth/email-already-in-use') {
        toast('Email already in use!', {
          pauseOnHover: false,
          type: 'error',
        });
      } else if (error.code === 'auth/invalid-email') {
        toast('Invalid email!', {
          pauseOnHover: false,
          type: 'error',
        });
      }
      console.log(error);
      return;
    }
    return { result, error };
  };

  // Signup Page
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      {/* Handle the form of signup*/}
      <h1 className="text-6xl text-left font-extrabold p-10">Signup</h1>
      <div className="">
        {/* Handle the email input*/}
        <label>
          <h1 className="text-4xl font-bold mb-4">email</h1>
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
        {/* Handle the login button, if user already has an account, which currently just returns to login page*/}
        <Link to="/login">
          <p className="text-l font-bold mt-2 underline decoration-[#0acdff]">
            Login
          </p>
        </Link>
      </div>
      <ToastContainer />
    </div>
  );
};
export default Signup;
