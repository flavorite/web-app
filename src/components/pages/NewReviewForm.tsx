import Container from '@mui/material/Container'
import Rating from '@mui/material/Rating'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import FormGroup from '@mui/material/FormGroup'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import useCreateReview from '../../hooks/useCreateReview'

export default function NewReview() {
  // need to send form using useCreateReview hook
  const navigate = useNavigate()
  const mutation = useCreateReview()
  const [form, setForm] = useState<any>({
    userId: 0,
    restaurantId: 0,
    rating: 0,
    content: '',
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const formDataObj: any = {}
    formData.forEach((value, key) => (formDataObj[key] = value))
    setForm({
      userId: formDataObj.userId,
      restaurantId: formDataObj.restaurantId,
      rating: formDataObj.rating,
      content: formDataObj.content,
    })
    const createReview = () => mutation.mutate({ createReview: form })
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
