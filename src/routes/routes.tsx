import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { EditPost, CreatePost, Dashboard, NotFound, Authentication, SearchResults } from '../pages'
import ProtectedRoute from './protected.routes'

import 'react-toastify/dist/ReactToastify.css'
import '../App.css'
import { ROUTE } from '../enums/routes'

const Routers: React.FC = () => (
  <Routes>
    <Route path='/' element={<Authentication />} />
    <Route path={ROUTE.DASHBOARD} element={<Dashboard />} />

    <Route element={<ProtectedRoute />}>
      <Route path={ROUTE.CREATE_POST} element={<CreatePost />} />

      <Route path={ROUTE.EDIT_POST} element={<EditPost />} />
      <Route path={ROUTE.SEARCH} element={<SearchResults />} />
    </Route>

    <Route path='*' element={<NotFound />} />
  </Routes>
)

export default Routers
