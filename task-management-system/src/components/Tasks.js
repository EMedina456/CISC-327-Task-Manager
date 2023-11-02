// Program Intention: Handle the view and selection of tasks
// Input/Output: Handle the selection of tasks
// Run Intention: Run with the entire website

// Import files and dependencies here
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { useState, useEffect } from 'react';

const Tasks = ({ handleViewTask, tasks }) => {
  const [taskList, setTaskList] = useState([]);

  async function getTaskInfo() {
    try {
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const uid = user.uid;
          const userRef = doc(db, 'users', uid);
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            const taskPromises = tasks.map(async (key) => {
              const taskDocRef = doc(db, 'tasks', key);
              const taskDocSnap = await getDoc(taskDocRef);
              if (taskDocSnap.exists()) {
                setTaskList((prevNames) => ({
                  ...prevNames,
                  [key]: taskDocSnap.data().name,
                }));
              }
            });

            await Promise.all(taskPromises);
          } else {
            console.log('No such document!');
          }
        } else {
          window.location.href = '/login';
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTaskInfo();
  }, []);
  // Tasks Page
  return (
    <div>
      {/* Tasks Page */}
      {/* Be able to click on a task and view it */}
      {taskList.map((key) => (
        <button
          onClick={() => handleViewTask(key)}
          key={key}
          className="flex text-base font-bold mt-2 underline decoration-[#0acdff] md:text-lg lg:text-2xl ">
          {key}
        </button>
      ))}
      <button
        onClick={handleViewTask}
        className="flex text-base font-bold mt-2 underline decoration-[#0acdff] md:text-lg lg:text-2xl ">
        Task 1
      </button>
      <button
        onClick={handleViewTask}
        className="flex text-base font-bold mt-2 underline decoration-[#0acdff] md:text-lg lg:text-2xl ">
        Task 2
      </button>
      <button
        onClick={handleViewTask}
        className="flex text-base font-bold mt-2 underline decoration-[#0acdff] md:text-lg lg:text-2xl ">
        Task 3
      </button>
      <div className="my-16" />
    </div>
  );
};
export default Tasks;
