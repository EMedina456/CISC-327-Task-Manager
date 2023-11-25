import { doc, toast, addDoc, setDoc, collection } from './WhiteBoxFunctions'
import { db, user } from './testHelp'
jest.mock('./WhiteBoxFunctions')
const handleSubmit = async ({ project_name, description, user }) => {
  if (project_name === '') {
    toast('Please enter a project name', { type: 'error' })
    return
  }
  try {
    const project = collection(db, 'projects')
    const proj_data = {
      name: project_name,
      description: description,
      tasks: [],
      user_permissions: { 'user.uid': 'owner' },
    }

    const projRef = await addDoc(project, proj_data)
    const proj_id = projRef.id
    if (user) {
      const userRef = doc(db, 'users', user.uid)
      setDoc(
        userRef,
        {
          projects: {
            [proj_id]: 'owner',
          },
        },
        { merge: true }
      )
    } else {
      console.log('No user is signed in')
    }
    toast('Project created successfully')
    window.location.href = '/'
  } catch (error) {
    console.log(error)
  }
}

describe('White Box Test: Create Project', () => {
  it('Path 1: Project name is empty', async () => {
    const project_name = ''
    const description = 'This is a project'
    addDoc.mockImplementation(() => {
      return { id: 'project1' }
    })
    await handleSubmit({ project_name, description, user })
    expect(toast).toHaveBeenCalledWith('Please enter a project name', {
      type: 'error',
    })
  })
  it('Path 2: Project name is not empty', async () => {
    const project_name = 'Project 1'
    const description = 'This is a project'
    await handleSubmit({ project_name, description, user })
    expect(toast).toHaveBeenCalledWith('Project created successfully')
  })
  it('Path 3: User is not signed in', async () => {
    const project_name = 'Project 1'
    const description = 'This is a project'
    const user = null
    const consoleLogSpy = jest.spyOn(console, 'log')
    await handleSubmit({ project_name, description, user })
    expect(consoleLogSpy).toHaveBeenCalledWith('No user is signed in')
  })
  it('Path 4: User is signed in', async () => {
    const project_name = 'Project 1'
    const description = 'This is a project'
    await handleSubmit({ project_name, description, user })
    expect(toast).toHaveBeenCalledWith('Project created successfully')
  })
  it('Path 5: Error in try block', async () => {
    const project_name = 'Project 1'
    const description = 'This is a project'
    const consoleLogSpy = jest.spyOn(console, 'log')
    addDoc.mockImplementation(() => {
      throw new Error('Error')
    })
    await handleSubmit({ project_name, description, user })
    expect(consoleLogSpy).toHaveBeenCalledWith(Error('Error'))
  })
})
