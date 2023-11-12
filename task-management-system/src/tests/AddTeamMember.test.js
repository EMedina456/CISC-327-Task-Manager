/** @jest-environment jsdom */
// Program Intention: Implement Testing for the Add Team Member Functionality
// Input/Output: Handle the addition of a member
// Run Intention: Run with the other test cases

// Import files and dependencies here
import { render, screen } from '@testing-library/react'
import React from 'react'
import AddMember from '../components/AddMemberToProject'
import userEvent from '@testing-library/user-event'

// Add Team Member Test
describe('Add Team Members to Project', () => {
  // Test Data
  const tasks = {
    task1: {
      deadline: '2024-01-01',
      description: 'This is a task',
      name: 'Task 1',
      project: 'project1',
      priority: '1',
      members: ['user1'],
    },
    task2: {
      deadline: '2024-01-01',
      description: 'This is a task',
      name: 'Task 2',
      project: 'project2',
      priority: '1',
      members: ['user1'],
    },
  }
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
  }
  // Create a snapshot of the Home page
  // Render the AddMember Form before each test
  beforeEach(() => {
    //eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <AddMember
        user={user}
        tasks={tasks}
        project={'project1'}
        projects={projects}
      />
    )
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

    // Check if the error message is not displayed
    expect(screen.queryByText('Error')).toBeNull()
  })

  // Test the addition of a member that does not exist
  it('Scenario User Does not Exit', async () => {
    // Type in the required test fields
    const { name, submit } = setup()
    const user = userEvent.setup()
    // Type in the required test fields
    await user.type(name, 'user90')

    // Check if the values are correct
    expect(name.value).toBe('user90')

    // Click the submit button
    await user.click(submit)

    // Check if the error message is displayed
    expect(await screen.findAllByText('Member does not exist')).toBeTruthy()
  })
  // Test the addition of a member with invalid permissions
  it('Scenario Invalid Permissions', async () => {
    // Type in the required test fields
    const { name, submit } = setup()
    const user = userEvent.setup()
    await user.type(name, 'user91')

    // Check if the values are correct
    expect(name.value).toBe('user91')
    // Click the submit button
    await user.click(submit)

    // Check if the error message is displayed
    expect(
      await screen.findAllByText(
        'You do not have permission to add a member to this project'
      )
    ).toBeTruthy()
  })
})
