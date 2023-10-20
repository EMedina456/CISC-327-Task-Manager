/** @jest-environment jsdom */
// Program Intention: Implement Testing for the Track Tasks by Priority Functionality
// Input/Output: Handle the tracking of tasks by priority
// Run Intention: Run with the other test cases

// Import files and dependencies here
import renderer from 'react-test-renderer'
import Home from '../pages/Home'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'

// Track Tasks by Priority Test
it('Track Tasks by Priority', () => {
  // Create a snapshot of the Home page
  const tree = renderer
    .create(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )
    .toJSON()
  // Render the Home page
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  )
  // Take a snapshot of the Home page
  expect(tree).toMatchSnapshot()

  const button = screen.getByRole('button', {
    name: /priority/i,
  })
  // Click the button to sort by priority
  userEvent.click(button)

  // Check if the snapshot matches
  expect(tree).toMatchSnapshot()
})
