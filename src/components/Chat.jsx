import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import React, { useContext, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Context } from '..'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import Loader from './Loader'
import { collection, serverTimestamp } from 'firebase/firestore'

const Chat = () => {
  const { auth, firestore } = useContext(Context)
  const [user] = useAuthState(auth)
  const [value, setValue] = useState('')

  // Create a query with orderBy
  const query = collection(firestore, 'messages').orderBy('createdAt')

  // Use useCollectionData with the query
  const [messages, loading, error, snapshot] = useCollectionData(query)

  const sendMessage = async () => {
    console.log(value)
    firestore.collection('messages').add({
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      text: value,
      createdAt: serverTimestamp(), // Fix the typo here
    })
    setValue('')
  }

  if (loading) {
    return <Loader />
  }

  return (
    <Paper
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '16px',
      }}
      elevation={3}
    >
      <Typography variant='h5'>Секретный чат</Typography>

      <Grid
        container
        alignItems='center'
        justifyContent='center'
        direction='column'
        style={{
          height: window.innerHeight - 130,
        }}
      >
        <div
          style={{
            width: '80%',
            height: '60vh',
            padding: '8px',
            overflowY: 'auto',
            border: '1px solid #ccc',
            marginBottom: '8px',
            borderRadius: '4px',
          }}
        >
          Здарова! Как ты?
        </div>
        <Grid
          container
          direction='column'
          alignItems='flex-end'
          style={{ width: '80%' }}
        >
          <TextField
            style={{ marginBottom: '8px' }}
            label='Сообщение'
            variant='outlined'
            fullWidth
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button variant='contained' color='primary' onClick={sendMessage}>
            Отправить
          </Button>
        </Grid>
      </Grid>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: '16px',
        }}
      ></div>
    </Paper>
  )
}

export default Chat
