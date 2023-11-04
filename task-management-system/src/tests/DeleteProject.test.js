/** @jest-environment jsdom */
// Program Intention: Implement Testing for the Delete Project Functionality
// Input/Output: Handle the deletion of a project
// Run Intention: Run with the other test cases

// Import files and dependencies here
import { render, screen } from '@testing-library/react'
import React from 'react'
import user from '@testing-library/user-event'
import ViewProject from '../components/ViewProject'

// Delete Project Test
describe('Delete Project', () => {
  // Render the Member Form before each test
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<ViewProject />)
  })

  // Test the deletion of a member with confirmation pressed
  it('Delete Confirmation Pressed', async () => {
    // Click the delete button
    user.click(
      screen.getByRole('button', {
        name: /delete/i,
      })
    )
  })
  // Test the deletion of a member with confirmation not pressed
  it('Delete Confirmation Not Pressed', async () => {
    // Delete button not clicked
    screen.getByRole('button', {
      name: /delete/i,
    })
  })
})
