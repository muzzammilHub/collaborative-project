import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './utils/store.js'
import { SocketProvider } from './context/Socket.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <SocketProvider>
    <App />
    </SocketProvider>
  </Provider>
)
