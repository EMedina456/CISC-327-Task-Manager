/** @jest-environment jsdom */
// Program Intention: Implement Testing for the Add Team Member Functionality
// Input/Output: Handle the addition of a member
// Run Intention: Run with the other test cases

// Import files and dependencies here
import { render, screen } from '@testing-library/react'
import React from 'react'
import user from '@testing-library/user-event'
import Home from '../pages/Home'
import renderer from 'react-test-renderer'
import { BrowserRouter } from 'react-router-dom'

// Add Team Member Test
describe('Logout', () => {
  // Create a snapshot of the Home page
  const tree = renderer
    .create(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )
    .toJSON()

  // Render the Member Form before each test
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<Home />)
  })

  // Test the addition of a member with valid permissions
  it('Scenario Valid Permissions', async () => {
    // Type in the required test fields
    user.click(
      screen.getByRole('link', {
        name: /account/i,
      })
    )

    // Compare the snapshot
    expect(tree).toMatchSnapshot()

    // CHECK IF THE USER IS ADDED
  })
})
