/** @jest-environment jsdom */
// Program Intention: Implement Testing for the Task Registration Functionality
// Input/Output: Handle the registration of a task
// Run Intention: Run with the other test cases

// Import files and dependencies here
import { render, screen } from '@testing-library/react'
import React from 'react'
import CreateTask from '../components/CreateTask'
import userEvent from '@testing-library/user-event'
// Task Registration Test
describe('Task Registration', () => {
  // Test Data
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
    render(<CreateTask projects={projects} user={user} />)
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
    await user.type(name, 'Generic')
    await user.type(description, 'description')
    await user.type(priority, '1')
    await user.click(project)
    await user.type(deadline, '2024-05-05')

    // Check if the values are correct
    expect(name.value).toBe('Generic')
    expect(description.value).toBe('description')
    expect(priority.value).toBe('1')
    expect(project.value).toBe('project1')
    expect(deadline.value).toBe('2024-05-05')

    // Click the submit button
    await user.click(submit)

    // Check error is displayed
    expect(await screen.findByText('Invalid permissions')).toBeTruthy()
  })

  // Test the registration of a task with valid permissions
  it('Scenario Valid Permissions', async () => {
    // Create a task
    const task = {
      name: 'Generic name',
      description: 'description',
      priority: '1',
      project: 'project1',
      deadline: '2024-05-05',
    }
    // Type in the required test fields
    const { name, description, submit, priority, project, deadline } = setup()
    const user = userEvent.setup()
    await user.type(name, task.name)
    await user.type(description, task.description)
    await user.type(priority, task.priority)
    await user.click(project)
    await user.type(deadline, task.deadline)

    // Check if the values are correct
    expect(name.value).toBe('Generic name')
    expect(description.value).toBe('description')
    expect(priority.value).toBe('1')
    expect(project.value).toBe('project1')
    expect(deadline.value).toBe('2024-05-05')

    // Click the submit button
    await user.click(submit)

    // Check error is not displayed
    expect(screen.queryByText('Invalid permissions')).toBeNull()
  })
  // Test the registration of a task with invalid permissions
  it('Scenario Already Created', async () => {
    // Create a task
    const task = {
      name: 'Generic name',
      description: 'description',
      priority: '1',
      project: 'project1',
      deadline: '2024-05-05',
    }
    // Type in the required test fields
    const { name, description, submit, priority, project, deadline } = setup()
    const user = userEvent.setup()
    await user.type(name, task.name)
    await user.type(description, task.description)
    await user.type(priority, task.priority)
    await user.click(project, task.project)
    await user.type(deadline, task.deadline)

    // Check if the values are correct
    expect(name.value).toBe('Generic name')
    expect(description.value).toBe('description')
    expect(priority.value).toBe('1')
    expect(project.value).toBe('project1')
    expect(deadline.value).toBe('2024-05-05')

    // Click the submit button
    await user.click(submit)
  })
  it('Scenario Empty Name', async () => {
    // Create a task
    const task = {
      name: '',
      description: 'description',
      priority: '1',
      project: 'project1',
      deadline: '2024-05-05',
    }
    // Type in the required test fields
    const { name, description, submit, priority, project, deadline } = setup()
    const user = userEvent.setup()
    await user.clear(name)
    await user.type(description, task.description)
    await user.type(priority, task.priority)
    await user.click(project, task.project)
    await user.type(deadline, task.deadline)

    // Check if the values are correct
    expect(name.value).toBe('')
    expect(description.value).toBe('description')
    expect(priority.value).toBe('1')
    expect(project.value).toBe('project1')
    expect(deadline.value).toBe('2024-05-05')

    // Click the submit button
    await user.click(submit)

    // Check error is displayed
    expect(await screen.findByText('Please enter a task name')).toBeTruthy()
  })
  it('Scenario Empty Priority', async () => {
    // Create a task
    const task = {
      name: 'name',
      description: 'description',
      priority: '',
      project: 'project1',
      deadline: '2024-05-05',
    }
    // Type in the required test fields
    const { name, description, submit, priority, project, deadline } = setup()
    const user = userEvent.setup()
    await user.type(name, task.name)
    await user.type(description, task.description)
    await user.clear(priority)
    await user.click(project, task.project)
    await user.type(deadline, task.deadline)

    // Check if the values are correct
    expect(name.value).toBe('name')
    expect(description.value).toBe('description')
    expect(priority.value).toBe('')
    expect(project.value).toBe('project1')
    expect(deadline.value).toBe('2024-05-05')

    // Click the submit button
    await user.click(submit)

    // Check error is displayed
    expect(await screen.findByText('Please enter a priority')).toBeTruthy()
  })
  it('Scenario Negative Priority', async () => {
    // Create a task
    const task = {
      name: 'name',
      description: 'description',
      priority: '-1',
      project: 'project1',
      deadline: '2024-05-05',
    }
    // Type in the required test fields
    const { name, description, submit, priority, project, deadline } = setup()
    const user = userEvent.setup()
    await user.type(name, task.name)
    await user.type(description, task.description)
    await user.type(priority, task.priority)
    await user.click(project, task.project)
    await user.type(deadline, task.deadline)

    // Check if the values are correct
    expect(name.value).toBe('name')
    expect(description.value).toBe('description')
    expect(priority.value).toBe('-1')
    expect(project.value).toBe('project1')
    expect(deadline.value).toBe('2024-05-05')

    // Click the submit button
    await user.click(submit)

    // Check error is displayed
    expect(
      await screen.findByText('Please enter a positive priority')
    ).toBeTruthy()
  })
  it('Scenario Date before Today', async () => {
    // Create a task
    const task = {
      name: 'name',
      description: 'description',
      priority: '1',
      project: 'project1',
      deadline: '2022-05-05',
    }
    // Type in the required test fields
    const { name, description, submit, priority, project, deadline } = setup()
    const user = userEvent.setup()
    await user.type(name, task.name)
    await user.type(description, task.description)
    await user.type(priority, task.priority)
    await user.click(project, task.project)
    await user.type(deadline, task.deadline)

    // Check if the values are correct
    expect(name.value).toBe('name')
    expect(description.value).toBe('description')
    expect(priority.value).toBe('1')
    expect(project.value).toBe('project1')
    expect(deadline.value).toBe('2022-05-05')

    // Click the submit button
    await user.click(submit)

    // Check error is displayed
    expect(
      await screen.findByText('Please enter a future deadline')
    ).toBeTruthy()
  })
})
