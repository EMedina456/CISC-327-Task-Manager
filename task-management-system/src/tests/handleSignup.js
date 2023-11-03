import { auth, db } from '../firebase/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
const handleSignup = async (email, password) => {
  let error = null
  let result = null
  let uid = null
  try {
    const results = await createUserWithEmailAndPassword(auth, email, password)
    const userRef = doc(db, 'users', results.user.uid)
    uid = results.user.uid
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
  } catch (error) {
    return error.code
  }
  return { result, error, uid }
}

export { handleSignup }
