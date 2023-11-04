// Program Intention: Handle the priority view of tasks
// Input/Output: Handle the priority of tasks
// Run Intention: Run with the entire website

// Import files and dependencies here

const PriorityTasks = ({ handleViewTask }) => {
  // Priority Tasks Page (Not Yet Completed)
  return (
    <div className="space-y-8 ">
      <div className="flex flex-col justify-center">
        {/* Priority Tasks Page */}
        {/* Highest Priority */}
        <h1 className="text-lg font-bold mb-2 lg:text-4xl md:text-2xl">
          !!! Priority
        </h1>
        <div className="border-[#60AB9A] w-full h-1 border-2" />
        {/* Handle the view and be able to click on the highest priority tasks*/}
      </div>
      <div className="flex flex-col justify-center ">
        {/* Second Highest Priority */}
        <h1 className="text-lg font-bold mb-2 lg:text-4xl md:text-2xl">
          !! Priority
        </h1>
        <div className="border-[#60AB9A] w-full h-1 border-2" />
        {/* Handle the view and be able to click on the second highest priority tasks*/}
      </div>
      <div className="flex flex-col justify-center">
        {/* Third Highest Priority */}
        <h1 className="text-lg font-bold mb-2 lg:text-4xl md:text-2xl">
          ! Priority
        </h1>
        <div className="border-[#60AB9A] w-full h-1 border-2" />
        {/* Handle the view and be able to click on the third highest priority tasks*/}
      </div>
    </div>
  );
};
export default PriorityTasks;
