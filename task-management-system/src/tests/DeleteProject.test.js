/** @jest-environment jsdom */
// Program Intention: Implement Testing for the Create Projet Functionality
// Input/Output: Handle the addition of a project
// Run Intention: Run with the other test cases

// Import files and dependencies here
import { render, screen } from '@testing-library/react'
import React from 'react'
import user from '@testing-library/user-event'
// import Home from '../pages/Home'
// import renderer from 'react-test-renderer'
// import { BrowserRouter } from 'react-router-dom'
import ViewProject from '../components/ViewProject'

// Delete Project Test
describe('Delete Project', () => {
  // Render the Member Form before each test
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<ViewProject />)
  })

  // Test the addition of a member with valid permissions
  it('Delete Confirmation Pressed', async () => {
    // Type in the required test fields
    user.click(
      screen.getByRole('button', {
        name: /delete/i,
      })
    )

    // CHECK IF USER IS DELETED
    // DELETE THE USER
  })
  // Test the addition of a member with invalid name
  it('Delete Confirmation Not Pressed', async () => {
    user.click(
      screen.getByRole('button', {
        name: /delete/i,
      })
    )

    // CHECK IF USER IS DELETED
    // DELETE THE USER

    // CHECK ERROR MESSAGE
  })
})
