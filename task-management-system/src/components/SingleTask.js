// Program Intention: Handle the display of a single task
// Input/Output: Handle the click on the project button
// Run Intention: Run with the entire website

const SingleTask = ({ handleViewProject }) => {
  // Single Task Page with handleViewProject method
  return (
    <div>
      {/* Single Task Page */}
      {/* Name */}
      <h1 className="text-4xl font-bold mb-4 mt-4">name</h1>
      <p className="text-2xl mb-4 mt-4">Generic name</p>
      {/* Description */}
      <h1 className="text-4xl font-bold mb-4 mt-4">description</h1>
      <p className="text-2xl mb-4 mt-4">Generic description</p>
      {/* Priority */}
      <h1 className="text-4xl font-bold mb-4 mt-4">priority</h1>
      <p className="text-2xl mb-4 mt-4">1</p>
      {/* Deadline */}
      <h1 className="text-4xl font-bold mb-4 mt-4">deadline</h1>
      <p className="text-2xl mb-4 mt-4">2023/10/19</p>
      {/* Project */}
      <h1 className="text-4xl font-bold mb-4 mt-4">project</h1>
      {/* Handle the view of the project and be able to click on it*/}
      <button onClick={handleViewProject} className="text-2xl mb-4 mt-4">
        Project
      </button>
    </div>
  )
}
export default SingleTask
