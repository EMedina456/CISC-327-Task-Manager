/** @jest-environment jsdom */
// Program Intention: Implement Testing for the Login Functionality
// Input/Output: Handle the login of a user
// Run Intention: Run with the other test cases

// Import files and dependencies here
import { render, screen } from '@testing-library/react'
import React from 'react'
import Login from '../pages/Login'
import { BrowserRouter } from 'react-router-dom'
import { fireEvent } from '@testing-library/react'
import { handleLogin } from './handleLogin'

// Login Test
describe('Login', () => {
  // Render the Member Form before each test
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
    fireEvent.change(email, { target: { value: 'user_dne@gmail.com' } })
    fireEvent.change(password, { target: { value: 'any' } })

    // Check if the values are correct
    expect(email.value).toBe('user_dne@gmail.com')
    expect(password.value).toBe('any')

    // Click the submit button
    fireEvent.click(submit)

    // Check if the user was signed in
    expect(await handleLogin('user_dne@gmail.com', 'password')).toBe(
      'auth/invalid-login-credentials'
    )
  })
  it('Password Incorrect', async () => {
    // Type in the required test fields
    const { email, password, submit } = setup()
    fireEvent.change(email, { target: { value: 't@t.com' } })
    fireEvent.change(password, { target: { value: 'wrongpassword' } })

    // Check if the values are correct
    expect(email.value).toBe('t@t.com')
    expect(password.value).toBe('wrongpassword')

    // Click the submit button
    fireEvent.click(submit)

    // Check if the user was signed in
    expect(await handleLogin('t@t.com', 'wrongpassword')).toBe(
      'auth/invalid-login-credentials'
    )
  })
  it('Valid Credentials', async () => {
    // Type in the required test fields
    const { email, password, submit } = setup()
    fireEvent.change(email, { target: { value: 't@t.com' } })
    fireEvent.change(password, { target: { value: 'test123' } })

    // Check if the values are correct
    expect(email.value).toBe('t@t.com')
    expect(password.value).toBe('test123')

    // Click the submit button
    fireEvent.click(submit)

    // Check if the user was signed in
    const result = await handleLogin('t@t.com', 'test123')
    expect(result.code).toBe('success')
  })
})
