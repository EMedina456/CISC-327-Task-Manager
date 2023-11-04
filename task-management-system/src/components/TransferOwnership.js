// Program Intention: Handle the transfer of ownership
// Input/Output: Handle the username of username of the new owner
// Run Intention: Run with the entire website

// Import files and dependencies here
import MemberForm from './MemberForm';
const TransferOwnership = ({ projects, user, project }) => {
  // Transfer Ownership Page
  return (
    <MemberForm
      title={'Transfer Ownership'}
      project={project}
      user={user}
      projects={projects}
    />
  );
};
export default TransferOwnership;
