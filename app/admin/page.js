//page.jsx

"use client";
import { useCallback, useRef } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import RiskSelect from "./riskSelect";
import AddButton from "./addButton";
import Image from "next/image";

import { RiskProvider } from "./riskContext";
import ColorLegend from "./colorLegend";
import MapRegions from "./mapRegions";
import MapObjects from "./mapObjects";

import MapMarkers from "./mapMarkers";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = {
  lat: 55.7879,
  lng: 100.1233,
};

const libraries = ["places"];

export default function Home() {
  const geocoderRef = useRef(null);
  const placesServiceRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const onLoad = useCallback((map) => {
    geocoderRef.current = new window.google.maps.Geocoder();
    placesServiceRef.current = new window.google.maps.places.PlacesService(map);
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden">
      <RiskProvider>
        {isLoaded && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={2.5}
            onLoad={onLoad}
          >
            <MapRegions />
            <MapObjects />

            <MapMarkers />
          </GoogleMap>
        )}

        <RiskSelect className="absolute top-4 left-4 z-10" />
        <ColorLegend className="absolute bottom-4 left-4 z-10" />
        <AddButton className="absolute bottom-4 right-4 z-10" />
      </RiskProvider>
    </div>
  );
}
