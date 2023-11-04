// Program Intention: Handle the priority view of tasks
// Input/Output: Handle the priority of tasks
// Run Intention: Run with the entire website

// Import files and dependencies here
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { useState, useEffect } from 'react';

const PriorityTasks = ({ handleViewTask }) => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [taskNames, setTaskNames] = useState([]);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const uid = user.uid;
            setUser(user);
            const userRef = doc(db, 'users', uid);
            const docSnap = await getDoc(userRef);
            if (docSnap.exists()) {
              let userTasks = docSnap.data().tasks || [];
              let userProjects = docSnap.data().projects || [];

              setTasks(userTasks);

              const taskPromises = userTasks.map(async (key) => {
                const taskDocRef = doc(db, 'tasks', key);
                const taskDocSnap = await getDoc(taskDocRef);
                if (taskDocSnap.exists()) {
                  setTaskNames((prevNames) => ({
                    ...prevNames,
                    [key]: taskDocSnap.data().name,
                  }));
                }
              });

              // Wait for all promises to complete before rendering
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
    };
    getUserInfo();
  }, []);
  // Priority Tasks Page
  return (
    <div className="space-y-8 ">
      <div className="flex flex-col justify-center">
        {/* Priority Tasks Page */}
        {/* Highest Priority */}
        <h1 className="text-lg font-bold mb-2 lg:text-4xl md:text-2xl">
          !!! Priority
        </h1>
        <div className="border-[#60AB9A] w-full h-1 border-2" />
        {/* Handle the view and be able to click on the highest priority tasks*/}
        <button
          onClick={handleViewTask}
          className="text-sm text-left font-bold mt-2 underline decoration-[#0acdff] lg:text-xl md:text-base">
          Task 1
        </button>
        <button
          onClick={handleViewTask}
          className="text-sm text-left font-bold mt-2 underline decoration-[#0acdff] lg:text-xl md:text-base">
          Task 2
        </button>
        <button
          onClick={handleViewTask}
          className="text-sm text-left font-bold mt-2 underline decoration-[#0acdff] lg:text-xl md:text-base">
          Task 3
        </button>
      </div>
      <div className="flex flex-col justify-center ">
        {/* Second Highest Priority */}
        <h1 className="text-lg font-bold mb-2 lg:text-4xl md:text-2xl">
          !! Priority
        </h1>
        <div className="border-[#60AB9A] w-full h-1 border-2" />
        {/* Handle the view and be able to click on the second highest priority tasks*/}
        <button
          onClick={handleViewTask}
          className="text-sm text-left font-bold mt-2 underline decoration-[#0acdff] lg:text-xl md:text-base">
          Task 1
        </button>
        <button
          onClick={handleViewTask}
          className="text-sm text-left font-bold mt-2 underline decoration-[#0acdff] lg:text-xl md:text-base">
          Task 2
        </button>
        <button
          onClick={handleViewTask}
          className="text-sm text-left font-bold mt-2 underline decoration-[#0acdff] lg:text-xl md:text-base">
          Task 3
        </button>
      </div>
      <div className="flex flex-col justify-center">
        {/* Third Highest Priority */}
        <h1 className="text-lg font-bold mb-2 lg:text-4xl md:text-2xl">
          ! Priority
        </h1>
        <div className="border-[#60AB9A] w-full h-1 border-2" />
        {/* Handle the view and be able to click on the third highest priority tasks*/}
        <button
          onClick={handleViewTask}
          className="text-sm text-left font-bold mt-2 underline decoration-[#0acdff] lg:text-xl md:text-base">
          Task 1
        </button>
        <button
          onClick={handleViewTask}
          className="text-sm text-left font-bold mt-2 underline decoration-[#0acdff] lg:text-xl md:text-base">
          Task 2
        </button>
        <button
          onClick={handleViewTask}
          className="text-sm text-left font-bold mt-2 underline decoration-[#0acdff] lg:text-xl md:text-base">
          Task 3
        </button>
      </div>
    </div>
  );
};
export default PriorityTasks;
