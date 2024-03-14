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
    <p>Temperature: ${current.main.temp} °C</p>
    <p>Humidity: ${current.main.humidity}%</p>
    <p>Wind Speed: ${current.wind.speed} m/s</p>
    `;
    document.getElementById('currentWeather').innerHTML = currentWeatherHtml;
}