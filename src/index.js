import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAC23buhC03bWVRAGVt_a0b7Xxg-4fMCEo',
  authDomain: 'chat-app-fb774.firebaseapp.com',
  projectId: 'chat-app-fb774',
  storageBucket: 'chat-app-fb774.appspot.com',
  messagingSenderId: '115321333785',
  appId: '1:115321333785:web:8c2e94d1dcb20e1a152288',
  measurementId: 'G-PYDDVZD3JX',
}

export const Context = createContext(null)

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth()
const firestore = getFirestore(app)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Context.Provider
      value={{
        auth,
        firestore,
      }}
    >
      <App />
    </Context.Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
