import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TestProvider from '../partials/TestProvider'
import RestaurantList from './RestaurantList'

const mockRestaurants = [
  {
    id: '1',
    name: 'Kansai Sushi',
    latitude: 37.972981,
    longitude: -122.0476131,
    address: '1669 Willow Pass Rd, Concord, CA 94520',
  },
  {
    id: '2',
    name: 'Tang Tang Tang',
    latitude: 37.8974296,
    longitude: -122.1243279,
    address: '1679 Willow Pass Rd, Concord, CA 94520',
  },
  {
    id: '3',
    name: 'Ohgane Korean BBQ',
    latitude: 37.9730366,
    longitude: -122.0454687,
    address: '1671 Willow Pass Rd, Concord, CA 94520',
  },
  {
    id: '4',
    name: 'Kevin\'s Noddle House',
    latitude: 37.9414343,
    longitude: -122.086756,
    address: '1833 Willow Pass Rd, Concord, CA 94520',
  },
  {
    id: '5',
    name: 'Mr.Lee\'s Chicken',
    latitude: 37.9726787,
    longitude: -122.0484015,
    address: '1651 Willow Pass Rd, Concord, CA 94520',
  },
  {
    id: '6',
    name: 'Waikiki Hawaiian BBQ',
    latitude: 37.9723669,
    longitude: -122.0438169,
    address: '1680 Willow Pass Rd, Concord, CA 94520',
  },
  {
    id: '7',
    name: '85C Bakery',
    latitude: 37.9736109,
    longitude: -122.0441615,
    address: '1691 Willow Pass Rd, Concord, CA 94520',
  },
  {
    id: '8',
    name: 'Fresh Box',
    latitude: 37.8974296,
    longitude: -122.1243279,
    address: '1679 Willow Pass Rd, Concord, CA 94520',
  },
  {
    id: '9',
    name: 'MochiNut',
    latitude: 37.9728629,
    longitude: -122.0466354,
    address: '1645 Willow Pass Rd, Concord, CA 94520',
  },
  {
    id: '10',
    name: 'Korea House',
    latitude: 37.9749825,
    longitude: -122.0409984,
    address: '1835 Willow Pass Rd, Concord, CA 94520',
  },
  {
    id: '11',
    name: 'Tasty Pot',
    latitude: 37.9210411,
    longitude: -122.2946556,
    address: '1683 Willow Pass Rd, Concord, CA 94520',
  },
  {
    id: '12',
    name: 'Boba Loca',
    latitude: 37.9751347,
    longitude: -122.0429141,
    address: '1843 Willow Pass Rd, Concord, CA 94520',
  },
]

