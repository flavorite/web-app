import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DeleteFavorite from './DeleteFavorite'
import TestProvider from './TestProvider'

const mockUpdateFavorites = jest.fn()

jest.mock('../../hooks/useUpdateFavorites', () => {
  return () => {
    return {
      mutate: mockUpdateFavorites,
      loading: false,
      error: 'There is an error in deleting favorite food',
      success: true,
    }
  }
})

describe('DeleteFavorite', () => {
  test('on mouse hover, should display Delete Icon button without crashing, and onClick button, should display Dialog with Delete confirmation request', async () => {
    render(
      <TestProvider>
        <DeleteFavorite
          username='kitty'
          favsList={[
            { id: 1, name: 'sushi' },
            { id: 2, name: 'pizza' },
          ]}
          setFavsList={jest.fn()}
          foodName='sushi'
          mouseIdx='1'
          idx={1}
        />
      </TestProvider>,
    )

    const deleteBtn = await screen.findByLabelText('delete-1')
    expect(deleteBtn).toBeVisible()

    await userEvent.click(deleteBtn)

    const dialogBox = await screen.findByLabelText('alert-dialog')
    expect(dialogBox).toBeVisible()
  })

  test('In dialog, if delete button is clicked, should update FavoriteFoods removing the item deleted.', async () => {
    render(
      <TestProvider>
        <DeleteFavorite
          username='kitty'
          favsList={[
            { id: 1, name: 'sushi' },
            { id: 2, name: 'pizza' },
          ]}
          setFavsList={jest.fn()}
          foodName='sushi'
          mouseIdx='1'
          idx={1}
        />
      </TestProvider>,
    )

    // click delete icon
    const deleteBtn = await screen.findByLabelText('delete-1')
    await userEvent.click(deleteBtn)

    // click Delete from confirmation dialog box
    const dialogDelete = await screen.findByText('Delete')
    await userEvent.click(dialogDelete)

    expect(mockUpdateFavorites).toBeCalledWith({
      username: 'kitty',
      listFavoriteFoods: {
        favoriteFoods: [{ id: 1, name: 'sushi' }],
      },
    })

    expect(await screen.queryByLabelText('alert-dialog')).not.toBeVisible()
  })

  test('In dialog, if Cancel button is clicked, UpdateFavorites is not called and dialog closes', async () => {
    render(
      <TestProvider>
        <DeleteFavorite
          username='kitty'
          favsList={[
            { id: 1, name: 'sushi' },
            { id: 2, name: 'pizza' },
          ]}
          setFavsList={jest.fn()}
          foodName='sushi'
          mouseIdx='1'
          idx={1}
        />
      </TestProvider>,
    )

    // click delete icon
    const deleteBtn = await screen.findByLabelText('delete-1')
    await userEvent.click(deleteBtn)

    // click Cancel from confirmation dialog box
    const dialogCancel = await screen.findByLabelText('cancel-delete')
    await userEvent.click(dialogCancel)

    expect(mockUpdateFavorites).not.toBeCalled()
    expect(await screen.queryByLabelText('alert-dialog')).not.toBeVisible()
  })

  test('when mouse is not hovering, delete button should be hidden', async () => {
    render(
      <TestProvider>
        <DeleteFavorite
          username='kitty'
          favsList={[
            { id: 1, name: 'sushi' },
            { id: 2, name: 'pizza' },
          ]}
          setFavsList={jest.fn()}
          foodName='sushi'
          mouseIdx='none'
          idx={1}
        />
      </TestProvider>,
    )
    expect(screen.queryByLabelText('delete-1')).not.toBeVisible()
  })

  test('if updateFavorites has error, should display error message', () => {
    render(
      <TestProvider>
        <DeleteFavorite
          username='kitty'
          favsList={[
            { id: 1, name: 'sushi' },
            { id: 2, name: 'pizza' },
          ]}
          setFavsList={jest.fn()}
          foodName='sushi'
          mouseIdx='1'
          idx={1}
        />
      </TestProvider>,
    )

    const errorMsg = screen.getByRole('error-message')
    expect(errorMsg).toHaveTextContent('There is an error in deleting favorite food')
  })
})
