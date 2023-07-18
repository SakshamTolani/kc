import { GoogleApiWrapper, Map, Marker } from "google-maps-react";
import React from "react";

function KamsinMaps({
  google,
  locations = [{ lat: 25.307578, lng: 82.996631 }],
}) {
  return (
    <Map
      google={google}
      containerStyle={{
        position: "static",
        width: "100%",
        height: "100%",
      }}
      style={{
        width: "100%",
        height: "80%",
      }}
      center={locations[0]}
      initialCenter={locations[0]}
      zoom={locations.length === 1 ? 18 : 13}
      disableDefaultUI={true}
    >
      {locations.map((coords) => (
        <Marker key={coords} position={coords} />
      ))}
    </Map>
  );
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyBYKfO9RWBCWv--9R2RrhMiddmViJ_oOj4",
})(KamsinMaps);
