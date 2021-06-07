import React from 'react'
import ReactDOM from 'react-dom'
import { inspect } from "@xstate/inspect";
import './index.css'
import App from './App'

// iframe added in /index.html
inspect();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
