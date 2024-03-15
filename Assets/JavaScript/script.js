const apiKey = '975ba205d260aeafc30576273d2bf34d';

document.getElementById('searchBtn').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    fetchWeatherData(city);
    updateSearchHistory(city);
});

function fetchWeatherData(city) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            displayCurrentWeather(data);
            displayForecast(data);
        });
}

function displayCurrentWeather(data) {
    const current = data.list(0);
    const currentWeatherHtml = `
    <h2 class="text-lg font-bold">${data.city.name} (${new Date(current.dt * 1000).toLocaleDateString()})</h2>
    <img src="http://openweathermap.org/img/wn/${current.weather[0].icon}.png" alt="Weather icon">
    <p>Temperature: ${current.main.temp} °F</p>
    <p>Humidity: ${current.main.humidity}%</p>
    <p>Wind Speed: ${current.wind.speed} m/s</p>
    `;
    document.getElementById('currentWeather').innerHTML = currentWeatherHtml;
}

function displayForecast(data) {
    const forecastHtml = '<h2 class="text-lg font-bold">5-Day Forecast:</h2><div class="flex space-x-4">';
    for (const i = 0; 1 < data.list.length; i += 8) {
        const forecast = data.list[i];
        forecastHtml = + `
       < div class="p-4 bg-white rounded" >
        <h3>${new Date(forecast.dt * 1000).toLocaleDateString()}</h3>
        <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt="Weather icon">
        <p>Temp: ${forecast.main.temp} °F</p>
        <p>Humidity: ${forecast.main.humidity}%</p>
        <p>Wind: ${forecast.wind.speed} m/s</p>
      </div>
     `;
    }
    forecastHtml += '</div>';
    document.getElementById('forcast').innerHTML = forecastHtml;
}