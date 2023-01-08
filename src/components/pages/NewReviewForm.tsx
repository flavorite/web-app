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
import { useNavigate } from 'react-router'
import { useLocation, useParams } from 'react-router-dom'
import { CreateReview } from '../../client/flavorite/models'
import useCreateReview from '../../hooks/useCreateReview'
import useFavorites from '../../hooks/useFavorites'
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
      username: currentUser!.username,
      restaurantId: restaurantId,
      starred: false,
      rating: rating!,
      content: formData.get('content') as string,
      favoriteFood: selectedFood,
      // TODO: enable photo upload. Need to discuss format of image upload.
    }
    console.log(formDataObj)
    await createReview({ createReview: formDataObj })
    navigate(`/restaurants/${restaurantName}`, { state: { restaurantId: restaurantId } })
  }

  return (
    <Spinner loading={loadingCreateReview || loadingFavorites}>
      <Container fixed>
        <Typography role='restaurant-name'>{restaurantName}</Typography>
        <Typography role='error-message-favorites'>
          {errorFavorites ? `${errorFavorites}` : ''}{' '}
        </Typography>
        <Typography role='error-message-createReview'>
          {errorCreateReview ? `${errorCreateReview}` : ''}{' '}
        </Typography>
        <form onSubmit={handleSubmit} role='review-form'>
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
                aria-label='Star Rating'
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
              <InputLabel htmlFor='favorites'>Favorite Dish</InputLabel>
              <Select
                required
                id='favorites'
                onChange={handleChange}
                value={selectedFood}
                aria-label='favorites'
              >
                {favorites.map((favorite) => {
                  return (
                    <MenuItem key={favorite.id} value={favorite.name}>
                      {favorite.name}
                    </MenuItem>
                  )
                })}
              </Select>
              <TextField
                required
                multiline
                margin='dense'
                name='content'
                placeholder='Write a review...'
                aria-label='content'
                fullWidth
              />
              <Button type='submit' variant='outlined'>
                Post
              </Button>
            </FormControl>
          </FormGroup>
        </form>
      </Container>
    </Spinner>
  )
}
