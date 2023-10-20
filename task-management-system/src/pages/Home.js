// Program Intention: Home page to handle the various components and pages
// Input/Output: The page will handle the input/output of the various components and pages, which are all controlled by user control
// Run Intention: The page will run the various components and pages through the running of the website, which are all controlled by user control

// Import files and dependencies here
import { AiOutlinePlus } from 'react-icons/ai'
import { MdOutlineAccountCircle } from 'react-icons/md'
import { Link } from 'react-router-dom'
import Current from '../components/Current'
import CreateTask from '../components/CreateTask'
import { useState } from 'react'
import CreateProject from '../components/CreateProject'
import ViewProject from '../components/ViewProject'
import ViewTask from '../components/ViewTask'
import EditProject from '../components/EditProject'
import EditTask from '../components/EditTask'
import Tasks from '../components/Tasks'
import PriorityTasks from '../components/PriorityTasks'
import './../App.css'

// Home Page
const Home = () => {
  // Variables used in the page to trigger different components
  const [createTask, setCreateTask] = useState(false)
  const [createProject, setCreateProject] = useState(false)
  const [create, setCreate] = useState(false)
  const [viewTask, setViewTask] = useState(false)
  const [viewProject, setViewProject] = useState(false)
  const [editProject, setEditProject] = useState(false)
  const [editTask, setEditTask] = useState(false)
  const [deadline, setDeadline] = useState(false)
  const [priority, setPriority] = useState(true)

  // Functions to handle the different components
  // Handle the deadline component, by setting it true and the priority component false
  const handleDeadline = () => {
    setDeadline(true)
    setPriority(false)
  }

  // Handle the priority component, by setting it true and the deadline component false
  const handlePriority = () => {
    setPriority(true)
    setDeadline(false)
  }

  // Handle the create task component, by setting it true and the other components false
  const handleCreateTask = () => {
    setCreateTask(true)
    setCreateProject(false)
    setCreate(false)
  }

  // Handle the create component, which is the plus button, by setting it true and the other components false
  const handleCreate = () => {
    setCreate(!create)
  }

  // Handle the create project component, by setting it true and the other components false
  const handleCreateProject = () => {
    setCreateProject(true)
    setCreateTask(false)
    setCreate(false)
  }

  // Handle the reset component, which resets the page, by setting it true and the other components false
  const handleReset = () => {
    setCreateTask(false)
    setCreateProject(false)
    setCreate(false)
    setViewTask(false)
    setViewProject(false)
  }

  // Handle the view task component by setting it true and the other components false
  const handleViewTask = () => {
    setViewTask(true)
    setCreateTask(false)
    setCreateProject(false)
    setCreate(false)
    setViewProject(false)
  }

  // Handle the view project component by setting it true and the other components false
  const handleViewProject = () => {
    setViewProject(true)
    setViewTask(false)
    setCreateTask(false)
    setCreateProject(false)
    setCreate(false)
  }

  // Handle the edit project component by setting it true and the other components false
  const handleEditProject = () => {
    setEditProject(true)
    setViewProject(false)
    setViewTask(false)
    setCreateTask(false)
    setCreateProject(false)
    setCreate(false)
    setEditTask(false)
  }

  // Handle the edit task component by setting it true and the other components false
  const handleEditTask = () => {
    setEditTask(true)
    setEditProject(false)
    setViewProject(false)
    setViewTask(false)
    setCreateTask(false)
    setCreateProject(false)
    setCreate(false)
  }

  // Return the page
  return (
    <div className="bg-[#D9D9D9] min-h-[100vh]">
      {/* The Create + plus that handles the create project and create task components */}
      <header className="flex min-h-[15vh] bg-[#FF9FB2] items-center">
        <button onClick={handleReset}>
          <h1 className="text-6xl text-left m-6 font-extrabold">Task-it</h1>
        </button>

        <div className="flex items-center align-center">
          <button
            onClick={handleCreate}
            className="text-6xl text-right ml-auto mr-6"
          >
            <AiOutlinePlus />
          </button>
          {create ? (
            <div>
              <button
                onClick={handleCreateProject}
                className="text-4xl text-right ml-auto mr-6"
              >
                Create Project
              </button>
              <button
                onClick={handleCreateTask}
                className="text-4xl text-right ml-auto mr-6"
              >
                Create Task
              </button>
            </div>
          ) : null}
        </div>
        {/* The user icon that handles the login component */}
        <Link to="/login" className="text-6xl text-right ml-auto mr-6">
          <MdOutlineAccountCircle />
        </Link>
      </header>
      <div className="flex min-h-[85vh]">
        {/* The sidebar that handles the different sorting components */}
        <div className="flex flex-col justify-top p-[2%] items-center min-h-[85vh] space-y-8 w-[20%] bg-[#FBDCE2]">
          <h1 className="text-4xl font-bold mb-2">Sort By </h1>
          <div className="border-[#60AB9A] w-full h-1 border-2" />
          <div className="flex flex-row ">
            <div className="flex flex-col">
              {/* The deadline and priority buttons that handle the different sorting components */}
              {/* The deadline button is used to sort the tasks by deadline */}
              <button
                id="handleDeadline"
                onClick={handleDeadline}
                alt="handleDeadline"
              >
                <h1 className="text-3xl m-2 font-bold mb-2">Deadline </h1>
                <div className="mr-2 border-[#60AB9A] w-full h-1 border-2" />
              </button>
            </div>

            <div className="flex flex-col">
              {/* The priority button is used to sort the tasks by priority */}
              <button
                id="handlePriority"
                onClick={handlePriority}
                alt="handlePriority"
              >
                <h1 className="text-3xl m-2 font-bold mb-2">Priority </h1>
                <div className=" ml-2 border-[#60AB9A] w-full h-1 border-2" />
              </button>
            </div>
          </div>
          {/* The tasks and priority tasks components that handle the different sorting components */}
          {deadline ? (
            <Tasks handleViewTask={handleViewTask} />
          ) : (
            <PriorityTasks handleViewTask={handleViewTask} />
          )}
        </div>
        {/* The main component that handles the different components, which checks which variable is true and uses that component */}
        {createTask ? (
          <CreateTask />
        ) : createProject ? (
          <CreateProject />
        ) : viewTask ? (
          <ViewTask
            handleViewProject={handleViewProject}
            handleEditTask={handleEditTask}
          />
        ) : viewProject ? (
          <ViewProject
            handleViewTask={handleViewTask}
            handleEditProject={handleEditProject}
          />
        ) : editProject ? (
          <EditProject />
        ) : editTask ? (
          <EditTask />
        ) : (
          <Current
            handleViewTask={handleViewTask}
            handleViewProject={handleViewProject}
          />
        )}
      </div>
    </div>
  )
}

export default Home
