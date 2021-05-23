const searchElement = document.getElementById('searchInput');
const searchBox = new google.maps.places.SearchBox(searchElement);

searchBox.addListener('places_changed', () => {
    const place = searchBox.getPlaces()[0];
    if (place == null) return;

    const latitude = place.geometry.location.lat();
    const longitude = place.geometry.location.lng();

    console.log(latitude, longitude);

    fetch('/weather', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            latitude: latitude,
            longitude: longitude
        })
    }).then(res => res.json()).then(data => {
        console.log(data);
        setWeatherDate(data, place.formatted_address);
    });
});

const locationElement = document.getElementById('location');
const tempElement = document.getElementById('temperature');
const feelsElement = document.getElementById('feelsLike');
const minTempElement = document.getElementById('minTemp');
const maxTempElement = document.getElementById('maxTemp');
const windDegElement = document.getElementById('windDeg');
const windSpeedElement = document.getElementById('windSpeed');
const weatherStatusElement = document.getElementById('weatherStatus');
const humidityElement = document.getElementById('humidity');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');


function setWeatherDate(data, place){
    locationElement.textContent = place;
    document.getElementById('weatherIcon').src = `icons /${data.weather[0].icon}.png`;
    tempElement.textContent = data.main.temp + ' C';
    feelsElement.textContent = data.main.feels_like + ' C';
    minTempElement.textContent = data.main.temp_min + ' C';
    maxTempElement.textContent = data.main.temp_max + ' C';
    windDegElement.textContent = data.wind.deg;
    windSpeedElement.textContent = data.wind.speed + ' m/s';
    weatherStatusElement.textContent = data.weather[0].main;
    humidityElement.textContent = data.main.humidity + ' %';
    sunrise.textContent = new Date((data.sys.sunrise + data.timezone) * 1000).toLocaleTimeString('no-NO');
    sunset.textContent = new Date((data.sys.sunset + data.timezone) * 1000).toLocaleTimeString('no-NO');
};