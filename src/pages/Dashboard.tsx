import React from 'react'

import Layout from '../components/Layout/Layout'
import Posts from './Posts'
import { useLocation } from 'react-router-dom'

const MainPage: React.FC = () => {
  const { state } = useLocation()
  console.log(state)

  return (
    <Layout>
      <Posts state={state} />
    </Layout>
  )
}

export default MainPage
