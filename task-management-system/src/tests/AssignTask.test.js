/** @jest-environment jsdom */
// Program Intention: Implement Testing for the Assign Task Functionality
// Input/Output: Handle the assignment of a task
// Run Intention: Run with the other test cases

// Import files and dependencies here
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import AddMember from '../components/AddMember'

// Assign Task Test
describe('Assign a Task', () => {
  // Create a snapshot of the Home page
  // Render the AddMember Form before each test
  beforeEach(() => {
    //eslint-disable-next-line testing-library/no-render-in-setup
    render(<AddMember />)
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

  // Test the assignment of a member with valid permissions
  it('Scenario Valid Permissions', async () => {
    // Type in the required test fields
    const { name, submit } = setup()
    fireEvent.change(name, { target: { value: 'user' } })

    // Check if the values are correct
    expect(name.value).toBe('user')

    // Click the submit button
    fireEvent.click(submit)
  })

  // Test the assignment of a member with invalid permissions
  it('Scenario Invalid Permissions', async () => {
    // Type in the required test fields
    const { name, submit } = setup()

    // Type in the required test fields
    fireEvent.change(name, { target: { value: 'user99' } })

    // Check if the values are correct
    expect(name.value).toBe('user99')

    // Click the submit button
    fireEvent.click(submit)
  })
})
