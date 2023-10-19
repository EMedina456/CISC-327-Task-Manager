const PriorityTasks = ({ handleViewTask }) => {
  return (
    <div className=" space-y-8 ">
      <div className="flex flex-col justify-center">
        <h1 className="text-4xl font-bold mb-2">!!! Priority</h1>
        <div className="border-[#60AB9A] w-full h-1 border-2" />
        <button
          onClick={handleViewTask}
          className="text-xl text-left font-bold mt-2 underline decoration-[#0acdff]"
        >
          Task 1
        </button>
        <button
          onClick={handleViewTask}
          className="text-xl text-left font-bold mt-2 underline decoration-[#0acdff]"
        >
          Task 2
        </button>
        <button
          onClick={handleViewTask}
          className="text-xl text-left font-bold mt-2 underline decoration-[#0acdff]"
        >
          Task 3
        </button>
      </div>
      <div className="flex flex-col justify-center ">
        <h1 className="text-4xl font-bold mb-2">!! Priority</h1>
        <div className="border-[#60AB9A] w-full h-1 border-2" />
        <button
          onClick={handleViewTask}
          className="text-xl text-left font-bold mt-2 underline decoration-[#0acdff]"
        >
          Task 1
        </button>
        <button
          onClick={handleViewTask}
          className="text-xl text-left font-bold mt-2 underline decoration-[#0acdff]"
        >
          Task 2
        </button>
        <button
          onClick={handleViewTask}
          className="text-xl text-left font-bold mt-2 underline decoration-[#0acdff]"
        >
          Task 3
        </button>
      </div>
      <div className="flex flex-col justify-center">
        <h1 className="text-4xl font-bold mb-2">! Priority</h1>
        <div className="border-[#60AB9A] w-full h-1 border-2" />
        <button
          onClick={handleViewTask}
          className="text-xl text-left font-bold mt-2 underline decoration-[#0acdff]"
        >
          Task 1
        </button>
        <button
          onClick={handleViewTask}
          className="text-xl text-left font-bold mt-2 underline decoration-[#0acdff]"
        >
          Task 2
        </button>
        <button
          onClick={handleViewTask}
          className="text-xl text-left font-bold mt-2 underline decoration-[#0acdff]"
        >
          Task 3
        </button>
      </div>
    </div>
  )
}
export default PriorityTasks
