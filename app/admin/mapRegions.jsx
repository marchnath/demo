import { useGoogleMap } from "@react-google-maps/api";
import { useEffect } from "react";
import { useRisk } from "./riskContext";
import * as d3 from "d3";

export default function MapRegions() {
  const map = useGoogleMap();
  const { selectedRisks } = useRisk();

  useEffect(() => {
    if (!map) return;

    // Clear existing data
    map.data.forEach((feature) => {
      map.data.remove(feature);
    });

    if (selectedRisks.length === 0) return;

    // Color scale
    const colorScale = d3.scaleSequential(d3.interpolateYlOrRd).domain([0, 1]);

    // Load GeoJSON data
    fetch(
      "https://raw.githubusercontent.com/datasets/geo-boundaries-world-110m/master/countries.geojson"
    )
      .then((response) => response.json())
      .then((worldData) => {
        // Filter for Russia and CIS countries
        const cisCountries = [
          "Russia",
          "Kazakhstan",
          "Turkmenistan",
          "Uzbekistan",
          "Kyrgyzstan",
          "Tajikistan",
          "Armenia",
          "Azerbaijan",
          "Belarus",
          "Moldova",
        ];

        const filteredData = {
          ...worldData,
          features: worldData.features.filter((feature) =>
            cisCountries.includes(feature.properties.name)
          ),
        };

        // Add filtered features
        map.data.addGeoJson(filteredData);

        // Style the regions
        map.data.setStyle(() => {
          const riskLevel = Math.random();

          return {
            fillColor: colorScale(riskLevel),
            fillOpacity: 0.3, // Reduced opacity
            strokeWeight: 0.5,
            strokeColor: "gray",
            strokeOpacity: 0.5,
          };
        });
      });
  }, [map, selectedRisks]);

  return null;
}
