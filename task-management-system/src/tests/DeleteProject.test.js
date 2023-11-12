/** @jest-environment jsdom */
// Program Intention: Implement Testing for the Delete Project Functionality
// Input/Output: Handle the deletion of a project
// Run Intention: Run with the other test cases

// Import files and dependencies here
import { render, screen } from '@testing-library/react'
import React from 'react'
import ViewProject from '../components/ViewProject'
import { userEvent } from '@testing-library/user-event'

// Delete Project Test
describe('Delete Project', () => {
  // Render the Member Form before each test
  // Test Data
  const handleViewTask = jest.fn()
  const handleEditProject = jest.fn()
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
  }
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <ViewProject
        handleEditProject={handleEditProject}
        handleViewTask={handleViewTask}
        project={'project1'}
        tasks={tasks}
        projects={projects}
        user={user}
      />
    )
  })

  // Test the deletion of a member with confirmation pressed
  it('Delete Confirmation Pressed', async () => {
    // Click the delete button
    const user = userEvent.setup()
    user.click(
      screen.getByRole('button', {
        name: /delete/i,
      })
    )
  })
  // Test the deletion of a member with confirmation not pressed
  it('Delete Confirmation Not Pressed', async () => {
    // Delete button not clicked
    screen.getByRole('button', {
      name: /delete/i,
    })
  })
})
