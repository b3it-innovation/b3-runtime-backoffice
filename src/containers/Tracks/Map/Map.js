import React, { Component, createRef } from 'react'

const GOOGLE_MAP_API_KEY = 'AIzaSyCbwwzKmHTpilftt3kGyDaQyFDTG3ChSRQ';
let map = null;

class GoogleMap extends Component {

    googleMapRef = React.createRef();

    componentDidMount() {
        const googleMapScript = document.createElement('script');
        googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`;
        window.document.body.appendChild(googleMapScript);

        googleMapScript.addEventListener('load', () => {
            this.googleMap = this.createGoogleMap();
            console.log(this.googleMap);
            map = this.googleMap;
            this.marker = this.createMarker();
            window.google.maps.event.addDomListener(window, "resize", function () {
                let center = map.getCenter();
                window.google.maps.event.trigger(this.googleMap, "resize");
                map.setCenter(center);
            });
        });
    }

    createGoogleMap = () => {
        return new window.google.maps.Map(this.googleMapRef.current, {
            zoom: 16,
            center: {
                lat: 43.642567,
                lng: -79.387054,
            },
            disableDefaultUI: true,
        });
    }

    createMarker = () => {
        let marker = new window.google.maps.Marker({
            position: { lat: 43.642567, lng: -79.387054 },
            draggable: true,
            title: 'Drag me!',
            map: this.googleMap,
        });

        var contentString = '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
            '<div id="bodyContent">' +
            '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
            'sandstone rock formation in the southern part of the ' +
            'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) ' +
            'south west of the nearest large town, Alice Springs; 450&#160;km ' +
            '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major ' +
            'features of the Uluru - Kata Tjuta National Park. Uluru is ' +
            'sacred to the Pitjantjatjara and Yankunytjatjara, the ' +
            'Aboriginal people of the area. It has many springs, waterholes, ' +
            'rock caves and ancient paintings. Uluru is listed as a World ' +
            'Heritage Site.</p>' +
            '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
            'https://en.wikipedia.org/w/index.php?title=Uluru</a> ' +
            '(last visited June 22, 2009).</p>' +
            '</div>' +
            '</div>';

        var infowindow = new window.google.maps.InfoWindow({
            content: contentString
        });

        marker.addListener('click', () => {
            infowindow.open(this.googleMap, marker);
        });

        return marker;
    }

    render() {
        return (
            <div
                id="google-map"
                ref={this.googleMapRef}
                style={{ width: '800px', height: '650px' }}
            />
        );
    }
}

export default GoogleMap;