/** @jest-environment jsdom */
// Program Intention: Implement Testing for the Task Registration Functionality
// Input/Output: Handle the registration of a task
// Run Intention: Run with the other test cases

// Import files and dependencies here
import { render, screen } from '@testing-library/react'
import React from 'react'
import user from '@testing-library/user-event'
import { fireEvent } from '@testing-library/react'
import { handleLogin } from './handleLogin'
import { handleCreateTask } from './handleTaskCreate'
import { auth } from '../firebase/firebase'
import { signOut } from 'firebase/auth'
import EditTask from '../components/EditTask'
// Task Registration Test
describe('Task Edit', () => {
  // Render the Member Form before each test
  beforeEach(async () => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<EditTask />)
  })

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
    expect(name.value).toBe('Generic name')
    expect(description.value).toBe('Generic description')
    expect(priority.value).toBe('1')
    expect(project.value).toBe('Project')
    fireEvent.click(submit)
    const result = await handleLogin('t@t.com', 'test123')
    expect(result.code).toBe('success')
    expect(await handleCreateTask(user, '', 'Something')).toBe('success')
    signOut(auth)

    // NEED TO CHECK DATABASE FOR TASK
    // DELETE TASK FROM DATABASE
  })

  // Test the registration of a task with invalid permissions
  it('Scenario Valid Permissions', async () => {
    // Type in the required test fields
    const { name, description, submit, priority, project } = setup()
    fireEvent.change(name, { target: { value: 'Generic name' } })
    fireEvent.change(description, { target: { value: 'Generic description' } })
    fireEvent.change(priority, { target: { value: 1 } })
    fireEvent.change(project, { target: { value: 'Project' } })
    expect(name.value).toBe('Generic name')
    expect(description.value).toBe('Generic description')
    expect(priority.value).toBe('1')
    expect(project.value).toBe('Project')
    fireEvent.click(submit)
    const result = await handleLogin('t@t.com', 'test123')
    expect(result.code).toBe('success')
    expect(await handleCreateTask(user, '', 'Something')).toBe('success')
    signOut(auth)

    // NEED TO CHECK DATABASE FOR TASK
    // DELETE TASK FROM DATABASE
  })
})
