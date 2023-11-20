import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { AllDraftsAPI, DeletePostAPI, publishDraftAPI } from '../api/posts'
import DraftsList from '../components/Drafts/DraftsList'
import Layout from '../components/Layout/Layout'
import { Toastcontainer, ToastError } from '../tools/toast'

const Drafts = () => {
  const [drafts, setDrafts] = useState([])
  const location = useLocation()
  const navigate = useNavigate()
  const err = new Error()

  useEffect(() => {
    AllDraftsAPI()
      .then(res => {
        err.status = res.status
        return res.json()
      })
      .then(data => {
        if (err.status !== 200) {
          throw new Error(data.message)
        }
        setDrafts(data.drafts)
      })
      .catch(err => {
        ToastError(err)
      })
    // eslint-disable-next-line
  }, [])

  const resetDrafts = id => {
    let renewdDrafts = drafts.filter(post => parseInt(post.id) !== parseInt(id))
    setDrafts(renewdDrafts)
  }

  if (location.state != null && location.state.firstDraft) {
    drafts.push(location.state.draft)
    location.state.firstDraft = false
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
        resetDrafts(id)
      })
      .catch(err => {
        ToastError(err)
      })
  }

  const publishDraftHandeler = id => {
    const err = new Error()

    publishDraftAPI(id, localStorage.getItem('userId'))
      .then(res => {
        err.status = res.status
        return res.json()
      })
      .then(data => {
        if (err.status !== 200) {
          throw new Error(data.message)
        }
        resetDrafts(id)
      })
      .catch(err => {
        ToastError(err)
      })

    navigate('/drafts')
  }

  return (
    <div>
      <Layout />
      {drafts.length === 0 ? (
        <p className='text-center h1 my-3 '>No Drafts Available</p>
      ) : (
        <div>
          <DraftsList
            drafts={drafts}
            deleteHandeler={deleteHandeler}
            publishDraftHandeler={publishDraftHandeler}
          />
          <Toastcontainer />
        </div>
      )}
    </div>
  )
}

export default Drafts
