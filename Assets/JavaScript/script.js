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
    const current = data.list[0];
    const currentWeatherHtml = `
    <div class="text-center">
        <h2>${data.city.name} (${new Date(current.dt * 1000).toLocaleDateString()})</h2>
        <img src="http://openweathermap.org/img/wn/${current.weather[0].icon}.png" alt="Weather icon">
        <p class="lead">Temperature: ${current.main.temp} °F</p>
        <p>Humidity: ${current.main.humidity}%</p>
        <p>Wind Speed: ${current.wind.speed} m/s</p>
    </div>`;
    document.getElementById('currentWeather').innerHTML = currentWeatherHtml;
}

function displayForecast(data) {
    let forecastHtml = '<h3 class="text-center mb-3">5-Day Forecast:</h3><div class="d-flex justify-content-between">';
    for (let i = 0; i < data.list.length; i += 8) {
        const forecast = data.list[i];
        forecastHtml += `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${new Date(forecast.dt * 1000).toLocaleDateString()}</h5>
                    <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt="Weather icon">
                    <p class="card-text">Temp: ${forecast.main.temp} °F</p>
                    <p class="card-text">Humidity: ${forecast.main.humidity}%</p>
                    <p class="card-text">Wind: ${forecast.wind.speed} m/s</p>
                </div>
            </div>
        `;
    }
    forecastHtml += '</div>';
    document.getElementById('forecast').innerHTML = forecastHtml;
}

function updateSearchHistory(city) {
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    if (!searchHistory.includes(city)) {
        searchHistory.push(city);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }
    displaySearchHistory();
}

function displaySearchHistory() {
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    let historyHtml = '<h3 class="mb-3">Search History:</h3>';
    searchHistory.forEach(city => {
        historyHtml += `<button onclick="fetchWeatherData('${city}')" class="btn btn-secondary w-100 mb-2">${city}</button>`;
    });
    document.getElementById('searchHistory').innerHTML = historyHtml;
}

document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

// Load the theme from localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.body.classList.add(savedTheme);
}

displaySearchHistory();