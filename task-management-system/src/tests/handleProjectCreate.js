// Program Intention: Helper function to handle the creation of a project
// Input/Output: Handle the creation of a project
// Run Intention: Run with the other test cases

// Import files and dependencies here
import { setDoc, addDoc, doc, collection } from 'firebase/firestore'
import { db } from '../firebase/firebase'

// Create Project
const handleCreateProject = async (user, project_name, description) => {
  // Create a project
  try {
    // Create the fields of a project
    const project = collection(db, 'projects')
    const proj_data = {
      name: project_name,
      description: description,
      tasks: {},
      members: {},
      user_permissions: { [user.uid]: 'owner' },
    }
    // Add the project to the database
    const projRef = await addDoc(project, proj_data)
    const proj_id = projRef.id

    // Add the project to the user's projects
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

    // Handle the error
  } catch (error) {
    return error
  }
}

export { handleCreateProject }
