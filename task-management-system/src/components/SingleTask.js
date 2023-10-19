const SingleTask = ({ handleViewProject }) => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4 mt-4">name</h1>
      <p className="text-2xl mb-4 mt-4">Generic name</p>
      <h1 className="text-4xl font-bold mb-4 mt-4">description</h1>
      <p className="text-2xl mb-4 mt-4">Generic description</p>
      <h1 className="text-4xl font-bold mb-4 mt-4">priority</h1>
      <p className="text-2xl mb-4 mt-4">1</p>
      <h1 className="text-4xl font-bold mb-4 mt-4">deadline</h1>
      <p className="text-2xl mb-4 mt-4">2023/10/19</p>
      <h1 className="text-4xl font-bold mb-4 mt-4">project</h1>
      <button onClick={handleViewProject} className="text-2xl mb-4 mt-4">
        Project
      </button>
    </div>
  )
}
export default SingleTask
