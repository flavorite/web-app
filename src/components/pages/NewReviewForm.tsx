import StarIcon from '@mui/icons-material/Star'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Rating from '@mui/material/Rating'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useLocation } from 'react-router-dom'
import { CreateReview } from '../../client/flavorite/models'
import useCreateReview from '../../hooks/useCreateReview'
import useFavorites from '../../hooks/useFavorites'
import useUser from '../../hooks/useUser'
import Spinner from '../partials/Spinner'
import { UserContext } from '../partials/UserContext'

export default function NewReview() {
  const navigate = useNavigate()
  const { currentUser } = useContext(UserContext)
  const {
    loading: loadingCreateReview,
    error: errorCreateReview,
    mutate: createReview,
  } = useCreateReview()
  // TODO: may not need this once LoginPayload is finalized with Cognito
  const {
    user,
    loading: loadingUser,
    error: errorUser,
  } = useUser({ username: currentUser!.username })
  const {
    favorites,
    loading: loadingFavorites,
    error: errorFavorites,
  } = useFavorites({ username: currentUser!.username })
  const location = useLocation()
  const restaurantId = location.state.restaurantId
  const { restaurantName } = useParams()

  const labels: { [index: string]: string } = {
    0: 'Select a rating',
    1: 'Terrible',
    2: 'Poor',
    3: 'Ok',
    4: 'Good',
    5: 'Excellent',
  }

  const [rating, setRating] = useState<number | null>(0)
  const [hover, setHover] = useState(-1)
  const [selectedFood, setSelectedFood] = useState('')

  function getLabelText(value: number) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`
  }

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedFood(event.target.value as string)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (rating === 0) {
      return
    }
    const formData = new FormData(event.currentTarget)
    const formDataObj: CreateReview = {
      userId: user.id,
      restaurantId: location.state.restaurant.id,
      starred: false,
      rating: rating!,
      content: formData.get('content') as string,
      favoriteFood: selectedFood,
      // TODO: enable photo upload. Need to discuss format of image upload.
    }

    await createReview({ createReview: formDataObj })
    navigate(`/restaurants/${restaurantName}`, { state: { restaurantId: restaurantId } })
  }

  return (
    <Spinner loading={loadingCreateReview || loadingFavorites || loadingUser}>
      <Container fixed>
        <Typography>{restaurantName}</Typography>
        <Typography role='error-message-user'>{errorUser ? `${errorUser}` : ''} </Typography>
        <Typography role='error-message-favorites'>
          {errorFavorites ? `${errorFavorites}` : ''}{' '}
        </Typography>
        <Typography role='error-message-createReview'>
          {errorCreateReview ? `${errorCreateReview}` : ''}{' '}
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormGroup
            sx={{ padding: 2, borderRadius: 2, border: '1px solid', borderColor: 'primary.main' }}
          >
            <Box
              sx={{
                width: 400,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Rating
                name='rating'
                sx={{ paddingBottom: 2 }}
                value={rating}
                getLabelText={getLabelText}
                onChange={(event, newValue) => {
                  setRating(newValue)
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover)
                }}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize='inherit' />}
              />
              {rating !== null ? (
                <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : rating]}</Box>
              ) : (
                ''
              )}
            </Box>
            <FormControl fullWidth>
              <InputLabel>Favorite Dish</InputLabel>
              <Select label='Favorite Dish' onChange={handleChange} value={selectedFood} required>
                {favorites.map((favorite) => {
                  return (
                    <MenuItem key={favorite.id} value={favorite.name}>
                      {favorite.name}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
            <TextField
              required
              multiline
              margin='dense'
              name='content'
              placeholder='Write a review...'
              aria-label='content'
              fullWidth
              variant='standard'
            />
            <Button type='submit' variant='outlined'>
              Submit
            </Button>
          </FormGroup>
        </form>
      </Container>
    </Spinner>
  )
}
