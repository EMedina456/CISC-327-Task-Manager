/** @jest-environment jsdom */
// Program Intention: Implement Testing for the Rename Project Functionality
// Input/Output: Handle the renaming of a project
// Run Intention: Run with the other test cases

// Import files and dependencies here
import { render, screen } from '@testing-library/react'
import React from 'react'
import { fireEvent } from '@testing-library/react'
import EditProject from '../components/EditProject'

// Rename Project Test
describe('Rename Project', () => {
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
  it('Scenario Valid Name', async () => {
    // Type in the required test fields
    const { name, description, submit } = setup()
    fireEvent.change(name, { target: { value: 'Project' } })
    fireEvent.change(description, { target: { value: 'Project' } })

    // Check if the values are correct
    expect(name.value).toBe('Project')
    expect(name.value).toBe('Project')

    // Click the submit button
    fireEvent.click(submit)
  })
  // Test the addition of a member with invalid name
  it('Scenario Invalid Name', async () => {
    // Type in the required test fields
    const { name, description, submit } = setup()
    fireEvent.change(name, { target: { value: '' } })
    fireEvent.change(description, { target: { value: 'Something' } })

    // Check if the values are correct
    expect(name.value).toBe('')
    expect(description.value).toBe('Something')

    // Click the submit button
    fireEvent.click(submit)
  })
})
