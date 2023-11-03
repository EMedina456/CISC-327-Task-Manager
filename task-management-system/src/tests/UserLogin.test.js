/** @jest-environment jsdom */
// Program Intention: Implement Testing for the Add Team Member Functionality
// Input/Output: Handle the addition of a member
// Run Intention: Run with the other test cases

// Import files and dependencies here
import { render, screen } from '@testing-library/react'
import React from 'react'
import Login from '../pages/Login'
import { BrowserRouter } from 'react-router-dom'
import { fireEvent } from '@testing-library/react'
import { handleLogin } from './handleLogin'
// Add Team Member Test
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
    const { email, password, submit } = setup()
    fireEvent.change(email, { target: { value: 'user_dne@gmail.com' } })
    fireEvent.change(password, { target: { value: 'any' } })
    expect(email.value).toBe('user_dne@gmail.com')
    expect(password.value).toBe('any')
    fireEvent.click(submit)
    expect(await handleLogin('user_dne@gmail.com', 'password')).toBe(
      'auth/invalid-login-credentials'
    )
  })
  it('Password Incorrect', async () => {
    // CREATE THE USER
    // Type in the required test fields
    const { email, password, submit } = setup()
    fireEvent.change(email, { target: { value: 't@t.com' } })
    fireEvent.change(password, { target: { value: 'wrongpassword' } })
    expect(email.value).toBe('t@t.com')
    expect(password.value).toBe('wrongpassword')
    fireEvent.click(submit)
    expect(await handleLogin('t@t.com', 'wrongpassword')).toBe(
      'auth/invalid-login-credentials'
    )
    // CHECK ERROR CODE
    // DELETE THE USER
  })
  it('Valid Credentials', async () => {
    // CREATE THE USER
    // Type in the required test fields
    const { email, password, submit } = setup()
    fireEvent.change(email, { target: { value: 't@t.com' } })
    fireEvent.change(password, { target: { value: 'test123' } })
    expect(email.value).toBe('t@t.com')
    expect(password.value).toBe('test123')
    fireEvent.click(submit)
    const result = await handleLogin('t@t.com', 'test123')
    expect(result.code).toBe('success')
  })
})