describe('RestaurantList', () => {
  test('renders without crashing and shows first 5 restaurants (default rows per page: 5). OnClick one Restaurant link, should reroute to clicked Restaurant page', async () => {
    render(
      <TestProvider>
        <RestaurantList restaurants={mockRestaurants} />
      </TestProvider>,
    )

    // Rows Per Page set to 5 as default
    expect(screen.getAllByLabelText('nearby-restaurants')).toHaveLength(5)
    // Show First 5 restaurants from list
    expect(screen.getByLabelText('restaurantDetail-1')).toBeInTheDocument()
    expect(screen.getByLabelText('restaurantDetail-2')).toBeInTheDocument()
    expect(screen.getByLabelText('restaurantDetail-3')).toBeInTheDocument()
    expect(screen.getByLabelText('restaurantDetail-4')).toBeInTheDocument()
    expect(screen.getByLabelText('restaurantDetail-5')).toBeInTheDocument()

    await userEvent.click(screen.getByLabelText('restaurantDetail-1'))

    // Link takes user to restaurant detail page
    expect(location.pathname).toEqual('/restaurants/Kansai%20Sushi')
  })

  test('OnClick Next button/Back button, should display restaurants accordingly to pagination', async () => {
    render(
      <TestProvider>
        <RestaurantList restaurants={mockRestaurants} />
      </TestProvider>,
    )
    const nextBtn = screen.getByLabelText('Go to next page')
    const backBtn = screen.getByLabelText('Go to previous page')

    await userEvent.click(nextBtn)

    expect(screen.getAllByLabelText('nearby-restaurants')).toHaveLength(5)
    // Show Next 5 restaurants from list
    expect(screen.getByLabelText('restaurantDetail-6')).toBeInTheDocument()
    expect(screen.getByLabelText('restaurantDetail-7')).toBeInTheDocument()
    expect(screen.getByLabelText('restaurantDetail-8')).toBeInTheDocument()
    expect(screen.getByLabelText('restaurantDetail-9')).toBeInTheDocument()
    expect(screen.getByLabelText('restaurantDetail-10')).toBeInTheDocument()

    await userEvent.click(nextBtn)

    expect(screen.getAllByLabelText('nearby-restaurants')).toHaveLength(2)
    // Show last remaining 2 restaurants from list
    expect(screen.getByLabelText('restaurantDetail-11')).toBeInTheDocument()
    expect(screen.getByLabelText('restaurantDetail-12')).toBeInTheDocument()

    await userEvent.click(backBtn)

    expect(screen.getAllByLabelText('nearby-restaurants')).toHaveLength(5)
    // Show previous 5 restaurants from the list
    expect(screen.getByLabelText('restaurantDetail-6')).toBeInTheDocument()
    expect(screen.getByLabelText('restaurantDetail-7')).toBeInTheDocument()
    expect(screen.getByLabelText('restaurantDetail-8')).toBeInTheDocument()
    expect(screen.getByLabelText('restaurantDetail-9')).toBeInTheDocument()
    expect(screen.getByLabelText('restaurantDetail-10')).toBeInTheDocument()

    await userEvent.click(backBtn)

    expect(screen.getAllByLabelText('nearby-restaurants')).toHaveLength(5)
    // Show previous 5 restaurants from the list
    expect(screen.getByLabelText('restaurantDetail-1')).toBeInTheDocument()
    expect(screen.getByLabelText('restaurantDetail-2')).toBeInTheDocument()
    expect(screen.getByLabelText('restaurantDetail-3')).toBeInTheDocument()
    expect(screen.getByLabelText('restaurantDetail-4')).toBeInTheDocument()
    expect(screen.getByLabelText('restaurantDetail-5')).toBeInTheDocument()
  })

  test('restaurants per page should change accordingly when user selects different rowsPerPage option', async () => {
    render(
      <TestProvider>
        <RestaurantList restaurants={mockRestaurants} />
      </TestProvider>,
    )
    const rowsPerPageOption5 = screen.getByRole('button', { name: 'Rows per page: 5' })

    await userEvent.click(rowsPerPageOption5)
    // await fireEvent.keyDown(rowsPerPageOption, { key: 'ArrowDown', keyCode: 40 })
    // await fireEvent.keyDown(rowsPerPageOption, { key: 'Enter', code: 'Enter', charCode: 13 })

    const listbox = within(screen.getByRole('presentation')).getByRole('listbox')

    const options = within(listbox).getAllByRole('option')
    const optionValues = options.map((li) => li.getAttribute('data-value'))

    expect(optionValues).toEqual(['5', '10', '25', '50'])

    fireEvent.click(options[1])

    expect(screen.getByRole('button', { name: 'Rows per page: 10' })).toBeInTheDocument()

    expect(screen.getAllByLabelText('nearby-restaurants')).toHaveLength(10)
    // Show first 10 restaurants from the list
    expect(screen.getByLabelText('restaurantDetail-1')).toBeInTheDocument()
    expect(screen.getByLabelText('restaurantDetail-2')).toBeInTheDocument()
    expect(screen.getByLabelText('restaurantDetail-3')).toBeInTheDocument()
    expect(screen.getByLabelText('restaurantDetail-4')).toBeInTheDocument()
    expect(screen.getByLabelText('restaurantDetail-5')).toBeInTheDocument()
    expect(screen.getByLabelText('restaurantDetail-6')).toBeInTheDocument()
    expect(screen.getByLabelText('restaurantDetail-7')).toBeInTheDocument()
    expect(screen.getByLabelText('restaurantDetail-8')).toBeInTheDocument()
    expect(screen.getByLabelText('restaurantDetail-9')).toBeInTheDocument()
    expect(screen.getByLabelText('restaurantDetail-10')).toBeInTheDocument()
  })
})
