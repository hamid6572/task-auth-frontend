import { Link } from 'react-router-dom'

const MainNav = () => {
  const signoutHandler = () => {
    localStorage.removeItem('userId')
    localStorage.removeItem('token')
  }

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light justify-content-between'>
      <Link className='navbar-brand mx-3' to='/posts'>
        Posts
      </Link>

      <Link className='navbar-brand' to='/drafts'>
        Drafts
      </Link>

      <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        <ul className='navbar-nav mr-auto'>
          <li className='nav-item active'>
            <Link className='nav-link' to={`/createPost`}>
              Create Post
            </Link>
          </li>
        </ul>
        <ul className='navbar-nav mr-auto'></ul>
      </div>
      <Link className='nav-link btn btn-outline-success mx-3' onClick={signoutHandler} to='/'>
        Signout
      </Link>
    </nav>
  )
}

export default MainNav
