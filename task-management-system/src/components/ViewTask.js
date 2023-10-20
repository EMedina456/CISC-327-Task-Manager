// Program Intention: Handle the viewing of a task
// Input/Output: Handle the clicking of the edit, add member, delete, and complete buttons
// Run Intention: Run with the entire website

// Import files and dependencies here
import { BsCheck } from 'react-icons/bs';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { useState } from 'react';
import SingleTask from './SingleTask';
import AddMember from './AddMember';
const ViewTask = ({ handleViewProject, handleEditTask }) => {
  // Handle the variables required for the page
  const [addMember, setAddMember] = useState(false);

  // Handle the addition of a member, set addMember to true and the rest to false
  const handleAddMember = () => {
    setAddMember(true);
  };
  // View Task Page
  return (
    <div className="flex flex-col md:flex-row w-[80%]">
      <div className="flex-1 flex-col p-[2%] justify-center items-center h-full">
        <div className="flex flex-row w-full">
          <div className="flex self-start flex-col">
            {/* Handle the view task*/}
            <h1 className="flex text-5xl font-bold mb-2">Task</h1>
            <div className="border-[#60AB9A] w-80 h-1 border-2" />
          </div>
          {/* Handle the edit task button*/}
          <button
            onClick={handleEditTask}
            className="flex m-auto self-end flex-col">
            <h1 className="text-3xl font-bold mb-2">Edit</h1>
            <div className="border-[#60AB9A] w-20 h-1 border-2" />
          </button>
          {/* Handle the add member button*/}
          <button
            onClick={handleAddMember}
            className="flex m-auto self-end flex-col">
            <AiOutlineUserAdd className="text-5xl" />
          </button>
          {/* Handle the delete button, and send an alert to confirm the deletion*/}
          <button
            onClick={() => alert('Task Deleted')}
            className="flex m-auto self-end flex-col">
            <RiDeleteBin5Line className="text-5xl" />
          </button>
          {/* Handle the complete button, and send an alert to confirm the completion*/}
          <button
            onClick={() => alert('Task Completed')}
            className="flex m-auto self-end flex-col">
            <BsCheck className="text-7xl" />
          </button>
        </div>
        {/* Handle which component to display, either the add member or the single task*/}
        {addMember ? (
          <AddMember />
        ) : (
          <SingleTask handleViewProject={handleViewProject} />
        )}
      </div>
    </div>
  );
};
export default ViewTask;