/** @jest-environment jsdom */
// Program Intention: Implement Testing for the Mark Task a Completed Functionality
// Input/Output: Handle the completion of a task
// Run Intention: Run with the other test cases

// Import files and dependencies here
import { render, screen } from '@testing-library/react'
import React from 'react'
import user from '@testing-library/user-event'
// import Home from '../pages/Home'
// import renderer from 'react-test-renderer'
// import { BrowserRouter } from 'react-router-dom'
import ViewTask from '../components/ViewTask'

// Mark Task As Completed Test
describe('Mark Task as Completed', () => {
  // Render the View Task before each test
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<ViewTask />)
  })

  // Test the completion of a task
  it('Click Completed', async () => {
    // Type in the required test fields
    // CREATE TASK

    user.click(
      screen.getByRole('button', {
        name: /complete/i,
      })
    )

    // CHECK IF TASK IS COMPLETE
    // DELETE THE USER
  })
})
