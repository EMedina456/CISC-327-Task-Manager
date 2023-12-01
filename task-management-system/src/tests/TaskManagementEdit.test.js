/** @jest-environment jsdom */
// Program Intention: Implement Testing for the Task Edit Functionality
// Input/Output: Handle the edit of a task
// Run Intention: Run with the other test cases

// Import files and dependencies here
import { render, screen } from '@testing-library/react'
import React from 'react'
import EditTask from '../components/EditTask'
import userEvent from '@testing-library/user-event'

// Task Edit Test
describe('Task Edit', () => {
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
  }
  // Render the Member Form before each test
  beforeEach(async () => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <EditTask user={user} projects={projects} task={'task1'} tasks={tasks} />
    )
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
    const project = screen.getAllByRole('radio')[0]
    const deadline = screen.getByAltText(/date/i)

    return { name, description, submit, priority, project, deadline }
  }

  // Test the registration of a task with invalid permissions
  it('Scenario Invalid Permissions', async () => {
    // Type in the required test fields
    const { name, description, submit, priority, project, deadline } = setup()
    const user = userEvent.setup()
    await user.clear(name)
    await user.clear(description)
    await user.clear(priority)
    await user.clear(deadline)
    await user.type(name, 'Generic')
    await user.type(description, 'Generic description')
    await user.type(priority, '1')
    await user.click(project)
    await user.type(deadline, '2024-05-05')

    // Check if the values are correct
    expect(name.value).toBe('Generic')
    expect(description.value).toBe('Generic description')
    expect(priority.value).toBe('1')
    expect(project.value).toBe('project1')

    // Click the submit button
    await user.click(submit)

    // Check error is displayed
    expect(await screen.findByText('Invalid permissions')).toBeTruthy()
  })

  // Test the registration of a task with invalid permissions
  it('Scenario Valid Permissions', async () => {
    // Type in the required test fields
    const { name, description, submit, priority, project, deadline } = setup()
    const user = userEvent.setup()
    await user.clear(name)
    await user.clear(description)
    await user.clear(priority)
    await user.clear(deadline)
    await user.type(name, 'Generic name')
    await user.type(description, 'Generic description')
    await user.type(priority, '1')
    await user.click(project)
    await user.type(deadline, '2024-05-05')

    // Check if the values are correct
    expect(name.value).toBe('Generic name')
    expect(description.value).toBe('Generic description')
    expect(priority.value).toBe('1')
    expect(project.value).toBe('project1')
    expect(deadline.value).toBe('2024-05-05')

    // Click the submit button
    await user.click(submit)

    // Check error is not displayed
    expect(screen.queryByText('Invalid permissions')).toBeNull()
  })
})
