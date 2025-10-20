# Weather

Simple client-side weather app that fetches current conditions and a 5-day forecast from AccuWeather and displays them in the browser.

## What it does
- Lets you search for a city and shows the current temperature, description, and a 5-day forecast.
- UI is in [template.html](template.html) and styled by [styles.css](styles.css).
- Main logic is in [index.js](index.js): [`displayWheather`](index.js), [`getWeatherData`](index.js), [`displayForecast`](index.js), and [`findCity`](index.js).

## How to run
1. Open [template.html](template.html) in your browser, or serve the folder with a simple static server (recommended to avoid some CORS/local file issues). Example:
   - VS Code: use the Live Server extension.
   - Python: run `python -m http.server` and open http://localhost:8000.
2. Edit [index.js](index.js) to add your API key (see below).
3. Reload the page, type a city name into the input, and click the search button.

## Where to get the API key
1. Go to the AccuWeather Developer Portal: https://developer.accuweather.com/
2. Sign up / sign in and create a new application.
3. In your application details you will receive an API key (key/token). Make sure your app has access to:
   - Locations API
   - Current Conditions API
   - Forecasts API
4. Copy the key.

## How to install the API key in this project
Open [index.js](index.js) and replace the Authorization token value in the headers with your key. Example (line in the file):
```js
// filepath: [index.js](http://_vscodecontentref_/0)
// ...existing code...
headers: {
  Authorization: 'Bearer YOUR_ACCWEATHER_KEY_HERE'
}
