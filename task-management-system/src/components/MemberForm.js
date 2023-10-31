// Program Intention: Handle the addition, removal, and management of a member
// Input/Output: Handle the username of the member, and permission of the member if needed
// Run Intention: Run with the entire website

// Import files and dependencies here
import { useState } from 'react'
const MemberForm = ({ title }) => {
  // Handle the memebre and permission of the member, permissions, their permissions not needed when removing
  const [member, setMember] = useState('')
  const [yourPermission, setYourPermission] = useState('')
  const [theirPermission, setTheirPermission] = useState('')

  // Handle the submit of the form, currently only console.log the member and permissions
  const handleSubmit = (e) => {
    console.log('name', member)
    console.log('permission', yourPermission)
    console.log('permission', theirPermission)
  }

  // Member Form Page
  return (
    <div className="flex-1 flex-col p-[2%] justify-center items-center h-full">
      {/* Handle the form of member, title changes based on the argument given*/}
      <h1 className="flex text-3xl font-bold mb-2 lg:text-5xl md:text-5xl">
        {title}
      </h1>
      <div className="border-[#60AB9A] w-60 h-1 border-2" />
      <form onSubmit={handleSubmit}>
        <div className="">
          <label>
            {/* Handle the member name input*/}
            <h1 className="text-2xl font-bold mb-4 mt-4 lg:text-2xl md:text-3xl">
              name
            </h1>
            <input
              type="text"
              id="member_name"
              alt="member_name"
              className="box-border h-8 w-44 p-4 border-4"
              onChange={(e) => setMember(e.target.value)}
            />
          </label>
          {/* Handle your permission input*/}
          <label>
            <h1 className="text-2xl font-bold mb-4 mt-4 lg:text-2xl md:text-3xl">
              your permission
            </h1>
            <input
              type="text"
              id="your-permisson"
              className="box-border h-8 w-44 p-4 border-4"
              onChange={(e) => setYourPermission(e.target.value)}
            />
          </label>
          {/* Handle their permission input, not needed when removing a member*/}
          {title === 'Remove a member' ? null : (
            <label>
              <h1 className="text-2xl font-bold mb-4 mt-4 lg:text-2xl md:text-3xl">
                their permission
              </h1>
              <input
                type="text"
                id="their-permisson"
                className="box-border h-8 w-44 p-4 border-4"
                onChange={(e) => setTheirPermission(e.target.value)}
              />
            </label>
          )}

          <div className="justify-center items-center text-left">
            {/* Handle the submit button*/}
            <button className="text-xl font-bold mt-2 underline decoration-[#0acdff]">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
export default MemberForm
