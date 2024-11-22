"use client";

import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";

// Utility functions for data management
const CACHE_KEY = "weather-data-cache";
const CACHE_DURATION = 3600000; // 1 hour in milliseconds

const WeatherDataManager = {
  saveToCache: (data) => {
    const cacheEntry = {
      timestamp: Date.now(),
      data: data,
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheEntry));
  },

  getFromCache: () => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const { timestamp, data } = JSON.parse(cached);
    if (Date.now() - timestamp > CACHE_DURATION) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }

    return data;
  },

  // Function to fetch fresh data from the API
  fetchFreshData: async (clientId, clientSecret) => {
    // Replace this with your actual API endpoint and data structure
    const response = await fetch(
      `https://api.aerisapi.com/forecast/layers?client_id=${clientId}&client_secret=${clientSecret}`
    );
    const data = await response.json();
    return data;
  },
};

const MapPage = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeMap = async () => {
      // Try to get cached data first
      let data = WeatherDataManager.getFromCache();

      // If no cached data or cache expired, fetch fresh data
      if (!data) {
        try {
          data = await WeatherDataManager.fetchFreshData(
            process.env.NEXT_PUBLIC_CLIENT_ID,
            process.env.NEXT_PUBLIC_CLIENT_SECRET
          );
          WeatherDataManager.saveToCache(data);
        } catch (error) {
          console.error("Error fetching weather data:", error);
          // Fallback to cached data even if expired
          data = WeatherDataManager.getFromCache();
        }
      }

      setWeatherData(data);
      setIsLoading(false);

      // Load the map script
      const script = document.createElement("script");
      script.src = "https://cdn.aerisapi.com/sdk/js/1.8.0/aerisweather.min.js";
      script.defer = true;
      document.body.appendChild(script);

      script.onload = () => {
        const aeris = new AerisWeather(
          process.env.NEXT_PUBLIC_CLIENT_ID,
          process.env.NEXT_PUBLIC_CLIENT_SECRET
        );

        aeris.apps().then((apps) => {
          const app = new apps.InteractiveMapApp(
            document.getElementById("map"),
            {
              map: {
                strategy: "google",
                accessToken: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
                zoom: 3,
                center: {
                  lat: 55.7879,
                  lon: 100.1233,
                },
                timeline: {
                  from: -7200,
                  to: 0,
                },
              },
              panels: {
                layers: {
                  buttons: [
                    {
                      title: "Forecast Satellite",
                      value: "fsatellite",
                    },
                    {
                      title: "Forecast Precip Accum",
                      value: "fqpf-accum",
                    },
                    {
                      title: "Forecast Snow Accum",
                      value: "fqsf-accum",
                    },
                  ],
                  enabled: true,
                  toggleable: false,
                  position: {
                    pin: "bottomleft",
                    translate: {
                      x: 10,
                      y: -100,
                    },
                  },
                },
                timeline: {
                  enabled: true,
                  toggleable: false,
                  position: {
                    pin: "bottom",
                    translate: {
                      x: 0,
                      y: -10,
                    },
                  },
                },
                search: {
                  enabled: false,
                },
                legends: {
                  enabled: false,
                  toggleable: true,
                  position: {
                    pin: "bottomright",
                    translate: {
                      x: -10,
                      y: -10,
                    },
                  },
                },
                info: {
                  enabled: true,
                  position: {
                    pin: "topleft",
                    translate: {
                      x: 10,
                      y: 10,
                    },
                  },
                  metric: false,
                },
              },
            }
          );

          app.on("ready", () => {
            // Use cached data instead of real-time data
            if (weatherData) {
              app.map.setData(weatherData);
            }

            app.map.on("click", (e) => {
              app.showInfoAtCoord(
                e.data.coord,
                "localweather",
                "Local Weather"
              );
            });
            app.map.addLayers(["fsatellite"]);
            app.map.timeline.play();
          });
        });
      };

      return () => {
        document.body.removeChild(script);
      };
    };

    initializeMap();
  }, [weatherData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <head>
        <meta charSet="UTF-8" />
        <link
          rel="stylesheet"
          href="https://cdn.aerisapi.com/sdk/js/1.8.0/aerisweather.css"
        />
        <style>{`
          #map {
            height: 100vh;
            width: 100vw;
          }
        `}</style>
      </head>
      <body>
        <div id="map"></div>
      </body>
    </>
  );
};

export default MapPage;

// import { useEffect } from "react";

// const MapPage = () => {
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://cdn.aerisapi.com/sdk/js/1.8.0/aerisweather.min.js";
//     script.defer = true;
//     document.body.appendChild(script);

//     script.onload = () => {
//       const aeris = new AerisWeather(
//         process.env.NEXT_PUBLIC_CLIENT_ID,
//         process.env.NEXT_PUBLIC_CLIENT_SECRET
//       );
//       const utils = aeris.utils;

//       aeris.apps().then((apps) => {
//         const app = new apps.InteractiveMapApp(document.getElementById("map"), {
//           map: {
//             strategy: "google",
//             accessToken: "AIzaSyCxK6N9ZBje2ZyOQlFqSr_-w0CBFNB8uqY ",
//             zoom: 3,
//             center: {
//               lat: 55.7879,
//               lon: 100.1233,
//             },
//             timeline: {
//               from: -7200,
//               to: 0,
//             },
//           },
//           panels: {
//             layers: {
//               buttons: [
//                 {
//                   title: "Forecast Satellite",
//                   value: "fsatellite",
//                 },
//                 {
//                   title: "Forecast Precip Accum",
//                   value: "fqpf-accum",
//                 },
//                 {
//                   title: "Forecast Snow Accum",
//                   value: "fqsf-accum",
//                 },
//               ],
//               enabled: true,
//               toggleable: false,
//               position: {
//                 pin: "bottomleft",
//                 translate: {
//                   x: 10,
//                   y: -100,
//                 },
//               },
//             },
//             timeline: {
//               enabled: true,
//               toggleable: false,
//               position: {
//                 pin: "bottom",
//                 translate: {
//                   x: 0,
//                   y: -10,
//                 },
//               },
//             },
//             search: {
//               enabled: false,
//               toggleable: false,
//               position: {
//                 pin: "top",
//                 translate: {
//                   x: 0,
//                   y: 10,
//                 },
//               },
//             },
//             legends: {
//               enabled: false,
//               toggleable: true,
//               position: {
//                 pin: "bottomright",
//                 translate: {
//                   x: -10,
//                   y: -10,
//                 },
//               },
//             },
//             info: {
//               enabled: true,
//               position: {
//                 pin: "topleft",
//                 translate: {
//                   x: 10,
//                   y: 10,
//                 },
//               },
//               metric: false,
//             },
//           },
//         });

//         app.on("ready", () => {
//           app.map.on("click", (e) => {
//             app.showInfoAtCoord(e.data.coord, "localweather", "Local Weather");
//           });

//           app.map.addLayers(["fsatellite"]);
//           app.map.timeline.play();
//         });
//       });
//     };

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   return (
//     <>
//       <head>
//         <meta charSet="UTF-8" />
//         <link
//           rel="stylesheet"
//           href="https://cdn.aerisapi.com/sdk/js/1.8.0/aerisweather.css"
//         />
//         <style>{`
//           #map {
//             height: 100vh;
//             width: 100vw;

//           }
//         `}</style>
//       </head>
//       <body>
//         <div id="map"></div>
//       </body>
//     </>
//   );
// };

// export default MapPage;
