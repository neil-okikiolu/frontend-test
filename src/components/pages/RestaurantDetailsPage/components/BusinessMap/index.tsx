import React from "react";
import GoogleMapReact from "google-map-react";
import { Coordinates } from "src/store/slices/businessSlice";
import config from "src/config";
import { FaMapMarkerAlt } from "react-icons/fa";

interface BusinessMapProps {
  coordinates: Coordinates;
  mapMarkerIconClass: string;
}

const MapMarker: React.FC<{ mapMarkerIconClass: string }> = ({
  mapMarkerIconClass
}) => <FaMapMarkerAlt className={mapMarkerIconClass} />;

const BusinessMap: React.FC<BusinessMapProps> = ({
  coordinates,
  mapMarkerIconClass
}) => {
  const center = {
    lat: coordinates.latitude,
    lng: coordinates.longitude
  };

  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: config.googleMapSecret || "" }}
      center={center}
      defaultZoom={15}
    >
      <MapMarker mapMarkerIconClass={mapMarkerIconClass} />
    </GoogleMapReact>
  );
};

export default BusinessMap;
