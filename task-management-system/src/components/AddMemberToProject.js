// Program Intention: Handle the addition of a member
// Input/Output: Handle the username of the member
// Run Intention: Run with the entire website

// Import files and dependencies here

import MemberForm from './MemberForm';
const AddMember = ({ tasks, projects, user, project }) => {
  // Add Member Page
  return (
    <MemberForm
      title={'Add member to project'}
      user={user}
      tasks={tasks}
      project={project}
      projects={projects}
    />
  );
};
export default AddMember;
