// Program Intention: Handle the viewing of a task
// Input/Output: Handle the clicking of the edit, add member, delete, and complete buttons
// Run Intention: Run with the entire website

// Import files and dependencies here
import { BsCheck } from 'react-icons/bs';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { useState } from 'react';
import SingleTask from './SingleTask';
import AddMember from './AddMemberToTask';

import { doc, deleteDoc, setDoc, arrayRemove } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const ViewTask = ({
  handleViewProject,
  handleEditTask,
  task: key,
  tasks,
  projects,
  user,
}) => {
  // Handle the variables required for the page
  const [addMember, setAddMember] = useState(false);

  const handleDeleteTask = async (e) => {
    e.preventDefault();
    try {
      console.log('key', key);
      const taskRef = doc(db, 'tasks', key);
      if (tasks[key].project !== '') {
        const projectRef = doc(db, 'projects', tasks[key].project);
        await setDoc(
          projectRef,
          {
            tasks: arrayRemove(key),
          },
          { merge: true }
        );
      }
      console.log('members', tasks[key].members);
      tasks[key].members.forEach(async (member) => {
        const memberRef = doc(db, 'users', member);
        await setDoc(memberRef, { tasks: arrayRemove(key) }, { merge: true });
      });
      console.log('tasks before delete', tasks);
      await deleteDoc(taskRef);
      console.log('Document deleted with ID: ', taskRef.id);
      alert('Task deleted successfully');
      window.location.href = '/';
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

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
            <h1 className="flex text-3xl font-bold mb-2 lg:text-5xl md:text-5xl">
              {tasks[key]?.name || ''}
            </h1>
            <div className="border-[#60AB9A] border-2 w-28 lg:w-44 md:w-44 h-1" />
          </div>
          {/* Handle the edit task button*/}
          <button
            onClick={() => handleEditTask(key)}
            className="flex m-auto self-end flex-col">
            <h1 className="text-xl lg:text-3xl md:text-3xl font-bold mb-2">
              Edit
            </h1>
            <div className="border-[#60AB9A] w-16 lg:w-20 md:w-20 h-1 border-2 " />
          </button>
          {/* Handle the add member button*/}
          <button
            onClick={() => handleAddMember(key)}
            className="flex m-auto self-end flex-col">
            <AiOutlineUserAdd className="text-3xl lg:text-5xl md:text-5xl" />
          </button>
          {/* Handle the delete button, and send an alert to confirm the deletion*/}
          {/* Under Progress */}
          <button
            onClick={(e) => handleDeleteTask(e)}
            className="flex m-auto self-end flex-col"
            title="delete">
            <RiDeleteBin5Line className="text-3xl lg:text-5xl md:text-5xl" />
          </button>
          {/* Handle the complete button, and send an alert to confirm the completion*/}
          {/* Under Progress */}
          <button
            onClick={(e) => handleDeleteTask(e)}
            className="flex m-auto self-end flex-col"
            title="complete">
            <BsCheck className="text-3xl lg:text-5xl md:text-5xl" />
          </button>
        </div>
        {/* Handle which component to display, either the add member or the single task*/}
        {addMember ? (
          <AddMember task={key} tasks={tasks} projects={projects} user={user} />
        ) : (
          <SingleTask
            handleViewProject={handleViewProject}
            task={tasks[key]}
            projects={projects}
          />
        )}
      </div>
    </div>
  );
};
export default ViewTask;
