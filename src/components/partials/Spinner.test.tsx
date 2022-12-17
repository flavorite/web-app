import { render, screen } from '@testing-library/react'
import Spinner from './Spinner'
import TestProvider from './TestProvider'

describe('Spinner', () => {
  test('renders Spinner component when loading is True', () => {
    render(
      <TestProvider>
        <Spinner loading={true}>
          <>Children</>
        </Spinner>
      </TestProvider>,
    )
    const circularProgress = screen.getByRole('progressbar', { hidden: true })
    expect(circularProgress).toBeInTheDocument()
    expect(screen.queryByText('Children')).not.toBeInTheDocument()
  })

  test('renders Children when loading is False', async () => {
    render(
      <TestProvider>
        <Spinner loading={false}>
          <>Children</>
        </Spinner>
      </TestProvider>,
    )
    const circularProgress = screen.queryByRole('progressbar', { hidden: true })
    expect(circularProgress).not.toBeInTheDocument()
    expect(screen.getByText('Children')).toBeInTheDocument()
  })
})
