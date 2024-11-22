"use client";
export default function WeatherMap() {
  return (
    <div>
      <iframe
        src="https://www.meteoblue.com/en/weather/maps/widget/moscow_russia_524901?windAnimation=1&gust=1&satellite=1&cloudsAndPrecipitation=1&temperature=1&sunshine=1&extremeForecastIndex=1&geoloc=fixed&tempunit=C&windunit=km%252Fh&lengthunit=metric&zoom=2&autowidth=auto"
        frameBorder="0"
        scrolling="NO"
        allowTransparency="true"
        sandbox="allow-same-origin allow-scripts allow-popups allow-popups-to-escape-sandbox"
        style={{ width: "100%", height: "100vh" }}
      />
      <div>
        <a
          href="https://www.meteoblue.com/en/weather/maps/moscow_russia_524901?utm_source=map_widget&utm_medium=linkus&utm_content=map&utm_campaign=Weather%2BWidget"
          target="_blank"
          rel="noopener"
        >
          meteoblue
        </a>
      </div>
    </div>
  );
}

{
  /* <iframe src="https://www.meteoblue.com/en/weather/maps/widget/abuja_nigeria_2352778?windAnimation=1&gust=1&satellite=1&cloudsAndPrecipitation=1&temperature=1&sunshine=1&extremeForecastIndex=1&geoloc=fixed&tempunit=C&windunit=km%252Fh&lengthunit=metric&zoom=5&autowidth=auto"  frameborder="0" scrolling="NO" allowtransparency="true" sandbox="allow-same-origin allow-scripts allow-popups allow-popups-to-escape-sandbox" style="width: 100%; height: 720px"></iframe><div><!-- DO NOT REMOVE THIS LINK --><a href="https://www.meteoblue.com/en/weather/maps/abuja_nigeria_2352778?utm_source=map_widget&utm_medium=linkus&utm_content=map&utm_campaign=Weather%2BWidget" target="_blank" rel="noopener">meteoblue</a></div> */
}
