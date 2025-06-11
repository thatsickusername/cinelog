import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import HomePage from './pages/HomePage/HomePage.jsx'
import LoginPage from './pages/LoginPage/LoginPage.jsx'
import './main.css'
import Movie from './pages/Movie/Movie.jsx'
import SearchResultsPage from './pages/SearchResultsPage/SearchResultsPage.jsx'
import { AuthProvider } from './context/authProvider.jsx'
import Protected from './components/Routes/Protected.jsx'

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/",
    element: (
      <Protected>
        <App />,
      </Protected>
    ),
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
