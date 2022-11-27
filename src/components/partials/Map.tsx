import { useState, useEffect } from 'react'
import { GoogleMap, Marker, LoadScript, LoadScriptProps, Autocomplete, InfoWindow } from '@react-google-maps/api'

// declared library for 'places' here to avoid react warning for LoadScript performance
const lib: LoadScriptProps['libraries'] = ['places']

export default function Map() {
  const API_KEY = process.env.REACT_APP_API_KEY

  const containerStyle = {
    width: '100%',
    height: '60vh',
  }

  const radius = 1000;
  const [center, setCenter] = useState({
    lat: -3.745,
    lng: -38.523,
  })

  // const svgMarker = {
  //   path: 'M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z',
  //   fillColor: 'red',
  //   fillOpacity: 0.6,
  //   strokeWeight: 0,
  //   rotation: 0,
  //   scale: 2,
  //   anchor: new google.maps.Point(15, 30),
  // };

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
  const [map, setMap] = useState<any>(null)


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


  return (
    <LoadScript googleMapsApiKey={`${API_KEY}`} libraries={lib}>
      <GoogleMap onLoad={(map) => setMap(map)} mapContainerStyle={containerStyle} center={center} zoom={15}>
        <InfoWindow onLoad={onLoadInfo} position={position}>
          <div style={divStyle}>
            <h1>InfoWindow</h1>
          </div>
        </InfoWindow>
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
  )
}
