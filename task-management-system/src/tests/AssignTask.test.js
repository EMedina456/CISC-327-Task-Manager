/** @jest-environment jsdom */
// Program Intention: Implement Testing for the Assign Task Functionality
// Input/Output: Handle the assignment of a task
// Run Intention: Run with the other test cases

// Import files and dependencies here
import { render, screen } from '@testing-library/react'
import React from 'react'
import user from '@testing-library/user-event'
import Home from '../pages/Home'
import renderer from 'react-test-renderer'
import { BrowserRouter } from 'react-router-dom'
import AddMember from '../components/AddMember'

// Assign Task Test
describe('Assign Tasks to Team Members', () => {
  // Create a snapshot of the Home page
  const tree = renderer
    .create(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )
    .toJSON()

  // Render the Member Form before each test
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<AddMember />)
  })

  // Test the assignment of a task with valid permissions
  it('Scenario Valid Permissions', async () => {
    // Type in the required test fields
    user.type(
      user.click(
        screen.getByRole('textbox', {
          name: /name/i,
        })
      ),
      'Yves'
    )
    user.type(
      user.click(
        screen.getByRole('textbox', {
          name: /your permission/i,
        })
      ),
      'valid permission'
    )
    user.type(
      user.click(
        screen.getByRole('textbox', {
          name: /their permission/i,
        })
      ),
      'random permission'
    )
    user.click(screen.getByText(/submit/i))
    user.click(
      screen.getByRole('button', {
        name: /submit/i,
      })
    )
    // Compare the snapshot
    expect(tree).toMatchSnapshot()

    // CHECK IF TASK IS ASSIGNED
  })
  // Test the assignment of a task with invalid permissions
  it('Scenario Invalid Permissions', async () => {
    // Type in the required test fields
    user.type(
      user.click(
        screen.getByRole('textbox', {
          name: /name/i,
        })
      ),
      ''
    )
    user.type(
      user.click(
        screen.getByRole('textbox', {
          name: /your permission/i,
        })
      ),
      'invalid permission'
    )
    user.type(
      user.click(
        screen.getByRole('textbox', {
          name: /their permission/i,
        })
      ),
      'random permission'
    )
    user.click(screen.getByText(/submit/i))
    user.click(
      screen.getByRole('button', {
        name: /submit/i,
      })
    )
    // Compare the snapshot
    expect(tree).toMatchSnapshot()

    // CHECK ERROR MESSAGE
  })
})
