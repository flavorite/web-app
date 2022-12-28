import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { useContext, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FavoriteFood } from '../../client/flavorite'
import useFavorites from '../../hooks/useFavorites'
import useUpdateFavorites from '../../hooks/useUpdateFavorites'
import AddFavorite from '../partials/AddFavorite'
import Spinner from '../partials/Spinner'
import { UserContext } from '../partials/UserContext'

export default function FavoriteFoods() {
  const { currentUser } = useContext(UserContext)
  const { username } = useParams()
  const profileUsername = username!
  const {
    favorites,
    loading: loadingFavorites,
    error: errorFavorites,
  } = useFavorites({ username: profileUsername })
  const { error: errorUpdateFavorites, mutate: updateFavorites } = useUpdateFavorites()
  const [favsList, setFavsList] = useState<FavoriteFood[]>(favorites)

  const handleSelection = () => {
    // TODO styling view review button based on mouse hover or click
    console.log('review pop up')
  }

  const handleUpdateFavorites = async (result: any) => {
    const items = Array.from(favsList)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    items.forEach((item, idx) => {
      item.id = idx + 1
    })
    await updateFavorites({
      username: currentUser!.username,
      listFavoriteFoods: { favoriteFoods: items },
    })
    // TODO switch 'items' to either response from updateFavs or useFavs call when api is connected
    setFavsList(items)
  }

  const currentUserDisplay = (
    <>
      <AddFavorite username={currentUser!.username} favorites={favorites} />
      <Typography role='error-message-userFavs'>{errorFavorites && `${errorFavorites}`}</Typography>
      <Typography role='error-message-updateFavs'>
        {errorUpdateFavorites && `${errorUpdateFavorites}`}
      </Typography>
      <DragDropContext onDragEnd={handleUpdateFavorites}>
        <Droppable droppableId='favorites'>
          {(provided) => (
            <Box {...provided.droppableProps} ref={provided.innerRef} aria-label='favorites-list'>
              {favsList.map(({ id, name: foodName }, idx) => (
                <Draggable key={`${id}`} draggableId={`${id}`} index={idx}>
                  {(provided) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      aria-label={`${idx}`}
                      draggable
                      data-testid='item'
                    >
                      <Typography>
                        {idx + 1}.{foodName}{' '}
                        <Link to={`/${username}/reviews`} state={{ foodName: foodName }}>
                          <Button>View Reviews</Button>
                        </Link>
                      </Typography>
                    </Box>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </>
  )

  const otherUserDisplay = favsList.map(({ id, name: foodName }, idx) => {
    return (
      <Box key={id} data-testid='favorites-other'>
        <Typography>
          {idx + 1}.{foodName}{' '}
          <Link to={`/${profileUsername}/reviews`} state={{ foodName: foodName }}>
            <Button>View Reviews</Button>
          </Link>
        </Typography>
      </Box>
    )
  })

  return (
    <Spinner loading={loadingFavorites}>
      <Container fixed>
        {currentUser!.username === profileUsername ? currentUserDisplay : otherUserDisplay}
      </Container>
    </Spinner>
  )
}
