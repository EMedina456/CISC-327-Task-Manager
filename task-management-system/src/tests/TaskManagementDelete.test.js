/** @jest-environment jsdom */
// Program Intention: Implement Testing for the Delete Project Functionality
// Input/Output: Handle the addition of a project
// Run Intention: Run with the other test cases

// Import files and dependencies here
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import ViewProject from '../components/ViewProject'
// import Home from '../pages/Home'
// import renderer from 'react-test-renderer'
// import { BrowserRouter } from 'react-router-dom'

// Delete Project Test
describe('Delete Project', () => {
  // Render the Member Form before each test
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<ViewProject />)
  })

  // Test the addition of a member with valid permissions
  it('Scenario Invalid Permissions', async () => {
    // CREATE USER
    // Type in the required test fields
    fireEvent.click(
      screen.getByRole('button', {
        name: /delete/i,
      })
    )

    // CHECK ERROR MESSAGE
    // DELETE USER
  })
  // Test the addition of a member with invalid name
  it('Scenario Valid Permissions', async () => {
    // CREATE USER
    fireEvent.click(
      screen.getByRole('button', {
        name: /delete/i,
      })
    )

    // CHECK IF USER IS DELETED
    // DELETE THE USER
  })
})
