import React, { useState } from 'react'
import { Card, CardContent, Typography, Button, Box, Grid, Snackbar, Alert } from '@mui/material'
import { useLocation } from 'react-router-dom'
import CommentList from '../components/Comments/CommentList'

const SearchResults: React.FC = () => {
  const { state } = useLocation()
  const [alert, setAlert] = useState('')

  const handleSnackbarClose = reason => {
    if (reason === 'clickaway') {
      return
    }
    setAlert('')
  }
  return state.results.map(result => (
    <Grid container justifyContent='center' key={result.id}>
      <Grid item xs={12} sm={8} md={6}>
        <Card variant='outlined' sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant='h6' gutterBottom>
              {result.title}
            </Typography>

            <Typography variant='body1' color='text.secondary'>
              {result.content}
            </Typography>

            <Typography variant='subtitle2' color='text.secondary' sx={{ marginTop: 1 }}>
              Posted By: {result.user.firstName}
            </Typography>
            <CommentList comments={result.comments} setAlert={setAlert} />
            <Box style={{ marginTop: '1rem' }}>
              <Button variant='outlined' color='success'>
                View Details
              </Button>
            </Box>
          </CardContent>
        </Card>
        <Snackbar open={Boolean(alert)} autoHideDuration={4000} onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} severity='error'>
            {alert}
          </Alert>
        </Snackbar>
      </Grid>
    </Grid>
  ))
}

export default SearchResults
