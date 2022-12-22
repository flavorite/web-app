import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router } from 'react-router-dom'
import { UserProvider } from '../partials/UserContext'

const TestProvider = ({ children }: { children: React.ReactElement }) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <UserProvider>
        <Router>{children}</Router>
      </UserProvider>
    </QueryClientProvider>
  )
}

export default TestProvider
