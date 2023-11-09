// Program Intention: Handle the priority view of tasks
// Input/Output: Handle the priority of tasks
// Run Intention: Run with the entire website

// Import files and dependencies here

const DeadlineTasks = ({ handleViewTask, tasks }) => {
  //   Check if tasks are available (not undefined or null)
  if (tasks.length === 0) {
    // Tasks are not yet available, show a loading message or return null
    return <div>Loading tasks...</div>;
  }

  const sortedItems = Object.keys(tasks).sort((a, b) => {
    // Sort by priority
    const deadlineA = new Date(tasks[a].deadline);
    const deadlineB = new Date(tasks[b].deadline);
    return deadlineB - deadlineA;
  });

  //   console.log(sortedItems);

  const renderedItems = sortedItems.map((item, index, array) => {
    // Check if priority has changed from the previous
    const shouldRenderSeparator =
      index === 0 || tasks[item].deadline !== tasks[array[index - 1]].deadline;

    return (
      <div key={item}>
        {shouldRenderSeparator && (
          <div className="flex text-lg font-bold mt-2 md:text-xl lg:text-2xl">
            {tasks[item].deadline}
          </div>
        )}
        <button
          onClick={() => handleViewTask(item)}
          key={item}
          className="flex text-sm font-bold mt-2 underline decoration-[#0acdff] md:text-md lg:text-lg">
          {tasks[item].name}
        </button>
      </div>
    );
  });

  // Priority Tasks Page
  return (
    <div className="space-y-8 ">
      <div className="flex flex-col justify-center">{renderedItems}</div>
    </div>
  );
};
export default DeadlineTasks;
