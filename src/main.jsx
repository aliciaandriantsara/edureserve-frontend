import React from 'react'
import ReactDOM from 'react-dom/client'
// 1. On importe le BrowserRouter
import { BrowserRouter } from 'react-router-dom' 
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. On enveloppe notre App avec le composant de navigation */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)