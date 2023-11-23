import React from 'react'
import { Link } from 'react-router-dom'

const NotFound: React.FC = () => {
  return (
    <div className='text-center h1 my-3 '>
      <p>Page does not Exist!</p>
      <p>
        Click to go to{' '}
        <span>
          <Link className='link-primary' to='/'>
            Login Page.
          </Link>
        </span>
      </p>
    </div>
  )
}

export default NotFound
