/** @jest-environment jsdom */
// Program Intention: Implement Testing for the Logout Functionality
// Input/Output: Handle the logout of a user
// Run Intention: Run with the other test cases

// Import files and dependencies here
import { render, screen } from '@testing-library/react'
import React from 'react'
import user from '@testing-library/user-event'
import Home from '../pages/Home'

// Logout Test
describe('Logout', () => {
  // Render the Member Form before each test
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<Home />)
  })

  // Test the addition of a member with valid permissions
  it('Scenario Valid Permissions', async () => {
    // Logout
    user.click(
      screen.getByRole('button', {
        name: /account/i,
      })
    )
  })
})
