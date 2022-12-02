import useRestaurants from '../../hooks/useRestaurants'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import { useState, useEffect } from 'react'
import {
  GoogleMap,
  Marker,
  LoadScript,
  LoadScriptProps,
  Autocomplete,
  InfoWindow,
} from '@react-google-maps/api'

// declared library for 'places' here to avoid react warning for LoadScript performance
const lib: LoadScriptProps['libraries'] = ['places']

export default function LandingMap() {
  const API_KEY = process.env.REACT_APP_API_KEY

  const containerStyle = {
    width: '100%',
    height: '60vh',
  }

  const [center, setCenter] = useState({
    lat: -3.745,
    lng: -38.523,
  })

  const [search, setSearch] = useState<any>('')
  const [map, setMap] = useState<any>(null)

  // how do I make this hook call each time center changes based on user's search?
  const { restaurants, loading, error } = useRestaurants({
    longitude: center.lng,
    latitude: center.lat,
    radius: 500,
  })

  const position = { lat: 33.772, lng: -117.214 }

  const divStyle = {
    background: 'white',
    border: '1px solid #ccc',
    padding: 15,
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

  const restaurantsData = restaurants.map((restaurant, id) => {
    return <Stack key={id}>{restaurant.name}</Stack>
  })

  return (
    <Container>
      <LoadScript googleMapsApiKey={`${API_KEY}`} libraries={lib}>
        <GoogleMap
          onLoad={(map) => setMap(map)}
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
        >
          <InfoWindow onLoad={onLoadInfo} position={position}>
            <div style={divStyle}>
              <h1>InfoWindow</h1>
            </div>
          </InfoWindow>
          {/* Need to get 'Places' from backend and display with custom Marker */}
          {/* <Marker
          icon={svgMarker}
          position={center}
        /> */}
          <Autocomplete onLoad={onLoadSearch} onPlaceChanged={onPlaceChanged}>
            <input
              type='text'
              placeholder='Search for location...'
              style={{
                boxSizing: 'border-box',
                border: '1px solid transparent',
                width: '240px',
                height: '32px',
                padding: '0 12px',
                borderRadius: '3px',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                fontSize: '14px',
                outline: 'none',
                textOverflow: 'ellipses',
                position: 'absolute',
                left: '50%',
                marginLeft: '-120px',
              }}
            />
          </Autocomplete>
        </GoogleMap>
      </LoadScript>

      <Box>
        {/* use 'restaurantsData' to display custom markers on the map & display list below map*/}
        {restaurantsData}
      </Box>
    </Container>
  )
}
