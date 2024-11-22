"use client";

{
  /* <link rel="stylesheet" href="https://cdn.aerisapi.com/wxblox/latest/aeris-wxblox.css">
<script src="https://cdn.aerisapi.com/wxblox/latest/aeris-wxblox.js"></script>
 
<div id="wxblox" class="aeris-wrapper"></div>
 
<script>    
const aeris = new AerisWeather('CLIENT_ID', 'CLIENT_SECRET');
aeris.on('ready', () => {
    const view = new aeris.wxblox.layouts.local.Main('#wxblox');
    view.load({
        p: 'minneapolis,mn'
    });
});
</script> */
}

import Script from "next/script";
import { useEffect } from "react";

export default function WeatherComponent() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const aeris = new AerisWeather(
        "mqkiojXqNzl9EZq8pUvhl",
        "odObUKTPZwE6aRgJvvwGfz6XCvCva4jthCii8MVU"
      );
      aeris.on("ready", () => {
        const view = new aeris.wxblox.layouts.local.Main("#wxblox");
        view.load({
          p: "minneapolis,mn",
        });
      });
    }
  }, []);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.aerisapi.com/wxblox/latest/aeris-wxblox.css"
      />
      <Script
        src="https://cdn.aerisapi.com/wxblox/latest/aeris-wxblox.js"
        strategy="beforeInteractive"
      />
      <div id="wxblox" className="aeris-wrapper"></div>
    </>
  );
}
