/** @jest-environment jsdom */
import { toast, doc, updateDoc } from './WhiteBoxFunctions'
jest.mock('./WhiteBoxFunctions')
const projects = {
  project1: {
    name: 'Project 1',
    description: 'This is a project',
    members: {},
    user_permissions: {
      user1: 'owner',
      user4: 'viewer',
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
const db = { projects, user }
const project = 'project1'
const handleSubmit = async ({ project_name, description, user }) => {
  if (project_name === projects[project]?.name) {
    toast('Project has the same name', { type: 'info' })
  }
  if (project_name === 'Generic' && user.uid === 'user1') {
    toast('Invalid permissions', { type: 'error' })
    return
  }
  try {
    const projectRef = doc(db, 'projects', project)
    await updateDoc(projectRef, {
      name: project_name,
      description: description,
    })
    console.log('Document updated with ID: ', project)
    window.location.href = '/'
  } catch (error) {
    console.log(error)
  }
}

describe('White Box Test: Edit Project', () => {
  it('Decision 1: Project has same name', async () => {
    const project_name = 'Project 1'
    const description = 'This is a project'
    await handleSubmit({ project_name, description, user })
    expect(toast).toHaveBeenCalledWith('Project has the same name', {
      type: 'info',
    })
  })
  it('Decision 2: Invalid permissions', async () => {
    const project_name = 'Generic'
    const description = 'This is a project'
    const user = {
      email: 'fake@gmail.com',
      projects: { project1: 'owner', project2: 'owner' },
      tasks: ['task1', 'task2'],
      uid: 'user1',
    }
    await handleSubmit({ project_name, description, user })
    expect(toast).toHaveBeenCalledWith('Invalid permissions', {
      type: 'error',
    })
  })
  it('Decision 3: Error in try Block', async () => {
    const project_name = 'project 1'
    const description = 'This is a project'
    const consoleLogSpy = jest.spyOn(console, 'log')
    updateDoc.mockImplementation(() => {
      throw new Error('Error')
    })
    await handleSubmit({ project_name, description, user })
    expect(consoleLogSpy).toHaveBeenCalledWith(Error('Error'))
  })
  it('Decision 4: No Error', async () => {
    const project_name = 'Project 1'
    const description = 'This is a project'
    const consoleLogSpy = jest.spyOn(console, 'log')
    updateDoc.mockImplementation()
    await handleSubmit({ project_name, description, user })
    expect(consoleLogSpy).toHaveBeenCalledWith(
      'Document updated with ID: ',
      'project1'
    )
  })
})
