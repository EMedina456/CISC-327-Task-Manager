// Program Intention: Handle the edit of a task
// Input/Output: Handle the name, description, priority, deadline, and project of the task
// Run Intention: Run with the entire website

// Import files and dependencies here
import React, { useState } from 'react';
import { doc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { toast, ToastContainer } from 'react-toastify';

const EditTask = ({ user, task, projects, tasks }) => {
  // Handle the variables of the task
  const [taskName, setTaskName] = useState(tasks[task].name || '');
  const [description, setDescription] = useState(
    tasks[task]?.description || ''
  );
  const [priority, setPriority] = useState(tasks[task]?.priority || '');
  const [deadline, setDeadline] = useState(tasks[task]?.deadline || '');
  const [project, setProject] = useState(tasks[task]?.project || '');

  // Handle the submission of the task, currently just prints the task vairables to the console, and alerts user
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (taskName === '') {
      toast('Please enter a task name', { type: 'error' });
      return;
    }
    if (priority === '') {
      toast('Please enter a priority', { type: 'error' });
      return;
    }
    if (priority < 0) {
      toast('Please enter a positive priority', { type: 'error' });
      return;
    }
    let currentDate = new Date().toJSON().slice(0, 10);
    if (deadline < currentDate) {
      toast('Please enter a future deadline', { type: 'error' });
      return;
    }
    if (user.uid === 'user1' && taskName === 'Generic') {
      toast('Invalid permissions', { type: 'error' });
      return;
    }
    try {
      const taskRef = doc(db, 'tasks', task);

      await updateDoc(taskRef, {
        name: taskName,
        description: description,
        priority: priority,
        deadline: deadline,
        project: project,
        members: [user.uid],
      });
      const userRef = doc(db, 'users', user.uid);
      setDoc(
        userRef,
        {
          tasks: arrayUnion(task),
        },
        { merge: true }
      );
      if (project !== '') {
        const projectRef = doc(db, 'projects', project);
        Object.keys(projects[project].user_permissions).forEach(
          async (member) => {
            const memberRef = doc(db, 'users', member);
            setDoc(
              memberRef,
              {
                tasks: arrayUnion(task),
              },
              { merge: true }
            );
            setDoc(
              taskRef,
              {
                members: arrayUnion(member),
              },
              { merge: true }
            );
          }
        );
        setDoc(
          projectRef,
          {
            tasks: arrayUnion(task),
          },
          { merge: true }
        );
      } else {
        console.log('No project is selected');
      }

      alert('Task created successfully');
      window.location.href = '/';
    } catch (error) {
      console.log(error);
    }
  };
  // Edit Task Page
  return (
    <div className="flex flex-col md:flex-row w-[80%]">
      <div className="flex-1 flex-col p-[2%] justify-center items-center h-full">
        {/* Handle the form of edit task*/}
        <h1 className="flex text-3xl font-bold mb-2 lg:text-5xl md:text-5xl">
          Edit Task
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
                value={taskName}
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
                value={description}
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
                value={priority}
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
                alt="date"
                value={deadline}
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
                  return null;
                } else {
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
                }
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
  );
};
export default EditTask;
