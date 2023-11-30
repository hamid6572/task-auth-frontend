import React from 'react'

import Posts from './Posts'
import { useLocation } from 'react-router-dom'

const MainPage: React.FC = () => {
  const { state } = useLocation()

  return <Posts state={state} />
}

export default MainPage
