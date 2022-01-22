import { useRoutes } from 'react-router-dom'

import RouteHandler from './components/RouteHandler'

import Home from './pages/Home/Home'
import About from './pages/About/About'
import SignIn from './pages/SignIn/SignIn'
import NotFound from './pages/NotFound/NotFound'
import SignUp from './pages/SignUp/SignUp'
import AdPage from './pages/AdPage/AdPage'
import AddAd from './pages/AddAd/AddAd'
import Ads from './pages/Ads/Ads'

export const MainRoutes = () => {
  return useRoutes([
    { path: '/', element: <Home /> },
    { path: '/about', element: <About /> },
    { path: '/signin', element: <SignIn /> },
    { path: '/signup', element: <SignUp /> },
    {
      path: '/ad/:id',
      element: <AdPage />
    },
    {
      path: '/post-an-ad',
      element: (
        <RouteHandler>
          <AddAd />
        </RouteHandler>
      )
    },
    {
      path: '/ads',
      element: <Ads />
    },
    { path: '*', element: <NotFound /> }
  ])
}
