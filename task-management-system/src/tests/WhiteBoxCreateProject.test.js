// Program Intention: Implement White Box Testing for the Create Project Functionality
// Input/Output: Handle the creation of a project
// Run Intention: Run with the other test cases

// Import files and dependencies here
import {
  doc,
  toast,
  addDoc,
  setDoc,
  collection,
} from './FirebaseFunctionsTest';
import { db, user } from './FirebaseDBTest';
jest.mock('./FirebaseFunctionsTest');

// Create Project Test Function
const handleSubmit = async ({ project_name, description, user }) => {
  if (project_name === '') {
    toast('Please enter a project name', { type: 'error' });
    return;
  }

  // Create project
  try {
    const project = collection(db, 'projects');
    const proj_data = {
      name: project_name,
      description: description,
      tasks: [],
      user_permissions: { 'user.uid': 'owner' },
    };

    // Add project to database
    const projRef = await addDoc(project, proj_data);
    const proj_id = projRef.id;

    // Add project to user
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      setDoc(
        userRef,
        {
          projects: {
            [proj_id]: 'owner',
          },
        },
        { merge: true }
      );
    } else {
      console.log('No user is signed in');
    }
    // Redirect to home page
    toast('Project created successfully');
    window.location.href = '/';
  } catch (error) {
    console.log(error);
  }
};

// Create Project Test
describe('White Box Test: Create Project', () => {
  it('Path 1: Project name is empty', async () => {
    // Test Data
    const project_name = '';
    const description = 'This is a project';
    addDoc.mockImplementation(() => {
      return { id: 'project1' };
    });
    await handleSubmit({ project_name, description, user });
    // Expect toast to be called with an error
    expect(toast).toHaveBeenCalledWith('Please enter a project name', {
      type: 'error',
    });
  });
  it('Path 2: Project name is not empty', async () => {
    // Test Data
    const project_name = 'Project 1';
    const description = 'This is a project';
    await handleSubmit({ project_name, description, user });
    // Expect toast to be called with a success
    expect(toast).toHaveBeenCalledWith('Project created successfully');
  });
  it('Path 3: User is not signed in', async () => {
    // Test Data
    const project_name = 'Project 1';
    const description = 'This is a project';
    const user = null;
    const consoleLogSpy = jest.spyOn(console, 'log');
    await handleSubmit({ project_name, description, user });
    // Expect console log to be called with an error
    expect(consoleLogSpy).toHaveBeenCalledWith('No user is signed in');
  });
  it('Path 4: User is signed in', async () => {
    // Test Data
    const project_name = 'Project 1';
    const description = 'This is a project';
    await handleSubmit({ project_name, description, user });
    // Expect toast to be called with a success
    expect(toast).toHaveBeenCalledWith('Project created successfully');
  });
  it('Path 5: Error in try block', async () => {
    // Test Data
    const project_name = 'Project 1';
    const description = 'This is a project';
    const consoleLogSpy = jest.spyOn(console, 'log');
    addDoc.mockImplementation(() => {
      throw new Error('Error');
    });
    await handleSubmit({ project_name, description, user });
    // Expect console log to be called with an error
    expect(consoleLogSpy).toHaveBeenCalledWith(Error('Error'));
  });
});
