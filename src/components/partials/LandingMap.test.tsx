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

const mockUserLocation: { lat: number; lng: number } | null = null
let mockAvailability = false
const mockEnabled = false

jest.mock('react-geolocated', () => ({
  ...jest.requireActual('react-geolocated'),
  useGeolocated: () => ({
    coords: mockUserLocation,
    isGeolocationAvailable: mockAvailability,
    isGeolocationEnabled: mockEnabled,
  }),
}))

describe('Map', () => {
  test('If Geolocation is not available, display proper error message', async () => {
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
