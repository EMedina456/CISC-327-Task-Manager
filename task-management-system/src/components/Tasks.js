// Program Intention: Handle the view and selection of tasks
// Input/Output: Handle the selection of tasks
// Run Intention: Run with the entire website

// Import files and dependencies here
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { useState, useEffect } from 'react';

const Tasks = ({ handleViewTask, tasks, project, projects }) => {
  const [taskList, setTaskList] = useState([]);

  //   useEffect(() => {
  //     const getTaskInfo = async () => {
  //       try {
  //         const auth = getAuth();
  //         onAuthStateChanged(auth, async (user) => {
  //           if (user) {
  //             const uid = user.uid;
  //             const userRef = doc(db, 'users', uid);
  //             const docSnap = await getDoc(userRef);
  //             if (docSnap.exists()) {
  //               const taskPromises = tasks.map(async (key) => {
  //                 const taskDocRef = doc(db, 'tasks', key);
  //                 const taskDocSnap = await getDoc(taskDocRef);
  //                 if (taskDocSnap.exists()) {
  //                   setTaskList((prevNames) => [
  //                     ...prevNames,
  //                     taskDocSnap.data().name,
  //                   ]);
  //                 }
  //               });

  //               await Promise.all(taskPromises);
  //             } else {
  //               console.log('No such document!');
  //             }
  //           } else {
  //             window.location.href = '/login';
  //           }
  //         });
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };
  //     getTaskInfo();
  //   }, []);
  // Tasks Page

  console.log('Projects: ', projects[project]);
  return (
    <div>
      {/* Tasks Page */}
      {/* Be able to click on a task and view it */}
      {projects[project].tasks.map((key) => (
        <button
          onClick={() => handleViewTask(key)}
          key={key}
          className="flex text-base font-bold mt-2 underline decoration-[#0acdff] md:text-lg lg:text-2xl ">
          {tasks[key].name}
        </button>
      ))}
    </div>
  );
};
export default Tasks;
