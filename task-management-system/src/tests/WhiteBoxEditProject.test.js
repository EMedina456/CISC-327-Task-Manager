/** @jest-environment jsdom */
// Program Intention: Implement White Box Testing for the Edit Project Functionality
// Input/Output: Handle the editing of a project
// Run Intention: Run with the other test cases

// Import files and dependencies here
import { toast, doc, updateDoc } from './FirebaseFunctionsTest';
import { db, user, projects } from './FirebaseDBTest';
jest.mock('./FirebaseFunctionsTest');

const project = 'project1';

// Edit Project Test Function
const handleSubmit = async ({ project_name, description, user }) => {
  // Check if project name is empty
  if (project_name === projects[project]?.name) {
    toast('Project has the same name', { type: 'info' });
  }
  // Check if user has permissions
  if (project_name === 'Generic' && user.uid === 'user1') {
    toast('Invalid permissions', { type: 'error' });
    return;
  }
  // Edit project
  try {
    const projectRef = doc(db, 'projects', project);
    // Update project in database
    await updateDoc(projectRef, {
      name: project_name,
      description: description,
    });
    // Redirect to home page
    console.log('Document updated with ID: ', project);
    window.location.href = '/';
  } catch (error) {
    console.log(error);
  }
};

// Edit Project Test
describe('White Box Test: Edit Project', () => {
  it('Decision 1: Project has same name', async () => {
    // Test Data
    const project_name = 'Project 1';
    const description = 'This is a project';
    await handleSubmit({ project_name, description, user });
    // Expect toast to be called with an info message
    expect(toast).toHaveBeenCalledWith('Project has the same name', {
      type: 'info',
    });
  });
  it('Decision 2: Invalid permissions', async () => {
    // Test Data
    const project_name = 'Generic';
    const description = 'This is a project';
    const user = {
      email: 'fake@gmail.com',
      projects: { project1: 'owner', project2: 'owner' },
      tasks: ['task1', 'task2'],
      uid: 'user1',
    };
    await handleSubmit({ project_name, description, user });
    // Expect toast to be called with an error
    expect(toast).toHaveBeenCalledWith('Invalid permissions', {
      type: 'error',
    });
  });
  it('Decision 3: Error in try Block', async () => {
    // Test Data
    const project_name = 'project 1';
    const description = 'This is a project';
    const consoleLogSpy = jest.spyOn(console, 'log');
    updateDoc.mockImplementation(() => {
      throw new Error('Error');
    });
    await handleSubmit({ project_name, description, user });
    // Expect console.log to be called with an error
    expect(consoleLogSpy).toHaveBeenCalledWith(Error('Error'));
  });
  it('Decision 4: No Error', async () => {
    // Test Data
    const project_name = 'Project 1';
    const description = 'This is a project';
    const consoleLogSpy = jest.spyOn(console, 'log');
    updateDoc.mockImplementation();
    await handleSubmit({ project_name, description, user });
    // Expect console.log to be called with a success
    expect(consoleLogSpy).toHaveBeenCalledWith(
      'Document updated with ID: ',
      'project1'
    );
  });
});
