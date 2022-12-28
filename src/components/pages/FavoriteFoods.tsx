import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { useContext, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FavoriteFood } from '../../client/flavorite'
import useFavorites from '../../hooks/useFavorites'
import useUpdateFavorites from '../../hooks/useUpdateFavorites'
import AddFavorite from '../partials/AddFavorite'
import DeleteFavorite from '../partials/DeleteFavorite'
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
  const [mouseIdx, setMouseIdx] = useState('none')

  const FoodItem = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }))

  const handleUpdateFavorites = async (result: DropResult) => {
    let items = Array.from(favsList)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination!.index, 0, reorderedItem)
    items = items.map((item, idx) => ({ ...item, id: idx + 1 }))
    await updateFavorites({
      username: currentUser!.username,
      listFavoriteFoods: { favoriteFoods: items },
    })
    // TODO switch 'items' to either response from updateFavs or useFavs call when api is connected
    setFavsList(items)
  }

  const currentUserDisplay = (
    <>
      <AddFavorite username={profileUsername} favorites={favsList} />
      <DragDropContext onDragEnd={handleUpdateFavorites}>
        <Droppable droppableId='favorites'>
          {(provided) => (
            <Box
              {...provided.droppableProps}
              ref={provided.innerRef}
              aria-label='favorites-list-draggable'
            >
            <Box
              {...provided.droppableProps}
              ref={provided.innerRef}
              aria-label='favorites-list-draggable'
            >
              {favsList.map(({ id, name: foodName }, idx) => (
                <Draggable
                  key={`${id}`}
                  draggableId={`${id}`}
                  index={idx}
                  aria-label={`item${idx}`}
                >
                  {(provided) => (
                    <Stack
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      aria-label={`${idx}`}
                      data-testid={`item${idx}`}
                      draggable
                    >
                      <FoodItem
                        onMouseEnter={(e) => setMouseIdx((e.target as Element).id)}
                        onMouseLeave={() => setMouseIdx('none')}
                        id={`${idx}`}
                        aria-label={`item${idx}`}
                      >
                        {idx + 1}.{foodName}{' '}
                        <Link to={`/${username}/reviews`} state={{ foodName: foodName }}>
                          <Button
                            sx={{
                              display: mouseIdx === `${idx}` ? 'inline-block' : 'none',
                              pointerEvents: 'none',
                            }}
                            aria-label={`viewReview-${idx}`}
                          >
                            View Reviews
                          </Button>
                        </Link>
                        <DeleteFavorite
                          foodName={foodName}
                          mouseIdx={mouseIdx}
                          idx={idx}
                          favsList={favsList}
                          setFavsList={setFavsList}
                          username={currentUser!.username}
                        />
                      </FoodItem>
                    </Stack>
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

  const otherUserDisplay = (
    <Stack aria-label='favorites-otheruser'>
      {favsList.map(({ id, name: foodName }, idx) => {
        return (
          <FoodItem
            key={id}
            aria-label={`item${idx}`}
            onMouseEnter={(e) => setMouseIdx((e.target as Element).id)}
            onMouseLeave={() => setMouseIdx('none')}
            id={`${idx}`}
          >
            {idx + 1}.{foodName}{' '}
            <Link to={`/${profileUsername}/reviews`} state={{ foodName: foodName }}>
              <Button
                sx={{
                  display: mouseIdx === `${idx}` ? 'inline-block' : 'none',
                  pointerEvents: 'none',
                }}
                aria-label={`viewReview-${idx}`}
              >
                View Reviews
              </Button>
            </Link>
          </FoodItem>
        )
      })}
    </Stack>
  )

  return (
    <Spinner loading={loadingFavorites}>
      <Container fixed>
        <Typography role='error-message-userFavs'>
          {errorFavorites ? `${errorFavorites}` : ''}
        </Typography>
        <Typography role='error-message-updateFavs'>
          {errorUpdateFavorites ? `${errorUpdateFavorites}` : ''}
        </Typography>
        {currentUser!.username === profileUsername ? currentUserDisplay : otherUserDisplay}
      </Container>
    </Spinner>
  )
}
