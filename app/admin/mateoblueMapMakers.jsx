import React, { useState, useEffect } from "react";
import { sampleOrganisationData, sampleFacilityData } from "./data";

const MeteoblueMapMarkers = () => {
  const [showMarkers, setShowMarkers] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [markers, setMarkers] = useState([]);

  // Convert lat/lng to pixel coordinates
  const convertToPixelCoordinates = (lat, lng) => {
    // Meteoblue map uses Web Mercator projection
    const mapWidth = window.innerWidth;
    const mapHeight = window.innerHeight;

    // Constants for Web Mercator projection
    const x = (lng + 180) * (mapWidth / 360);
    const latRad = (lat * Math.PI) / 180;
    const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
    const y = mapHeight / 2 - (mapWidth * mercN) / (2 * Math.PI);

    return { x, y };
  };

  useEffect(() => {
    const combineAndProcessMarkers = () => {
      const orgMarkers = sampleOrganisationData.map((org) => ({
        ...org,
        type: "org",
        coordinates: org["Location Coordinates"]
          .split(",")
          .map((coord) => parseFloat(coord.trim())),
      }));

      const facilityMarkers = sampleFacilityData.map((facility) => ({
        ...facility,
        type: "facility",
        coordinates: facility["Location Coordinates"]
          .split(",")
          .map((coord) => parseFloat(coord.trim())),
      }));

      return [...orgMarkers, ...facilityMarkers].map((marker) => ({
        ...marker,
        pixelCoords: convertToPixelCoordinates(
          marker.coordinates[0],
          marker.coordinates[1]
        ),
      }));
    };

    setMarkers(combineAndProcessMarkers());
  }, []);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(selectedMarker?.Name === marker.Name ? null : marker);
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Toggle Switch */}
      <div className="absolute bottom-24 left-20 z-10 bg-white opacity-85 rounded-lg p-2 shadow-lg pointer-events-auto">
        <label className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only"
              checked={showMarkers}
              onChange={() => setShowMarkers(!showMarkers)}
            />
            <div className="w-10 h-6 bg-gray-200 rounded-full shadow-inner" />
            <div
              className={`absolute w-4 h-4 bg-white rounded-full shadow transition left-1 top-1 ${
                showMarkers ? "transform translate-x-4" : ""
              }`}
            />
          </div>
          <span className="ml-3 font-semibold p-2">Показать объекты</span>
        </label>
      </div>

      {/* Markers */}
      {showMarkers &&
        markers.map((marker, index) => (
          <div
            key={`${marker.type}-${index}`}
            className="absolute pointer-events-auto"
            style={{
              left: `${marker.pixelCoords.x}px`,
              top: `${marker.pixelCoords.y}px`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <button
              onClick={() => handleMarkerClick(marker)}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                marker.type === "org" ? "bg-lime-400" : "bg-purple-600"
              }`}
            >
              {marker.type === "org" ? (
                <svg
                  className="w-6 h-6 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 2H9c-1.1 0-2 .9-2 2v5.5l-3.5 3.5c-.4.4-.6.9-.6 1.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12H8v-2h4v2zm3-4H8V8h7v2z" />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
                </svg>
              )}
            </button>

            {/* Info Window */}
            {selectedMarker?.Name === marker.Name && (
              <div className="absolute z-50 bg-white rounded-lg shadow-lg p-4 w-64 -translate-x-1/2 mt-2">
                <h3 className="font-bold text-lg">{marker.Name}</h3>
                <p className="text-lg">
                  {marker["Industry Type"] || marker.Type}
                </p>
                <button
                  className="text-blue-500 hover:text-blue-700 text-lg mt-2"
                  onClick={() => {
                    /* Handle details click */
                  }}
                >
                  Подробнее
                </button>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default MeteoblueMapMarkers;
