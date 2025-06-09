import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import HomePage from './pages/HomePage/HomePage.jsx'
import './main.css'
import Movie from './pages/Movie/Movie.jsx'
import SearchResultsPage from './pages/SearchResultsPage/SearchResultsPage.jsx'
import { AuthProvider } from './context/authProvider.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage/>
      },
      {
        path: '/:type/:id',
        element: <Movie/>
      },
      {
        path: '/results',
        element: <SearchResultsPage/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </StrictMode>,
)
