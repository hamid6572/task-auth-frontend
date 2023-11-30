import * as Yup from 'yup'

const loginSchema = Yup.object().shape({
  password: Yup.string().required('Password is required'),
  email: Yup.string().required('Email is required').email('Invalid email')
})

const signupSchema = Yup.object().shape({
  password: Yup.string().required('Password is required'),
  email: Yup.string().required('Email is required').email('Invalid email'),
  lastName: Yup.string().required('Last Name is required'),
  firstName: Yup.string().required('First Name is required')
})

export { loginSchema, signupSchema }
