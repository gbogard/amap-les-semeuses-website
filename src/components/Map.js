import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Map as LeafletMap, TileLayer, Marker } from 'react-leaflet'

const icon = global.L.icon({
    iconUrl: '/img/map-pin.png',
    iconSize: [64, 64],
    iconAnchor: [20, 64],
    popupAnchor: [-3, -76],
});

class Map extends Component {
    render() {
        const { lat, lng } = this.props;
        return (
            <LeafletMap style={{ width: '100vw', height: '400px' }} center={[lat, lng]} zoom={12.5}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}'
                    maxZoom={18}
                    id="mapbox.streets"
                    accessToken="pk.eyJ1IjoiZ2JvZ2FyZCIsImEiOiJjanY3dnBpbXUwOTZqNDRteWpjN3h0NDlkIn0.1zX_X3sToWvLQUVhAG_sAQ"
                />
                <Marker position={[lat, lng]} icon={icon} />
            </LeafletMap>
        )
    }
}

Map.propTypes = {
    lat: PropTypes.number,
    lng: PropTypes.number,
}

export default Map
