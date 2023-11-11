/** @jest-environment jsdom */
// Program Intention: Implement Testing for the Transfer Ownership Functionality
// Input/Output: Handle the addition of a member
// Run Intention: Run with the other test cases

// Import files and dependencies here
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import TransferOwnership from '../components/TransferOwnership'
import userEvent from '@testing-library/user-event'
// Transfer Ownership Test
describe('Transfer Ownership', () => {
  // Create a snapshot of the Home page
  // Render the Member Form before each test
  beforeEach(() => {
    //eslint-disable-next-line testing-library/no-render-in-setup
    render(<TransferOwnership />)
  })

  // Setup the test by getting the required fields
  const setup = () => {
    const name = screen.getByRole('textbox', {
      name: /name/i,
    })
    const submit = screen.getByRole('button', {
      name: /submit/i,
    })
    return { name, submit }
  }

  // Test the addition of a member with valid permissions
  it('Scenario Valid Permissions', async () => {
    // Type in the required test fields
    const { name, submit } = setup()
    const user = userEvent.setup()
    await user.type(name, 'user')

    // Check if the values are correct
    expect(name.value).toBe('user')

    // Click the submit button
    await user.click(submit)
  })
})
