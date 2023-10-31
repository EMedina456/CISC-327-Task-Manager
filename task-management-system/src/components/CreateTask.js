// Program Intention: Handle the creation of a task
// Input/Output: Handle the name, description, priority, deadline, and project of the task
// Run Intention: Run with the entire website

// Import files and dependencies here
import React, { useState } from 'react'
const CreateTask = () => {
  // Handle the variables for the task
  const [task_name, setTaskName] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('')
  const [deadline, setDeadline] = useState('')
  const [project, setProject] = useState('')

  // Handle the submission of the task, currently just prints the task vairables to the console
  const handleSubmit = (e) => {
    console.log('name', task_name)
    console.log('description', description)
    console.log('priority', priority)
    console.log('deadline', deadline)
    console.log('project', project)
    alert('Task created successfully')
  }
  // Create Task Page
  return (
    <div className="flex flex-col md:flex-row w-[80%]">
      <div className="flex-1 flex-col p-[2%] justify-center items-center h-full">
        {/* Handle the form of create task*/}
        <h1 className="flex text-3xl font-bold mb-2 lg:text-5xl md:text-5xl">
          Create a Task
        </h1>
        <div className="border-[#60AB9A] lg:w-96 md:72 h-1 border-2 w-56 lg:w-90 md:w-96 h-1" />
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
                className="box-border h-8 w-44 p-4 border-4"
                onChange={(e) => setDeadline(e.target.value)}
              />
            </label>
            {/* Handle the task project input*/}
            <label>
              <h1 className="text-2xl font-bold mb-4 mt-4 lg:text-2xl md:text-3xl">
                project
              </h1>
              <input
                type="text"
                id="project"
                className="box-border h-8 w-44 p-4 border-4"
                onChange={(e) => setProject(e.target.value)}
              />
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
    </div>
  )
}
export default CreateTask
