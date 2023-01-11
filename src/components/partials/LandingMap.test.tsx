import { render, screen } from '@testing-library/react'
import LandingMap from './LandingMap'
import TestProvider from './TestProvider'

jest.mock('../../hooks/useRestaurants', () => {
  return () => {
    return {
      restaurants: [
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
      ],
      loading: false,
      error: 'There is an error in fetching restaurants',
      success: true,
    }
  }
})

let mockUserLocation: { lat: number; lng: number } | null = null
let mockAvailability = false
let mockEnabled = false

jest.mock('react-geolocated', () => ({
  ...jest.requireActual('react-geolocated'),
  useGeolocated: () => ({
    coords: mockUserLocation,
    isGeolocationAvailable: mockAvailability,
    isGeolocationEnabled: mockEnabled,
  }),
}))

const mockCenter: { lat: number; lng: number } = { lat: 5, lng: 5 }

jest.mock('@react-google-maps/api', () => ({
  ...jest.requireActual('@react-google-maps/api'),
  LoadScript: () => (
    <div data-testid='map'>
      {mockCenter.lat} : {mockCenter.lng}
    </div>
  ),
}))

describe('Map', () => {
  test('renders map without crashing with search field. If Geolocation is not available, display proper error message', async () => {
    render(
      <TestProvider>
        <LandingMap />
      </TestProvider>,
    )

    expect(
      screen.getByText(
        'Your browser does not support Geolocation. Use Search bar to find nearby restaurants',
      ),
    ).toBeInTheDocument()
  })
  test('If Geolocation is not enabled, display proper error message', async () => {
    mockAvailability = true
    render(
      <TestProvider>
        <LandingMap />
      </TestProvider>,
    )

    expect(
      screen.getByText('Geolocation is not enabled. Use Search bar to find nearby restaurants'),
    ).toBeInTheDocument()
  })

  test('If Geolocation is enabled, display map using user location as center. Display Markers for nearby Restaurants', async () => {
    mockUserLocation = { lat: 37.7749, lng: 122.4194 }
    mockAvailability = true
    mockEnabled = true

    render(
      <TestProvider>
        <LandingMap />
      </TestProvider>,
    )

    screen.debug()
  })

  test('On Search location, display map using searched location as center. Display Markers for nearby Restaurants retrieved from API call', async () => {
    mockUserLocation = { lat: 37.7749, lng: 122.4194 }
    mockAvailability = true
    mockEnabled = true

    render(
      <TestProvider>
        <LandingMap />
      </TestProvider>,
    )
  })

  test('if useRestaurants has error, should display error message', () => {
    render(
      <TestProvider>
        <LandingMap />
      </TestProvider>,
    )

    const errorMsg = screen.getByRole('error-message-restaurants')
    expect(errorMsg).toHaveTextContent('There is an error in fetching restaurants')
  })
})
