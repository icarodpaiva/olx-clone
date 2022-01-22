import { isLogged } from '../helpers/AuthHandler'
import { Navigate } from 'react-router-dom'

const RouteHandler = props => {
  const logged = isLogged()
  if (!logged) {
    return <Navigate to="/signin" />
  }

  return props.children
}

export default RouteHandler
