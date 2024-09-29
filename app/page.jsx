"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Data,
} from "@react-google-maps/api";
import { MdLocationOn } from "react-icons/md";
import { FiSearch } from "react-icons/fi";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = {
  lat: 55.7879,
  lng: 49.1233,
};

const libraries = ["places"];

const redLocationIcon = {
  path: MdLocationOn.path,
  fillColor: "red",
  fillOpacity: 1,
  strokeWeight: 1,
  strokeColor: "white",
  scale: 2,
};
export default function Home() {
  const [map, setMap] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [markers, setMarkers] = useState([]);
  const [geoJson, setGeoJson] = useState(null);
  const geocoderRef = useRef(null);
  const placesServiceRef = useRef(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const onLoad = useCallback((map) => {
    setMap(map);
    geocoderRef.current = new window.google.maps.Geocoder();
    placesServiceRef.current = new window.google.maps.places.PlacesService(map);
  }, []);

  const handleSearch = useCallback(() => {
    if (map && geocoderRef.current && placesServiceRef.current) {
      geocoderRef.current.geocode(
        { address: searchQuery },
        (results, status) => {
          if (status === "OK" && results[0]) {
            console.log(results[0]);

            const { location, geometry, types } = results[0];
            console.log(location, "location");
            console.log(geometry, "geometry");
            console.log(types, "types");

            // Clear previous markers and geoJson
            setMarkers([]);
            setGeoJson(null);

            // Zoom in to the searched location
            map.setCenter(location);
            map.fitBounds(
              geometry.viewport ||
                new window.google.maps.LatLngBounds(location, location)
            );

            if (
              types.includes("country") ||
              types.includes("administrative_area_level_1") ||
              types.includes("locality")
            ) {
              fetchGeoJsonData(results[0]);

              placesServiceRef.current.textSearch(
                { query: searchQuery, bounds: geometry.viewport },
                (results, status) => {
                  if (
                    status === window.google.maps.places.PlacesServiceStatus.OK
                  ) {
                    const newMarkers = results.map((place) => ({
                      position: place.geometry.location,
                      title: place.name,
                      icon: redLocationIcon,
                    }));
                    setMarkers(newMarkers); // This line was incorrect before
                  }
                }
              );
            } else {
              setMarkers([
                {
                  position: results[0].geometry.location,
                  title: results[0].formatted_address,
                  icon: redLocationIcon,
                },
              ]);
            }
          } else {
            console.error(
              "Geocode was not successful for the following reason: " + status
            );
          }
        }
      );
    }
  }, [map, searchQuery]);

  const fetchGeoJsonData = async (result) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          result.formatted_address
        )}&format=geojson&polygon_geojson=1`
      );
      const data = await response.json();

      if (data.features && data.features.length > 0) {
        setGeoJson(data.features[0]);
      }
    } catch (error) {
      console.error("Error fetching GeoJSON data:", error);
    }
  };

  const searchExamples = [
    { label: "Казань", query: "Казань" },
    { label: "Салиха Батыева, 5, Казань", query: "Салиха Батыева, 5, Казань" },
    { label: "озон", query: "озон Казань" },
  ];

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }
  const handleMarkerClick = useCallback(
    (marker) => {
      if (map) {
        map.setCenter(marker.position);
        map.setZoom(17); // You can adjust this zoom level as needed
      }
    },
    [map]
  );
  return (
    <div className="relative w-screen h-screen">
      <div className="absolute top-0 left-0 right-0 px-4 py-2 flex justify-between items-center opacity-95 bg-white z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between  gap-4">
          <div className="flex items-center border hover:border-blue-600 active:border-blue-600 rounded-full  bg-white px-4 py-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearch();
                }
              }}
              placeholder="Поиск по адресу или компании"
              className="text-base w-64 sm:w-96 mr-2 outline-none "
            />
            <button
              onClick={handleSearch}
              className="p-2 px-4 text-2xl font-bold cursor-pointer "
            >
              <FiSearch className="hover:text-blue-600" />
            </button>
          </div>
          <div className="a z-10 flex space-x-2">
            {searchExamples.map((example, index) => (
              <button
                key={index}
                onClick={() => {
                  setSearchQuery(example.query);
                  handleSearch();
                }}
                className="bg-white hover:bg-black hover:text-white text-black border sm:px-4 sm:py-2 px-2 py-1 rounded-full text-sm sm:text-base"
              >
                {example.label}
              </button>
            ))}
          </div>
        </div>

        <div className="text-blue-600 text-2xl hidden lg:block font-bold">
          ПРОМЕТЕЙ ТЕХНОЛОГИИ
        </div>
      </div>

      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={4}
          onLoad={onLoad}
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={marker.position}
              title={marker.title}
              icon={marker.icon}
              onClick={() => handleMarkerClick(marker)}
            />
          ))}
          {geoJson && (
            <Data
              options={{
                style: {
                  fillColor: "rgba(255, 0, 0, 0.2)",
                  strokeColor: "#FF0000",
                  strokeWeight: 2,
                },
              }}
              onLoad={(data) => data.addGeoJson(geoJson)}
            />
          )}
        </GoogleMap>
      )}
    </div>
  );
}
