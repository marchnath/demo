import React, { useState, useEffect } from "react";
import DeckGL from "@deck.gl/react";
import { HeatmapLayer } from "@deck.gl/aggregation-layers";
import { ScatterplotLayer } from "@deck.gl/layers";
import { ContourLayer } from "@deck.gl/aggregation-layers";

export function MapAnimations1() {
  const [radius, setRadius] = useState(25);

  useEffect(() => {
    const interval = setInterval(() => {
      setRadius((r) => (r === 25 ? 50 : 25)); // Pulse between 25 and 50
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const layer = new HeatmapLayer({
    id: "HeatmapLayer",
    data: "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/sf-bike-parking.json",
    aggregation: "SUM",
    getPosition: (d) => d.COORDINATES,
    getWeight: (d) => d.SPACES,
    radiusPixels: radius,
    transitions: {
      radiusPixels: 1000, // Smooth transition over 1000ms
    },
  });

  return (
    <DeckGL
      initialViewState={{
        longitude: -122.4,
        latitude: 37.74,
        zoom: 11,
      }}
      controller
      layers={[layer]}
    />
  );
}

export function MapAnimations2() {
  const [scale, setScale] = useState(6);

  useEffect(() => {
    const interval = setInterval(() => {
      setScale((s) => (s === 6 ? 12 : 6)); // Pulse between 6 and 12
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const layer = new ScatterplotLayer({
    id: "ScatterplotLayer",
    data: "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/bart-stations.json",
    stroked: true,
    getPosition: (d) => d.coordinates,
    getRadius: (d) => Math.sqrt(d.exits),
    getFillColor: [255, 140, 0],
    getLineColor: [0, 0, 0],
    getLineWidth: 10,
    radiusScale: scale,
    pickable: true,
    transitions: {
      radiusScale: 1500, // Smooth transition over 1500ms
    },
  });

  return (
    <DeckGL
      initialViewState={{
        longitude: -122.4,
        latitude: 37.74,
        zoom: 11,
      }}
      controller
      getTooltip={({ object }) => object && object.name}
      layers={[layer]}
    />
  );
}

export function MapAnimations3() {
  const layer = new ContourLayer({
    id: "ContourLayer",
    data: "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/sf-bike-parking.json",

    cellSize: 200,
    contours: [
      { threshold: 1, color: [255, 0, 0], strokeWidth: 2, zIndex: 1 },
      { threshold: [3, 10], color: [55, 0, 55], zIndex: 0 },
      { threshold: 5, color: [0, 255, 0], strokeWidth: 6, zIndex: 2 },
      { threshold: 15, color: [0, 0, 255], strokeWidth: 4, zIndex: 3 },
    ],
    getPosition: (d) => d.COORDINATES,
    getWeight: (d) => d.SPACES,
    pickable: true,
  });

  return (
    <DeckGL
      initialViewState={{
        longitude: -122.4,
        latitude: 37.74,
        zoom: 11,
      }}
      controller
      getTooltip={({ object }) =>
        object && `threshold: ${object.contour.threshold}`
      }
      layers={[layer]}
    />
  );
}
