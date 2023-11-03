/** @jest-environment jsdom */
// Program Intention: Implement Testing for the Modify Project Functionality
// Input/Output: Handle the addition of a project
// Run Intention: Run with the other test cases

// Import files and dependencies here
import { render, screen } from '@testing-library/react'
import React from 'react'
import { fireEvent } from '@testing-library/react'
import { getUserInfo } from './getUserInfo'
import { handleCreateProject } from './handleProjectCreate'
import { handleLogin } from './handleLogin'
import { auth } from '../firebase/firebase'
import { signOut } from 'firebase/auth'
import EditProject from '../components/EditProject'
// Add Team Member Test
describe('Modify Project', () => {
  // Render the Member Form before each test
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<EditProject />)
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
    return { name, description, submit }
  }

  // Test the addition of a member with valid permissions
  it('Scenario Valid Permissions', async () => {
    // Type in the required test fields
    const { name, description, submit } = setup()
    fireEvent.change(name, { target: { value: 'Project' } })
    fireEvent.change(description, { target: { value: 'Generic description' } })
    expect(name.value).toBe('Project')
    expect(description.value).toBe('Generic description')
    fireEvent.click(submit)
    const user = await handleLogin('t@t.com', 'test123')
    // expect(await handleCreateProject(user, 'Example', 'Something')).toBe(
    //   'success'
    // )
    signOut(auth)

    // CHECK IF THE USER IS ADDED
    // DELETE THE USER
  })
  // Test the addition of a member with invalid name
  it('Scenario Invalid Permissions', async () => {
    // Type in the required test fields
    const { name, description, submit } = setup()
    fireEvent.change(name, { target: { value: '' } })
    fireEvent.change(description, { target: { value: 'Generic description' } })
    expect(name.value).toBe('')
    expect(description.value).toBe('Generic description')
    fireEvent.click(submit)
    const user = await handleLogin('t@t.com', 'test123')
    // expect(await handleCreateProject(user, '', 'Something')).toNotBe('success')
    signOut(auth)

    // CHECK ERROR MESSAGE
  })
})
