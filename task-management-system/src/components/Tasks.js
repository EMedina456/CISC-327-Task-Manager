// Program Intention: Handle the view and selection of tasks
// Input/Output: Handle the selection of tasks
// Run Intention: Run with the entire website

// Import files and dependencies here

const Tasks = ({ handleViewTask, tasks, project, projects }) => {
  // Tasks Page
  return (
    <div>
      {/* Tasks Page */}
      {/* Be able to click on a task and view it */}
      {projects[project].tasks.map((key) => (
        <button
          onClick={() => handleViewTask(key)}
          key={key}
          className="flex text-base font-bold mt-2 underline decoration-[#0acdff] md:text-lg lg:text-2xl ">
          {tasks[key].name}
        </button>
      ))}
    </div>
  );
};
export default Tasks;
