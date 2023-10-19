// Program Intention: Handle the running of the entire website
// Input/Output: Handle the input/output of the entire website
// Run Intention: Run with the entire website

// Import files and dependencies here
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
// Render the entire website
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
