/** @jest-environment jsdom */
// Program Intention: Implement Testing for the View Tasks Functionality
// Input/Output: Handle the viewing of tasks
// Run Intention: Run with the other test cases

// Import files and dependencies here
import renderer from 'react-test-renderer'
import Tasks from '../components/Tasks'

// View Tasks Test
it('View Tasks renders correctly', () => {
  // Create a snapshot of the Tasks page
  const tree = renderer.create(<Tasks />).toJSON()
  // Compare the snapshot
  expect(tree).toMatchSnapshot()
})
