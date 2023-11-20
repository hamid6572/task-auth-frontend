import { ThreeDots } from 'react-loader-spinner'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { editPostAPI, getPostAPI } from '../api/posts'
import Layout from '../components/Layout/Layout'
import { Toastcontainer, ToastError } from '../tools/toast'

const EditPost = () => {
  const [post, setPost] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  const search = window.location.search
  let id = new URLSearchParams(search).get('id')

  const getPost = async () => {
    const response = await getPostAPI(id)
    return response.json()
  }

  useEffect(() => {
    getPost().then(data => {
      setIsLoading(false)
      setPost(data.post)
    })
    // eslint-disable-next-line
  }, [])

  const titleInput = post.title
  const contentInput = post.content
  const updatedTitle = useRef()
  const updatedContent = useRef()
  let err = new Error()

  const editPostHandeler = () => {
    const updatedPost = {
      title: updatedTitle.current.value,
      content: updatedContent.current.value
    }

    editPostAPI(id, updatedPost)
      .then(res => {
        err.status = res.status
        return res.json()
      })
      .then(data => {
        if (err.status !== 200) {
          throw new Error(data.message)
        }
        if (post.status === 'drafted') navigate('/drafts')
        else navigate('/Dashboard')
      })
      .catch(err => {
        ToastError(err)
      })
  }

  const cancelPostHandeler = () => navigate('/posts')

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }

  return (
    <div>
      <Layout />
      {isLoading ? (
        <div style={style}>
          <ThreeDots type='ThreeDots' color='#55c57a' height={80} width={80} />
        </div>
      ) : (
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 col-md-offset-2'>
              <h1>Edit post</h1>
              <div className='form-group'>
                <label htmlFor='title'>
                  Title
                  <span className='require'>*</span>
                </label>
                <input
                  data-testid='posttitle'
                  type='text'
                  className='form-control'
                  name='title'
                  defaultValue={titleInput}
                  ref={updatedTitle}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='dscription'>Description</label>
                <textarea
                  rows={5}
                  className='form-control'
                  name='description'
                  defaultValue={contentInput}
                  ref={updatedContent}
                />
              </div>

              <div className='form-group'>
                <button
                  data-testid='editbutton'
                  type='submit'
                  onClick={editPostHandeler}
                  className='btn btn-primary'
                >
                  Edit Post
                </button>
                <button className='btn btn-default' onClick={cancelPostHandeler}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
          <Toastcontainer />
        </div>
      )}
    </div>
  )
}

export default EditPost
