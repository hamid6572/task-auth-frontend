import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import CreatePost from '../CreatePost'
import { BrowserRouter } from 'react-router-dom'

describe('<CreatePost />', () => {
  test('render title input', () => {
    render(
      <BrowserRouter>
        <CreatePost />
      </BrowserRouter>
    )
    const inputEl = screen.getByTestId('posttitle')
    expect(inputEl).toBeInTheDocument()
    expect(inputEl).toHaveAttribute('type', 'text')
  })

  test('pass valid title to test title input field', () => {
    render(
      <BrowserRouter>
        <CreatePost />
      </BrowserRouter>
    )
    expect(screen.queryByTestId('error-msg')).not.toBeInTheDocument()
  })

  test('render post submit button', () => {
    render(
      <BrowserRouter>
        <CreatePost />
      </BrowserRouter>
    )
    const button = screen.getByTestId('postbutton')
    expect(button).toBeInTheDocument()
    userEvent.click(button)
    expect(button).toHaveAttribute('type', 'submit')
  })

  test('render draft submit button', async () => {
    render(
      <BrowserRouter>
        <CreatePost />
      </BrowserRouter>
    )
    const button = screen.getByRole('button', { name: 'Create Post' })
    expect(button).toBeInTheDocument()

    userEvent.click(button)
    expect(button).toHaveAttribute('type', 'submit')

    //const mockLogin = jest.fn()
    //await expect(mockLogin).toHaveBeenCalled()
    //await expect(mockLogin).toHaveBeenCalledTimes(1)
  })

  // test('pass invalid email to test input value', () => {
  //   render(
  //     <BrowserRouter>
  //       <Authentication />
  //     </BrowserRouter>
  //   )

  //   expect(screen.getByTestId('error-msg')).toBeInTheDocument()
  //   expect(screen.queryByTestId('error-msg').textContent).toEqual('Please enter a valid email.')
  // })
})
