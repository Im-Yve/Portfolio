document.getElementById('getWeather').addEventListener('click', () => {
    const city = document.getElementById('city').value;
    const apiKey = '248378f9b987ca645e7d087a28921800';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            const weatherIcon = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

            const weatherResult = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <img src="${iconUrl}" alt="${data.weather[0].description}" />
                <p>Temperature: ${data.main.temp} °C</p>
                <p>Weather: ${data.weather[0].description}</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind: ${data.wind.speed} km/h</p>
            `;
            const weatherInfo = document.getElementById('weatherResult');
            weatherInfo.innerHTML = weatherResult;
            weatherInfo.classList.remove('hidden');

        })
        .catch(error => {
            const weatherInfo = document.getElementById('weatherResult');
            weatherInfo.innerHTML = `<p>${error.message}</p>`;
            weatherInfo.classList.remove('hidden');
        });
});

document.getElementById('clearWeather').addEventListener('click', () => {
    document.getElementById('city').value = '';
    document.getElementById('weatherResult').innerHTML = '';
    document.getElementById('weatherResult').classList.add('hidden');
    document.getElementById('locationWeather').classList.add('hidden');
});

