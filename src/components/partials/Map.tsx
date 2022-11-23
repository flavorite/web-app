import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker'


export default function Map(props: any) {
    const API_KEY = process.env.REACT_APP_API_KEY
    const getMapOptions = (maps: any) => {
        return {
          disableDefaultUI: true,
          mapTypeControl: true,
          streetViewControl: true,
          styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'on' }] }],
        };
      };
    const [center, setCenter] = useState({lat: 11.0168, lng: 76.9558 });
    const [zoom, setZoom] = useState(11);
    return (
        <div style={{ height: '70vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{key: `${API_KEY}`}}
          defaultCenter={center}
          defaultZoom={zoom}
          options={getMapOptions}
        >
          <Marker
            lat={11.0168}
            lng={76.9558}
            name="My Marker"
            color="blue"
          />
        </GoogleMapReact>
      </div>
    );
}


