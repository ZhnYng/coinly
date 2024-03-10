import { render, screen } from '@testing-library/react'
import Home from '../page'

describe('Home', () => {
  it('renders a the right heading', () => {
    render(<Home />)
 
    const heading = screen.getByText("Click the button below if you do not get directed to '/transaction'")
    
    expect(heading).toBeInTheDocument()
  })

  it('renders a button for the user to redirect themselves', () => {
    render(<Home />)

    const button = screen.getByRole('button')

    expect(button).toBeInTheDocument()
  })
})