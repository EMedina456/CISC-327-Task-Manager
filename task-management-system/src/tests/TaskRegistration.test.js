/** @jest-environment jsdom */
// Program Intention: Implement Testing for the Task Registration Functionality
// Input/Output: Handle the registration of a task
// Run Intention: Run with the other test cases

// Import files and dependencies here
import { render, screen } from '@testing-library/react'
import React from 'react'
import CreateTask from '../components/CreateTask'
import { fireEvent } from '@testing-library/react'
import { handleLogin } from './handleLogin'
import { handleCreateTask } from './handleTaskCreate'
import { auth } from '../firebase/firebase'
import { signOut } from 'firebase/auth'
import userEvent from '@testing-library/user-event'
// Task Registration Test
describe('Task Registration', () => {
  // Render the Member Form before each test
  beforeEach(async () => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<CreateTask />)
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
    const project = screen.getByRole('radio', {
      name: /project/i,
    })
    const deadline = screen.getByLabelText('/\n \n deadline\n \n \n/i')

    return { name, description, submit, priority, project, deadline }
  }

  // Test the registration of a task with invalid permissions
  it('Scenario Invalid Permissions', async () => {
    // Type in the required test fields
    const { name, description, submit, priority, project, deadline } = setup()
    const user = userEvent.setup()
    await user.type(name, 'Generic name')
    await user.type(description, 'description')
    await user.type(priority, 1)
    await user.click(project)
    await user.type(deadline, '2024-05-05')

    // Check if the values are correct
    expect(name.value).toBe('Generic name')
    expect(description.value).toBe('description')
    expect(priority.value).toBe('1')
    expect(project.value).toBe('project')
    expect(deadline.value).toBe('2024-05-05')

    // Click the submit button
    await user.click(submit)
    // const result = await handleLogin('t@t.com', 'test123')

    // // Check if the task was added
    // expect(result.code).toBe('success')
    // expect(await handleCreateTask(result, '', 'Something')).toBe('success')
    // signOut(auth)
  })

  // Test the registration of a task with valid permissions
  it('Scenario Valid Permissions', async () => {
    // Create a task
    const task = {
      name: 'Generic name',
      description: 'description',
      priority: 1,
      project: 'project',
      deadline: '2024-05-05',
    }
    // Type in the required test fields
    const { name, description, submit, priority, project, deadline } = setup()
    const user = userEvent.setup()
    await user.type(name, task.name)
    await user.type(description, task.description)
    await user.click(project)
    await user.type(deadline, task.deadline)

    // Check if the values are correct
    expect(name.value).toBe('Generic name')
    expect(description.value).toBe('description')
    expect(priority.value).toBe('1')
    expect(project.value).toBe('project')
    expect(deadline.value).toBe('2024-05-05')

    // Click the submit button
    await user.click(submit)
    // const result = await handleLogin('t@t.com', 'test123')

    // // Check if the task was added
    // expect(result.code).toBe('success')
    // expect(await handleCreateTask(task, result)).toBe('success')
    // signOut(auth)
  })
  // Test the registration of a task with invalid permissions
  it('Scenario Already Created', async () => {
    // Create a task
    const task = {
      name: 'Generic name',
      description: 'description',
      priority: 1,
      project: 'project',
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
    expect(project.value).toBe('project')
    expect(deadline.value).toBe('2024-05-05')

    // Click the submit button
    await user.click(submit)
    // const result = await handleLogin('t@t.com', 'test123')

    // // Check if the task was added
    // expect(result.code).toBe('success')
    // expect(await handleCreateTask(task, result)).not.toEqual('success')
    // signOut(auth)
  })
})
