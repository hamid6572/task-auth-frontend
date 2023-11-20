import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { CreatePostAPI } from '../api/posts'

import Layout from '../components/Layout/Layout'
import { Toastcontainer, ToastError } from '../tools/toast'

const CreatePost = () => {
  const navigate = useNavigate()
  const titleref = useRef()
  const descriptionref = useRef()

  let userId = localStorage.getItem('userId')
  let err = new Error()

  const createPostAPIHandeler = post => {
    CreatePostAPI(post)
      .then(res => {
        err.status = res.status
        return res.json()
      })
      .then(data => {
        if (err.status !== 200) {
          throw new Error(data.message)
        }
        console.log()
        if (post.status === 'drafted')
          navigate('/drafts', {
            state: { firstDraft: true, draft: data.post }
          })
        else if (post.status === 'published') navigate('/Dashboard')
      })
      .catch(err => {
        ToastError(err)
      })
  }

  const saveDraftHandeler = () => {
    const draft = {
      userId: userId,
      title: titleref.current.value,
      content: descriptionref.current.value,
      status: 'drafted'
    }

    createPostAPIHandeler(draft)
  }

  const createPostHandeler = () => {
    const post = {
      userId: userId,
      title: titleref.current.value,
      content: descriptionref.current.value,
      status: 'published'
    }

    createPostAPIHandeler(post)
  }

  const cancelPostHandeler = () => navigate('/posts')

  return (
    <div>
      <Layout />
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 col-md-offset-2'>
            <h1>Create post</h1>
            <div className='form-group justify-content-end'>
              <label htmlFor='title'>
                Title <span className='require'>*</span>
              </label>
              <div className='float-end'>
                <button
                  data-testid='draftbutton'
                  type='submit'
                  onClick={saveDraftHandeler}
                  className='btn btn-primary text-right my-1'
                >
                  Save Draft
                </button>
              </div>
              <input
                data-testid='posttitle'
                type='text'
                className='form-control my-2'
                placeholder='title'
                required=''
                name='title'
                ref={titleref}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='dscription'>Description</label>
              <textarea
                rows={5}
                className='form-control my-2'
                placeholder='content'
                name='description'
                defaultValue={''}
                ref={descriptionref}
              />
            </div>

            <div className='form-group'>
              <button
                type='submit'
                data-testid='postbutton'
                onClick={createPostHandeler}
                className='btn btn-primary'
              >
                Create Post
              </button>
              <button className='btn btn-default' onClick={cancelPostHandeler}>
                Cancel
              </button>
              <Toastcontainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePost
