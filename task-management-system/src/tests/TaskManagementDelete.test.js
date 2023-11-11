/** @jest-environment jsdom */
// Program Intention: Implement Testing for the Delete Project Functionality
// Input/Output: Handle the deletion of a project
// Run Intention: Run with the other test cases

// Import files and dependencies here
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import ViewProject from '../components/ViewProject'
import userEvent from '@testing-library/user-event'
// Delete Project Test
describe('Delete Project', () => {
  // Render the Member Form before each test
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<ViewProject />)
  })

  // Test the addition of a member with valid permissions
  it('Scenario Invalid Permissions', async () => {
    const user = userEvent.setup()
    // Delete the project
    await user.click(
      screen.getByRole('button', {
        name: /delete/i,
      })
    )
  })
  // Test the addition of a member with invalid permission
  it('Scenario Valid Permissions', async () => {
    const user = userEvent.setup()
    // Delete the project
    await user.click(
      screen.getByRole('button', {
        name: /delete/i,
      })
    )
  })
})
