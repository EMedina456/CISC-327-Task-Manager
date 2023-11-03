// Program Intention: Helper function to handle the login of a user
// Input/Output: Handle the login of a user
// Run Intention: Run with the other test cases

// Import files and dependencies here
import { auth } from '../firebase/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

// Handle Login Function
const handleLogin = async (email, password) => {
  try {
    // Sign in the user with the email and password
    const user = await signInWithEmailAndPassword(auth, email, password)

    // Return the user id and success code
    return { uid: user.user.uid, code: 'success' }
  } catch (error) {
    // Return the error code
    return error.code
  }
}
export { handleLogin }
