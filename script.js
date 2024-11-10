// Function to fetch weather data from OpenWeatherMap API
function getWeather() {
    const city = document.getElementById('cityInput').value.trim();
    const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            const weatherResults = document.getElementById('weatherResults');
            const weatherInfo = `
                <h2>Weather in ${data.name}</h2>
                <div class="weather-info">
                    <p>Temperature: ${data.main.temp.toFixed(1)} °C</p>
                    <p>Feels like: ${data.main.feels_like.toFixed(1)} °C</p>
                    <p>Description: ${data.weather[0].description}</p>
                    <p>Humidity: ${data.main.humidity}%</p>
                    <p>Wind Speed: ${data.wind.speed} m/s</p>
                </div>
            `;
            weatherResults.innerHTML = weatherInfo;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            const weatherResults = document.getElementById('weatherResults');
            weatherResults.innerHTML = `<p>Failed to fetch weather data for "${city}". Please try again.</p>`;
        });
}

// Function to handle form submission on Enter key press
function handleEnterKey(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        getWeather();
    }
}
