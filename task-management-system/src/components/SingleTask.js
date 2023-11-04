// Program Intention: Handle the display of a single task
// Input/Output: Handle the click on the project button
// Run Intention: Run with the entire website

// import the necessary components for firebase

const SingleTask = ({ handleViewProject, task, projects }) => {
  // Single Task Page with handleViewProject method
  return (
    <div>
      {/* Single Task Page */}
      {/* Name */}
      <h1 className="text-4xl font-bold mb-4 mt-4">name</h1>
      <p className="text-2xl mb-4 mt-4">{task?.name}</p>
      {/* Description */}
      <h1 className="text-4xl font-bold mb-4 mt-4">description</h1>
      <p className="text-2xl mb-4 mt-4">{task?.description}</p>
      {/* Priority */}
      <h1 className="text-4xl font-bold mb-4 mt-4">priority</h1>
      <p className="text-2xl mb-4 mt-4">{task?.priority}</p>
      {/* Deadline */}
      <h1 className="text-4xl font-bold mb-4 mt-4">deadline</h1>
      <p className="text-2xl mb-4 mt-4">{task?.deadline}</p>
      {/* Project */}
      <h1 className="text-4xl font-bold mb-4 mt-4">project</h1>
      {/* Handle the view of the project and be able to click on it*/}
      {/* The below button doesn't work for now. Will be fixed for Unit/Integration Testing */}
      <button
        onClick={() => handleViewProject(task?.project)}
        className="text-2xl mb-4 mt-4">
        {projects[task?.project].name}
      </button>
    </div>
  );
};
export default SingleTask;
