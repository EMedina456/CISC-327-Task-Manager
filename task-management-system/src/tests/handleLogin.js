import { auth } from '../firebase/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
const handleLogin = async (email, password) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password)
    return { uid: user.user.uid, code: 'success' }
  } catch (error) {
    return error.code
  }
}
export { handleLogin }
