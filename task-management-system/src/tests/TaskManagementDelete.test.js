/** @jest-environment jsdom */
// Program Intention: Implement Testing for the Delete Project Functionality
// Input/Output: Handle the deletion of a project
// Run Intention: Run with the other test cases

// Import files and dependencies here
import { render, screen } from '@testing-library/react'
import React from 'react'
import ViewTask from '../components/ViewTask'
import userEvent from '@testing-library/user-event'
// Delete Project Test
describe('Delete Task', () => {
  // Test Data
  const handleViewProject = jest.fn()
  const handleEditTask = jest.fn()
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
  // Render the Member Form before each test
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <ViewTask
        handleEditTask={handleEditTask}
        handleViewProject={handleViewProject}
        tasks={tasks}
        projects={projects}
        task={'task1'}
        user={user}
      />
    )
  })

  // Test the addition of a member with valid permissions
  it('Scenario Invalid Permissions', async () => {
    const user = userEvent.setup()
    // Delete the project
    await user.click(
      screen.getByRole('button', {
        name: /delete/i,
      })
    )
  })
  // Test the addition of a member with invalid permission
  it('Scenario Valid Permissions', async () => {
    const user = userEvent.setup()
    // Delete the project
    await user.click(
      screen.getByRole('button', {
        name: /delete/i,
      })
    )
  })
})
