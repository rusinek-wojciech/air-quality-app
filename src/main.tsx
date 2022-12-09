import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './components/App'
import { Provider } from 'react-redux'
import { store } from './store/store'
import './index.css'

const root = document.getElementById('root')!

createRoot(root).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)
