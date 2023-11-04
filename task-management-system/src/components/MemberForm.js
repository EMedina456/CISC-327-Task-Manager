// Program Intention: Handle the addition, removal, and management of a member
// Input/Output: Handle the username of the member, and permission of the member if needed
// Run Intention: Run with the entire website

// Import files and dependencies here
import { useState } from 'react';
import { useRouter } from 'next/router';
import { db } from '../firebase/firebase';
import {
  doc,
  updateDoc,
  getDoc,
  query,
  collection,
  where,
  arrayUnion,
  arrayRemove,
  deleteField,
} from 'firebase/firestore';

const MemberForm = ({ title, projects, project, task, tasks, user }) => {
  // Handle the memebre and permission of the member, permissions, their permissions not needed when removing
  const [member, setMember] = useState('');
  const [permissions, setPermissions] = useState('');

  const roles = ['owner', 'admin', 'editor', 'commenter', 'viewer'];

  // Handle the submit of the form
  // This function is not full implemented due to rule testing
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Member: ', member);
    console.log('Permissions: ', permissions);

    const userRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(userRef); // This will be used when permission testing

    const memberRef = query(
      collection(db, 'users'),
      where('email', '==', member)
    );

    if (memberRef === null) {
      alert('Member does not exist');
      return;
    }
    const memberSnap = await getDoc(memberRef);

    // Handle the addition of a member
    if (title === 'Add member to project') {
      const projectRef = doc(db, 'projects', project);
      updateDoc(
        projectRef,
        {
          members: arrayUnion(memberSnap.id),
        },
        { merge: true }
      );
      updateDoc(
        memberRef,
        {
          projects: { [project]: 'viewer' },
        },
        { merge: true }
      );
    } else if (title === 'Add member to task') {
      const taskRef = doc(db, 'tasks', task);
      updateDoc(
        taskRef,
        {
          members: arrayUnion(memberSnap.id),
        },
        { merge: true }
      );
      updateDoc(
        memberRef,
        {
          tasks: arrayUnion(task),
        },
        { merge: true }
      );
    } else if (title === 'Remove a member') {
      const projectRef = doc(db, 'projects', project);
      updateDoc(
        projectRef,
        {
          members: arrayRemove(memberSnap.id),
          user_permissions: { [memberSnap.id]: deleteField() },
        },
        { merge: true }
      );
      updateDoc(
        memberRef,
        {
          projects: { [project]: deleteField() },
        },
        { merge: true }
      );
    } else if (title === 'Manage a member') {
      if (memberSnap.id === user.uid) {
        alert('You cannot change your own permissions');
        return;
      }
      if (permissions === '') {
        alert('Please select a permission');
        return;
      }
      if (permissions === 'owner') {
        alert(
          'You cannot change a member to owner. Please go to transfer ownership'
        );
        return;
      }
      if (!projects[project].members.includes(memberSnap.id)) {
        alert('This user is not a member of this project');
        return;
      }
      const projectRef = doc(db, 'projects', project);
      updateDoc(
        projectRef,
        {
          user_permissions: { [memberSnap.id]: permissions },
        },
        { merge: true }
      );
      updateDoc(
        memberRef,
        {
          projects: { [project]: permissions },
        },
        { merge: true }
      );
    } else if (title === 'Transfer Ownership') {
      if (!projects[project].members.includes(memberSnap.id)) {
        alert('This user is not a member of this project');
        return;
      }
      const projectRef = doc(db, 'projects', project);
      updateDoc(
        projectRef,
        {
          user_permissions: { [memberSnap.id]: 'owner' },
        },
        { merge: true }
      );
      updateDoc(
        memberRef,
        {
          projects: { [project]: 'owner' },
        },
        { merge: true }
      );
      updateDoc(
        userRef,
        {
          projects: { [project]: 'admin' },
        },
        { merge: true }
      );
    }
  };

  // Member Form Page
  return (
    <div className="flex-1 flex-col p-[2%] justify-center items-center h-[85%]">
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
          {/* <label>
            <h1 className="text-2xl font-bold mb-4 mt-4 lg:text-2xl md:text-3xl">
              your permission
            </h1>
            <input
              type="text"
              id="your-permisson"
              title="your permisson"
              className="box-border h-8 w-44 p-4 border-4"
              onChange={(e) => setYourPermission(e.target.value)}
            />
          </label> */}
          {/* Handle their permission input, not needed when removing a member*/}
          {/* {title === 'Remove a member' ? null : (
            <label>
              <h1 className="text-2xl font-bold mb-4 mt-4 lg:text-2xl md:text-3xl">
                their permission
              </h1>
              <input
                type="text"
                id="their-permisson"
                title="their permisson"
                className="box-border h-8 w-44 p-4 border-4"
                onChange={(e) => setTheirPermission(e.target.value)}
              />
            </label>
          )} */}
          {/* Create this div only if the title is "Manage a member" */}
          {title === 'Manage a member' ? (
            <div>
              <h1 className="text-2xl font-bold mb-4 mt-4 lg:text-2xl md:text-3xl">
                their permission
              </h1>
              {roles.map((role) => {
                return (
                  <label className="flex flex-row space-x-3" key={role}>
                    <input
                      type="radio"
                      onChange={(e) => setPermissions(e.target.value)}
                      checked={permissions === role}
                      value={role}
                      className="flex text-sm font-bold mt-2 underline decoration-[#0acdff] md:text-lg lg:text-2xl"
                    />
                    <span>{role}</span>
                  </label>
                );
              })}
            </div>
          ) : null}

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
