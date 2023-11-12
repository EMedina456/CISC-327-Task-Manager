/** @jest-environment jsdom */
// Program Intention: Implement Testing for the View Tasks Functionality
// Input/Output: Handle the viewing of tasks
// Run Intention: Run with the other test cases

// Import files and dependencies here
import renderer from 'react-test-renderer'
import Tasks from '../components/Tasks'

// View Tasks Test
describe('View Tasks', () => {
  // Test Data
  const handleViewTask = jest.fn()
  const tasks = {
    task1: {
      deadline: '2024-01-01',
      description: 'This is a task',
      name: 'Task 1',
      project: 'project1',
      priority: '1',
      members: ['user1'],
    },
    task2: {
      deadline: '2024-01-01',
      description: 'This is a task',
      name: 'Task 2',
      project: 'project2',
      priority: '1',
      members: ['user1'],
    },
  }
  const projects = {
    project1: {
      name: 'Project 1',
      description: 'This is a project',
      members: {},
      user_permissions: {
        user1: 'owner',
      },
      tasks: ['1', '2', '3'],
    },
    project2: {
      name: 'Project 2',
      description: 'This is a project',
      members: {},
      user_permissions: {
        user1: 'owner',
      },
      tasks: ['1', '2', '3'],
    },
  }
  it('View Tasks renders correctly', () => {
    // Create a snapshot of the Tasks page
    const tree = renderer
      .create(
        <Tasks
          handleViewTask={handleViewTask}
          tasks={tasks}
          project={'project1'}
          projects={projects}
        />
      )
      .toJSON()
    // Compare the snapshot
    expect(tree).toMatchSnapshot()
  })
})
