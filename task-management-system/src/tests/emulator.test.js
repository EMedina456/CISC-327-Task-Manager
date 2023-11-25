// operations.test.js

const {
  initializeAdminApp,
  clearFirestoreData,
  apps,
} = require('@firebase/rules-unit-testing');

const { setDb, getDb } = require('../firebase/db');

// Helper function to set up the test db instance
async function authedApp() {
  const app = await initializeAdminApp({ projectId: 'test-project' });
  return app.firestore();
}

beforeEach(async () => {
  const app = await authedApp();
  // Set the emulator database before each test
  setDb(app);
});

beforeEach(async () => {
  // Clear the database before each test
  await clearFirestoreData({ projectId: 'test-project' });
});

afterEach(async () => {
  // Clean up the apps between tests.
  await Promise.all(apps().map((app) => app.delete()));
});

const { COLLECTION_NAME } = require('../firebase/constants');

const { CreateProject } = require('../components/CreateProject');
const { EditProject } = require('../components/EditProject');

// Set up mock data for testing
const project_name = 'Test Project';
const description = 'Test Description';
