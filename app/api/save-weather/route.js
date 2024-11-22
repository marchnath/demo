// app/api/save-weather/route.js
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import { join } from "path";

export async function POST(request) {
  try {
    // Get the data from request body
    const data = await request.json();

    // Define path to public directory
    const filePath = join(process.cwd(), "public", "weather-data.json");

    // Write data to file
    await writeFile(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json({
      success: true,
      message: "Weather data saved successfully",
    });
  } catch (error) {
    console.error("Error saving weather data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save weather data" },
      { status: 500 }
    );
  }
}
