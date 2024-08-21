import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createBrowserRouter} from 'react-router-dom'

const router = createBrowserRouter([
  // basename: '/app',
  // children: <App />
  { path : '/app', element: <App /> },
  { path : '/contact', element: <Contact /> },
  { path : '/reveal-link', element: <RevealLink /> }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
