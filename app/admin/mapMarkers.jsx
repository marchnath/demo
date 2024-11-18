// components/MapMarkers.jsx
import { useState } from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";
import { sampleOrganisationData, sampleFacilityData } from "./data";
import DetailsPopup from "./DetailsPopup";

const MapMarkers = () => {
  const [showMarkers, setShowMarkers] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [detailsItem, setDetailsItem] = useState(null);

  const handleSeeDetailsClick = (markerData) => {
    setDetailsItem(markerData);
    setShowDetailsPopup(true);
  };

  const parseCoordinates = (coordString) => {
    const [lat, lng] = coordString
      .split(",")
      .map((coord) => parseFloat(coord.trim()));
    return { lat, lng };
  };

  const buildingSvg = `
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#3B82F6"/>
        <path d="M10 28V14l6-4v4l6-4v4l8-2v16H10zm2-12h3v3h-3zm0 5h3v3h-3zm7-5h3v3h-3zm0 5h3v3h-3z" fill="white"/>
    </svg>
`;

  const toolsSvg = `
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="20" fill="#409826"/>
      <path d="M24 11.5l4.5 4.5-9 9L15 20.5zM16 20l-3 3-2-2 3-3zm11-9l2 2-3 3-2-2z" fill="white"/>
    </svg>
  `;

  const handleMarkerMouseOver = (markerData, type) => {
    setHoveredMarker({ type, data: markerData });
  };

  const handleMarkerClick = (markerData, type) => {
    setSelectedMarker({ type, data: markerData });
  };

  const renderInfoWindow = (marker) => (
    <InfoWindow
      position={parseCoordinates(marker.data["Location Coordinates"])}
      onCloseClick={() => setSelectedMarker(null)}
    >
      <div className="p-2">
        <h3 className="font-bold text-lg">{marker.data.Name}</h3>
        <p className="text-lg">
          {marker.data["Industry Type"] || marker.data.Type}
        </p>
        <button
          className="text-blue-500 hover:text-blue-700 text-lg mt-2 inline-block"
          onClick={() => handleSeeDetailsClick(marker.data)}
        >
          Подробнее
        </button>
      </div>
    </InfoWindow>
  );

  return (
    <>
      {/* Toggle Switch - remains the same */}
      <div className="absolute bottom-4 left-4 z-10 bg-white rounded-lg p-2 shadow-lg">
        <label className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only"
              checked={showMarkers}
              onChange={() => setShowMarkers(!showMarkers)}
            />
            <div className="w-10 h-6 bg-gray-200 rounded-full shadow-inner"></div>
            <div
              className={`absolute w-4 h-4 bg-white rounded-full shadow transition left-1 top-1 ${
                showMarkers ? "transform translate-x-4" : ""
              }`}
            ></div>
          </div>
          <span className="ml-3  font-semibold p-2">Показывать объекты</span>
        </label>
      </div>

      {showMarkers && (
        <>
          {/* Organization Markers */}
          {sampleOrganisationData.map((org, index) => (
            <Marker
              key={`org-${index}`}
              position={parseCoordinates(org["Location Coordinates"])}
              icon={{
                url: `data:image/svg+xml,${encodeURIComponent(buildingSvg)}`,
                scaledSize: new window.google.maps.Size(40, 40),
              }}
              onClick={() => handleMarkerClick(org, "org")}
            />
          ))}

          {/* Facility Markers */}
          {sampleFacilityData.map((facility, index) => (
            <Marker
              key={`facility-${index}`}
              position={parseCoordinates(facility["Location Coordinates"])}
              icon={{
                url: `data:image/svg+xml,${encodeURIComponent(toolsSvg)}`,
                scaledSize: new window.google.maps.Size(40, 40),
              }}
              onClick={() => handleMarkerClick(facility, "facility")}
            />
          ))}

          {/* Info Windows */}
          {selectedMarker && renderInfoWindow(selectedMarker)}
        </>
      )}
      {/* ... your existing components */}
      {showDetailsPopup && (
        <DetailsPopup
          item={detailsItem}
          onClose={() => setShowDetailsPopup(false)}
        />
      )}
    </>
  );
};

export default MapMarkers;
