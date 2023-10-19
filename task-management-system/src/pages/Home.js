// import logo from './logo.svg'
import './../App.css'
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
const Home = () => {
  const [createTask, setCreateTask] = useState(false)
  const [createProject, setCreateProject] = useState(false)
  const [create, setCreate] = useState(false)
  const [viewTask, setViewTask] = useState(false)
  const [viewProject, setViewProject] = useState(false)
  const [editProject, setEditProject] = useState(false)
  const [editTask, setEditTask] = useState(false)
  const [deadline, setDeadline] = useState(false)
  const [priority, setPriority] = useState(true)
  const handleDeadline = () => {
    setDeadline(true)
    setPriority(false)
  }
  const handlePriority = () => {
    setPriority(true)
    setDeadline(false)
  }
  const handleCreateTask = () => {
    setCreateTask(true)
    setCreateProject(false)
    setCreate(false)
  }
  const handleCreate = () => {
    setCreate(!create)
  }
  const handleCreateProject = () => {
    setCreateProject(true)
    setCreateTask(false)
    setCreate(false)
  }
  const handleReset = () => {
    setCreateTask(false)
    setCreateProject(false)
    setCreate(false)
    setViewTask(false)
    setViewProject(false)
  }

  const handleViewTask = () => {
    setViewTask(true)
    setCreateTask(false)
    setCreateProject(false)
    setCreate(false)
    setViewProject(false)
  }

  const handleViewProject = () => {
    setViewProject(true)
    setViewTask(false)
    setCreateTask(false)
    setCreateProject(false)
    setCreate(false)
  }

  const handleEditProject = () => {
    setEditProject(true)
    setViewProject(false)
    setViewTask(false)
    setCreateTask(false)
    setCreateProject(false)
    setCreate(false)
    setEditTask(false)
  }
  const handleEditTask = () => {
    setEditTask(true)
    setEditProject(false)
    setViewProject(false)
    setViewTask(false)
    setCreateTask(false)
    setCreateProject(false)
    setCreate(false)
  }
  return (
    <div className="bg-[#D9D9D9] h-[100vh]">
      <header className="flex h-[15%] bg-[#FF9FB2] items-center">
        <button onClick={handleReset}>
          <h1 className="text-6xl text-left ml-6 font-extrabold">Task-it</h1>
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

        <Link to="/login" className="text-6xl text-right ml-auto mr-6">
          <MdOutlineAccountCircle />
        </Link>
      </header>
      <div className="flex h-[85%]">
        <div className="flex flex-col justify-top p-[2%] items-center space-y-8 w-[20%] bg-[#FBDCE2]">
          <h1 className="text-4xl font-bold mb-2">Sort By </h1>
          <div className="border-[#60AB9A] w-full h-1 border-2" />
          <div className="flex flex-row ">
            <div className="flex flex-col">
              <button onClick={handleDeadline}>
                <h1 className="text-3xl m-2 font-bold mb-2">Deadline </h1>
                <div className="mr-2 border-[#60AB9A] w-full h-1 border-2" />
              </button>
            </div>

            <div className="flex flex-col">
              <button onClick={handlePriority}>
                <h1 className="text-3xl m-2 font-bold mb-2">Priority </h1>
                <div className=" ml-2 border-[#60AB9A] w-full h-1 border-2" />
              </button>
            </div>
          </div>
          {deadline ? (
            <Tasks handleViewTask={handleViewTask} />
          ) : (
            <PriorityTasks handleViewTask={handleViewTask} />
          )}
        </div>
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
