// Program Intention: Handle the management of a member
// Input/Output: Handle the username of the member
// Run Intention: Run with the entire website

// Import files and dependencies here
import MemberForm from './MemberForm';

const ManageMember = ({ projects, user, project }) => {
  // Manage Member Page
  return (
    <MemberForm
      title={'Manage a member'}
      project={project}
      projects={projects}
      user={user}
    />
  );
};
export default ManageMember;
