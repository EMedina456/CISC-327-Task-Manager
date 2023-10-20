/** @jest-environment jsdom */
// Program Intention: Implement Testing for the Create Projet Functionality
// Input/Output: Handle the addition of a project
// Run Intention: Run with the other test cases

// Import files and dependencies here
import { render, screen } from '@testing-library/react'
import React from 'react'
import user from '@testing-library/user-event'
import Home from '../pages/Home'
import renderer from 'react-test-renderer'
import { BrowserRouter } from 'react-router-dom'
import CreateProject from '../components/CreateProject'

// Add Team Member Test
describe('Create Project', () => {
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
    render(<CreateProject />)
  })

  // Test the addition of a member with valid permissions
  it('Scenario Valid Name', async () => {
    // Type in the required test fields
    user.type(
      user.click(
        screen.getByRole('textbox', {
          name: /name/i,
        })
      ),
      'Example'
    )

    user.type(
      user.click(
        screen.getByRole('textbox', {
          name: /description/i,
        })
      ),
      'Something'
    )
    user.click(screen.getByText(/submit/i))
    user.click(
      screen.getByRole('button', {
        name: /submit/i,
      })
    )

    // Check if the snapshot matches
    expect(tree).toMatchSnapshot()
  })
  // Test the addition of a member with invalid name
  it('Scenario Invalid Name', async () => {
    // Type in the required test fields
    user.type(
      user.click(
        screen.getByRole('textbox', {
          name: /name/i,
        })
      ),
      'Example'
    )

    user.type(
      user.click(
        screen.getByRole('textbox', {
          name: /description/i,
        })
      ),
      'Something'
    )
    user.click(screen.getByText(/submit/i))
    user.click(
      screen.getByRole('button', {
        name: /submit/i,
      })
    )
    // Check if the snapshot matches
    expect(tree).toMatchSnapshot()
  })
})
