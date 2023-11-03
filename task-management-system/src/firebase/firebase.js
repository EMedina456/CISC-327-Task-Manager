// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
}
// const REACT_APP_FIREBASE_API_KEY = 'AIzaSyDvHhdAcdHTteZr1tXtD3ZnlH4YMpIiEkY'
// const REACT_APP_FIREBASE_AUTH_DOMAIN = 'cisc327newprojectdb.firebaseapp.com'
// const REACT_APP_FIREBASE_PROJECT_ID = 'cisc327newprojectdb'
// const REACT_APP_FIREBASE_STORAGE_BUCKET = 'cisc327newprojectdb.appspot.com'
// const REACT_APP_FIREBASE_MESSAGING_SENDER_ID = '679278145236'
// const REACT_APP_FIREBASE_APP_ID = '1:679278145236:web:8b357753fe7e691733d541'
// const REACT_APP_FIREBASE_MEASUREMENT_ID = 'G-CB9JN5YJDK'
// const firebaseConfig = {
//   apiKey: REACT_APP_FIREBASE_API_KEY,
//   authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: REACT_APP_FIREBASE_APP_ID,
//   measurementId: REACT_APP_FIREBASE_MEASUREMENT_ID,
// }

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

export const db = getFirestore(app)

function initializeServices() {
  // const isConfigured = getApps().length > 0;
  const firebaseApp = initializeApp(firebaseConfig)
  const db = getFirestore(firebaseApp)
  const auth = getAuth(firebaseApp)
  return { firebaseApp, db, auth /* isConfigured */ }
}

// function connectEmulators({ auth, db })
// {
//     connectFirestoreEmulator(db, 'http://localhost:8090');
//     connectAuthEmulator(auth, 'http://localhost:9099');
// }

export function getFirebase() {
  const services = initializeServices()
  // if (!services.isConfigured)
  // {
  //     console.log('emulators connecting');
  //     connectEmulators(services);
  // }
  return services
}
