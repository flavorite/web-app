import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useContext } from 'react'
import { DragDropContext, Draggable } from 'react-beautiful-dnd'
import { Link } from 'react-router-dom'
import useFavorites from '../../hooks/useFavorites'
import useUpdateFavorites from '../../hooks/useUpdateFavorites'
import { StrictModeDroppable } from '../helpers/strictModeDroppable'
import AddFavorite from '../partials/AddFavorite'
import Spinner from '../partials/Spinner'
import { UserContext } from '../partials/UserContext'

export default function FavoriteFoods() {
  const { currentUser } = useContext(UserContext)
  const username = currentUser!.username
  const {
    favorites,
    loading: loadingFavorites,
    error: errorFavorites,
  } = useFavorites({ username: username })
  const { error: errorUpdateFavorites, mutate: updateFavorites } = useUpdateFavorites()

  const favoritesList = favorites.map(({ id, name: foodName }, idx) => {
    return (
      <Draggable key={id} draggableId={`${id}`} index={idx}>
        {(provided) => (
          <Stack
            spacing={2}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Typography>
              {id}.<Link to={`/${username}/reviews/${foodName}`}>{foodName}</Link>
            </Typography>
          </Stack>
        )}
      </Draggable>
    )
  })

  const handleUpdateFavorites = (result: any) => {
    const items = Array.from(favorites)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    items.forEach((item, idx) => {
      item.id = idx + 1
    })
    updateFavorites({
      username: username,
      listFavoriteFoods: { favoriteFoods: items },
    })
  }

  return (
    <Spinner loading={loadingFavorites}>
      <Container fixed>
        <AddFavorite username={username} favorites={favorites} />
        <Typography role='error-message-userData'>
          {errorFavorites ? `${errorFavorites}` : ''}
        </Typography>
        <Typography role='error-message-updateFavs'>
          {errorUpdateFavorites ? `${errorUpdateFavorites}` : ''}
        </Typography>
        <DragDropContext onDragEnd={handleUpdateFavorites}>
          <StrictModeDroppable droppableId='favorites'>
            {(provided) => (
              <Box {...provided.droppableProps} ref={provided.innerRef}>
                {favoritesList}
                {provided.placeholder}
              </Box>
            )}
          </StrictModeDroppable>
        </DragDropContext>
      </Container>
    </Spinner>
  )
}
