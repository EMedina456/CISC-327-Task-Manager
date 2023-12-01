/** @jest-environment jsdom */
// Program Intention: Implement Testing for the Rename Project Functionality
// Input/Output: Handle the renaming of a project
// Run Intention: Run with the other test cases

// Import files and dependencies here
import { render, screen } from '@testing-library/react'
import React from 'react'
import EditProject from '../components/EditProject'
import userEvent from '@testing-library/user-event'
// Rename Project Test
describe('Rename Project', () => {
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
    uid: 'user4',
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
    const submit = screen.getByRole('button', {
      name: /submit/i,
    })
    return { name, submit }
  }

  // Test the addition of a member with valid permissions
  it('Scenario Valid Name', async () => {
    // Type in the required test fields
    const { name, submit } = setup()
    const user = userEvent.setup()
    await user.clear(name)
    await user.type(name, 'Project')

    // Check if the values are correct
    expect(name.value).toBe('Project')
    expect(name.value).toBe('Project')

    // Click the submit button
    await user.click(submit)

    // Check if the error message is not displayed
    expect(screen.queryByText('Error')).toBeNull()
  })
  // Test the addition of a member with invalid name
  it('Scenario Invalid Name', async () => {
    // Type in the required test fields
    const { name, submit } = setup()
    const user = userEvent.setup()
    await user.clear(name)
    await user.clear(name)

    // Check if the values are correct
    expect(name.value).toBe('')

    // Click the submit button
    await user.click(submit)

    // Check the error message
    expect(await screen.findByText('Please enter a project name')).toBeTruthy()
  })
})
