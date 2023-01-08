import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TestProvider from '../partials/TestProvider'
import { UserContext } from '../partials/UserContext'
import NewReviewForm from './NewReviewForm'

const mockCreateReview = jest.fn()

jest.mock('../../hooks/useCreateReview', () => {
  return () => {
    return {
      mutate: mockCreateReview,
      loading: false,
      error: 'There is an error in creating review',
      success: true,
    }
  }
})

jest.mock('../../hooks/useFavorites', () => {
  return () => {
    return {
      loading: false,
      error: 'There is an error in fetching user favorites',
      success: true,
      favorites: [
        { id: 1, name: 'sushi' },
        { id: 2, name: 'pizza' },
      ],
    }
  }
})

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    restaurantName: 'testRestaurant',
  }),
  useLocation: () => ({
    state: { restaurantId: '3' },
  }),
}))

describe('New Review Form', () => {
  test('renders new review form without crashing', () => {
    render(
      <TestProvider>
        <NewReviewForm />
      </TestProvider>,
    )
    expect(screen.getByRole('restaurant-name')).toBeInTheDocument()
    expect(screen.getByRole('review-form')).toBeInTheDocument()
  })

  test('Select options should be favorite foods and should be able to select from options. Favorites Selection and Content should be required fields', async () => {
    render(
      <TestProvider>
        <NewReviewForm />
      </TestProvider>,
    )
    const selectBox = screen.getByLabelText('favorites')
    const selectBtn = within(selectBox).getByRole('button')
    fireEvent.mouseDown(selectBtn)

    const listbox = within(screen.getByRole('presentation')).getByRole('listbox')

    const options = within(listbox).getAllByRole('option')
    const optionValues = options.map((li) => li.getAttribute('data-value'))

    expect(optionValues).toEqual(['sushi', 'pizza'])

    fireEvent.click(options[1])

    expect(await screen.findByText('pizza')).toBeVisible()
  })

  // Test onSubmit
  test('onClick submit button, only when required fields (Rating, favoriteFood selection, and Content) are fulfilled, should post form data', async () => {
    render(
      <TestProvider>
        <UserContext.Provider
          value={{
            currentUser: { username: 'kitty', token: 'tokenString' },
            setUser: jest.fn(),
            clearUser: jest.fn(),
          }}
        >
          <NewReviewForm />
        </UserContext.Provider>
      </TestProvider>,
    )
    // SELECT favoritefood
    const selectBox = screen.getByLabelText('favorites')
    const selectBtn = within(selectBox).getByRole('button')
    fireEvent.mouseDown(selectBtn)

    const listbox = within(screen.getByRole('presentation')).getByRole('listbox')

    const options = within(listbox).getAllByRole('option')
    const optionValues = options.map((li) => li.getAttribute('data-value'))

    expect(optionValues).toEqual(['sushi', 'pizza'])

    fireEvent.click(options[0])

    const submitBtn = screen.getByRole('button', { name: /Post/i })

    await userEvent.click(submitBtn)
    expect(mockCreateReview).not.toBeCalled()

    // Content
    const contentBox = screen.getByRole('textbox') as HTMLInputElement

    await userEvent.type(contentBox, 'review content')
    expect(contentBox).toHaveValue('review content')

    await userEvent.click(submitBtn)
    expect(mockCreateReview).not.toBeCalled()

    // Rating

    const starRating = screen.getByLabelText(/3 Stars, Ok/i) as HTMLInputElement

    fireEvent.click(starRating)

    await userEvent.click(submitBtn)

    expect(mockCreateReview).toBeCalledWith({
      createReview: {
        username: 'kitty',
        restaurantId: '3',
        starred: false,
        rating: 3,
        content: 'review content',
        favoriteFood: 'sushi',
      },
    })

    expect(location.pathname).toEqual('/restaurants/testRestaurant')
  })

  // Test error case
  test('if there are errors from API calls, display error message on Form', async () => {
    render(
      <TestProvider>
        <NewReviewForm />
      </TestProvider>,
    )

    expect(screen.getByRole('error-message-favorites')).toHaveTextContent(
      'There is an error in fetching user favorites',
    )
    expect(screen.getByRole('error-message-createReview')).toHaveTextContent(
      'There is an error in creating review',
    )
  })
})
