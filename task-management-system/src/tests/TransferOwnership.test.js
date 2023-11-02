/** @jest-environment jsdom */
// Program Intention: Implement Testing for the Add Team Member Functionality
// Input/Output: Handle the addition of a member
// Run Intention: Run with the other test cases

// Import files and dependencies here
import { render, screen } from '@testing-library/react'
import React from 'react'
import user from '@testing-library/user-event'
import TransferOwnership from '../components/TransferOwnership'
// import Home from '../pages/Home'
// import renderer from 'react-test-renderer'
// import { BrowserRouter } from 'react-router-dom'

// Add Team Member Test
describe('Transfer Ownership', () => {
  // Render the Member Form before each test
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<TransferOwnership />)
  })
  // Test the addition of a member that does not exist
  it('Scenario Valid Owner Permissions', async () => {
    // Type in the required test fields
    user.type(
      user.click(
        screen.getByRole('textbox', {
          name: /name/i,
        })
      ),
      'Invalid user'
    )
    user.type(
      user.click(
        screen.getByRole('textbox', {
          name: /your permission/i,
        })
      ),
      'random permission'
    )
    user.type(
      user.click(
        screen.getByRole('textbox', {
          name: /their permission/i,
        })
      ),
      'random permission'
    )
    user.click(screen.getByText(/submit/i))
    user.click(
      screen.getByRole('button', {
        name: /submit/i,
      })
    )

    // CHECK OWNERSHIP IS TRANSFERRED
  })
})
