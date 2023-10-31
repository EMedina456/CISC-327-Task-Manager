// Program Intention: Handle the view and selection of tasks
// Input/Output: Handle the selection of tasks
// Run Intention: Run with the entire website

// Import files and dependencies here

const Tasks = ({ handleViewTask }) => {
  // Tasks Page
  return (
    <div>
      {/* Tasks Page */}
      {/* Be able to click on a task and view it */}
      <button
        onClick={handleViewTask}
        className="flex text-base font-bold mt-2 underline decoration-[#0acdff] md:text-lg lg:text-2xl "
      >
        Task 1
      </button>
      <button
        onClick={handleViewTask}
        className="flex text-base font-bold mt-2 underline decoration-[#0acdff] md:text-lg lg:text-2xl "
      >
        Task 2
      </button>
      <button
        onClick={handleViewTask}
        className="flex text-base font-bold mt-2 underline decoration-[#0acdff] md:text-lg lg:text-2xl "
      >
        Task 3
      </button>
      <div className="my-16" />
    </div>
  )
}
export default Tasks
