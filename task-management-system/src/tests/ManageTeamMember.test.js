/** @jest-environment jsdom */
// Program Intention: Implement Testing for the Manage Team Members Functionality
// Input/Output: Handle the management of a member
// Run Intention: Run with the other test cases

// Import files and dependencies here
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import ManageMember from '../components/ManageMember'

// Add Team Member Test
describe('Manage Team Member Permissions', () => {
  // Create a snapshot of the Home page
  // Render the Member Form before each test
  beforeEach(() => {
    //eslint-disable-next-line testing-library/no-render-in-setup
    render(<ManageMember />)
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
  // Test the management of a member with invalid permissions
  it('Scenario Invalid Permissions', async () => {
    // Type in the required test fields
    const { name, submit } = setup()
    fireEvent.change(name, { target: { value: 'user99' } })

    // Check if the values are correct
    expect(name.value).toBe('user99')

    // Click the submit button
    fireEvent.click(submit)
  })

  // Test the addition of a member with valid permissions
  it('Scenario Valid Admin Permissions', async () => {
    // Type in the required test fields
    const { name, submit } = setup()
    fireEvent.change(name, { target: { value: 'user' } })

    // Check if the values are correct
    expect(name.value).toBe('user')

    // Click the submit button
    fireEvent.click(submit)
  })

  // Test the addition of a member that does not exist
  it('Scenario Invalid Admin Permissions 1', async () => {
    // Type in the required test fields
    const { name, submit } = setup()
    fireEvent.change(name, { target: { value: 'user99' } })

    // Check if the values are correct
    expect(name.value).toBe('user99')

    // Click the submit button
    fireEvent.click(submit)
  })

  it('Scenario Invalid Admin Permissions 2', async () => {
    // Type in the required test fields
    const { name, submit } = setup()
    fireEvent.change(name, { target: { value: 'user99' } })

    // Check if the values are correct
    expect(name.value).toBe('user99')

    // Click the submit button
    fireEvent.click(submit)
  })
  it('Scenario Valid Owner Permissions', async () => {
    // Type in the required test fields
    const { name, submit } = setup()
    fireEvent.change(name, { target: { value: 'user99' } })

    // Check if the values are correct
    expect(name.value).toBe('user99')

    // Click the submit button
    fireEvent.click(submit)
  })
})
