import { AppBar, Button, Grid, Toolbar } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { LOGIN_ROUTE } from '../utils/consts'
import { useContext } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Context } from '..'
import { signOut } from 'firebase/auth'

const Navbar = () => {
  const { auth } = useContext(Context)
  const [user] = useAuthState(auth)

  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out successfully.')
      })
      .catch((error) => {
        console.error('Error signing out:', error)
      })
  }

  return (
    <AppBar position='static' color='primary'>
      <Toolbar variant='dense'>
        <Grid container justifyContent={'flex-end'}>
          {user ? (
            <Button onClick={logout} color='error' variant='contained'>
              Выйти
            </Button>
          ) : (
            <NavLink to={LOGIN_ROUTE}>
              <Button color='success' variant='contained'>
                Логин
              </Button>
            </NavLink>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
