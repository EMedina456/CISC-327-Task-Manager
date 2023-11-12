/** @jest-environment jsdom */
/* eslint-disable jest/no-conditional-expect */
/* eslint-disable jest/valid-expect-in-promise */

// Program Intention: Implement Testing for the Signup Functionality
// Input/Output: Handle the signup of a user
// Run Intention: Run with the other test cases

// Import files and dependencies here
import { render, screen } from '@testing-library/react'
import React from 'react'
import Signup from '../pages/Signup'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
// import { query, collection, where, deleteDoc } from '../firebase/firestore'
// import { db } from '../firebase/firebase'
// import { getAuth, deleteUser } from '../firebase/auth'

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
    const user = userEvent.setup()
    await user.type(email, 'user_dne')
    await user.type(password, 'any')

    // Check if the values are correct
    expect(email.value).toBe('user_dne')
    expect(password.value).toBe('any')

    // Click the submit button
    await user.click(submit)

    // Check error message
    expect(await screen.findAllByText('Invalid email!')).toBeTruthy()
  })
  it('Scenario: Invalid Password', async () => {
    // Type in the required test fields
    const { email, password, submit } = setup()
    const user = userEvent.setup()
    await user.type(email, 't@t.com')
    await user.type(password, 'p')

    // Check if the values are correct
    expect(email.value).toBe('t@t.com')
    expect(password.value).toBe('p')

    // Click the submit button
    await user.click(submit)

    // Check error message
    expect(
      await screen.findAllByText('Password must be at least 6 characters long!')
    ).toBeTruthy()
  })
  it('User already exists', async () => {
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

    // Check error message
    expect(await screen.findAllByText('Email already in use!')).toBeTruthy()
  })
  it('Valid Credentials', async () => {
    // Type in the required test fields
    const { email, password, submit } = setup()
    const user = userEvent.setup()
    await user.type(email, 'random@new.com')
    await user.type(password, 'test123')

    // Check if the values are correct
    expect(email.value).toBe('random@new.com')
    expect(password.value).toBe('test123')

    // Click the submit button
    await user.click(submit)

    // NEED TO DELETE USER AFTER THIS TEST
    expect(screen.queryByText('Email already in use!')).toBeNull()
  })
})
