import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "../../context/authContext" // Adjust the import path as necessary

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth()

  return (
    <Route
      {...rest}
      render={props => {
        return currentUser ? <Component {...props} /> : <Redirect to="/login" />
      }}
    ></Route>
  )
}