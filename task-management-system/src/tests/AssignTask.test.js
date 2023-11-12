/** @jest-environment jsdom */
// Program Intention: Implement Testing for the Assign Task Functionality
// Input/Output: Handle the assignment of a task
// Run Intention: Run with the other test cases

// Import files and dependencies here
import { render, screen } from '@testing-library/react'
import React from 'react'
import AddMember from '../components/AddMemberToTask'
import userEvent from '@testing-library/user-event'

// Assign Task Test
describe('Assign a Task', () => {
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

  // Test the assignment of a member with valid permissions
  it('Scenario Valid Permissions', async () => {
    // Type in the required test fields
    const { name, submit } = setup()
    const user = userEvent.setup()
    await user.type(name, 'user192')

    // Check if the values are correct
    expect(name.value).toBe('user192')

    // Click the submit button
    await user.click(submit)

    // Check if the error message is displayed
    expect(
      screen.queryByText(
        'You do not have permission to add a member to this task'
      )
    ).toBeNull()
  })

  // Test the assignment of a member with invalid permissions
  it('Scenario Invalid Permissions', async () => {
    // Type in the required test fields
    const { name, submit } = setup()
    const user = userEvent.setup()

    // Type in the required test fields
    await user.type(name, 'user90')

    // Check if the values are correct
    expect(name.value).toBe('user90')

    // Click the submit button
    await user.click(submit)

    expect(await screen.findByText('Member does not exist')).toBeTruthy()
  })
})
