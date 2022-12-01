import * as Mui from '@mui/material'
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
    content: ''
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
    <Mui.Container fixed>
      <form onSubmit={handleSubmit}>
        <Mui.FormGroup
          sx={{ padding: 2, borderRadius: 2, border: '1px solid', borderColor: 'primary.main' }}
        >
          <Mui.Typography component='legend'>Rating</Mui.Typography>
          <Mui.Rating name='rating' sx={{ paddingBottom: 2 }} />
          <Mui.Button type='submit' variant='outlined'>
            Submit
          </Mui.Button>
        </Mui.FormGroup>
      </form>
    </Mui.Container>
  )
}
