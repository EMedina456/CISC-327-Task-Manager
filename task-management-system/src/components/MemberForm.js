// Program Intention: Handle the addition, removal, and management of a member
// Input/Output: Handle the username of the member, and permission of the member if needed
// Run Intention: Run with the entire website

// Import files and dependencies here
import { useState } from 'react';
import { db } from '../firebase/firebase';
import {
  doc,
  updateDoc,
  getDoc,
  query,
  collection,
  where,
  arrayUnion,
  deleteField,
  getDocs,
  setDoc,
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

    try {
      console.log('User: ', user);
      const userRef = doc(db, 'users', user.uid);

      // Check if the user exists (email is unique)
      const memberRef = await query(
        collection(db, 'users'),
        where('email', '==', member)
      );

      // Check if the member exists
      const memberRefSnapshot = await getDocs(memberRef);
      if (memberRefSnapshot.docs.length === 0) {
        alert('Member does not exist');
        return;
      }

      const memberDoc = memberRefSnapshot.docs[0]; // Get the first document from the snapshot
      const memberDocRef = doc(db, 'users', memberDoc.id); // Get the DocumentReference
      const memberSnap = await getDoc(memberDocRef);

      // Handle the addition of a member
      if (title === 'Add member to project') {
        const projectRef = doc(db, 'projects', project);
        const projectSnap = await getDoc(projectRef);
        setDoc(
          projectRef,
          {
            user_permissions: { [memberSnap.id]: 'viewer' },
          },
          { merge: true }
        );

        setDoc(
          memberDocRef,
          {
            projects: { [project]: 'viewer' },
            tasks: arrayUnion(...projectSnap.data().tasks),
          },
          { merge: true }
        );

        const projectTasks = projectSnap.data().tasks || [];
        projectTasks.forEach(async (task) => {
          const taskRef = doc(db, 'tasks', task);
          await updateDoc(
            taskRef,
            {
              members: arrayUnion(memberSnap.id),
            },
            { merge: true }
          );
        });
      }
      // Handle the addition of a member to a task
      else if (title === 'Add member to task') {
        const taskRef = doc(db, 'tasks', task);
        updateDoc(
          taskRef,
          {
            members: arrayUnion(memberSnap.id),
          },
          { merge: true }
        );
        updateDoc(
          memberDocRef,
          {
            tasks: arrayUnion(task),
          },
          { merge: true }
        );
      }
      // Handle the removal of a member from a task
      else if (title === 'Remove a member') {
        const projectRef = doc(db, 'projects', project);
        setDoc(
          projectRef,
          {
            user_permissions: { [memberSnap.id]: deleteField() },
          },
          { merge: true }
        );
        setDoc(
          memberDocRef,
          {
            projects: { [project]: deleteField() },
          },
          { merge: true }
        );
      }
      // Handle the removal of a member from a task
      else if (title === 'Manage a member') {
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
        if (!projects[project].user_permissions[memberSnap.id]) {
          alert('This user is not a member of this project');
          return;
        }
        const projectRef = doc(db, 'projects', project);
        setDoc(
          projectRef,
          {
            user_permissions: { [memberSnap.id]: permissions },
          },
          { merge: true }
        );
        setDoc(
          memberDocRef,
          {
            projects: { [project]: permissions },
          },
          { merge: true }
        );
      }
      // Handle the transfer of ownership
      else if (title === 'Transfer Ownership') {
        if (!projects[project].user_permissions[memberSnap.id]) {
          alert('This user is not a member of this project');
          return;
        }
        const projectRef = doc(db, 'projects', project);
        setDoc(
          projectRef,
          {
            user_permissions: { [memberSnap.id]: 'owner' },
          },
          { merge: true }
        );
        setDoc(
          memberDocRef,
          {
            projects: { [project]: 'owner' },
          },
          { merge: true }
        );
        setDoc(
          userRef,
          {
            projects: { [project]: 'admin' },
          },
          { merge: true }
        );
      }
      // Handle the removal of a member from a task
      alert('Member updated successfully');
      window.location.href = '/';
    } catch (error) {
      console.log(error);
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
