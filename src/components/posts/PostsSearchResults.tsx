import React from 'react'
import { Card, CardContent, Typography, Button, Box, Grid } from '@mui/material'
import { useLocation } from 'react-router-dom'
import CommentList from '../comments/CommentList'

const PostSearchResults: React.FC = () => {
  const { state } = useLocation()

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
            <CommentList comments={result.comments} isSearched={true} />
            <Box style={{ marginTop: '1rem' }}>
              <Button variant='outlined' color='success'>
                View Details
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  ))
}

export default PostSearchResults
