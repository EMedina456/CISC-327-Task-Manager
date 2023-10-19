// Program Intention: Handle the creation of a project
// Input/Output: Handle the name and description of the project
// Run Intention: Run with the entire website

// Import files and dependencies here
import React, { useState } from 'react'
const EditProject = () => {
  // Handles the variables for the project name and description
  const [project_name, setProjectName] = useState('')
  const [description, setDescription] = useState('')

  // Handles the submission of the project name and description, currently just logs them, and alerts user
  const handleSubmit = (e) => {
    console.log('name', project_name)
    console.log('description', description)
    alert('Project edited successfully')
  }
  // Edit Project Page
  return (
    <div className="flex flex-col md:flex-row w-[80%]">
      <div className="flex-1 flex-col p-[2%] justify-center items-center h-full">
        {/* Handle the form of edit project*/}
        <h1 className="flex text-5xl font-bold mb-2">Edit a Project</h1>
        <div className="border-[#60AB9A] w-80 h-1 border-2" />
        <form onSubmit={handleSubmit}>
          <div className="">
            {/* Handle the project name input*/}
            <label>
              <h1 className="text-2xl font-bold mb-4 mt-4">name</h1>
              <input
                type="text"
                id="project_name"
                value="Project"
                className="box-border h-8 w-44 p-4 border-4"
                onChange={(e) => setProjectName(e.target.value)}
              />
            </label>
            {/* Handle the project description input*/}
            <label>
              <h1 className="text-2xl font-bold mb-4 mt-4">description</h1>
              <input
                type="text"
                id="description"
                value="Generic description"
                className="box-border h-8 w-44 p-4 border-4"
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <div className="justify-center items-center text-left">
              {/* Handle the submit button*/}
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
export default EditProject
