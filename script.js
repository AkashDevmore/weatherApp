document.getElementById('cityInput').addEventListener('input', function() {
    const query = document.getElementById('cityInput').value;
    if (query.length > 2) {
        getCitySuggestions(query);
    } else {
        document.getElementById('suggestions').innerHTML = '';
    }
});

function getCitySuggestions(query) {
    const username = "akash_devmore"; // Replace with your GeoNames username
    const url = `http://api.geonames.org/searchJSON?name_startsWith=${query}&maxRows=5&username=${username}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displaySuggestions(data.geonames);
        })
        .catch(error => {
            console.error('Error fetching city suggestions:', error);
        });
}

function displaySuggestions(cities) {
    const suggestions = document.getElementById('suggestions');
    suggestions.innerHTML = '';
    cities.forEach(city => {
        const div = document.createElement('div');
        div.className = 'suggestion-item';
        div.textContent = `${city.name}, ${city.countryName}`;
        div.addEventListener('click', () => {
            document.getElementById('cityInput').value = city.name;
            suggestions.innerHTML = '';
        });
        suggestions.appendChild(div);
    });
}

document.getElementById('searchButton').addEventListener('click', function() {
    const city = document.getElementById('cityInput').value;
    if (city) {
        getWeather(city);
    }
});

function getWeather(city) {
    const apiKey = 'd654a97831843197ff8626e7a2bd76a9'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                document.getElementById('weatherResult').innerHTML = `<p>${data.message}</p>`;
            }
        })
        .catch(error => {
            document.getElementById('weatherResult').innerHTML = `<p>Failed to fetch data</p>`;
            console.error('Error:', error); // Log the error to the console
        });
}

function displayWeather(data) {
    const weatherResult = document.getElementById('weatherResult');
    weatherResult.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity} %</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}
