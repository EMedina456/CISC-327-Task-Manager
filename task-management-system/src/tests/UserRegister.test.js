/** @jest-environment jsdom */
// Program Intention: Implement Testing for the Signup Functionality
// Input/Output: Handle the signup of a user
// Run Intention: Run with the other test cases

// Import files and dependencies here
import { render, screen } from '@testing-library/react'
import React from 'react'
import Signup from '../pages/Signup'
import { BrowserRouter } from 'react-router-dom'
import { fireEvent } from '@testing-library/react'
import { handleSignup } from './handleSignup'
import { firebase } from '../firebase/firebase'

// Signup Test
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
  it('Scenario: Invalid Username', async () => {
    // Type in the required test fields
    const { email, password, submit } = setup()
    fireEvent.change(email, { target: { value: 'user_dne' } })
    fireEvent.change(password, { target: { value: 'any' } })

    // Check if the values are correct
    expect(email.value).toBe('user_dne')
    expect(password.value).toBe('any')

    // Click the submit button
    fireEvent.click(submit)

    // Check if the user was added
    let result,
      code = await handleSignup('user_dne', 'password')
    expect(code).toBe('auth/invalid-email')
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

    // Check if the user was added
    let result,
      code = await handleSignup('t@t.com', 'wrongpassword')
    expect(code).toBe('auth/email-already-in-use')
  })
  it('User already exists', async () => {
    // Type in the required test fields
    const { email, password, submit } = setup()
    fireEvent.change(email, { target: { value: 't@t.com' } })
    fireEvent.change(password, { target: { value: 'wrongpassword' } })

    // Check if the values are correct
    expect(email.value).toBe('t@t.com')
    expect(password.value).toBe('wrongpassword')

    // Click the submit button
    fireEvent.click(submit)

    // Check if the user was added
    let result,
      code = await handleSignup('t@t.com', 'wrongpassword')
    expect(code).toBe('auth/email-already-in-use')
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

    // Check if the user was added
    let result,
      code = await handleSignup('test@t.com', 'test123')
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
