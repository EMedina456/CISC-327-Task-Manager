// Program Intention: Helper function to handle the creation of a user
// Input/Output: Handle the creation of a user
// Run Intention: Run with the other test cases

// Import files and dependencies here
import { auth, db } from '../firebase/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

// Create User
const handleSignup = async (email, password) => {
  let error = null
  let result = null
  let uid = null
  try {
    // Create the user
    const results = await createUserWithEmailAndPassword(auth, email, password)
    const userRef = doc(db, 'users', results.user.uid)
    uid = results.user.uid

    // Add the user to the database
    let userEmail = results.user.email
    result = await setDoc(userRef, {
      email: userEmail,
      projects: {},
      tasks: {},
    })
      .then(() => {
        window.location.href = '/'
      })
      .catch((e) => {
        console.error('Error writing document: ', e)
      })

    // Handle the error
  } catch (error) {
    return error.code
  }
  return { result, error, uid }
}

export { handleSignup }
