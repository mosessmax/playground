import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import RevealLink from './components/RevealLink.tsx'
import Scrollbar from './components/Scrollbar.tsx'
import Clock from './components/Clock.tsx'
// import Scrollbar from './pages/Scrollbar.tsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

const router = createBrowserRouter([
  // basename: '/app',
  // children: <App />
  { path : '/', element: <App /> },
  { path : '/reveal-link', element: <RevealLink /> },
  { path : '/scrollbar', element: <Scrollbar /> },
  { path : '/clock', element: <Clock /> }

])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
