// import logo from './logo.svg'
import './../App.css'
import { AiOutlinePlus } from 'react-icons/ai'
import { MdOutlineAccountCircle } from 'react-icons/md'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <div className="bg-[#D9D9D9] h-[100vh]">
      <header className="flex h-[15%] bg-[#FF9FB2] items-center">
        <h1 className="text-6xl text-left ml-6 font-extrabold">Task-it</h1>
        <Link to="/" className="text-6xl text-right ml-auto mr-6">
          <AiOutlinePlus />
        </Link>
        <Link to="/login" className="text-6xl text-right ml-auto mr-6">
          <MdOutlineAccountCircle />
        </Link>
      </header>
      <div className="flex h-[85%]">
        <div className="flex flex-col justify-center items-center space-y-8 w-[20%] bg-[#FBDCE2]">
          <div className="flex flex-col justify-center w-[80%]">
            <h1 className="text-4xl font-bold mb-2">!!! Priority</h1>
            <div className="border-[#60AB9A] w-full h-1 border-2" />
            <a
              href="/"
              className="text-xl font-bold mt-2 underline decoration-[#0acdff]"
            >
              Task 1
            </a>
            <a
              href="/"
              className="text-xl font-bold mt-2 underline decoration-[#0acdff]"
            >
              Task 2
            </a>
            <a
              href="/"
              className="text-xl font-bold mt-2 underline decoration-[#0acdff]"
            >
              Task 3
            </a>
          </div>
          <div className="flex flex-col justify-center w-[80%]">
            <h1 className="text-4xl font-bold mb-2">!! Priority</h1>
            <div className="border-[#60AB9A] w-full h-1 border-2" />
            <a
              href="/"
              className="text-xl font-bold mt-2 underline decoration-[#0acdff]"
            >
              Task 1
            </a>
            <a
              href="/"
              className="text-xl font-bold mt-2 underline decoration-[#0acdff]"
            >
              Task 2
            </a>
            <a
              href="/"
              className="text-xl font-bold mt-2 underline decoration-[#0acdff]"
            >
              Task 3
            </a>
          </div>
          <div className="flex flex-col justify-center w-[80%]">
            <h1 className="text-4xl font-bold mb-2">! Priority</h1>
            <div className="border-[#60AB9A] w-full h-1 border-2" />
            <a
              href="/"
              className="text-xl font-bold mt-2 underline decoration-[#0acdff]"
            >
              Task 1
            </a>
            <a
              href="/"
              className="text-xl font-bold mt-2 underline decoration-[#0acdff]"
            >
              Task 2
            </a>
            <a
              href="/"
              className="text-xl font-bold mt-2 underline decoration-[#0acdff]"
            >
              Task 3
            </a>
          </div>
        </div>
        <div className="flex flex-col md:flex-row w-[80%]">
          <div className="flex-1 flex-col p-[10%] justify-center items-center h-full">
            <h1 className="flex text-5xl font-bold mb-2">Projects</h1>
            <div className="border-[#60AB9A] w-80 h-1 border-2" />
            <a
              href="/"
              className="flex text-2xl font-bold mt-2 underline decoration-[#0acdff]"
            >
              Project 1
            </a>
            <a
              href="/"
              className="flex text-2xl font-bold mt-2 underline decoration-[#0acdff]"
            >
              Project 2
            </a>
            <a
              href="/"
              className="flex text-2xl font-bold mt-2 underline decoration-[#0acdff]"
            >
              Project 3
            </a>
            <a
              href="/"
              className="flex text-2xl font-bold mt-2 underline decoration-[#0acdff]"
            >
              ...
            </a>
            <div className="my-16" />
            <h1 className="flex text-5xl font-bold mb-2">Overdue Tasks</h1>
            <div className="border-[#60AB9A] w-80 h-1 border-2" />
            <a
              href="/"
              className="flex text-2xl font-bold mt-2 underline decoration-[#0acdff]"
            >
              Task 1
            </a>
            <a
              href="/"
              className="flex text-2xl font-bold mt-2 underline decoration-[#0acdff]"
            >
              Task 2
            </a>
            <a
              href="/"
              className="flex text-2xl font-bold mt-2 underline decoration-[#0acdff]"
            >
              Task 3
            </a>
            <a
              href="/"
              className="flex text-2xl font-bold mt-2 underline decoration-[#0acdff]"
            >
              ...
            </a>
          </div>

          <div className="flex-1 flex-col p-[10%] justify-center items-center h-full">
            <h1 className="flex text-5xl font-bold mb-2">Tasks</h1>
            <div className="border-[#60AB9A] w-80 h-1 border-2" />
            <a
              href="/"
              className="flex text-2xl font-bold mt-2 underline decoration-[#0acdff]"
            >
              Task 1
            </a>
            <a
              href="/"
              className="flex text-2xl font-bold mt-2 underline decoration-[#0acdff]"
            >
              Task 2
            </a>
            <a
              href="/"
              className="flex text-2xl font-bold mt-2 underline decoration-[#0acdff]"
            >
              Task 3
            </a>
            <a
              href="/"
              className="flex text-2xl font-bold mt-2 underline decoration-[#0acdff]"
            >
              Task 4
            </a>
            <a
              href="/"
              className="flex text-2xl font-bold mt-2 underline decoration-[#0acdff]"
            >
              Task 5
            </a>
            <a
              href="/"
              className="flex text-2xl font-bold mt-2 underline decoration-[#0acdff]"
            >
              Task 6
            </a>
            <a
              href="/"
              className="flex text-2xl font-bold mt-2 underline decoration-[#0acdff]"
            >
              Task 7
            </a>
            <a
              href="/"
              className="flex text-2xl font-bold mt-2 underline decoration-[#0acdff]"
            >
              Task 8
            </a>
            <a
              href="/"
              className="flex text-2xl font-bold mt-2 underline decoration-[#0acdff]"
            >
              Task 9
            </a>
            <a
              href="/"
              className="flex text-2xl font-bold mt-2 underline decoration-[#0acdff]"
            >
              ...
            </a>
          </div>
          <div className="my-16" />
        </div>
      </div>
    </div>
  )
}

export default Home
