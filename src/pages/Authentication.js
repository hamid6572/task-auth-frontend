import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Radio, RadioGroup, FormControlLabel, Tabs, Tab, Box } from '@mui/material'

import { LoginAPI, SignupAPI } from '../api/auth'
import Login from '../components/Authentication/Login'
import Signup from '../components/Authentication/Signup'
import { ToastError } from '../tools/toast'

const Authentication = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('signin')

  const signUpHandler = userData => {
    const err = new Error()

    SignupAPI(userData)
      .then(res => {
        err.status = res.status
        return res.json()
      })
      .then(data => {
        if (err.status !== 200) {
          throw new Error(data.message)
        }
        localStorage.setItem('userId', data.userId)
        localStorage.setItem('token', data.token)

        navigate('Dashboard')
      })
      .catch(err => {
        ToastError(err)
      })
  }

  const signInHandler = async userData => {
    let err = new Error()

    try {
      const signinApiRes = await LoginAPI(userData)
      err.status = signinApiRes.status

      const signinApiResJson = await signinApiRes.json()
      if (err.status !== 200) throw new Error(signinApiResJson.message)

      localStorage.setItem('userId', signinApiResJson.userId)
      localStorage.setItem('token', signinApiResJson.token)

      navigate('Dashboard')
    } catch (err) {
      ToastError(err)
    }
  }

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  return (
    <div>
      <RadioGroup value={activeTab} onChange={handleTabChange} row>
        <FormControlLabel value='signin' control={<Radio />} label='Sign In' />
        <FormControlLabel value='signup' control={<Radio />} label='Sign Up' />
      </RadioGroup>
      <div className='login-form'>
        {activeTab === 'signin' ? (
          <Login signInHandler={signInHandler} />
        ) : (
          <Signup signUpHandler={signUpHandler} />
        )}
      </div>
    </div>
  )

  return (
    <div>
      <div className='login-wrap'>
        <div className='login-html'>
          <input id='tab-1' type='radio' name='tab' className='sign-in' defaultChecked />
          <label htmlFor='tab-1' className='tab'>
            Sign In
          </label>
          <input id='tab-2' type='radio' name='tab' className='sign-up' />
          <label htmlFor='tab-2' className='tab'>
            Sign Up
          </label>
          <div className='login-form'>
            <Login signInHandler={signInHandler} />
            <Signup signUpHandler={signUpHandler} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Authentication
