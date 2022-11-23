import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';



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
    const [center, setCenter] = useState({ lat: 37.7612206, lng: -122.4895646 });
    const [zoom, setZoom] = useState(11);
    const [value, setValue] = useState(null);

    return (
        <div style={{ height: '70vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: `${API_KEY}`, 
                libraries: ['places'] 
            }}
                defaultCenter={center}
                defaultZoom={zoom}
                options={getMapOptions}
            >
                <Marker
                    lat={center.lat}
                    lng={center.lng}
                    name="My Marker"
                    color="blue"
                />

            </GoogleMapReact>
            {/* <GooglePlacesAutocomplete
                apiKey={`${API_KEY}`}
                selectProps={{
                    value,
                    onChange: setValue,
                }}
                apiOptions={{ language: 'en', region: 'us' }}
                autocompletionRequest={{
                    bounds: [
                      { lat: 50, lng: 50 },
                      { lat: 100, lng: 100 }
                    ],
                    componentRestrictions: {
                    country: ['us'],
                    }
                  }}
                onLoadFailed={(error) => (
                console.error('Could not inject Google script', error)
                )}
            /> */}

        </div>
    );
}


