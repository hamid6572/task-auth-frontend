import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { EditPost, CreatePost, Dashboard, NotFound, Authentication, SearchResults } from '../pages'
//import ProtectedRoute from './protected.routes'

import 'react-toastify/dist/ReactToastify.css'
import '../App.css'

const Routers: React.FC = () => (
  <Routes>
    <Route path='/' element={<Authentication />} />

    {/* <Route element={<ProtectedRoute />}> */}
    <Route path='/Dashboard' element={<Dashboard />} />

    <Route path='/createPost' element={<CreatePost />} />
    <Route path='/posts' element={<Dashboard />} />

    <Route path='/editpost' element={<EditPost />} />
    <Route path='/search' element={<SearchResults />} />

    {/* </Route> */}

    <Route path='*' element={<NotFound />} />
  </Routes>
)

export default Routers
