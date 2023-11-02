// Program Intention: Handle the current tasks and projects
// Input/Output: Handle the current tasks and projects, and allow the user to click on them and redirect to their pages
// Run Intention: Run with the entire website
import React from 'react';
// import the necessary components for firebase
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { useState, useEffect } from 'react';

const Current = ({ handleViewTask, handleViewProject }) => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);
  const [projectNames, setProjectNames] = useState([]);
  const [taskNames, setTaskNames] = useState([]);

  async function getUserInfo() {
    try {
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const uid = user.uid;
          setUser(user);
          const userRef = doc(db, 'users', uid);
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            let userTasks = docSnap.data().tasks || [];
            let userProjects = docSnap.data().projects || [];

            setTasks(userTasks);
            setProjects(Object.keys(userProjects));

            // Retrieve project names and update the state
            const projPromises = Object.keys(userProjects).map(async (key) => {
              const projectDocRef = doc(db, 'projects', key);
              const projectDocSnap = await getDoc(projectDocRef);
              if (projectDocSnap.exists()) {
                setProjectNames((prevNames) => ({
                  ...prevNames,
                  [key]: projectDocSnap.data().name,
                }));
              }
            });

            const taskPromises = userTasks.map(async (key) => {
              const taskDocRef = doc(db, 'tasks', key);
              const taskDocSnap = await getDoc(taskDocRef);
              if (taskDocSnap.exists()) {
                setTaskNames((prevNames) => ({
                  ...prevNames,
                  [key]: taskDocSnap.data().name,
                }));
              }
            });

            // Wait for all promises to complete before rendering
            await Promise.all(projPromises);
            await Promise.all(taskPromises);
          } else {
            console.log('No such document!');
          }
        } else {
          window.location.href = '/login';
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  //   const projectKeys = Object.keys(projects);
  //   console.log('projects', projects);
  //   const taskKeys = Object.keys(tasks);

  // Current Page with the methods to handle the view of tasks and projects
  return (
    <div className="flex flex-col md:flex-row w-[80%]">
      <div className="flex-1 flex-col p-[2%] justify-center items-center">
        {/* Handle the current tasks and projects*/}
        <h1 className="flex text-xl font-bold mb-2 md:text-3xl lg:text-5xl">
          Projects
        </h1>
        <div className="border-[#60AB9A] w-80 h-1 border-2" />
        {/* Handle the view of the projects and be able to click on them*/}
        {projects.map((key) => (
          <button
            onClick={() => handleViewProject(key)}
            key={key}
            className="flex text-sm font-bold mt-2 underline decoration-[#0acdff] md:text-lg lg:text-2xl">
            {projectNames[key]}
          </button>
        ))}
        <div className="my-16" />
        {/* Handle the overdue tasks*/}
        <h1 className="flex text-xl font-bold mb-2 lg:text-5xl md:text-3xl">
          Overdue Tasks
        </h1>
        <div className="border-[#60AB9A] w-80 h-1 border-2" />
        {/* Handle the view and be able to click on the overdue tasks*/}
        {tasks.map((key) => {
          return (
            <button
              onClick={() => handleViewTask(key)}
              key={key}
              className="flex text-sm font-bold mt-2 underline decoration-[#0acdff] md:text-lg lg:text-2xl">
              {taskNames[key]}
            </button>
          );
        })}
      </div>

      <div className="flex-1 flex-col p-[2%] justify-center items-center h-full">
        {/* Handle the current tasks*/}
        <h1 className="flex text-xl font-bold mb-2 lg:text-5xl md:text-3xl">
          Tasks
        </h1>
        <div className="border-[#60AB9A] w-80 h-1 border-2" />
        {/* Handle the view of the tasks and be able to click on them*/}
        {tasks.map((key) => {
          return (
            <button
              onClick={() => handleViewTask(key)}
              key={key}
              value={key}
              className="flex text-sm font-bold mt-2 underline decoration-[#0acdff] md:text-lg lg:text-2xl">
              {taskNames[key]}
            </button>
          );
        })}
      </div>
      <div className="my-16" />
    </div>
  );
};
export default Current;
