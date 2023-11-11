/** @jest-environment jsdom */
// Program Intention: Implement Testing for the Create Project Functionality
// Input/Output: Handle the addition of a project
// Run Intention: Run with the other test cases

// Import files and dependencies here
import { render, screen } from '@testing-library/react'
import React from 'react'
import CreateProject from '../components/CreateProject'
import { fireEvent } from '@testing-library/react'
import { handleCreateProject } from './handleProjectCreate'
import { handleLogin } from './handleLogin'
import { auth } from '../firebase/firebase'
import { signOut } from 'firebase/auth'
import userEvent from '@testing-library/user-event'
import { getUserInfo } from './getUserInfo'

// Create Project Test
describe('Create Project', () => {
  const { user, projects, tasks } = getUserInfo()

  // Render the Member Form before each test
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<CreateProject />)
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
    const user = userEvent.setup()
    // Type in the required test fields
    await user.type(name, 'Project')
    await user.type(description, 'Something')

    // Check if the values are correct
    expect(name.value).toBe('Project')
    expect(description.value).toBe('Something')

    // Click the submit button
    await user.click(submit)

    // // Check if the project was added
    // const user = await handleLogin('t@t.com', 'test123')
    // expect(await handleCreateProject(user, 'Example', 'Something')).toBe(
    //   'success'
    // )
    // signOut(auth)
  })
  // Test the addition of a member with invalid name
  it('Scenario Invalid Name', async () => {
    // Type in the required test fields
    const { name, description, submit } = setup()
    const user = userEvent.setup()
    await user.clear(name)
    await user.type(description, 'Something')

    expect(name.value).toBe('')
    expect(description.value).toBe('Something')

    await user.click(submit)

    // const user = await handleLogin('t@t.com', 'test123')
    // expect(await handleCreateProject(user, '', 'Something')).toBe('success')
    // signOut(auth)
  })
})
