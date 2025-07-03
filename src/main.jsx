import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import AuthLayout from './components/AuthLayout.jsx'
import AllPostPage from './pages/AllPostPage.jsx'
import AddPostPage from './pages/AddPostPage.jsx'
import EditPostPage from './pages/EditPostPage.jsx'
import PostPage from './pages/PostPage.jsx'

import SignUpPage from './pages/SignUpPage.jsx'
import { RouterProvider } from 'react-router-dom'
import Login from './components/Login.jsx'
import SavedPostsPage from './pages/SavedPostPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import PrivacyPage from './pages/PrivacyPage.jsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <AllPostPage />
      },
      {
        path: "/login",
        element:
          <AuthLayout authenticationStatus={false}>
            <Login/>
          </AuthLayout>
      },
      {
        path: '/signup',
        element: <AuthLayout authenticationStatus={false}>
          <SignUpPage/>
        </AuthLayout>
      },
      {
        path: '/all-posts',
        element: <AuthLayout>
          <AllPostPage />
        </AuthLayout>
      },
      {
        path: "/add-post",
        element: <AuthLayout>
          <AddPostPage />
        </AuthLayout>
      },
      {
        path: '/edit-post/:slug',
        element: <AuthLayout>
          <EditPostPage />
        </AuthLayout>
      },
      {
        path: '/post/:slug',
        element: <AuthLayout>
          <PostPage />
        </AuthLayout>
      },
      {
        path: '/post/saved',
        element: <AuthLayout>
          <SavedPostsPage />
        </AuthLayout>
      },
      {
        path:'/about',
        element: <AboutPage/>
      },
      {
        path:'/Privacy',
        element: <PrivacyPage/> 
      },
      {
        path:'/register',
        element: <SignUpPage/> 
      }
     
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>

)
