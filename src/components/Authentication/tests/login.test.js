import Login from '../Login'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'

describe('<Login />', () => {
  test('render email input', () => {
    render(<Login />)

    const inputEl = screen.getByTestId('loginemail')
    expect(inputEl).toBeInTheDocument()
    expect(inputEl).toHaveAttribute('type', 'email')
  })

  test('pass valid email to test email input field', () => {
    render(<Login />)

    const inputEl = screen.getByTestId('loginemail')
    userEvent.type(inputEl, 'test@mail.com')
    expect(inputEl).toHaveValue('test@mail.com')
  })

  test('render password input', () => {
    render(<Login />)

    const inputEl = screen.getByTestId('loginpassword')
    expect(inputEl).toBeInTheDocument()
    expect(inputEl).toHaveAttribute('type', 'password')
  })

  test('render login button', () => {
    render(<Login />)

    const button = screen.getByTestId('loginbutton')
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('type', 'submit')
  })
})
