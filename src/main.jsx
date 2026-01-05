import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' // 关键是这行，确保引用了你刚改好的 App.jsx
import './index.css'        // 关键是这行，引入了 Tailwind 样式

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)