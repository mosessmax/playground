import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import RevealLink from './components/RevealLink.tsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

const router = createBrowserRouter([
  // basename: '/app',
  // children: <App />
  { path : '/app', element: <App /> },
  { path : '/reveal-link', element: <RevealLink /> }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />/
  </StrictMode>,
)
