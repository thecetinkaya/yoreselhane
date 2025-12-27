import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store'
import App from './App.tsx'
import './index.css'
import { initAuthListener } from './lib/subabase'
  // store already imported above

  // Initialize Supabase auth listener and wait for current session before rendering
  ; (async () => {
    await initAuthListener(store.dispatch)

    ReactDOM.createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </React.StrictMode>,
    )
  })()
