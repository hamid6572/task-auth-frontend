import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import Signup from '../Signup'

describe('<Signup />', () => {
  test('render email input', () => {
    render(<Signup />)

    const inputEl = screen.getByTestId('signupemail')
    expect(inputEl).toBeInTheDocument()
    expect(inputEl).toHaveAttribute('type', 'email')
  })

  test('pass valid email to test email input field', () => {
    render(<Signup />)

    const inputEl = screen.getByTestId('signupemail')
    userEvent.type(inputEl, 'test@mail.com')

    expect(inputEl).toHaveValue('test@mail.com')
  })

  test('render password input', () => {
    render(<Signup />)

    const inputEl = screen.getByTestId('signuppassword')
    expect(inputEl).toBeInTheDocument()
    expect(inputEl).toHaveAttribute('type', 'password')
  })

  test('render signup button', () => {
    render(<Signup />)

    const button = screen.getByTestId('sigupbutton')
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('type', 'submit')
  })
})
