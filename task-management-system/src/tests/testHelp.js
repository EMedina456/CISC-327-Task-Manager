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
  uid: 'user1',
}
const db = { projects, user }

export { projects, user, db }
