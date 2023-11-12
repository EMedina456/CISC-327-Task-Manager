/** @jest-environment jsdom */
// Program Intention: Implement Testing for the Modify Project Functionality
// Input/Output: Handle the addition of a project
// Run Intention: Run with the other test cases

// Import files and dependencies here
import { render, screen } from '@testing-library/react'
import React from 'react'
import EditProject from '../components/EditProject'
import userEvent from '@testing-library/user-event'
// Modify Project Test
describe('Modify Project', () => {
  // Test Data
  const projects = {
    project1: {
      name: 'Project 1',
      description: 'This is a project',
      members: {},
      user_permissions: {
        user1: 'owner',
        user4: 'viewer',
      },
      tasks: ['1', '2', '3'],
    },
    project2: {
      name: 'Project 2',
      description: 'This is a project',
      members: {},
      user_permissions: {
        user1: 'owner',
      },
      tasks: ['1', '2', '3'],
    },
  }
  const user = {
    email: 'user1@gmail.com',
    projects: { project1: 'owner', project2: 'owner' },
    tasks: ['task1', 'task2'],
    uid: 'user1',
    // need to add uid
  }
  // Render the Member Form before each test
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<EditProject user={user} project={'project1'} projects={projects} />)
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

  // Test the edit of a project with valid permissions
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

    // Check error is not displayed
    expect(screen.queryByText('Error')).toBeNull()
  })
  // Test the edit of a project with invalid permissions
  it('Scenario Invalid Permissions', async () => {
    // Type in the required test fields
    const { name, description, submit } = setup()
    const user = userEvent.setup()
    await user.type(name, 'Generic')
    await user.type(description, 'Generic description')

    // Check if the values are correct
    expect(name.value).toBe('Generic')
    expect(description.value).toBe('Generic description')

    // Click the submit button
    await user.click(submit)

    // Check error
    expect(await screen.findByText('Invalid permissions')).toBeTruthy()
  })
})
