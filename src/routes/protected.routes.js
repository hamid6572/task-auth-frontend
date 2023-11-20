import { Navigate, Outlet } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

const ProtectedRoute = () => {
  if (!localStorage.getItem('token')) {
    toast.error('User not Signed In!', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    })

    return (
      <div>
        <Navigate to='/' replace={true} />
        <ToastContainer
          position='top'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    )
  }
  return <Outlet />
}

export default ProtectedRoute
