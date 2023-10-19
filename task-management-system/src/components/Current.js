// Program Intention: Handle the current tasks and projects
// Input/Output: Handle the current tasks and projects, and allow the user to click on them and redirect to their pages
// Run Intention: Run with the entire website
const Current = ({ handleViewTask, handleViewProject }) => {
  // Current Page with the methods to handle the view of tasks and projects
  return (
    <div className="flex flex-col md:flex-row w-[80%]">
      <div className="flex-1 flex-col p-[2%] justify-center items-center h-full">
        {/* Handle the current tasks and projects*/}
        <h1 className="flex text-5xl font-bold mb-2">Projects</h1>
        <div className="border-[#60AB9A] w-80 h-1 border-2" />
        {/* Handle the view of the projects and be able to click on them*/}
        <button
          onClick={handleViewProject}
          className="flex text-2xl font-bold mt-2 underline decoration-[#0acdff]">
          Project 1
        </button>
        <button
          onClick={handleViewProject}
          className="flex text-2xl font-bold mt-2 underline decoration-[#0acdff]">
          Project 2
        </button>
        <button
          onClick={handleViewProject}
          className="flex text-2xl font-bold mt-2 underline decoration-[#0acdff]">
          Project 3
        </button>
        <button
          onClick={handleViewProject}
          className="flex text-2xl font-bold mt-2 underline decoration-[#0acdff]">
          ...
        </button>
        <div className="my-16" />
        {/* Handle the overdue tasks*/}
        <h1 className="flex text-5xl font-bold mb-2">Overdue Tasks</h1>
        <div className="border-[#60AB9A] w-80 h-1 border-2" />
        {/* Handle the view and be able to click on the overdue tasks*/}
        <button
          onClick={handleViewTask}
          className="flex text-2xl font-bold mt-2 underline decoration-[#0acdff]">
          Task 1
        </button>
        <button
          onClick={handleViewTask}
          className="flex text-2xl font-bold mt-2 underline decoration-[#0acdff]">
          Task 2
        </button>
        <button
          onClick={handleViewTask}
          className="flex text-2xl font-bold mt-2 underline decoration-[#0acdff]">
          Task 3
        </button>
        <button
          onClick={handleViewTask}
          className="flex text-2xl font-bold mt-2 underline decoration-[#0acdff]">
          ...
        </button>
      </div>

      <div className="flex-1 flex-col p-[2%] justify-center items-center h-full">
        {/* Handle the current tasks*/}
        <h1 className="flex text-5xl font-bold mb-2">Tasks</h1>
        <div className="border-[#60AB9A] w-80 h-1 border-2" />
        {/* Handle the view of the tasks and be able to click on them*/}
        <button
          onClick={handleViewTask}
          className="flex text-2xl font-bold mt-2 underline decoration-[#0acdff]">
          Task 1
        </button>
        <button
          onClick={handleViewTask}
          className="flex text-2xl font-bold mt-2 underline decoration-[#0acdff]">
          Task 2
        </button>
        <button
          onClick={handleViewTask}
          className="flex text-2xl font-bold mt-2 underline decoration-[#0acdff]">
          Task 3
        </button>
        <button
          onClick={handleViewTask}
          className="flex text-2xl font-bold mt-2 underline decoration-[#0acdff]">
          Task 4
        </button>
        <button
          onClick={handleViewTask}
          className="flex text-2xl font-bold mt-2 underline decoration-[#0acdff]">
          Task 5
        </button>
        <button
          onClick={handleViewTask}
          className="flex text-2xl font-bold mt-2 underline decoration-[#0acdff]">
          Task 6
        </button>
        <button
          onClick={handleViewTask}
          className="flex text-2xl font-bold mt-2 underline decoration-[#0acdff]">
          Task 7
        </button>
        <button
          onClick={handleViewTask}
          className="flex text-2xl font-bold mt-2 underline decoration-[#0acdff]">
          Task 8
        </button>
        <button
          onClick={handleViewTask}
          className="flex text-2xl font-bold mt-2 underline decoration-[#0acdff]">
          Task 9
        </button>
        <button
          onClick={handleViewTask}
          className="flex text-2xl font-bold mt-2 underline decoration-[#0acdff]">
          ...
        </button>
      </div>
      <div className="my-16" />
    </div>
  );
};
export default Current;
