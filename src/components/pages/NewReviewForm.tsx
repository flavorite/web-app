import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import FormGroup from '@mui/material/FormGroup'
import Rating from '@mui/material/Rating'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router'
import { CreateReview } from '../../client/flavorite/models'
import useCreateReview from '../../hooks/useCreateReview'

export default function NewReview() {
  const navigate = useNavigate()
  const mutation = useCreateReview()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const formDataObj: CreateReview = {
      // TODO: get UserID from currentUser logged in
      userId: 1,
      // TODO: get restaurantID as props or params
      restaurantId: 1,
      // TODO: need to finish creating review form and link FormData here
      rating: 5,
      content: 'very good',
      photoUrl: '',
      favoriteFood: 'sushi',
      // default false
      starred: false,
    }
    const createReview = () => mutation.mutate({ createReview: formDataObj })
    navigate('/')
  }

  return (
    <Container fixed>
      <form onSubmit={handleSubmit}>
        <FormGroup
          sx={{ padding: 2, borderRadius: 2, border: '1px solid', borderColor: 'primary.main' }}
        >
          <Typography component='legend'>Rating</Typography>
          <Rating name='rating' sx={{ paddingBottom: 2 }} />
          <Button type='submit' variant='outlined'>
            Submit
          </Button>
        </FormGroup>
      </form>
    </Container>
  )
}
