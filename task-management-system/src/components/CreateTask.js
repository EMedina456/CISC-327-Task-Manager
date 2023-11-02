// Program Intention: Handle the creation of a task
// Input/Output: Handle the name, description, priority, deadline, and project of the task
// Run Intention: Run with the entire website

// Import files and dependencies here
import React, { useState, useEffect } from 'react';
// import the necessary components for firebase
import { doc, getDoc, collection, addDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { onAuthStateChanged, getAuth } from 'firebase/auth';

const CreateTask = ({ user }) => {
  // Handle the variables for the task
  const [task_name, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [deadline, setDeadline] = useState('');
  const [project, setProject] = useState('');

  const [projects, setProjects] = useState([]);
  const [projectNames, setProjectNames] = useState([]);

  const [loading, setLoading] = useState(true);

  // Handle the submission of the task, currently just prints the task variables to the console
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
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
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userRef);
        const userTasks = docSnap.data().tasks || [];
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

      if (project !== '') {
        const projectRef = doc(db, 'projects', project);
        const docSnap = await getDoc(projectRef);
        const projectTasks = docSnap.data().tasks || [];
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

      alert('Task created successfully');
      window.location.href = '/';
    } catch (error) {
      console.log(error);
    }
  };

  async function getUserInfo() {
    try {
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const uid = user.uid;
          const userRef = doc(db, 'users', uid);
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            let userProjects = docSnap.data().projects || [];
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

            // Wait for all promises to complete before rendering
            await Promise.all(projPromises);
            setLoading(false); // Move setLoading(false) here to ensure it runs after all async operations
          } else {
            console.log('No such document!');
            setLoading(false); // Set loading to false even if there is no document
          }
        } else {
          window.location.href = '/login';
          setLoading(false); // Set loading to false if there is no user
        }
      });
    } catch (error) {
      console.log(error);
      setLoading(false); // Set loading to false in case of an error
    }
  }

  useEffect(() => {
    getUserInfo();
  }, []);

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
              {projects.map((key) => {
                return (
                  <label className="flex flex-row space-x-3" key={key}>
                    <input
                      type="radio"
                      onChange={(e) => setProject(e.target.value)}
                      checked={project === key}
                      value={key}
                      disabled={loading}
                      className="flex text-sm font-bold mt-2 underline decoration-[#0acdff] md:text-lg lg:text-2xl"
                    />
                    <span>{projectNames[key]}</span>
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
