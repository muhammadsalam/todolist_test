import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/store'
import './index.css'
import App from './App.tsx'
import { loadTodosState } from './features/todos/lib/storage'
import { setStateFromStorage } from './features/todos/model/todosSlice'

const persistedState = loadTodosState()
if (persistedState) {
  store.dispatch(setStateFromStorage(persistedState))
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
