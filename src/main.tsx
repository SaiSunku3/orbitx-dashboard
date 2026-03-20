import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'   // Make sure App.tsx exists too!
import './index.css'          // Or wherever your CSS is

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)