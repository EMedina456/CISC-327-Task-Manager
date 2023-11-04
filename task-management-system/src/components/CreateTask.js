// Program Intention: Handle the creation of a task
// Input/Output: Handle the name, description, priority, deadline, and project of the task
// Run Intention: Run with the entire website

// Import files and dependencies here
import React, { useState } from 'react';
// import the necessary components for firebase
import { doc, getDoc, collection, addDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const CreateTask = ({ user, projects }) => {
  // Handle the variables for the task
  const [task_name, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [deadline, setDeadline] = useState('');
  const [project, setProject] = useState('');

  // Handle the submission of the task, currently just prints the task variables to the console
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create a task collection
      const task = collection(db, 'tasks');
      const task_data = {
        name: task_name,
        description: description,
        priority: priority,
        deadline: deadline,
        project: project,
        members: [user.uid],
      };
      const taskRef = await addDoc(task, task_data);
      const task_id = taskRef.id;
      // Add the task to the user's tasks
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userRef);
        const userTasks = docSnap.data().tasks || [];
        // Add the task to the user's tasks
        setDoc(
          userRef,
          {
            tasks: userTasks.concat(task_id),
          },
          { merge: true }
        );
      } else {
        console.log('No user is signed in');
      }
      console.log('Project: ', project);
      // Add the task to the project's tasks
      if (project !== '') {
        const projectRef = doc(db, 'projects', project);
        const projectTasks = projects[project].tasks || [];
        setDoc(
          projectRef,
          {
            tasks: projectTasks.concat(task_id),
          },
          { merge: true }
        );
      } else {
        console.log('No project is selected');
      }
      console.log('Document written with ID: ', taskRef.id);
      // Alert the user that the task was created successfully
      alert('Task created successfully');
      window.location.href = '/';
    } catch (error) {
      console.log(error);
    }
  };

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
                );
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
    </div>
  );
};
export default CreateTask;
