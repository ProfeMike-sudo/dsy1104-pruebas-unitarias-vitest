import React from 'react'
import { createRoot } from 'react-dom/client'
// Bootstrap siempre primero, para que nuestros estilos puedan sobreescribirlo (guía 12).
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
