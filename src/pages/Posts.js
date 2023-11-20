import { useEffect, useState } from 'react'

import { AllPostsAPI, DeletePostAPI } from '../api/posts'
import PostsList from '../components/Posts/PostsList'
import { Toastcontainer, ToastError } from '../tools/toast'

const Posts = () => {
  const [posts, setPosts] = useState([])
  const err = new Error()

  useEffect(() => {
    AllPostsAPI()
      .then(res => {
        err.status = res.status
        return res.json()
      })
      .then(data => {
        if (err.status !== 200) {
          throw new Error(data.message)
        }
        setPosts(data.posts)
      })
      .catch(err => {
        ToastError(err)
      })
    // eslint-disable-next-line
  }, [])

  const resetPosts = id => {
    let renewdPosts = posts.filter(post => parseInt(post.id) !== parseInt(id))
    setPosts(renewdPosts)
  }

  const deleteHandeler = id => {
    const err = new Error()

    DeletePostAPI(id)
      .then(res => {
        err.status = res.status
        return res.json()
      })
      .then(data => {
        if (err.status !== 200) {
          throw new Error(data.message)
        }
        resetPosts(id)
      })
      .catch(err => {
        ToastError(err)
      })
  }

  return (
    <div>
      {posts.length === 0 ? (
        <p className='text-center h1 my-3 '>No Posts Available</p>
      ) : (
        <div>
          <PostsList posts={posts} deleteHandeler={deleteHandeler} />
          <Toastcontainer />
        </div>
      )}
    </div>
  )
}

export default Posts
