import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router } from 'react-router-dom'

const TestProvider = ({ children }: { children: React.ReactElement }) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <Router>{children}</Router>
    </QueryClientProvider>
  )
}

export default TestProvider
