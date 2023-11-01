// Program Intention: Handle the viewing of a project
// Input/Output: Handle the clicking of each of the buttons
// Run Intention: Run with the entire website

// Import files and dependencies here
import { BsCheck } from 'react-icons/bs'
import { RiDeleteBin5Line } from 'react-icons/ri'
import {
  AiOutlineUserAdd,
  AiOutlineUserDelete,
  AiOutlineUserSwitch,
  AiOutlineUser,
} from 'react-icons/ai'
import { useState } from 'react'
import Tasks from './Tasks'
import AddMember from './AddMember'
import RemoveMember from './RemoveMember'
import TransferOwnership from './TransferOwnership'
import ManageMember from './ManageMember'

const ViewProject = ({ handleViewTask, handleEditProject }) => {
  // Handle the variables required for the page
  const [addMember, setAddMember] = useState(false)
  const [manageMember, setManageMember] = useState(false)
  const [removeMember, setRemoveMember] = useState(false)
  const [transfer, setTransfer] = useState(false)

  // Handle the addition of a member, set addMember to true and the rest to false
  const handleAddMember = () => {
    setAddMember(true)
    setManageMember(false)
    setRemoveMember(false)
    setTransfer(false)
  }

  // Handle the management of a member, set manageMember to true and the rest to false
  const handleManageMember = () => {
    setAddMember(false)
    setManageMember(true)
    setRemoveMember(false)
    setTransfer(false)
  }

  // Handle the removal of a member, set removeMember to true and the rest to false
  const handleRemoveMember = () => {
    setAddMember(false)
    setManageMember(false)
    setRemoveMember(true)
    setTransfer(false)
  }

  // Handle the transfer of ownership, set transfer to true and the rest to false
  const handleTransfer = () => {
    setTransfer(true)
    setAddMember(false)
    setManageMember(false)
    setRemoveMember(false)
  }

  // View Project Page
  return (
    <div className="flex flex-col md:flex-row w-[80%]">
      <div className="flex-1 flex-col p-[2%] justify-center items-center h-full">
        <div className="flex flex-row w-full">
          <div className="flex self-start flex-col">
            {/* Handle the project name and the border*/}
            <h1 className="flex text-3xl font-bold mb-2 lg:text-5xl md:text-5xl">
              Project
            </h1>
            <div className="border-[#60AB9A] h-1 border-2 w-28 lg:w-44 md:w-44 h-1" />
          </div>
          {/* Handle the buttons for the project*/}
          {/* Handle the edit project button*/}
          <button
            onClick={handleEditProject}
            className="flex m-auto self-end flex-col"
          >
            <h1 className="text-xl lg:text-3xl md:text-3xl font-bold mb-2">
              Edit
            </h1>
            <div className="border-[#60AB9A] w-16 lg:w-20 md:w-20 h-1 border-2 " />
          </button>
          {/* Handle the add member button*/}
          <button
            onClick={handleAddMember}
            className="flex m-auto self-end flex-col"
          >
            <AiOutlineUserAdd className="text-3xl lg:text-5xl md:text-5xl" />
          </button>
          {/* Handle the remove member button*/}
          <button
            onClick={handleRemoveMember}
            className="flex m-auto self-end flex-col"
          >
            <AiOutlineUserDelete className="text-3xl lg:text-5xl md:text-5xl" />
          </button>
          {/* Handle the manage member button*/}
          <button
            onClick={handleManageMember}
            className="flex m-auto self-end flex-col"
          >
            <AiOutlineUser className="text-3xl lg:text-5xl md:text-5xl" />
          </button>
          {/* Handle the transfer ownership button*/}
          <button
            onClick={handleTransfer}
            className="flex m-auto self-end flex-col"
          >
            <AiOutlineUserSwitch className="text-3xl lg:text-5xl md:text-5xl" />
          </button>
          {/* Handle the delete project button, and send alert that project has been deleted*/}
          <button
            onClick={() => alert('Project Deleted')}
            className="flex m-auto self-end flex-col"
            title="delete"
          >
            <RiDeleteBin5Line className="text-3xl lg:text-5xl md:text-5xl" />
          </button>
          {/* Handle the complete project button, and send alert that project has been completed*/}
          <button
            onClick={() => alert('Project Completed')}
            className="flex m-auto self-end flex-col"
          >
            <BsCheck className="text-5xl lg:text-7xl md:text-7xl" />
          </button>
        </div>
        {/* Handle which view to show, based on the button clicked*/}
        {addMember ? (
          <AddMember />
        ) : removeMember ? (
          <RemoveMember />
        ) : manageMember ? (
          <ManageMember />
        ) : transfer ? (
          <TransferOwnership />
        ) : (
          <Tasks handleViewTask={handleViewTask} />
        )}
      </div>
    </div>
  )
}
export default ViewProject
