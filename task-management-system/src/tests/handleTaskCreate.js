// Program Intention: Helper function to handle the creation of a task
// Input/Output: Handle the creation of a task
// Run Intention: Run with the test cases

// Import files and dependencies here
import { setDoc, addDoc, doc, collection, getDoc } from 'firebase/firestore'
import { db } from '../firebase/firebase'

// Create Task
const handleCreateTask = async (new_task, user) => {
  try {
    const task = collection(db, 'tasks')
    const task_data = {
      name: new_task.name,
      description: new_task.description,
      priority: new_task.priority,
      deadline: new_task.deadline,
      project: new_task.project,
      members: [user.uid],
    }

    return 'success'
  } catch (error) {
    return error
  }
}
export { handleCreateTask }
