// Program Intention: Handle the removal of a member
// Input/Output: Handle the username of the member
// Run Intention: Run with the entire website

// Import files and dependencies here

import MemberForm from './MemberForm';
const RemoveMember = ({ tasks, projects, user, project }) => {
  // Remove Member Page
  return (
    <MemberForm
      title={'Remove a member'}
      tasks={tasks}
      projects={projects}
      project={project}
      user={user}
    />
  );
};
export default RemoveMember;
