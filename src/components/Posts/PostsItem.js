import { useNavigate } from 'react-router-dom'

const PostsItem = props => {
  const navigate = useNavigate()

  const editHandeler = () => {
    navigate(`/editpost/?id=${props.post.id}`)
  }

  return (
    <center>
      {
        <div className='card my-2' style={{ width: '25rem' }}>
          <div className='card-body'>
            <h4 className='card-title'>{props.post.title}</h4>

            <p className='card-text'>{props.post.content}</p>
            <h6 className='card-subtitle text-muted my-1'>Posted By: {props.post.user.username}</h6>
            {props.post.userId.toString() === localStorage.getItem('userId') && (
              <div>
                <button className='btn btn-outline-success' onClick={editHandeler}>
                  Edit
                </button>
                <button
                  className='btn btn-outline-danger mx-3'
                  onClick={() => props.deleteHandeler(props.post.id)}
                >
                  Delete
                </button>
                <br />
              </div>
            )}
          </div>
        </div>
      }
    </center>
  )
}

export default PostsItem
