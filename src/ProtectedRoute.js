import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { Context } from './App'

const ProtectedRoute = ({ element: Element, ...rest }) => (
  <Context.Consumer>
    {({ isAuth }) => (
      <Route
        render={props =>
          isAuth ? <Element {...props} /> : <Redirect to="/" />
        }
        {...rest}
      />
    )}
  </Context.Consumer>
)

export default ProtectedRoute