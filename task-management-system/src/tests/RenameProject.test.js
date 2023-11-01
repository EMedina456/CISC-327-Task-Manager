/** @jest-environment jsdom */
// Program Intention: Implement Testing for the Create Projet Functionality
// Input/Output: Handle the addition of a project
// Run Intention: Run with the other test cases

// Import files and dependencies here
import { render, screen } from '@testing-library/react'
import React from 'react'
import user from '@testing-library/user-event'
import EditProject from '../components/EditProject'
// import Home from '../pages/Home'
// import renderer from 'react-test-renderer'
// import { BrowserRouter } from 'react-router-dom'

// Rename Project Test
describe('Modify Project', () => {
  // Render the Member Form before each test
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<EditProject />)
  })

  // Test the addition of a member with valid permissions
  it('Scenario Valid Permissions', async () => {
    // CREATE PROJECT
    // Type in the required test fields
    user.type(
      user.click(
        screen.getByRole('textbox', {
          name: /name/i,
        })
      ),
      'Example'
    )

    // CHECK IF THE PROJECT IS EDITED
    // DELETE THE PROJECT
  })
  // Test the addition of a member with invalid name
  it('Scenario Invalid Permissions', async () => {
    // CREATE PROJECT
    // Type in the required test fields
    user.type(
      user.click(
        screen.getByRole('textbox', {
          name: /name/i,
        })
      ),
      'Example'
    )

    // CHECK ERROR MESSAGE
  })
})
