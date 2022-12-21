import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useContext } from 'react'
import { DragDropContext, Draggable } from 'react-beautiful-dnd'
import { Link } from 'react-router-dom'
import useUpdateFavorites from '../../hooks/useUpdateFavorites'
import useUser from '../../hooks/useUser'
import { StrictModeDroppable } from '../helpers/strictModeDroppable'
import AddFavorite from '../partials/AddFavorite'
import Spinner from '../partials/Spinner'
import { UserContext, UserContextType } from '../partials/UserContext'

export default function FavoriteFoods() {
  const { user: currentUser } = useContext(UserContext) as UserContextType
  const username = currentUser.username
  const { user: userData, loading: loadingUserData, error: errorUserData } = useUser({ username })
  const { error: errorUpdateFavorites, mutate: updateFavorites } = useUpdateFavorites()

  const favoritesList = userData.favoriteFoods.map(({ id, name }, idx) => {
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
              {id}.<Link to={`/${username}/favorites/${name}`}>{name}</Link>
            </Typography>
          </Stack>
        )}
      </Draggable>
    )
  })

  const handleUpdateFavorites = (result: any) => {
    const items = Array.from(userData.favoriteFoods)
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
    <Spinner loading={loadingUserData}>
      <Container fixed>
        <AddFavorite username={username} favorites={userData.favoriteFoods} />
        <Typography role='error-message-userData'>
          {errorUserData ? `${errorUserData}` : ''}
        </Typography>
        <Typography role='error-message-updateFavs'>
          {errorUpdateFavorites ? `${errorUpdateFavorites}` : ''}
        </Typography>
        <Container aria-label='DraggableList-favorites'>
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
      </Container>
    </Spinner>
  )
}
