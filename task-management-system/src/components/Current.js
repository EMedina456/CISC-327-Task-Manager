// Program Intention: Handle the current tasks and projects
// Input/Output: Handle the current tasks and projects, and allow the user to click on them and redirect to their pages
// Run Intention: Run with the entire website
import React from 'react';

const Current = ({ handleViewTask, handleViewProject, projects, tasks }) => {
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
        {Object.keys(projects).map((key) => (
          <button
            onClick={() => handleViewProject(key)}
            key={key}
            className="flex text-sm font-bold mt-2 underline decoration-[#0acdff] md:text-lg lg:text-2xl">
            {projects[key].name}
          </button>
        ))}
        <div className="my-16" />
        {/* Handle the overdue tasks*/}
        <h1 className="flex text-xl font-bold mb-2 lg:text-5xl md:text-3xl">
          Overdue Tasks
        </h1>
        <div className="border-[#60AB9A] w-80 h-1 border-2" />
        {/* Handle the view and be able to click on the overdue tasks*/}
        {Object.keys(tasks).map((key) => {
          return (
            <button
              onClick={() => handleViewTask(key)}
              key={key}
              className="flex text-sm font-bold mt-2 underline decoration-[#0acdff] md:text-lg lg:text-2xl">
              {tasks[key].name}
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
        {Object.keys(tasks).map((key) => {
          return (
            <button
              onClick={() => handleViewTask(key)}
              key={key}
              value={key}
              className="flex text-sm font-bold mt-2 underline decoration-[#0acdff] md:text-lg lg:text-2xl">
              {tasks[key].name}
            </button>
          );
        })}
      </div>
      <div className="my-16" />
    </div>
  );
};
export default Current;
