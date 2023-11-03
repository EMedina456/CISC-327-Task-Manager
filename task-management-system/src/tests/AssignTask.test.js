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
    const yourPermission = screen.getByRole('textbox', {
      name: /your permission/i,
    })
    const theirPermission = screen.getByRole('textbox', {
      name: /their permission/i,
    })
    const submit = screen.getByRole('button', {
      name: /submit/i,
    })
    return { name, yourPermission, theirPermission, submit }
  }

  // Test the assignment of a member with valid permissions
  it('Scenario Valid Permissions', async () => {
    // Type in the required test fields
    const { name, yourPermission, theirPermission, submit } = setup()
    fireEvent.change(name, { target: { value: 'user' } })
    fireEvent.change(yourPermission, { target: { value: 'admin' } })
    fireEvent.change(theirPermission, { target: { value: 'viewer' } })

    // Check if the values are correct
    expect(name.value).toBe('user')
    expect(yourPermission.value).toBe('admin')
    expect(theirPermission.value).toBe('viewer')

    // Click the submit button
    fireEvent.click(submit)
  })

  // Test the assignment of a member with invalid permissions
  it('Scenario Invalid Permissions', async () => {
    // Type in the required test fields
    const { name, yourPermission, theirPermission, submit } = setup()

    // Type in the required test fields
    fireEvent.change(name, { target: { value: 'user99' } })
    fireEvent.change(yourPermission, { target: { value: 'viewer' } })
    fireEvent.change(theirPermission, { target: { value: 'viewer' } })

    // Check if the values are correct
    expect(name.value).toBe('user99')
    expect(yourPermission.value).toBe('viewer')
    expect(theirPermission.value).toBe('viewer')

    // Click the submit button
    fireEvent.click(submit)
  })
})
