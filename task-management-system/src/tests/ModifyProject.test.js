/** @jest-environment jsdom */
// Program Intention: Implement Testing for the Modify Project Functionality
// Input/Output: Handle the addition of a project
// Run Intention: Run with the other test cases

// Import files and dependencies here
import { render, screen } from '@testing-library/react'
import React from 'react'
import { fireEvent } from '@testing-library/react'
import EditProject from '../components/EditProject'
import userEvent from '@testing-library/user-event'
// Modify Project Test
describe('Modify Project', () => {
  // Render the Member Form before each test
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<EditProject />)
  })

  // Setup the test by getting the required fields
  const setup = () => {
    const name = screen.getByRole('textbox', {
      name: /name/i,
    })
    const description = screen.getByRole('textbox', {
      name: /description/i,
    })
    const submit = screen.getByRole('button', {
      name: /submit/i,
    })
    return { name, description, submit }
  }

  // Test the addition of a member with valid permissions
  it('Scenario Valid Permissions', async () => {
    // Type in the required test fields
    const { name, description, submit } = setup()
    const user = userEvent.setup()
    await user.type(name, 'Project')
    await user.type(description, 'Generic description')

    // Check if the values are correct
    expect(name.value).toBe('Project')
    expect(description.value).toBe('Generic description')

    // Click the submit button
    await user.click(submit)
  })
  // Test the addition of a member with invalid name
  it('Scenario Invalid Permissions', async () => {
    // Type in the required test fields
    const { name, description, submit } = setup()
    const user = userEvent.setup()
    await user.type(name, '')
    await user.type(description, 'Generic description')

    // Check if the values are correct
    expect(name.value).toBe('')
    expect(description.value).toBe('Generic description')

    // Click the submit button
    await user.click(submit)
  })
})
