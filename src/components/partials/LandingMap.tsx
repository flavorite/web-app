import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import {
  Autocomplete,
  GoogleMap,
  InfoWindow,
  LoadScript,
  LoadScriptProps,
  MarkerF,
} from '@react-google-maps/api'
import { useEffect, useState } from 'react'
import { useGeolocated } from 'react-geolocated'
import useRestaurants from '../../hooks/useRestaurants'
import RestaurantList from './RestaurantList'
import Spinner from './Spinner'

// declared library for 'places' here to avoid react warning for LoadScript performance
const lib: LoadScriptProps['libraries'] = ['places']

export default function LandingMap() {
  const API_KEY = process.env.REACT_APP_API_KEY

  const containerStyle = {
    width: '100%',
    height: '60vh',
  }

  const [center, setCenter] = useState({
    lat: 37.7749,
    lng: 122.4194,
  })

  const [markerCoords, setMarkerCoords] = useState<{ lat: number; lng: number }[]>([center])

  const [locationMsg, setLocationMsg] = useState<string | null>(null)

  const [search, setSearch] = useState<any>(null)

  const {
    restaurants: restaurantsList,
    loading: loadingRestaurants,
    error: errorLoadingRestaurants,
  } = useRestaurants({
    longitude: center.lng,
    latitude: center.lat,
    radius: 500,
  })

  const [openMarkerIdx, setOpenMarkerIdx] = useState('')

  const handleToggleOpen = (markerIdx: string) => {
    setOpenMarkerIdx(markerIdx)
  }

  const handleToggleClose = () => {
    setOpenMarkerIdx('')
  }

  const divStyle = {
    background: 'white',
    border: '1px solid #ccc',
    padding: 15,
  }

  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  })

  useEffect(() => {
    if (coords) {
      setCenter({
        lat: coords.latitude,
        lng: coords.longitude,
      })
    } else if (!isGeolocationAvailable) {
      setLocationMsg(
        'Your browser does not support Geolocation. Use Search bar to find nearby restaurants',
      )
    } else if (!isGeolocationEnabled) {
      setLocationMsg('Geolocation is not enabled. Use Search bar to find nearby restaurants')
    }
  }, [coords])

  const onLoadInfo = (infoWindow: any) => {
    console.log('infoWindow: ', infoWindow)
  }

  function onLoadSearch(autocomplete: any): void {
    setSearch(autocomplete)
  }

  function onPlaceChanged() {
    if (search !== null) {
      const place = search.getPlace()
      // const name = place.name
      // const status = place.business_status
      // const formattedAddress = place.formatted_address
      const lat = place.geometry.location.lat()
      const lng = place.geometry.location.lng()

      setCenter({
        lat: lat,
        lng: lng,
      })

      const arrCoords: { lat: number; lng: number }[] = []
      restaurantsList.forEach((restaurant) => {
        arrCoords.push({ lat: restaurant.latitude, lng: restaurant.longitude })
      })
      setMarkerCoords(arrCoords)

      // console.log(`Name: ${name}`)
      // console.log(`Business Status: ${status}`)
      // console.log(`Formatted Address: ${formattedAddress}`)
      // console.log(`lat: ${lat}, lng: ${lng}`)
    } else {
      alert('Please enter text')
    }
  }

  const onLoadMap = () => {
    const arrCoords: { lat: number; lng: number }[] = []
    restaurantsList.forEach((restaurant) => {
      arrCoords.push({ lat: restaurant.latitude, lng: restaurant.longitude })
    })
    setMarkerCoords(arrCoords)
  }

  const displayMarkers = markerCoords.map((coords, idx) => {
    return (
      <Box key={idx}>
        <MarkerF position={coords} onClick={() => handleToggleOpen(`marker${idx}`)} />
        {openMarkerIdx !== '' ? (
          <Box style={divStyle}>
            <InfoWindow
              onLoad={onLoadInfo}
              position={coords}
              onCloseClick={() => handleToggleClose}
            >
              <Stack>InfoWindow</Stack>
            </InfoWindow>
          </Box>
        ) : (
          ''
        )}
      </Box>
    )
  })

  return (
    <Spinner loading={loadingRestaurants}>
      <Container>
        <Typography role='geolocation-error-message'>
          {/* TODO Style Typography */}
          {locationMsg ? `${locationMsg}` : ''}
        </Typography>
        <LoadScript googleMapsApiKey={`${API_KEY}`} libraries={lib}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            onLoad={onLoadMap}
          >
            {displayMarkers}

            <Autocomplete onLoad={onLoadSearch} onPlaceChanged={onPlaceChanged}>
              <TextField
                inputProps={{ style: { backgroundColor: 'white' } }}
                label='Search for location...'
              />
            </Autocomplete>
          </GoogleMap>
        </LoadScript>

        <Box>
          <RestaurantList restaurants={restaurantsList} />
        </Box>
        <Typography role='error-message-restaurants'>
          {errorLoadingRestaurants ? `${errorLoadingRestaurants}` : ''}
        </Typography>
      </Container>
    </Spinner>
  )
}
