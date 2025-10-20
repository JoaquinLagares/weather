const options = {
    method: 'GET',
    headers: {
        Authorization: 'YOUR_API_KEY'
    }
};

const body = document.querySelector('body');
const temperature = document.querySelector('#temperature');
const description = document.querySelector('#description');
const place = document.querySelector('#place')

async function displayWheather(city, temp, desc) {

    place.textContent = city
    temperature.textContent = `${temp}°C`
    description.textContent = desc;

}

async function getWeatherData(city) {
    try {
        const resCity = await fetch(
            `https://dataservice.accuweather.com/locations/v1/cities/search?q=${city}`,
            options
        );

        const cityData = await resCity.json();
        const cityKey = cityData[0].Key;

        const [resWeather, resForecast] = await Promise.all([
            fetch(
                `https://dataservice.accuweather.com/currentconditions/v1/${cityKey}`,
                options
            ),
            fetch(
                `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?metric=true`,
                options
            )
        ]);

        const [weatherData, forecastData] = await Promise.all([
            resWeather.json(),
            resForecast.json()
        ])
        return {
            city: cityData[0].LocalizedName,
            country: cityData[0].Country.LocalizedName,
            desc: weatherData[0].WeatherText,
            temp: weatherData[0].Temperature.Metric.Value,
            forecasts: forecastData.DailyForecasts.map(day => ({
                date: new Date(day.Date).toLocaleDateString(),
                min: day.Temperature.Minimum.Value,
                max: day.Temperature.Maximum.Value,
                phrase: day.Day.IconPhrase
            }))
        };


    } catch (e) {
        console.log('getWeatherData error:', e);
    }



}
async function displayForecast(forecasts) {

    const container = document.querySelector('#forecast-weather');
    container.innerHTML = ''

    forecasts.forEach(day => {
        const card = document.createElement('div');
        card.classList.add('forecast-card');

        const date = document.createElement('p');
        date.classList.add('forecast-text')
        date.textContent = day.date;

        const phrase = document.createElement('p');
        phrase.classList.add('forecast-text')
        phrase.textContent = day.phrase;

        const dayMinMax = document.createElement('p')
        dayMinMax.classList.add('forecast-text')
        dayMinMax.textContent = `min: ${day.min} - max: ${day.max}`

        card.appendChild(date)
        card.appendChild(phrase)
        card.appendChild(dayMinMax)

        container.appendChild(card);

    })


}

async function findCity() {
    const finder = document.querySelector('#finder');

    finder.addEventListener('click', async (e) => {
        e.preventDefault();
        const city = document.querySelector('#city-to-find').value;

        const data = await getWeatherData(city);


        displayWheather(data.city, data.temp, data.desc);

        displayForecast(data.forecasts)
    })
}



findCity()