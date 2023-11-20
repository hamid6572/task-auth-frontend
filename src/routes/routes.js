import { Route, Routes } from 'react-router-dom'

import { EditPost, CreatePost, Drafts, Dashboard, NotFound, Authentication } from '../pages'
import ProtectedRoute from './protected.routes'

import 'react-toastify/dist/ReactToastify.css'
import '../App.css'

const Routers = () => (
  <Routes>
    <Route path='/' element={<Authentication />} />

    {/* <Route element={<ProtectedRoute />}> */}
    <Route path='/Dashboard' element={<Dashboard />} />

    <Route path='/createPost' element={<CreatePost />} />
    <Route path='/posts' element={<Dashboard />} />
    <Route path='/drafts' element={<Drafts />} />

    <Route path='/editpost' element={<EditPost />} />
    {/* </Route> */}

    <Route path='*' element={<NotFound />} />
  </Routes>
)

export default Routers
