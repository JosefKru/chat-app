import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { privateRoutes, publicRoutes } from '../routes'
import { CHAT_ROUTE, LOGIN_ROUTE } from '../utils/consts'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Context } from '..'

const AppRouter = () => {
  const { auth } = useContext(Context)
  const [user] = useAuthState(auth)

  if (user) {
    return (
      <Routes>
        {privateRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} exact={true} />
        ))}
        <Route path='*' element={<Navigate to={CHAT_ROUTE} />} />
      </Routes>
    )
  } else {
    return (
      <Routes>
        {publicRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} exact={true} />
        ))}
        <Route path='*' element={<Navigate to={LOGIN_ROUTE} />} />
      </Routes>
    )
  }
}

export default AppRouter
