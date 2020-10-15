import React from "react";
import "../assets/css/Map.css";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import { showDataOnMap } from "../util";

const Map = ({ counteries, casesTypes, center, zoom }) => {
  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors '
        />
        {showDataOnMap(counteries, casesTypes)}
      </LeafletMap>
    </div>
  );
};

export default Map;
