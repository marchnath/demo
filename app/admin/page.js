// page.jsx

"use client";
import { useCallback, useRef, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import RiskSelect from "./riskSelect";
import AddButton from "./addButton";

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
  // const [map, setMap] = useState(null);
  const geocoderRef = useRef(null);
  const placesServiceRef = useRef(null);

  const [showGoogleMap, setShowGoogleMap] = useState(true); // State to toggle maps

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const onLoad = useCallback((map) => {
    geocoderRef.current = new window.google.maps.Geocoder();
    placesServiceRef.current = new window.google.maps.places.PlacesService(map);
    // setMap(map);
  }, []);

  const toggleMap = () => {
    setShowGoogleMap((prev) => !prev);
  };

  return (
    <div className="w-screen h-screen overflow-hidden">
      <button
        onClick={toggleMap}
        className="absolute top-2 left-2 z-10 bg-purple-800  text-white font-semibold p-4 rounded-lg"
      >
        {showGoogleMap
          ? "Переключиться на карту погоды"
          : "Переключиться на карту рисков"}
      </button>

      {showGoogleMap ? (
        isLoaded && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={2.8}
            onLoad={onLoad}
          >
            <MapMarkers />
            <MapRegions />
            <MapObjects />
          </GoogleMap>
        )
      ) : (
        <iframe
          src="https://www.meteoblue.com/ru/weather/maps/widget/moscow_russia_524901?cloudsAndPrecipitation=1&windAnimation=1&gust=1&satellite=1&temperature=1&sunshine=1&extremeForecastIndex=1&geoloc=fixed&tempunit=C&windunit=km%252Fh&lengthunit=metric&zoom=2&autowidth=auto"
          frameBorder="0"
          scrolling="NO"
          allowTransparency="true"
          sandbox="allow-same-origin allow-scripts allow-popups allow-popups-to-escape-sandbox"
          style={{ width: "100%", height: "100vh" }}
        />
      )}

      <RiskSelect className="absolute top-4 left-4 z-10" />
      {showGoogleMap && (
        <ColorLegend className="absolute bottom-4 left-4 z-10" />
      )}
      <AddButton className="absolute bottom-4 right-4 z-10" />
    </div>
  );
}
