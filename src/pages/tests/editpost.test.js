import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import EditPost from '../EditPost'

describe('<EditPost />', () => {
  test('render spinner input', () => {
    render(
      <BrowserRouter>
        <EditPost />
      </BrowserRouter>
    )
    const inputEl = screen.getByTestId('three-dots-loading')
    expect(inputEl).toBeInTheDocument()
  })

  //jest.setTimeout(30000)
  test('render title input', async () => {
    // const { rerender, debug } = await render(
    //   <BrowserRouter>
    //     <EditPost />
    //   </BrowserRouter>
    // )
    render(
      <BrowserRouter>
        <EditPost />
      </BrowserRouter>
    )
    // await rerender()
    const inputEl = await screen.findByTestId('posttitle')
    expect(inputEl).toBeInTheDocument()
    //expect(inputEl).toHaveAttribute('type', 'text')
    debug()
  })

  test('pass valid title to test title input field', () => {
    render(
      <BrowserRouter>
        <EditPost />
      </BrowserRouter>
    )
    expect(screen.queryByTestId('error-msg')).not.toBeInTheDocument()
  })

  // test('render edit submit button', async () => {
  //   render(
  //     <BrowserRouter>
  //       <EditPost />
  //     </BrowserRouter>
  //   )
  //   const button = screen.getByTestId('editbutton')

  //   expect(button).toBeInTheDocument()
  //   userEvent.click(button)
  //   expect(button).toHaveAttribute('type', 'submit')

  //   //const mockLogin = jest.fn()
  //   //await expect(mockLogin).toHaveBeenCalled()
  //   //await expect(mockLogin).toHaveBeenCalledTimes(1)
  // })

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
