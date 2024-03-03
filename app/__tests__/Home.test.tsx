import { render, screen } from '@testing-library/react'
import Home from '../page'
import mockRouter from 'next-router-mock';

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
  
  it('should redirect the user to the "/transactions" route', () => {
    render(<Home />)

    expect(mockRouter).toMatchObject({ 
      asPath: "/transactions",
      pathname: "/transactions",
    });
  })
})