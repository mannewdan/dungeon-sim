import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './css/main.css'
import { DungeonContextProvider } from "./context/DungeonContext"

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <DungeonContextProvider>
      <App />
    </DungeonContextProvider>
  </React.StrictMode>
)
