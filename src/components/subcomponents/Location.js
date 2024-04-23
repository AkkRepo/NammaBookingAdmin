import React from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import { point } from "leaflet";

const containerStyle = {
  width: "1200px",
  height: "330px",
};

const center = {
  lat: 13.9299,
  lng: 75.5681,
};

const points = [
  {
    lat: 13.9299,
    lng: 75.5681,
  },
  {
    lat: 12.9716,
    lng: 77.5946,
  },
  {
    lat: 12.2958,
    lng: 76.6394,
  },
  {
    lat: 13.0827,
    lng: 80.2707,
  },
];

function Location() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAZkAILfnYmR39KVJ_y1U1uh7WBWEgN6-A",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        streetViewControl: false,
        mapTypeControl: false,
      }}
    >
      {points.map((p, i) => (
        <MarkerF position={p}></MarkerF>
      ))}
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(Location);
