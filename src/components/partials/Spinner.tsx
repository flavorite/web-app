import { Backdrop, CircularProgress } from '@mui/material'

type SpinnerProps = {
  loading: boolean
  children: React.ReactElement
}

const Spinner: React.FC<SpinnerProps> = ({ loading, children }) => {
  return (
    <>
      {loading ? (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
          <CircularProgress color='secondary' />
        </Backdrop>
      ) : (
        <>{children}</>
      )}
    </>
  )
}

export default Spinner
