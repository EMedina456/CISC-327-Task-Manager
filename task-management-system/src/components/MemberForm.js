import { useState } from 'react'
const MemberForm = ({ title }) => {
  const [member, setMember] = useState('')
  const [permission, setPermission] = useState('')
  const handleSubmit = (e) => {
    console.log('name', member)
  }
  return (
    <div className="flex-1 flex-col p-[2%] justify-center items-center h-full">
      <h1 className="flex text-3xl font-bold mb-2">{title}</h1>
      <div className="border-[#60AB9A] w-60 h-1 border-2" />
      <form onSubmit={handleSubmit}>
        <div className="">
          <label>
            <h1 className="text-2xl font-bold mb-4 mt-4">name</h1>
            <input
              type="text"
              id="member_name"
              className="box-border h-8 w-44 p-4 border-4"
              onChange={(e) => setMember(e.target.value)}
            />
          </label>
          {title === 'Manage a member' && (
            <label>
              <h1 className="text-2xl font-bold mb-4 mt-4">permission</h1>
              <input
                type="text"
                id="permisson"
                className="box-border h-8 w-44 p-4 border-4"
                onChange={(e) => setMember(e.target.value)}
              />
            </label>
          )}
          <div className="justify-center items-center text-left">
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
