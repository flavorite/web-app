import { useState } from 'react'
import { GoogleMap, LoadScript, Autocomplete, InfoWindow } from '@react-google-maps/api'
const lib = 'places'

export default function Map() {
  const API_KEY = process.env.REACT_APP_API_KEY
  const containerStyle = {
    width: '100%',
    height: '60vh',
  }

  const center = {
    lat: -3.745,
    lng: -38.523,
  }

  const position = { lat: 33.772, lng: -117.214 }

  const divStyle = {
    background: 'white',
    border: '1px solid #ccc',
    padding: 15,
  }


  const onLoadInfo = (infoWindow: any) => {
    console.log('infoWindow: ', infoWindow)
  }

  const [search, setSearch] = useState<any>('')

  function onLoadSearch(autocomplete: any): void {
    setSearch(autocomplete)
  }

  function onPlaceChanged() {
    if (search !== null) {

      const place = search.getPlace()

      const name = place.name

      const status = place.business_status

      const formattedAddress = place.formatted_address

      console.log(`Name: ${name}`)
      console.log(`Business Status: ${status}`)
      console.log(`Formatted Address: ${formattedAddress}`)
    } else {
      alert('Please enter text')
    }
  }

  return (
    <LoadScript googleMapsApiKey={`${API_KEY}`} libraries={[lib]}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        <InfoWindow onLoad={onLoadInfo} position={position}>
          <div style={divStyle}>
            <h1>InfoWindow</h1>
          </div>
        </InfoWindow>
        <Autocomplete onLoad={onLoadSearch} onPlaceChanged={onPlaceChanged}>
          <input
            type='text'
            placeholder='Customized your placeholder'
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
  )
}
