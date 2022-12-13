import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router } from 'react-router-dom'
import Spinner from './Spinner'

describe('Spinner', () => {
  test('renders Spinner component when loading is True', () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <Router>
          <Spinner loading={true}>
            <>Children</>
          </Spinner>
        </Router>
      </QueryClientProvider>,
    )
    const circularProgress = screen.getByRole('progressbar', { hidden: true })
    expect(circularProgress).toBeInTheDocument()
    expect(screen.queryByText('Children')).not.toBeInTheDocument()
  })

  test('renders Children when loading is False', async () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <Router>
          <Spinner loading={false}>
            <>Children</>
          </Spinner>
        </Router>
      </QueryClientProvider>,
    )
    const circularProgress = screen.queryByRole('progressbar', { hidden: true })
    expect(circularProgress).not.toBeInTheDocument()
    expect(screen.getByText('Children')).toBeInTheDocument()
  })
})
