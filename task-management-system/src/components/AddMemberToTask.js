// Program Intention: Handle the addition of a member
// Input/Output: Handle the username of the member
// Run Intention: Run with the entire website

// Import files and dependencies here

import MemberForm from './MemberForm';
const AddMember = ({ task, tasks, projects, user }) => {
  // Add Member Page
  return (
    <MemberForm
      title={'Add member to task'}
      task={task}
      tasks={tasks}
      projects={projects}
      user={user}
    />
  );
};
export default AddMember;
