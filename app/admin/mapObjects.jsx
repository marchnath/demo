import { useGoogleMap, OverlayView } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { useRisk } from "./riskContext";
import { Circles, Cloud, Cloud2, Explode, Images, Icons } from "./lottiePlayer";

export default function Objects() {
  const map = useGoogleMap();
  const { selectedRisks } = useRisk();
  const [position, setPosition] = useState(null);
  const [iconIndex, setIconIndex] = useState(0);
  const [lottieIndex, setLottieIndex] = useState(0);

  useEffect(() => {
    if (!map) return;

    if (selectedRisks.length === 0) return;

    // Coordinates range for Russia/North Asia
    const latMin = 41; // Approximate southern latitude of Russia
    const latMax = 82; // Approximate northern latitude of Russia
    const lngMin = 19; // Approximate western longitude of Russia
    const lngMax = 170; // Approximate eastern longitude of Russia

    // Generate random latitude and longitude within the specified range
    const randomLat = Math.random() * (latMax - latMin) + latMin;
    const randomLng = Math.random() * (lngMax - lngMin) + lngMin;

    setPosition({ lat: randomLat, lng: randomLng });

    // Update indices when selectedRisks changes
    setIconIndex((prevIndex) => (prevIndex + 1) % 2);
    setLottieIndex((prevIndex) => (prevIndex + 1) % 5);
  }, [map, selectedRisks]);

  if (!position) return null;

  const lottieComponents = [Circles, Cloud, Cloud2, Explode, Images];
  const LottieComponent = lottieComponents[lottieIndex];
  const IconComponent = Icons;

  return (
    <OverlayView
      position={position}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
      <div>
        <IconComponent index={iconIndex} />
        {typeof LottieComponent === "function" ? (
          <LottieComponent speed={1} />
        ) : (
          <LottieComponent />
        )}
      </div>
    </OverlayView>
  );
}
