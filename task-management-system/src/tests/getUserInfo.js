// Import files and dependencies here
import './../App.css'
import { auth } from '../firebase/firebase'
import { signOut, getAuth, onAuthStateChanged } from 'firebase/auth'
import { db } from '../firebase/firebase'
import { getDoc, collection, setDoc, doc } from 'firebase/firestore'
import { handleLogin } from './handleLogin'

async function getUserInfo() {
  await handleLogin('t@t.com', 'test123')
  try {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid
        const userRef = doc(db, 'users', uid)
        getDoc(userRef)
          .then((docSnap) => {
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
              return { user }
            } else {
              // doc.data() will be undefined in this case
              console.log('No such document!')
            }
          })
          .catch((error) => {
            console.log('Error getting document:', error)
          })
      } else {
        console.log('No user is signed in')
      }
    })
  } catch (error) {
    return error
  }
}

export { getUserInfo }
