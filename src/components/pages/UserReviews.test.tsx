import { fireEvent, render, screen, within } from '@testing-library/react'
import TestProvider from '../partials/TestProvider'
import UserReviews from './UserReviews'

jest.mock('../../hooks/useFavorites', () => {
  return () => {
    return {
      loading: false,
      error: 'there is an error in fetching favorites',
      success: true,
      favorites: [
        { id: 1, name: 'sushi' },
        { id: 2, name: 'pizza' },
      ],
      favoriteNames: ['sushi', 'pizza'],
    }
  }
})

describe('UserReviews', () => {
  test('renders autocomplete box and reviews without crashing', () => {
    render(
      <TestProvider>
        <UserReviews />
      </TestProvider>,
    )
    const autocomplete = screen.getByLabelText('selectFavs')
    expect(autocomplete).toBeInTheDocument()

    const reviewsBox = screen.getByLabelText('reviews-list')
    expect(reviewsBox).toBeInTheDocument()
  })
  test('autocomplete box should change input value based on user selection', async () => {
    render(
      <TestProvider>
        <UserReviews />
      </TestProvider>,
    )
    const autocomplete = screen.getByLabelText('selectFavs')
    const input = within(autocomplete).getByRole('combobox')
    autocomplete.focus()

    fireEvent.change(input, { target: { value: 'sus' } })
    fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })
    fireEvent.keyDown(autocomplete, { key: 'Enter' })

    await expect(input).toHaveValue('sushi')
  })

  test('displays error message if error in fetching favorite foods for select options', async () => {
    render(
      <TestProvider>
        <UserReviews />
      </TestProvider>,
    )
    const errorMsgUserData = screen.getByRole('error-message-userFavs')
    expect(errorMsgUserData).toHaveTextContent('there is an error in fetching favorites')
  })
})
