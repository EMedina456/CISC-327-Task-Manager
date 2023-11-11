// Program Intention: Helper function to handle the user info
// Input/Output: Handle the info of a user
// Run Intention: Run with the other test cases

// Import files and dependencies here
import './../App.css'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { db } from '../firebase/firebase'
import { getDoc, doc } from 'firebase/firestore'
import { handleLogin } from './handleLogin'
import { getDocs, query, where, collection } from 'firebase/firestore'

// Get User Info
async function getUserInfo() {
  // Get the user's information
  const userAuth = getAuth()
  onAuthStateChanged(userAuth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      const uid = user.uid
      const userRef = doc(db, 'users', uid)
      getDoc(userRef)
        .then(async (docSnap) => {
          if (docSnap.exists()) {
            // Get the user's tasks and projects
            let userTasks = {}
            let userProjects = {}
            const t = query(
              collection(db, 'tasks'),
              where('members', 'array-contains', uid)
            )
            const taskSnapshot = await getDocs(t)
            taskSnapshot.forEach((doc) => {
              userTasks[doc.id] = doc.data()
            })
            console.log('userTasks', userTasks)

            for (let [key] of Object.entries(docSnap.data().projects)) {
              const projectDocRef = doc(db, 'projects', key)
              const projectDocSnap = await getDoc(projectDocRef)
              userProjects[projectDocSnap.id] = projectDocSnap.data()
            }
            // Set the user's tasks and projects
            return { user, userTasks, userProjects }
          } else {
            console.log('No such document!')
          }
        })
        .catch((error) => {
          console.log('Error getting document:', error)
        })
    }
  })
}

export { getUserInfo }
