/** @jest-environment jsdom */
// Program Intention: Implement Testing for the Remove Team Members Functionality
// Input/Output: Handle the removal of a member
// Run Intention: Run with the other test cases

// Import files and dependencies here
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import RemoveMember from '../components/RemoveMember'

// Remove Team Member Test
describe('Remove Team Member', () => {
  // Create a snapshot of the Home page
  // Render the Member Form before each test
  beforeEach(() => {
    //eslint-disable-next-line testing-library/no-render-in-setup
    render(<RemoveMember />)
  })

  // Setup the test by getting the required fields
  const setup = () => {
    const name = screen.getByRole('textbox', {
      name: /name/i,
    })
    const yourPermission = screen.getByRole('textbox', {
      name: /your permission/i,
    })
    const submit = screen.getByRole('button', {
      name: /submit/i,
    })
    return { name, yourPermission, submit }
  }
  // Test the management of a member with invalid permissions
  it('Scenario Invalid Permissions', async () => {
    // Type in the required test fields
    const { name, yourPermission, submit } = setup()
    fireEvent.change(name, { target: { value: 'user99' } })
    fireEvent.change(yourPermission, { target: { value: 'viewer' } })

    // Check if the values are correct
    expect(name.value).toBe('user99')
    expect(yourPermission.value).toBe('viewer')

    // Click the submit button
    fireEvent.click(submit)
  })

  // Test the addition of a member with valid permissions
  it('Scenario Valid Admin Permissions', async () => {
    // Type in the required test fields
    const { name, yourPermission, submit } = setup()
    fireEvent.change(name, { target: { value: 'user' } })
    fireEvent.change(yourPermission, { target: { value: 'admin' } })

    // Check if the values are correct
    expect(name.value).toBe('user')
    expect(yourPermission.value).toBe('admin')

    // Click the submit button
    fireEvent.click(submit)
  })

  // Test the addition of a member that does not exist
  it('Scenario Invalid Admin Permissions', async () => {
    // Type in the required test fields
    const { name, yourPermission, submit } = setup()
    fireEvent.change(name, { target: { value: 'user99' } })
    fireEvent.change(yourPermission, { target: { value: 'viewer' } })

    // Check if the values are correct
    expect(name.value).toBe('user99')
    expect(yourPermission.value).toBe('viewer')

    // Click the submit button
    fireEvent.click(submit)
  })

  it('Scenario Valid Owner Permissions', async () => {
    // Type in the required test fields
    const { name, yourPermission, submit } = setup()
    fireEvent.change(name, { target: { value: 'user99' } })
    fireEvent.change(yourPermission, { target: { value: 'owner' } })

    // Check if the values are correct
    expect(name.value).toBe('user99')
    expect(yourPermission.value).toBe('owner')

    // Click the submit button
    fireEvent.click(submit)
  })
})
