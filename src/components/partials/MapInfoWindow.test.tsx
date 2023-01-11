import { render, screen } from '@testing-library/react'
import MapInfoWindow from './MapInfoWindow'
import TestProvider from './TestProvider'

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
]

// coordinates for Id: 1
let coords = {
  lat: 37.972981,
  lng: -122.0476131,
}

describe('MapInfoWindow', () => {
  test('shows data for restaurant that matches marker coordinates (test restaurant id: 1', async () => {
    render(
      <TestProvider>
        <MapInfoWindow restaurants={mockRestaurants} coords={coords} />
      </TestProvider>,
    )

    expect(screen.getByLabelText('restaurantDetail-1')).toBeInTheDocument()
    expect(screen.queryByLabelText('restaurantDetail-2')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('restaurantDetail-3')).not.toBeInTheDocument()
  })

  test('shows data for restaurant that matches marker coordinates (test restaurant id: 2', async () => {
    // coordinates for Id: 2
    coords = {
      lat: 37.8974296,
      lng: -122.1243279,
    }
    render(
      <TestProvider>
        <MapInfoWindow restaurants={mockRestaurants} coords={coords} />
      </TestProvider>,
    )
    expect(screen.queryByLabelText('restaurantDetail-1')).not.toBeInTheDocument()
    expect(screen.getByLabelText('restaurantDetail-2')).toBeInTheDocument()
    expect(screen.queryByLabelText('restaurantDetail-3')).not.toBeInTheDocument()
  })
  test('shows data for restaurant that matches marker coordinates (test restaurant id: 3', async () => {
    // coordinates for Id: 3
    coords = {
      lat: 37.9730366,
      lng: -122.0454687,
    }
    render(
      <TestProvider>
        <MapInfoWindow restaurants={mockRestaurants} coords={coords} />
      </TestProvider>,
    )

    expect(screen.queryByLabelText('restaurantDetail-1')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('restaurantDetail-2')).not.toBeInTheDocument()
    expect(screen.getByLabelText('restaurantDetail-3')).toBeInTheDocument()
  })
})
