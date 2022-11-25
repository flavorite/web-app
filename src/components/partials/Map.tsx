import { GoogleMap, LoadScript, useJsApiLoader } from '@react-google-maps/api';

export default function Map() {
  const API_KEY = process.env.REACT_APP_API_KEY
  const containerStyle = {
    width: '100%',
    height: '60vh'
  };
  
  const center = {
    lat: -3.745,
    lng: -38.523
  };
  return (
    <LoadScript
    googleMapsApiKey={`${API_KEY}`}
    >
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
    >
      { /* Child components, such as markers, info windows, etc. */ }
      <></>
    </GoogleMap>
  </LoadScript>
  )
}
