import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { Dashboard, NotFound, Login, SearchResults, PostForm, SignUp } from '../pages'
import ProtectedRoute from './protected.routes'

import '../App.css'
import { ROUTE } from '../enums/routes'

const Routers: React.FC = () => (
  <Routes>
    <Route path='/' element={<Login />} />
    <Route path='/login' element={<Login />} />
    <Route path='/signup' element={<SignUp />} />

    <Route path={ROUTE.DASHBOARD} element={<Dashboard />} />

    <Route element={<ProtectedRoute />}>
      <Route path={ROUTE.CREATE_POST} element={<PostForm />} />
      <Route path={ROUTE.EDIT_POST} element={<PostForm />} />
      <Route path={ROUTE.SEARCH} element={<SearchResults />} />
    </Route>

    <Route path='*' element={<NotFound />} />
  </Routes>
)

export default Routers
