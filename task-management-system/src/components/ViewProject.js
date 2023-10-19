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
  const [addMember, setAddMember] = useState(false)
  const [manageMember, setManageMember] = useState(false)
  const [removeMember, setRemoveMember] = useState(false)
  const [transfer, setTransfer] = useState(false)

  const handleAddMember = () => {
    setAddMember(true)
    setManageMember(false)
    setRemoveMember(false)
    setTransfer(false)
  }
  const handleManageMember = () => {
    setAddMember(false)
    setManageMember(true)
    setRemoveMember(false)
    setTransfer(false)
  }
  const handleRemoveMember = () => {
    setAddMember(false)
    setManageMember(false)
    setRemoveMember(true)
    setTransfer(false)
  }

  const handleTransfer = () => {
    setTransfer(true)
    setAddMember(false)
    setManageMember(false)
    setRemoveMember(false)
  }

  return (
    <div className="flex flex-col md:flex-row w-[80%]">
      <div className="flex-1 flex-col p-[2%] justify-center items-center h-full">
        <div className="flex flex-row w-full">
          <div className="flex self-start flex-col">
            <h1 className="flex text-5xl font-bold mb-2">Project</h1>
            <div className="border-[#60AB9A] w-80 h-1 border-2" />
          </div>
          <button
            onClick={handleEditProject}
            className="flex m-auto self-end flex-col"
          >
            <h1 className="text-3xl font-bold mb-2">Edit</h1>
            <div className="border-[#60AB9A] w-20 h-1 border-2" />
          </button>
          <button
            onClick={handleAddMember}
            className="flex m-auto self-end flex-col"
          >
            <AiOutlineUserAdd className="text-5xl" />
          </button>
          <button
            onClick={handleRemoveMember}
            className="flex m-auto self-end flex-col"
          >
            <AiOutlineUserDelete className="text-5xl" />
          </button>
          <button
            onClick={handleManageMember}
            className="flex m-auto self-end flex-col"
          >
            <AiOutlineUser className="text-5xl" />
          </button>
          <button
            onClick={handleTransfer}
            className="flex m-auto self-end flex-col"
          >
            <AiOutlineUserSwitch className="text-5xl" />
          </button>

          <button
            onClick={() => alert('Project Deleted')}
            className="flex m-auto self-end flex-col"
          >
            <RiDeleteBin5Line className="text-5xl" />
          </button>
          <button
            onClick={() => alert('Project Completed')}
            className="flex m-auto self-end flex-col"
          >
            <BsCheck className="text-7xl" />
          </button>
        </div>
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
