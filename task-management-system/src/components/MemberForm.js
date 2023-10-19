// Program Intention: Handle the addition, removal, and management of a member
// Input/Output: Handle the username of the member, and permission of the member if needed
// Run Intention: Run with the entire website

// Import files and dependencies here
import { useState } from 'react';
const MemberForm = ({ title }) => {
  // Handle the memebre and permission of the member, permission only need with the management of a member
  const [member, setMember] = useState('');
  const [permission, setPermission] = useState('');

  // Handle the submit of the form, currently only console.log the member and permission
  const handleSubmit = (e) => {
    console.log('name', member);
    console.log('permission', permission);
  };

  // Member Form Page
  return (
    <div className="flex-1 flex-col p-[2%] justify-center items-center h-[85%]">
      {/* Handle the form of member, title changes based on the argument given*/}
      <h1 className="flex text-3xl font-bold mb-2">{title}</h1>
      <div className="border-[#60AB9A] w-60 h-1 border-2" />
      <form onSubmit={handleSubmit}>
        <div className="">
          <label>
            {/* Handle the member name input*/}
            <h1 className="text-2xl font-bold mb-4 mt-4">name</h1>
            <input
              type="text"
              id="member_name"
              className="box-border h-8 w-44 p-4 border-4"
              onChange={(e) => setMember(e.target.value)}
            />
          </label>
          {/* Handle the permission input, only needed with the management of a member*/}
          {title === 'Manage a member' && (
            <label>
              <h1 className="text-2xl font-bold mb-4 mt-4">permission</h1>
              <input
                type="text"
                id="permisson"
                className="box-border h-8 w-44 p-4 border-4"
                onChange={(e) => setPermission(e.target.value)}
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
  );
};
export default MemberForm;
