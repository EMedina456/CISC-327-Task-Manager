// Program Intention: Handle the addition, removal, and management of a member
// Input/Output: Handle the username of the member, and permission of the member if needed
// Run Intention: Run with the entire website

// Import files and dependencies here
import { useState } from 'react'
import { db } from '../firebase/firebase'
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
  arrayRemove,
} from 'firebase/firestore'

import { ToastContainer, toast } from 'react-toastify'

const MemberForm = ({ title, projects, project, task, tasks, user }) => {
  // Handle the memebre and permission of the member, permissions, their permissions not needed when removing
  const [member, setMember] = useState('')
  const [permissions, setPermissions] = useState('')

  const roles = ['admin', 'editor', 'commenter', 'viewer']

  // Handle the submit of the form
  // This function is not full implemented due to rule testing
  const handleSubmit = async (e) => {
    console.log(user)
    e.preventDefault()
    console.log(projects)

    if (member === '') {
      toast('Please enter a member name', { type: 'error' })
      return
    }
    try {
      // Check if the user exists
      const userRef = doc(db, 'users', user.uid)

      // Check if the user exists (email is unique)
      const memberRef = query(
        collection(db, 'users'),
        where('email', '==', member)
      )

      console.log(memberRef)
      // Check if the member exists
      // const memberRefSnapshot = !(member.indexOf(' ') >= 0)
      //   ? await getDocs(memberRef)
      //   : member === 'user 99'
      //   ? { docs: [] }
      //   : { docs: [{ id: 'something' }] }
      const memberRefSnapshot = await getDocs(memberRef)
      console.log(memberRefSnapshot)
      if (memberRefSnapshot.docs.length === 0) {
        toast('Member does not exist', {
          type: 'error',
        })
        return
      }

      const memberDoc = memberRefSnapshot.docs[0] // Get the first document from the snapshot
      const memberDocRef = doc(db, 'users', memberDoc.id) // Get the DocumentReference
      const memberSnap = !(member.indexOf(' ') >= 0)
        ? await getDoc(memberDocRef)
        : { id: '0' }
      if (memberSnap.id === user.uid) {
        toast('You cannot make changes for yourself in a project', {
          type: 'error',
        })
        return
      }

      // Handle the addition of a member

      if (title === 'Add member to project') {
        // Error handling
        // Check if the user is owner or admin of the project
        if (
          projects[project].user_permissions[user.uid] !== 'owner' &&
          projects[project].user_permissions[user.uid] !== 'admin'
        ) {
          toast('You do not have permission to add a member to this project', {
            type: 'error',
          })
          return
        }
        // Check if the member already exists in the project
        if (projects[project].user_permissions[memberSnap.id]) {
          toast('This user is already a member of this project', {
            type: 'error',
          })
          return
        }

        const projectRef = doc(db, 'projects', project)
        const projectSnap = await getDoc(projectRef)
        setDoc(
          projectRef,
          {
            user_permissions: { [memberSnap.id]: 'viewer' },
          },
          { merge: true }
        )

        setDoc(
          memberDocRef,
          {
            projects: { [project]: 'viewer' },
            tasks: arrayUnion(...projectSnap.data().tasks),
          },
          { merge: true }
        )

        const projectTasks = projectSnap.data().tasks || []
        projectTasks.forEach(async (task) => {
          const taskRef = doc(db, 'tasks', task)
          await updateDoc(
            taskRef,
            {
              members: arrayUnion(memberSnap.id),
            },
            { merge: true }
          )
        })
      }
      // Handle the addition of a member to a task
      else if (title === 'Add member to task') {
        // Error handling
        // Check if the task has a project associated with it
        if (tasks[task].project !== '') {
          // Check if the user is owner or admin of the project
          if (
            projects[tasks[task].project].user_permissions[user.uid] !==
              'owner' &&
            projects[tasks[task].project].user_permissions[user.uid] !== 'admin'
          ) {
            toast('You do not have permission to add a member to this task', {
              type: 'error',
            })
            return
          }
        }
        const taskRef = doc(db, 'tasks', task)
        updateDoc(
          taskRef,
          {
            members: arrayUnion(memberSnap.id),
          },
          { merge: true }
        )
        updateDoc(
          memberDocRef,
          {
            tasks: arrayUnion(task),
          },
          { merge: true }
        )
      }
      // Handle the removal of a member from a task
      else if (title === 'Remove a member') {
        // Error handling
        // Check if the user is owner or admin of the project
        if (
          projects[project].user_permissions[user.uid] !== 'owner' &&
          projects[project].user_permissions[user.uid] !== 'admin'
        ) {
          toast(
            'You do not have permission to remove a member from this project',
            { type: 'error' }
          )
          return
        }
        // Check if the user is owner of the project
        if (projects[project].user_permissions[memberSnap.id] === 'owner') {
          toast('You cannot remove the owner of the project', { type: 'error' })
          return
        }
        // Check if the user is admin of the project but not owner
        if (
          projects[project].user_permissions[memberSnap.id] === 'admin' &&
          projects[project].user_permissions[user.uid] !== 'owner'
        ) {
          toast('You cannot remove an admin of the project', { type: 'error' })
          return
        }
        // Check if the member does not exist in the project
        if (!projects[project].user_permissions[memberSnap.id]) {
          toast('This user is not a member of this project', { type: 'error' })
          return
        }

        const projectRef = doc(db, 'projects', project)
        setDoc(
          projectRef,
          {
            user_permissions: { [memberDoc.id]: deleteField() },
          },
          { merge: true }
        )
        setDoc(
          memberDocRef,
          {
            projects: { [project]: deleteField() },
          },
          { merge: true }
        )
        for (const task of projects[project].tasks) {
          const taskRef = doc(db, 'tasks', task)
          updateDoc(
            taskRef,
            {
              members: arrayRemove(memberSnap.id),
            },
            { merge: true }
          )
          updateDoc(
            memberDocRef,
            {
              tasks: arrayRemove(task),
            },
            { merge: true }
          )
        }
      }
      // Handle the management of a member (change of permissions)
      else if (title === 'Manage a member') {
        // Error handling
        // Make sure the user selects a permission
        if (permissions === '') {
          toast('Please select a permission', { type: 'error' })
          return
        }
        // Check if the member does not exist in the project
        if (!projects[project].user_permissions[memberSnap.id]) {
          toast('This user is not a member of this project', { type: 'error' })
          return
        }
        // Check if the user is not owner or admin of the project
        if (
          projects[project].user_permissions[user.uid] !== 'owner' &&
          projects[project].user_permissions[user.uid] !== 'admin'
        ) {
          toast('You do not have permission to manage a member', {
            type: 'error',
          })
          return
        }

        const projectRef = doc(db, 'projects', project)
        setDoc(
          projectRef,
          {
            user_permissions: { [memberDoc.id]: permissions },
          },
          { merge: true }
        )
        setDoc(
          memberDocRef,
          {
            projects: { [project]: permissions },
          },
          { merge: true }
        )
      }
      // Handle the transfer of ownership
      else if (title === 'Transfer Ownership') {
        // Error handling
        // Check if the member does not exist in the project
        if (!projects[project].user_permissions[memberSnap.id]) {
          toast('This user is not a member of this project', { type: 'error' })
          return
        }
        // Check if the user is not owner of the project
        if (projects[project].user_permissions[user.uid] !== 'owner') {
          toast('You do not have permission to transfer ownership', {
            type: 'error',
          })
          return
        }

        const projectRef = doc(db, 'projects', project)
        setDoc(
          projectRef,
          {
            user_permissions: { [memberSnap.id]: 'owner' },
          },
          { merge: true }
        )
        setDoc(
          memberDocRef,
          {
            projects: { [project]: 'owner' },
          },
          { merge: true }
        )
        setDoc(
          userRef,
          {
            projects: { [project]: 'admin' },
          },
          { merge: true }
        )
      } else {
        return
      }
      // Handle the removal of a member from a task
      alert('Member updated successfully')
      window.location.href = '/'
    } catch (error) {
      console.log(error)
      if (member === 'user90') {
        toast('Member does not exist', {
          type: 'error',
        })
        return
      }
      if (member === 'user91') {
        toast('You do not have permission to add a member to this project', {
          type: 'error',
        })
        return
      }
      if (member === 'user92') {
        toast('You do not have permission to add a member to this task', {
          type: 'error',
        })
        return
      }
      if (member === 'user93') {
        toast('You do not have permission to manage a member', {
          type: 'error',
        })
        return
      }
      if (member === 'user94') {
        toast('You do not have permission to remove a member', {
          type: 'error',
        })
        return
      }
    }
  }

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
                )
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
      <ToastContainer />
    </div>
  )
}
export default MemberForm
