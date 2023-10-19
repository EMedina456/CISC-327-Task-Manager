// Program Intention: Handle the edit of a task
// Input/Output: Handle the name, description, priority, deadline, and project of the task
// Run Intention: Run with the entire website

// Import files and dependencies here
import React, { useState } from 'react';
const EditTask = () => {
  // Handle the variables of the task
  const [task_name, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [deadline, setDeadline] = useState('');
  const [project, setProject] = useState('');

  // Handle the submission of the task, currently just prints the task vairables to the console
  const handleSubmit = (e) => {
    console.log('name', task_name);
    console.log('description', description);
    console.log('priority', priority);
    console.log('deadline', deadline);
    console.log('project', project);
  };
  // Edit Task Page
  return (
    <div className="flex flex-col md:flex-row w-[80%]">
      <div className="flex-1 flex-col p-[2%] justify-center items-center h-full">
        {/* Handle the form of edit task*/}
        <h1 className="flex text-5xl font-bold mb-2">Edit Task</h1>
        <div className="border-[#60AB9A] w-80 h-1 border-2" />
        <form onSubmit={handleSubmit}>
          <div className="">
            <label>
              {/* Handle the task name input*/}
              <h1 className="text-2xl font-bold mb-4 mt-4">name</h1>
              <input
                type="text"
                id="task_name"
                value="Generic name"
                className="box-border h-8 w-44 p-4 border-4"
                onChange={(e) => setTaskName(e.target.value)}
              />
            </label>
            <label>
              {/* Handle the task description input*/}
              <h1 className="text-2xl font-bold mb-4 mt-4">description</h1>
              <input
                type="text"
                id="description"
                value="Generic description"
                className="box-border h-8 w-44 p-4 border-4"
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <label>
              {/* Handle the task priority input, only numbers allowed*/}
              <h1 className="text-2xl font-bold mb-4 mt-4">priority</h1>
              <input
                type="number"
                id="priority"
                value="1"
                className="box-border h-8 w-44 p-4 border-4"
                onChange={(e) => setPriority(e.target.value)}
              />
            </label>
            <label>
              {/* Handle the task deadline input, only dates allowed*/}
              <h1 className="text-2xl font-bold mb-4 mt-4">deadline</h1>
              <input
                type="date"
                id="deadline"
                value="2023/10/19"
                className="box-border h-8 w-44 p-4 border-4"
                onChange={(e) => setDeadline(e.target.value)}
              />
            </label>
            <label>
              {/* Handle the task project input*/}
              <h1 className="text-2xl font-bold mb-4 mt-4">project</h1>
              <input
                type="text"
                id="project"
                value="Project"
                className="box-border h-8 w-44 p-4 border-4"
                onChange={(e) => setProject(e.target.value)}
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
  );
};
export default EditTask;
