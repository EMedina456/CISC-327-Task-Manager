/** @jest-environment jsdom */
// Program Intention: Implement Testing for the Daily Check In Functionality
// Input/Output: Handle a daily check in
// Run Intention: Run with the other test cases

// Import files and dependencies here
import { render, screen } from '@testing-library/react'
import React from 'react'
import Home from '../pages/Home'

// Check In Test
describe('Check In', () => {
  // Render the Home Page before each test
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<Home />)
  })

  // Test if there are any errors
  it('Check for Errors', async () => {
    // Test
    expect(screen.queryByText('Error')).toBeNull()
  })
})
