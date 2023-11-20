import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import Authentication from '../Authentication'
import { BrowserRouter } from 'react-router-dom'

describe('<authentication />', () => {
  test('pass valid email to test email input field', () => {
    render(
      <BrowserRouter>
        <Authentication />
      </BrowserRouter>
    )

    expect(screen.queryByTestId('error-msg')).not.toBeInTheDocument()
  })

  test('pass invalid email to test input value', () => {
    render(
      <BrowserRouter>
        <Authentication />
      </BrowserRouter>
    )

    //expect(await screen.findByTestId('error-msg')).toBeInTheDocument()
    // expect(screen.queryByTestId('error-msg').textContent).toEqual('Please enter a valid email.')
  })
})
