/** @jest-environment jsdom */
// Program Intention: Implement Testing for the Add Team Member Functionality
// Input/Output: Handle the addition of a member
// Run Intention: Run with the other test cases

// Import files and dependencies here
import { render, screen } from '@testing-library/react'
import React from 'react'
import user from '@testing-library/user-event'
import Login from '../pages/Login'
// import Home from '../pages/Home'
// import renderer from 'react-test-renderer'
// import { BrowserRouter } from 'react-router-dom'

// Add Team Member Test
describe('Login', () => {
  // Render the Member Form before each test
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<Login />)
  })
  // Test the addition of a member that does not exist
  it('User does not exist', async () => {
    // Type in the required test fields
    user.type(
      user.click(
        screen.getByRole('textbox', {
          name: /username/i,
        })
      ),
      'user_dne'
    )
    user.type(user.click(screen.getByTitle(/password/i)), 'any')
    user.click(screen.getByText(/submit/i))
    // CHECK ERROR CODE
  })
  it('Password Incorrect', async () => {
    // CREATE THE USER
    // Type in the required test fields
    user.type(
      user.click(
        screen.getByRole('textbox', {
          name: /username/i,
        })
      ),
      'test_user'
    )
    user.type(user.click(screen.getByTitle(/password/i)), 'any')
    user.click(screen.getByText(/submit/i))
    // CHECK ERROR CODE
    // DELETE THE USER
  })
  it('Valid Credentials', async () => {
    // CREATE THE USER
    // Type in the required test fields
    user.type(
      user.click(
        screen.getByRole('textbox', {
          name: /username/i,
        })
      ),
      'test_user'
    )
    user.type(user.click(screen.getByTitle(/password/i)), 'valid_password')
    user.click(screen.getByText(/submit/i))
    // DELETE THE USER
  })
})
