// fetchWeatherData.js
import fs from "fs";
import path from "path";

async function fetchAndSaveWeatherData() {
  try {
    const response = await fetch(
      `https://api.aerisapi.com/forecast/layers?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_CLIENT_SECRET}`
    );
    const data = await response.json();

    // Save the data to a JSON file
    const filePath = path.join(
      process.cwd(),
      "public",
      "static",
      "weatherData.json"
    );

    // Ensure the directory exists
    fs.mkdirSync(path.join(process.cwd(), "public", "static"), {
      recursive: true,
    });

    // Write the data to file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    console.log(
      "Weather data has been saved to public/static/weatherData.json"
    );
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

// Run the function
fetchAndSaveWeatherData();
