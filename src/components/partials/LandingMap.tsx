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
} from '@react-google-maps/api'
import { useState } from 'react'
import { useGeolocated } from 'react-geolocated'
import useRestaurants from '../../hooks/useRestaurants'
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
    lat: 5,
    lng: 5,
  })

  const [locationMsg, setLocationMsg] = useState<string | null>(null)

  const [search, setSearch] = useState<any>('')

  const {
    restaurants: restaurantsList,
    loading: loadingRestaurants,
    error: errorLoadingRestaurants,
  } = useRestaurants({
    longitude: center.lng,
    latitude: center.lat,
    radius: 500,
  })

  // TODO position will be changed to restaurantsList coordinates to display custom markers
  const position = center

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

  // TODO figure out why geolocation doesn't work initially
  const onLoadMap = () => {
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
  }

  const onLoadInfo = (infoWindow: any) => {
    console.log('infoWindow: ', infoWindow)
  }

  function onLoadSearch(autocomplete: any): void {
    setSearch(autocomplete)
  }

  function onPlaceChanged() {
    if (search !== null) {
      const place = search.getPlace()
      const name = place.name
      const status = place.business_status
      const formattedAddress = place.formatted_address
      const lat = place.geometry.location.lat()
      const lng = place.geometry.location.lng()

      setCenter({
        lat: lat,
        lng: lng,
      })

      console.log(`Name: ${name}`)
      console.log(`Business Status: ${status}`)
      console.log(`Formatted Address: ${formattedAddress}`)
      console.log(`lat: ${lat}, lng: ${lng}`)
    } else {
      alert('Please enter text')
    }
  }

  const restaurantsData = restaurantsList.map((restaurant, id) => {
    return <Stack key={id}>{restaurant.name}</Stack>
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
            onLoad={onLoadMap}
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
          >
            {/* TODO: Need to get 'Places' from backend and display with custom Marker */}
            {/* <Marker
          icon={svgMarker}
          position={center}
        /> */}
            {/* TODO: Change InfoWindow to onClick event (user clicking on each restaurant Marker to open InfoWindow with our data display) */}
            <InfoWindow onLoad={onLoadInfo} position={position}>
              <Box style={divStyle}>
                <Stack>InfoWindow</Stack>
              </Box>
            </InfoWindow>
            <Autocomplete onLoad={onLoadSearch} onPlaceChanged={onPlaceChanged}>
              <TextField
                inputProps={{ style: { backgroundColor: 'white' } }}
                label='Search for location...'
              />
            </Autocomplete>
          </GoogleMap>
        </LoadScript>

        <Box>
          {/* TODO: use 'restaurantsData' to display custom markers on the map & display list below map*/}
          {restaurantsData}
        </Box>
        <Typography role='error-message'>
          {/* TODO Style Typography */}
          {errorLoadingRestaurants ? `${errorLoadingRestaurants}` : ''}
        </Typography>
      </Container>
    </Spinner>
  )
}
