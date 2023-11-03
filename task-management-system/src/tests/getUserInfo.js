// Program Intention: Helper function to handle the user info
// Input/Output: Handle the info of a user
// Run Intention: Run with the other test cases

// Import files and dependencies here
import './../App.css'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { db } from '../firebase/firebase'
import { getDoc, doc } from 'firebase/firestore'
import { handleLogin } from './handleLogin'

// Get User Info
async function getUserInfo() {
  // Login
  await handleLogin('t@t.com', 'test123')
  try {
    // Get the user info
    const auth = getAuth()

    // Check if the user is logged in
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in

        // Get the user info
        const uid = user.uid
        const userRef = doc(db, 'users', uid)

        // Get the document of user info
        getDoc(userRef)
          .then((docSnap) => {
            // Update the tasks and user projects
            if (docSnap.exists()) {
              // setTasks(docSnap.data().tasks);

              let userTasks = []
              let userProjects = []
              for (let key of docSnap.data().tasks) {
                userTasks.push(key)
              }
              for (let [key, value] of Object.entries(
                docSnap.data().projects
              )) {
                userProjects.push(key)
              }
              // Return the user info
              return { user }
            } else {
              console.log('No such document!')
            }
          })
          // Handle the error
          .catch((error) => {
            console.log('Error getting document:', error)
          })
      } else {
        console.log('No user is signed in')
      }
    })
    // Handle the error
  } catch (error) {
    return error
  }
}

export { getUserInfo }
