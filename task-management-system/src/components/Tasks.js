const Tasks = ({ handleViewTask }) => {
  return (
    <div>
      <button
        onClick={handleViewTask}
        className="flex text-2xl font-bold mt-2 underline decoration-[#0acdff]"
      >
        Task 1
      </button>
      <button
        onClick={handleViewTask}
        className="flex text-2xl font-bold mt-2 underline decoration-[#0acdff]"
      >
        Task 2
      </button>
      <button
        onClick={handleViewTask}
        className="flex text-2xl font-bold mt-2 underline decoration-[#0acdff]"
      >
        Task 3
      </button>
      <div className="my-16" />
    </div>
  )
}
export default Tasks
