import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { MemoryGraphProvider } from './context/MemoryGraphContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <MemoryGraphProvider>
        <App />
      </MemoryGraphProvider>
    </BrowserRouter>
  </StrictMode>,
)
