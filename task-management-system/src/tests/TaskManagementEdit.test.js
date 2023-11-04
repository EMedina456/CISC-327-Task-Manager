/** @jest-environment jsdom */
// Program Intention: Implement Testing for the Task Edit Functionality
// Input/Output: Handle the edit of a task
// Run Intention: Run with the other test cases

// Import files and dependencies here
import { render, screen } from '@testing-library/react'
import React from 'react'
import { fireEvent } from '@testing-library/react'
import EditTask from '../components/EditTask'

// Task Edit Test
describe('Task Edit', () => {
  // Render the Member Form before each test
  beforeEach(async () => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<EditTask />)
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
    const priority = screen.getByRole('spinbutton', {
      name: /priority/i,
    })
    const project = screen.getByRole('textbox', {
      name: /project/i,
    })

    return { name, description, submit, priority, project }
  }

  // Test the registration of a task with invalid permissions
  it('Scenario Invalid Permissions', async () => {
    // Type in the required test fields
    const { name, description, submit, priority, project } = setup()
    fireEvent.change(name, { target: { value: 'Generic name' } })
    fireEvent.change(description, { target: { value: 'Generic description' } })
    fireEvent.change(priority, { target: { value: 1 } })
    fireEvent.change(project, { target: { value: 'Project' } })

    // Check if the values are correct
    expect(name.value).toBe('Generic name')
    expect(description.value).toBe('Generic description')
    expect(priority.value).toBe('1')
    expect(project.value).toBe('Project')

    // Click the submit button
    fireEvent.click(submit)
  })

  // Test the registration of a task with invalid permissions
  it('Scenario Valid Permissions', async () => {
    // Type in the required test fields
    const { name, description, submit, priority, project } = setup()
    fireEvent.change(name, { target: { value: 'Generic name' } })
    fireEvent.change(description, { target: { value: 'Generic description' } })
    fireEvent.change(priority, { target: { value: 1 } })
    fireEvent.change(project, { target: { value: 'Project' } })

    // Check if the values are correct
    expect(name.value).toBe('Generic name')
    expect(description.value).toBe('Generic description')
    expect(priority.value).toBe('1')
    expect(project.value).toBe('Project')

    // Click the submit button
    fireEvent.click(submit)
  })
})
