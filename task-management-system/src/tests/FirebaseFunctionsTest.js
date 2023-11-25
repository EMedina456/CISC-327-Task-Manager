// Program Intention: Handle the firebase functions
// Input/Output: Handle the firebase functions
// Run Intention: Run with the other test cases

// Toast Function
const toast = ({ message, messageType }) => {
  // Different types result in different messages
  if (messageType.type === 'error') {
    return { note: message, messageType: 'error' }
  }
  if (messageType.type === 'info') {
    return { note: message, messageType: 'info' }
  }
}

// Document Functions
const doc = ({ db, collection, id }) => {
  // Return the document
  return {
    id: id,
    data: () => {
      return db[collection][id]
    },
  }
}

// Update Document
const updateDoc = ({ ref, obj }) => {
  // Update the document
  const id = ref.id
  const collection = ref.collection
  collection[id] = obj
}

// Add Document
const addDoc = ({ collection, data }) => {
  // Add the document
  collection.push(data)
}

// Set Document
const setDoc = ({ collection, data }) => {
  // Set the document
  collection.get().then((doc) => {
    if (doc.exists()) {
      collection.update(data)
    } else {
      collection.set(data)
    }
  })
}
// Collection Function
const collection = ({ db, id }) => {
  return db[id]
}

export { toast, doc, updateDoc, addDoc, setDoc, collection }
