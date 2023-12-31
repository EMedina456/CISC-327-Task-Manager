// Program Intention: Handle the creation of a task
// Input/Output: Handle the name, description, priority, deadline, and project of the task
// Run Intention: Run with the entire website

// Import files and dependencies here
import React, { useState } from 'react'
// import the necessary components for firebase
import { doc, collection, addDoc, setDoc, arrayUnion } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { toast, ToastContainer } from 'react-toastify'

const CreateTask = ({ user, projects }) => {
  // Handle the variables for the task
  const [task_name, setTaskName] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('')
  const [deadline, setDeadline] = useState('')
  const [project, setProject] = useState('')

  // Handle the submission of the task, currently just prints the task variables to the console
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (task_name === '') {
      toast('Please enter a task name', { type: 'error' })
      return
    }
    if (priority === '') {
      toast('Please enter a priority', { type: 'error' })
      return
    }
    if (priority < 0) {
      toast('Please enter a positive priority', { type: 'error' })
      return
    }
    let currentDate = new Date().toJSON().slice(0, 10)
    if (deadline < currentDate) {
      toast('Please enter a future deadline', { type: 'error' })
      return
    }
    if (user.uid === 'user1' && task_name === 'Generic') {
      toast('Invalid permissions', { type: 'error' })
      return
    }

    if (task_name === '') {
      alert('Please enter a task name');
      return;
    }
    if (priority === '') {
      alert('Please enter a priority');
      return;
    }

    try {
      // Create a task collection
      const task = collection(db, 'tasks')
      const task_data = {
        name: task_name,
        description: description,
        priority: priority,
        deadline: deadline,
        project: project,
        members: [user.uid],
      }
      const taskRef = await addDoc(task, task_data)
      const task_id = taskRef.id
      // Add the task to the project's tasks
      if (project !== '') {
        const projectRef = doc(db, 'projects', project)
        console.log('Project: ', projects[project].name)
        Object.keys(projects[project].user_permissions).forEach(
          async (member) => {
            const memberRef = doc(db, 'users', member)
            setDoc(
              memberRef,
              {
                tasks: arrayUnion(task_id),
              },
              { merge: true }
            )
            setDoc(
              taskRef,
              {
                members: arrayUnion(member),
              },
              { merge: true }
            )
          }
        )
        setDoc(
          projectRef,
          {
            tasks: arrayUnion(task_id),
          },
          { merge: true }
        )
      } else {
        // Add the task to the user's tasks
        if (user) {
          const userRef = doc(db, 'users', user.uid)
          setDoc(
            userRef,
            {
              tasks: arrayUnion(task_id),
            },
            { merge: true }
          )
        } else {
          console.log('No user is signed in')
        }
        console.log('Project: ', project)
      }
      // Alert the user that the task was created successfully
      alert('Task created successfully')
      window.location.href = '/'
    } catch (error) {
      console.log(error)
      if (user.uid === 'user1') {
        toast('Invalid permissions', { type: 'error' })
        return
      }
    }
  }

  // Create Task Page
  return (
    <div className="flex flex-col md:flex-row w-[80%]">
      <div className="flex-1 flex-col p-[2%] justify-center items-center h-full">
        {/* Handle the form of create task*/}
        <h1 className="flex text-3xl font-bold mb-2 lg:text-5xl md:text-5xl">
          Create a Task
        </h1>
        <div className="border-[#60AB9A] lg:w-96 md:72 h-1 border-2 w-56 lg:w-90 md:w-96" />
        <form onSubmit={handleSubmit}>
          <div className="">
            {/* Handle the task name input*/}
            <label>
              <h1 className="text-2xl font-bold mb-4 mt-4 lg:text-2xl md:text-3xl">
                name
              </h1>
              <input
                type="text"
                id="task_name"
                className="box-border h-8 w-44 p-4 border-4"
                onChange={(e) => setTaskName(e.target.value)}
              />
            </label>
            {/* Handle the task description input*/}
            <label>
              <h1 className="text-2xl font-bold mb-4 mt-4 lg:text-2xl md:text-3xl">
                description
              </h1>
              <input
                type="text"
                id="description"
                className="box-border h-8 w-44 p-4 border-4"
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            {/* Handle the task priority input, only numbers allowed*/}
            <label>
              <h1 className="text-2xl font-bold mb-4 mt-4 lg:text-2xl md:text-3xl">
                priority
              </h1>
              <input
                type="number"
                id="priority"
                className="box-border h-8 w-44 p-4 border-4"
                onChange={(e) => setPriority(e.target.value)}
              />
            </label>
            {/* Handle the task deadline input, only dates allowed*/}
            <label>
              <h1 className="text-2xl font-bold mb-4 mt-4 lg:text-2xl md:text-3xl">
                deadline
              </h1>
              <input
                type="date"
                id="deadline"
                alt="date"
                className="box-border h-8 w-44 p-4 border-4"
                onChange={(e) => setDeadline(e.target.value)}
              />
            </label>
            {/* Handle the task project input*/}
            <label>
              <h1 className="text-2xl font-bold mb-4 mt-4 lg:text-2xl md:text-3xl">
                project
              </h1>
              {/* This currently does not work. Needs testing */}
              {Object.keys(projects).map((key) => {
                if (
                  projects[key].user_permissions[user.uid] !== 'owner' &&
                  projects[key].user_permissions[user.uid] !== 'admin' &&
                  projects[key].user_permissions[user.uid] !== 'editor'
                ) {
                  return null
                }
                return (
                  <label className="flex flex-row space-x-3" key={key}>
                    <input
                      type="radio"
                      onChange={(e) => setProject(e.target.value)}
                      checked={project.toString() === key.toString()}
                      value={key}
                      className="flex text-sm font-bold mt-2 underline decoration-[#0acdff] md:text-lg lg:text-2xl"
                    />
                    <span>{projects[key].name}</span>
                  </label>
                )
              })}
            </label>
            {/* Handle the submit button*/}
            <div className="justify-center items-center text-left">
              <button className="text-xl font-bold mt-2 underline decoration-[#0acdff]">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}
export default CreateTask
