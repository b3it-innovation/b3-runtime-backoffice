import React, { Component, createRef } from 'react'
import { GOOGLE_MAP_API_KEY } from '../../../utility/Util/apiKeys'
import { Container } from '@material-ui/core';

let map = null;

class GoogleMap extends Component {

    googleMapRef = React.createRef();

    componentDidMount() {
        const googleMapScript = document.createElement('script');
        googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`;
        window.document.body.appendChild(googleMapScript);

        googleMapScript.addEventListener('load', () => {
            this.googleMap = this.createGoogleMap();
            map = this.googleMap;
            window.google.maps.event.addDomListener(window, "resize", function () {
                let center = map.getCenter();
                window.google.maps.event.trigger(this.googleMap, "resize");
                map.setCenter(center);
            });
            this.addMapClickListener();
        });
    }

    createGoogleMap = () => {
        return new window.google.maps.Map(this.googleMapRef.current, {
            zoom: 16,
            center: {
                lat: 59.33331080609333,
                lng: 18.05421561640526,
            },
            disableDefaultUI: true,
            mapTypeId: 'hybrid',
        });
    }



    createMarker = (lat, lng) => {
        let marker = new window.google.maps.Marker({
            position: { lat: lat, lng: lng },
            map: this.googleMap,
            draggable: true,
        });

        let checkpoint = {
            lat: marker.position.lat(),
            lng: marker.position.lng(),
            order: this.props.length + 1
        }

        marker.addListener('dragend', (event) => {
            this.props.drag(checkpoint.order, event.latLng.lat(), event.latLng.lng());
        })

        this.props.addCheckpoint(checkpoint);
    }

    addMapClickListener = () => {
        let map = this.googleMap;
        map.addListener('click', (event) => {
            this.createMarker(event.latLng.lat(), event.latLng.lng())
        });
    }

    render() {
        return (
            <Container maxWidth="lg">
                <div
                    id="google-map"
                    ref={this.googleMapRef}
                    style={{ width: '80%', height: '500px' }}
                />
            </Container>
        );
    }
}

export default GoogleMap;