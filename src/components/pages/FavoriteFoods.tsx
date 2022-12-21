import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useContext } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Link } from 'react-router-dom'
import useUser from '../../hooks/useUser'
import AddFavorite from '../partials/AddFavorite'
import Spinner from '../partials/Spinner'
import { UserContext, UserContextType } from '../partials/UserContext'

export default function FavoriteFoods() {
  const { user: currentUser } = useContext(UserContext) as UserContextType
  const username = currentUser.username
  const { user: userData, loading: loadingUserData, error: errorUserData } = useUser({ username })

  const favoritesList = userData.favoriteFoods.map(({ id, name }, idx) => {
    return (
      <Draggable key={id} draggableId={id.toString()} index={idx}>
        {(provided) => (
          <Stack
            spacing={2}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {id}.<Link to={`/${username}/favorites/${name}`}>{name}</Link>
          </Stack>
        )}
      </Draggable>
    )
  })

  const handleOnDragEnd = () => {
    console.log('dragend')
  }

  return (
    <Spinner loading={loadingUserData}>
      <Container fixed>
        <AddFavorite username={username} favorites={userData.favoriteFoods} />
        <Typography role='error-message'>
          {/* TODO Style Typography */}
          {errorUserData ? `${errorUserData}` : ''}
        </Typography>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId='favorites'>
            {(provided) => (
              <Box {...provided.droppableProps} ref={provided.innerRef}>
                {favoritesList}
              </Box>
            )}
          </Droppable>
        </DragDropContext>
        {/* TODO: Make into Ordered list, enable user to switch favorites order */}
      </Container>
    </Spinner>
  )
}
