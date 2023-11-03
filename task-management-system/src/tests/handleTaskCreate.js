import { setDoc, addDoc, doc, collection } from 'firebase/firestore'
import { db } from '../firebase/firebase'
const handleCreateTask = async (user, project_name, description) => {
  try {
    const project = collection(db, 'projects')
    const proj_data = {
      name: project_name,
      description: description,
      tasks: {},
      members: {},
      user_permissions: { [user.uid]: 'owner' },
    }
    const projRef = await addDoc(project, proj_data)
    const proj_id = projRef.id
    if (user) {
      const userRef = doc(db, 'users', user.uid)
      setDoc(
        userRef,
        {
          projects: {
            [proj_id]: 'owner',
          },
        },
        { merge: true }
      )
      return 'success'
    } else {
      console.log('No user is signed in')
    }
    console.log('Document written with ID: ', projRef.id)
    window.location.href = '/'
  } catch (error) {
    return error
  }
}

export { handleCreateTask }
