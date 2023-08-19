import { Box, Button, Container, Grid } from '@mui/material'
import { signInWithPopup } from 'firebase/auth'
import { GoogleAuthProvider } from 'firebase/auth'
import { useContext } from 'react'
import { Context } from '..'

const Login = () => {
  const { auth } = useContext(Context)

  const login = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user
        console.log('Google login successful:', user)
      })
      .catch((error) => {
        console.error('Google login error:', error)
      })
  }

  return (
    <Container>
      <Grid
        container
        style={{ height: window.innerHeight - 50 }}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Grid
          style={{ width: 400, background: 'lightgray' }}
          container
          alignItems='center'
          justifyContent='center'
          direction='column'
        >
          <Box p={5}>
            <Button variant='outlined' onClick={login}>
              Войти с помощью Google
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Login
