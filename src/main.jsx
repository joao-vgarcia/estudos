import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MainModule from '@/modules/main'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainModule />
  </StrictMode>,
)
