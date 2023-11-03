/** @jest-environment jsdom */
// Program Intention: Implement Testing for the Add Team Member Functionality
// Input/Output: Handle the addition of a member
// Run Intention: Run with the other test cases

// Import files and dependencies here
import { render, screen } from '@testing-library/react'
import React from 'react'
import Signup from '../pages/Signup'
import { BrowserRouter } from 'react-router-dom'
import { fireEvent } from '@testing-library/react'
import { handleSignup } from './handleSignup'
import { firebase } from '../firebase/firebase'
// Add Team Member Test
describe('Signup', () => {
  // Render the Member Form before each test
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <BrowserRouter>
        <Signup />
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
  it('Scenario: Invalid Username', async () => {
    const { email, password, submit } = setup()
    fireEvent.change(email, { target: { value: 'user_dne' } })
    fireEvent.change(password, { target: { value: 'any' } })
    expect(email.value).toBe('user_dne')
    expect(password.value).toBe('any')
    fireEvent.click(submit)
    let result,
      code = await handleSignup('user_dne', 'password')
    expect(code).toBe('auth/invalid-email')
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
    let result,
      code = await handleSignup('t@t.com', 'wrongpassword')
    expect(code).toBe('auth/email-already-in-use')
    // CHECK ERROR CODE
    // DELETE THE USER
  })
  it('User already exists', async () => {
    // CREATE THE USER
    // Type in the required test fields
    const { email, password, submit } = setup()
    fireEvent.change(email, { target: { value: 't@t.com' } })
    fireEvent.change(password, { target: { value: 'wrongpassword' } })
    expect(email.value).toBe('t@t.com')
    expect(password.value).toBe('wrongpassword')
    fireEvent.click(submit)
    let result,
      code = await handleSignup('t@t.com', 'wrongpassword')
    expect(code).toBe('auth/email-already-in-use')
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
    let result,
      code,
      uid = await handleSignup('test@t.com', 'test123')
    expect(code).toBe(undefined)
    var user = firebase.auth().currentUser

    user
      .delete()
      .then(function () {
        // User deleted.
      })
      .catch(function (error) {
        // An error happened.
      })
  })
})
