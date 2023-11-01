/** @jest-environment jsdom */
// Program Intention: Implement Testing for the Task Registration Functionality
// Input/Output: Handle the registration of a task
// Run Intention: Run with the other test cases

// Import files and dependencies here
import { render, screen } from '@testing-library/react'
import React from 'react'
import user from '@testing-library/user-event'
import EditTask from '../components/EditTask'

// Task Registration Test
describe('Task Registration', () => {
  // Render the Member Form before each test
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<EditTask />)
  })

  // Test the edit of a task with invalid permissions
  it('Scenario Invalid Permissions', async () => {
    // Type in the required test fields
    user.type(
      user.click(
        screen.getByRole('textbox', {
          name: /name/i,
        })
      ),
      'example'
    )

    user.type(
      user.click(
        screen.getByRole('textbox', {
          name: /description/i,
        })
      ),
      'description of task'
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

    user.type(
      user.click(
        screen.getByRole('spinbutton', {
          name: /priority/i,
        })
      ),
      1
    )

    user.type(
      user.click(
        screen.getByRole('textbox', {
          name: /project/i,
        })
      ),
      '1'
    )
    user.click(screen.getByText(/submit/i))
    user.click(
      screen.getByRole('button', {
        name: /submit/i,
      })
    )

    // NEED TO CHECK DATABASE FOR TASK
    // DELETE TASK FROM DATABASE
  })

  // Test the edit of a task with valid permissions
  it('Scenario Valid Permissions', async () => {
    // Type in the required test fields
    user.type(
      user.click(
        screen.getByRole('textbox', {
          name: /name/i,
        })
      ),
      'example'
    )

    user.type(
      user.click(
        screen.getByRole('textbox', {
          name: /description/i,
        })
      ),
      'description of task'
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

    user.type(
      user.click(
        screen.getByRole('spinbutton', {
          name: /priority/i,
        })
      ),
      1
    )

    user.type(
      user.click(
        screen.getByRole('textbox', {
          name: /project/i,
        })
      ),
      '1'
    )
    user.click(screen.getByText(/submit/i))
    user.click(
      screen.getByRole('button', {
        name: /submit/i,
      })
    )
    // NEED TO CHECK DATABASE FOR TASK
    // DELETE TASK FROM DATABASE
  })
})
