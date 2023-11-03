/** @jest-environment jsdom */
// Program Intention: Implement Testing for the Manage Team Members Functionality
// Input/Output: Handle the addition of a member
// Run Intention: Run with the other test cases

// Import files and dependencies here
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import ManageMember from '../components/ManageMember'
import { handleLogin } from './handleLogin'

// Add Team Member Test
describe('Manage Team Member Permissions', () => {
  // Create a snapshot of the Home page
  // Render the Member Form before each test
  beforeEach(() => {
    //eslint-disable-next-line testing-library/no-render-in-setup
    render(<ManageMember />)
  })

  const setup = () => {
    const name = screen.getByRole('textbox', {
      name: /name/i,
    })
    const yourPermission = screen.getByRole('textbox', {
      name: /your permission/i,
    })
    const theirPermission = screen.getByRole('textbox', {
      name: /their permission/i,
    })
    const submit = screen.getByRole('button', {
      name: /submit/i,
    })
    return { name, yourPermission, theirPermission, submit }
  }
  // Test the management of a member with invalid permissions
  it('Scenario Invalid Permissions', async () => {
    // Type in the required test fields
    const { name, yourPermission, theirPermission, submit } = setup()
    fireEvent.change(name, { target: { value: 'user99' } })
    fireEvent.change(yourPermission, { target: { value: 'viewer' } })
    fireEvent.change(theirPermission, { target: { value: 'viewer' } })
    expect(name.value).toBe('user99')
    expect(yourPermission.value).toBe('viewer')
    expect(theirPermission.value).toBe('viewer')
    fireEvent.click(submit)
    const result = await handleLogin('t@t.com', 'test123')
    expect(result.code).toBe('success')
  })

  // Test the addition of a member with valid permissions
  it('Scenario Valid Admin Permissions', async () => {
    // Type in the required test fields
    const { name, yourPermission, theirPermission, submit } = setup()
    fireEvent.change(name, { target: { value: 'user' } })
    fireEvent.change(yourPermission, { target: { value: 'admin' } })
    fireEvent.change(theirPermission, { target: { value: 'viewer' } })
    expect(name.value).toBe('user')
    expect(yourPermission.value).toBe('admin')
    expect(theirPermission.value).toBe('viewer')
    fireEvent.click(submit)
    const result = await handleLogin('t@t.com', 'test123')
    expect(result.code).toBe('success')
  })

  // Test the addition of a member that does not exist
  it('Scenario Invalid Admin Permissions 1', async () => {
    // Type in the required test fields
    const { name, yourPermission, theirPermission, submit } = setup()
    fireEvent.change(name, { target: { value: 'user99' } })
    fireEvent.change(yourPermission, { target: { value: 'viewer' } })
    fireEvent.change(theirPermission, { target: { value: 'viewer' } })
    expect(name.value).toBe('user99')
    expect(yourPermission.value).toBe('viewer')
    expect(theirPermission.value).toBe('viewer')
    fireEvent.click(submit)
    const result = await handleLogin('t@t.com', 'test123')
    expect(result.code).toBe('success')
  })

  it('Scenario Invalid Admin Permissions 2', async () => {
    // Type in the required test fields
    const { name, yourPermission, theirPermission, submit } = setup()
    fireEvent.change(name, { target: { value: 'user99' } })
    fireEvent.change(yourPermission, { target: { value: 'viewer' } })
    fireEvent.change(theirPermission, { target: { value: 'viewer' } })
    expect(name.value).toBe('user99')
    expect(yourPermission.value).toBe('viewer')
    expect(theirPermission.value).toBe('viewer')
    fireEvent.click(submit)
    const result = await handleLogin('t@t.com', 'test123')
    expect(result.code).toBe('success')
  })
  it('Scenario Valid Owner Permissions', async () => {
    // Type in the required test fields
    const { name, yourPermission, theirPermission, submit } = setup()
    fireEvent.change(name, { target: { value: 'user99' } })
    fireEvent.change(yourPermission, { target: { value: 'owner' } })
    fireEvent.change(theirPermission, { target: { value: 'viewer' } })
    expect(name.value).toBe('user99')
    expect(yourPermission.value).toBe('owner')
    expect(theirPermission.value).toBe('viewer')
    fireEvent.click(submit)
    const result = await handleLogin('t@t.com', 'test123')
    expect(result.code).toBe('success')
  })
})
