// Program Intention: Handle the edit of a project
// Input/Output: Handle the name and description of the project
// Run Intention: Run with the entire website

// Import files and dependencies here
import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { toast, ToastContainer } from 'react-toastify';

const EditProject = ({ user, project, projects }) => {
  // Handles the variables for the project name and description
  const [projectName, setProjectName] = useState(projects[project]?.name || '');
  const [description, setDescription] = useState(
    projects[project]?.description || ''
  );

  // Handles the submission of the project name and description, currently just logs them, and alerts user
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (projectName === projects[project]?.name) {
      toast('Project has the same name', { type: 'info' });
    }
    if (projectName === 'Generic' && user.uid === 'user1') {
      toast('Invalid permissions', { type: 'error' });
      return;
    }
    if (projectName === '') {
      toast('Please enter a project name', { type: 'error' });
      return;
    }
    try {
      const projectRef = doc(db, 'projects', project);
      await updateDoc(projectRef, {
        name: projectName,
        description: description,
      });
      console.log('Document updated with ID: ', project);
      window.location.href = '/';
    } catch (error) {
      console.log(error);
    }
  };
  // Edit Project Page
  return (
    <div className="flex flex-col md:flex-row w-[80%]">
      <div className="flex-1 flex-col p-[2%] justify-center items-center h-full">
        {/* Handle the form of edit project*/}
        <h1 className="flex text-3xl font-bold mb-2 lg:text-5xl md:text-5xl">
          Edit a Project
        </h1>
        <div className="border-[#60AB9A] lg:w-96 md:72 h-1 border-2 w-48 md:w-72" />
        <form onSubmit={handleSubmit}>
          <div className="">
            {/* Handle the project name input*/}
            <label>
              <h1 className="text-2xl font-bold mb-4 mt-4 lg:text-2xl md:text-3xl">
                name
              </h1>
              <input
                type="text"
                id="project_name"
                className="box-border h-8 w-44 p-4 border-4"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </label>
            {/* Handle the project description input*/}
            <label>
              <h1 className="text-2xl font-bold mb-4 mt-4 lg:text-2xl md:text-3xl">
                description
              </h1>
              <input
                type="text"
                id="description"
                className="box-border h-8 w-44 p-4 border-4"
                value={description}
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
      <ToastContainer />
    </div>
  );
};
export default EditProject;
