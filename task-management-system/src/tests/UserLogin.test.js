/** @jest-environment jsdom */
// Program Intention: Implement Testing for the Login Functionality
// Input/Output: Handle the login of a user
// Run Intention: Run with the other test cases

// Import files and dependencies here
import { render, screen } from '@testing-library/react'
import React from 'react'
import Login from '../pages/Login'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

// Login Test
describe('Login', () => {
  // Render the Login Form before each test
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )
  })

  // Setup the test by getting the required fields
  const setup = () => {
    const email = screen.getByRole('textbox', {
      name: /email/i,
    })

    const password = screen.getByTitle(/password/i)
    const submit = screen.getByRole('button', {
      name: /submit/i,
    })
    return { email, password, submit }
  }

  // Test the addition of a member that does not exist
  it('User does not exist', async () => {
    // Type in the required test fields
    const { email, password, submit } = setup()
    const user = userEvent.setup()
    await user.type(email, 'user_dne@gmail.com')
    await user.type(password, 'any')

    // Check if the values are correct
    expect(email.value).toBe('user_dne@gmail.com')
    expect(password.value).toBe('any')

    // Click the submit button
    await user.click(submit)

    // Check the error message
    expect(await screen.findAllByText('Invalid login credentials')).toBeTruthy()
  })
  it('Password Incorrect', async () => {
    // Type in the required test fields
    const { email, password, submit } = setup()
    const user = userEvent.setup()
    await user.type(email, 'test@new.com')
    await user.type(password, 'wrongpassword')

    // Check if the values are correct
    expect(email.value).toBe('test@new.com')
    expect(password.value).toBe('wrongpassword')

    // Click the submit button
    await user.click(submit)

    // Check the error message
    expect(await screen.findAllByText('Invalid login credentials')).toBeTruthy()
  })
  it('Valid Credentials', async () => {
    // Type in the required test fields
    const { email, password, submit } = setup()
    const user = userEvent.setup()

    await user.type(email, 'test@new.com')
    await user.type(password, 'test123')

    // Check if the values are correct
    expect(email.value).toBe('test@new.com')
    expect(password.value).toBe('test123')

    // Click the submit button
    await user.click(submit)

    // Check that there is no error message
    expect(screen.queryByText('Invalid login credentials')).toBeNull()
  })
})
