import { useNavigate } from 'react-router-dom'

const DraftsItem = props => {
  const navigate = useNavigate()

  const editHandeler = () => {
    navigate(`/editpost/?id=${props.draft.id}`)
  }

  return (
    <center>
      {
        <div className='card my-2' style={{ width: '25rem' }}>
          <div className='card-body'>
            <h5 className='card-title'>{props.draft.title}</h5>
            <p className='card-text'>{props.draft.content}</p>
            <button
              className='btn btn-outline-primary mx-3'
              onClick={() => props.publishDraftHandeler(props.draft.id)}
            >
              Publish
            </button>
            <button className='btn btn-outline-success mx-3' onClick={editHandeler}>
              Edit
            </button>
            <button
              className='btn btn-outline-danger mx-3'
              onClick={() => props.deleteHandeler(props.draft.id)}
            >
              Delete
            </button>
            <br />
          </div>
        </div>
      }
    </center>
  )
}

export default DraftsItem
